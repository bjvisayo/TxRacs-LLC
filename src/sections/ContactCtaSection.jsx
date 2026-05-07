import { Mail, Phone, Zap } from 'lucide-react';
import { EstimateForm } from '../components/EstimateForm';
import { Reveal } from '../components/Reveal';
import { business } from '../utils/business';

export function ContactCtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-20 text-white lg:py-28">
      <div className="absolute -left-28 -top-28 h-72 w-72 rounded-full bg-primary/25" />
      <div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full bg-cta/20" />
      <div className="container-premium relative grid items-center gap-12 lg:grid-cols-[0.9fr_1fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2 text-xs font-black text-white">
            <Zap className="h-4 w-4" /> 24/7 Emergency Service Available
          </span>
          <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">Ready to Schedule Your HVAC Service?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-blue-100">
            Do not wait until your HVAC system breaks down. Contact us today for a free estimate and keep your home comfortable year-round.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a href={`tel:${business.phone}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 transition hover:bg-white/15">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-blue-100">Call Us Now</span>
                <span className="block font-black">{business.displayPhone}</span>
              </span>
            </a>
            <a href={`mailto:${business.email}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 transition hover:bg-white/15">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-blue-100">Email Us</span>
                <span className="block font-black">{business.email}</span>
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <EstimateForm compact />
        </Reveal>
      </div>
    </section>
  );
}
