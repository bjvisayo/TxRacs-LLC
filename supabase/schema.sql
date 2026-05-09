create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text not null,
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Scheduled', 'Completed', 'Closed')),
  amount_paid numeric(10, 2) not null default 0,
  payment_method text,
  payment_date date,
  payment_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_quote_requests_updated_at on public.quote_requests;
create trigger set_quote_requests_updated_at
before update on public.quote_requests
for each row
execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.quote_requests enable row level security;

create policy "Approved admins can read admin users"
on public.admin_users
for select
to authenticated
using (lower(email) = lower(auth.jwt() ->> 'email'));

create policy "Approved admins can read quote requests"
on public.quote_requests
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_users approved
    where lower(approved.email) = lower(auth.jwt() ->> 'email')
  )
);

create policy "Approved admins can update quote requests"
on public.quote_requests
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_users approved
    where lower(approved.email) = lower(auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1
    from public.admin_users approved
    where lower(approved.email) = lower(auth.jwt() ->> 'email')
  )
);

-- After creating your first Supabase auth user, add that email here:
-- insert into public.admin_users (email) values ('admin@example.com');
