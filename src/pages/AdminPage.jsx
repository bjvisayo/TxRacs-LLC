import { AlertCircle, DollarSign, Loader2, Lock, LogOut, Mail, Phone, Search, ShieldCheck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Logo } from '../components/Logo';
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient';

const statuses = ['New', 'Contacted', 'Scheduled', 'Completed', 'Closed'];
const paymentMethods = ['', 'Cash', 'Check', 'Card', 'Zelle', 'ACH', 'Other'];

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100';

function formatDate(value) {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function ConfigWarning() {
  return (
    <div className="min-h-screen bg-softBlue px-5 py-12">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-premium sm:p-8">
        <AlertCircle className="mx-auto h-12 w-12 text-cta" />
        <h1 className="mt-5 text-3xl font-black text-ink">Admin Setup Required</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment before using the admin dashboard.
        </p>
      </div>
    </div>
  );
}

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-softBlue px-5 py-12">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-premium sm:p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-3xl font-black text-ink">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to manage quote requests and payments.</p>
        </div>
        <form className="mt-8 grid gap-4" onSubmit={handleLogin}>
          <input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Admin email" required />
          <input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
          <button className="btn-blue w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={loading} type="submit">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AccessDenied({ onLogout }) {
  return (
    <div className="min-h-screen bg-softBlue px-5 py-12">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 text-center shadow-premium sm:p-8">
        <AlertCircle className="mx-auto h-12 w-12 text-cta" />
        <h1 className="mt-5 text-3xl font-black text-ink">Access Denied</h1>
        <p className="mt-3 text-slate-600">Your email is not listed in the TxRacs approved admin users table.</p>
        <button className="btn-primary mt-6" onClick={onLogout} type="button">
          Sign Out
        </button>
      </div>
    </div>
  );
}

function LeadCard({ lead, onUpdate, saving }) {
  const [draft, setDraft] = useState({
    status: lead.status,
    amount_paid: lead.amount_paid || 0,
    payment_method: lead.payment_method || '',
    payment_date: lead.payment_date || '',
    payment_notes: lead.payment_notes || '',
  });

  useEffect(() => {
    setDraft({
      status: lead.status,
      amount_paid: lead.amount_paid || 0,
      payment_method: lead.payment_method || '',
      payment_date: lead.payment_date || '',
      payment_notes: lead.payment_notes || '',
    });
  }, [lead]);

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  return (
    <article className="min-w-0 rounded-2xl bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="min-w-0 text-xl font-black text-ink sm:text-2xl">{lead.name}</h3>
            <span className="rounded-full bg-softBlue px-3 py-1 text-xs font-black text-primary">{lead.status}</span>
          </div>
          <p className="mt-2 text-sm font-bold text-slate-500">{lead.service}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{lead.message || 'No message provided.'}</p>
          <div className="mt-4 flex min-w-0 flex-wrap gap-4 text-sm text-slate-600">
            <a className="flex min-w-0 items-center gap-2 font-bold hover:text-primary" href={`tel:${lead.phone}`}>
              <Phone className="h-4 w-4" /> {lead.phone}
            </a>
            {lead.email && (
              <a className="flex min-w-0 items-center gap-2 font-bold hover:text-primary" href={`mailto:${lead.email}`}>
                <Mail className="h-4 w-4" /> {lead.email}
              </a>
            )}
          </div>
          <p className="mt-3 text-xs font-semibold text-slate-400">Submitted {formatDate(lead.created_at)}</p>
        </div>
        <div className="w-full rounded-2xl bg-softBlue p-4 text-center sm:w-auto">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Amount Paid</p>
          <p className="mt-1 text-3xl font-black text-primary">${Number(lead.amount_paid || 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 grid min-w-0 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 xl:grid-cols-5">
        <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
          Status
          <select className={inputClass} value={draft.status} onChange={(event) => updateDraft('status', event.target.value)}>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
          Amount Paid
          <input className={inputClass} min="0" step="0.01" type="number" value={draft.amount_paid} onChange={(event) => updateDraft('amount_paid', event.target.value)} />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
          Method
          <select className={inputClass} value={draft.payment_method} onChange={(event) => updateDraft('payment_method', event.target.value)}>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method || 'Not set'}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
          Payment Date
          <input className={inputClass} type="date" value={draft.payment_date} onChange={(event) => updateDraft('payment_date', event.target.value)} />
        </label>
        <label className="grid gap-2 text-xs font-black uppercase tracking-wide text-slate-500 sm:col-span-2 xl:col-span-1">
          Notes
          <input className={inputClass} type="text" value={draft.payment_notes} onChange={(event) => updateDraft('payment_notes', event.target.value)} placeholder="Payment notes" />
        </label>
      </div>
      <button className="btn-blue mt-5 w-full px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto" disabled={saving} type="button" onClick={() => onUpdate(lead.id, draft)}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <DollarSign className="h-4 w-4" />}
        {saving ? 'Saving...' : 'Save Updates'}
      </button>
    </article>
  );
}

function Dashboard({ session, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [savingId, setSavingId] = useState('');

  async function loadLeads() {
    setLoading(true);
    setError('');
    const { data, error: leadsError } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false });

    if (leadsError) {
      setError(leadsError.message);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchesSearch =
        !query ||
        [lead.name, lead.phone, lead.email, lead.service, lead.message].some((value) => String(value || '').toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [leads, search, statusFilter]);

  async function updateLead(id, draft) {
    setSavingId(id);
    setError('');

    const payload = {
      status: draft.status,
      amount_paid: Number(draft.amount_paid || 0),
      payment_method: draft.payment_method || null,
      payment_date: draft.payment_date || null,
      payment_notes: draft.payment_notes || null,
    };

    const { data, error: updateError } = await supabase.from('quote_requests').update(payload).eq('id', id).select('*').single();

    if (updateError) {
      setError(updateError.message);
    } else {
      setLeads((current) => current.map((lead) => (lead.id === id ? data : lead)));
    }

    setSavingId('');
  }

  const totals = leads.reduce(
    (summary, lead) => {
      summary.amount += Number(lead.amount_paid || 0);
      summary[lead.status] = (summary[lead.status] || 0) + 1;
      return summary;
    },
    { amount: 0 },
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-nav">
        <div className="container-premium flex min-w-0 flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
              <ShieldCheck className="h-4 w-4" /> {session.user.email}
            </span>
            <button className="btn-primary px-5 py-3" onClick={onLogout} type="button">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-premium py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">TxRacs Admin</p>
            <h1 className="mt-2 text-3xl font-black text-ink sm:text-4xl">Quote Requests</h1>
            <p className="mt-2 text-slate-600">Manage customer requests, statuses, and manual payment records.</p>
          </div>
          <button className="btn-blue px-5 py-3" onClick={loadLeads} type="button">
            Refresh Leads
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {['New', 'Contacted', 'Scheduled', 'Completed'].map((status) => (
            <div key={status} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">{status}</p>
              <p className="mt-2 text-3xl font-black text-ink">{totals[status] || 0}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-primary p-5 text-white shadow-sm">
            <p className="text-xs font-black uppercase tracking-wide text-blue-100">Total Paid</p>
            <p className="mt-2 text-3xl font-black">${totals.amount.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 grid min-w-0 gap-4 rounded-2xl bg-white p-5 shadow-sm lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className={`${inputClass} pl-10`} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, phone, email, service, or message" />
          </label>
          <select className={inputClass} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>

        {error && <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onUpdate={updateLead} saving={savingId === lead.id} />
            ))}
            {!filteredLeads.length && <p className="rounded-2xl bg-white p-8 text-center font-bold text-slate-500 shadow-sm">No quote requests match your filters.</p>}
          </div>
        )}
      </main>
    </div>
  );
}

export function AdminPage() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [approved, setApproved] = useState(false);
  const [approvalLoading, setApprovalLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return undefined;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function checkApproval() {
      if (!session) {
        setApproved(false);
        return;
      }

      setApprovalLoading(true);
      const { data, error } = await supabase.from('admin_users').select('email').ilike('email', session.user.email).maybeSingle();
      setApproved(Boolean(data && !error));
      setApprovalLoading(false);
    }

    checkApproval();
  }, [session]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    setApproved(false);
  }

  if (!isSupabaseConfigured) return <ConfigWarning />;
  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-softBlue">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  if (!session) return <LoginView />;
  if (approvalLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-softBlue">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  if (!approved) return <AccessDenied onLogout={handleLogout} />;
  return <Dashboard session={session} onLogout={handleLogout} />;
}
