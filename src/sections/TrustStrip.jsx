import { Building2, Clock, ShieldCheck, UserCheck } from 'lucide-react';

const items = [
  { title: 'Licensed & Insured', text: '100% Protected', icon: ShieldCheck },
  { title: 'Residential & Commercial', text: 'All Property Types', icon: Building2 },
  { title: 'Fast Response Time', text: 'Same-Day Service', icon: Clock },
  { title: 'Expert Technicians', text: 'Certified Professionals', icon: UserCheck },
];

export function TrustStrip() {
  return (
    <section className="bg-primary py-12 text-white">
      <div className="container-premium grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, text, icon: Icon }) => (
          <div key={title} className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
              <Icon className="h-8 w-8" />
            </span>
            <p className="mt-4 font-black">{title}</p>
            <p className="mt-1 text-sm text-blue-100">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
