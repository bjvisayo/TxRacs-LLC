import { ArrowRight, KeyRound, MapPin } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { images } from '../assets/images';

const areas = [
  { name: 'Cypress', label: 'Headquarters', color: 'bg-primary' },
  { name: 'Houston', label: 'Metro Area', color: 'bg-orange-500' },
  { name: 'Tomball', label: 'North Houston', color: 'bg-emerald-500' },
  { name: 'Katy', label: 'West Houston', color: 'bg-violet-500' },
];

export function ServiceAreasSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-premium grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Service Areas</p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-ink lg:text-5xl">Proudly Serving Cypress & Surrounding Areas</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
            From our location in Cypress, TX, we provide fast, reliable HVAC and refrigeration services to homeowners and businesses throughout the greater Houston metropolitan area.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <div key={area.name} className="flex items-center gap-4 rounded-2xl bg-softBlue p-4 transition duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${area.color} text-white`}>
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black text-ink">{area.name}</p>
                  <p className="text-sm text-slate-500">{area.label}</p>
                </div>
              </div>
            ))}
          </div>
          <a href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-black text-primary">
            View All Service Areas <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <img src={images.areas} alt="HVAC digital controls and service interface" className="h-[380px] w-full rounded-2xl object-cover shadow-card" />
          <div className="absolute -bottom-5 left-5 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-premium">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
              <KeyRound className="h-5 w-5" />
            </span>
            <div>
              <p className="font-black text-ink">Based in Cypress</p>
              <p className="text-sm text-slate-500">Serving Greater Houston</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
