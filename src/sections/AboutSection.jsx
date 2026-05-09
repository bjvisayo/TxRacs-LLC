import { ArrowRight, Check, ShieldCheck, Timer, Wrench, BadgeDollarSign } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { images } from '../assets/images';

const features = [
  { title: 'Licensed & Insured', text: 'Fully certified team', icon: ShieldCheck },
  { title: 'Fast Response', text: 'Same-day service', icon: Timer },
  { title: 'Honest Pricing', text: 'No hidden fees', icon: BadgeDollarSign },
  { title: 'Quality Parts', text: 'Top brands only', icon: Wrench },
];

export function AboutSection() {
  return (
    <section id="about" className="section-pad bg-softBlue">
      <div className="container-premium grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={images.about} alt="Technician checking HVAC equipment" className="h-[360px] w-full rounded-2xl object-cover shadow-card" />
          <div className="absolute -bottom-8 right-5 rounded-2xl bg-primary px-8 py-5 text-white shadow-premium">
            <p className="text-4xl font-black">45+</p>
            <p className="text-xs font-black">Years Combined Experience</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">About TxRacs LLC</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-ink sm:text-4xl lg:text-5xl">Your Trusted Family-Owned HVAC & Refrigeration Experts</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
            <p>
              Founded in the heart of Texas, TxRacs LLC serves Cypress and surrounding areas with dependable heating, cooling, and refrigeration service for homes and businesses.
            </p>
            <p>
              We pair clean workmanship with practical recommendations, honest pricing, and responsive scheduling so your comfort systems stay reliable year-round.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {features.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/10 text-emerald-600">
                  <Check className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-black text-ink">{title}</p>
                  <p className="text-sm text-slate-500">{text}</p>
                </div>
                <Icon className="sr-only" />
              </div>
            ))}
          </div>
          <a href="/services" className="btn-blue mt-8">
            Learn More About Us <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
