import { Mail, MapPin, Phone } from 'lucide-react';
import { EstimateForm } from '../components/EstimateForm';
import { PageHero } from '../components/PageHero';
import { Reveal } from '../components/Reveal';
import { business } from '../utils/business';

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact TxRacs LLC"
        title="Request HVAC Service or a Free Estimate"
        description="Call, email, or submit the quote form and the TxRacs team will be ready to help with your heating, cooling, or refrigeration needs."
      />
      <section className="section-pad bg-softBlue">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <div className="rounded-2xl bg-white p-8 shadow-card">
              <h2 className="text-3xl font-black text-ink">Get in Touch</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Based in Cypress and serving the greater Houston area with residential and commercial HVAC and refrigeration support.
              </p>
              <div className="mt-8 grid gap-4">
                <a href={`tel:${business.phone}`} className="flex items-center gap-4 rounded-2xl bg-softBlue p-5 transition hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-500">Phone</span>
                    <span className="font-black text-ink">{business.displayPhone}</span>
                  </span>
                </a>
                <a href={`mailto:${business.email}`} className="flex items-center gap-4 rounded-2xl bg-softBlue p-5 transition hover:-translate-y-1 hover:shadow-card">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-cta text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-500">Email</span>
                    <span className="font-black text-ink">{business.email}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl bg-softBlue p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm text-slate-500">Address</span>
                    <span className="font-black text-ink">
                      {business.address}, {business.cityStateZip}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EstimateForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
