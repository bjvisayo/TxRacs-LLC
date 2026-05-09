import { ArrowRight, Building2, CalendarCheck, Flame, Home, Snowflake, Thermometer, Wrench, Zap, Fan, PackageCheck } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';

const services = [
  { title: 'AC Repair', text: 'Fast, reliable AC repair services to restore comfort. We diagnose and fix all makes and models.', icon: Snowflake, color: 'bg-primary' },
  { title: 'AC Installation', text: 'Professional AC installation with expert sizing, energy-efficient options, and clean workmanship.', icon: Wrench, color: 'bg-orange-500' },
  { title: 'Heating Repair', text: 'Keep your family warm with expert furnace and heating system repair services.', icon: Flame, color: 'bg-cta' },
  { title: 'Heating Installation', text: 'New heating system installation with energy-efficient solutions and warranty coverage.', icon: Home, color: 'bg-violet-500' },
  { title: 'Commercial HVAC', text: 'Complete climate control solutions for businesses, offices, retail, and facilities.', icon: Building2, color: 'bg-navy' },
  { title: 'Refrigeration', text: 'Commercial and residential refrigeration services, walk-in coolers, and maintenance.', icon: PackageCheck, color: 'bg-emerald-500' },
  { title: 'Maintenance', text: 'Seasonal tune-ups and maintenance plans to keep your systems running efficiently.', icon: CalendarCheck, color: 'bg-cyan-500' },
  { title: 'Emergency Service', text: '24/7 emergency HVAC repair when you need us most. Fast response guaranteed.', icon: Zap, color: 'bg-white/20', highlight: true },
  { title: 'Thermostats', text: 'Smart thermostat installation for energy savings and precise climate control.', icon: Thermometer, color: 'bg-pink-500' },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-pad bg-white">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Our Services"
          title="Comprehensive HVAC & Refrigeration Solutions"
          description="From routine maintenance to emergency repairs, we keep residential and commercial properties comfortable throughout greater Houston."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, text, icon: Icon, color, highlight }, index) => (
            <Reveal key={title} delay={index * 0.035}>
              <article
                className={`group h-full rounded-2xl p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-card ${
                  highlight ? 'bg-cta text-white shadow-red-500/20' : 'bg-softBlue text-ink'
                }`}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${color} text-white transition group-hover:scale-110`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className={`mt-3 text-sm leading-6 ${highlight ? 'text-white' : 'text-slate-600'}`}>{text}</p>
                <a href="/contact" className={`mt-5 inline-flex items-center gap-2 text-sm font-black ${highlight ? 'text-white' : 'text-primary'}`}>
                  Learn More <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="/contact" className="btn-blue">
            View All Services <Fan className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
