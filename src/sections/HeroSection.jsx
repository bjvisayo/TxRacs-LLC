import { Award, CalendarCheck, Heart, Phone, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { EstimateForm } from '../components/EstimateForm';
import { business } from '../utils/business';
import { images } from '../assets/images';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-ink">
      <img src={images.hero} alt="HVAC technician servicing an outdoor unit" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cta/20 blur-3xl" />

      <div className="container-premium relative grid min-h-[calc(100vh-80px)] items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2 text-xs font-black text-white">
              <Zap className="h-4 w-4" /> 24/7 Emergency Service
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-black text-white backdrop-blur">
              <Heart className="h-4 w-4" /> Family Owned & Operated
            </span>
          </div>

          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.04] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Reliable HVAC & Refrigeration Services in <span className="text-yellow-400">Cypress, TX</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-white/90 sm:text-lg sm:leading-8">
            Expert heating, cooling, and refrigeration solutions for your home or business. Residential & Commercial services with honest pricing you can trust.
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white">
                <Award className="h-6 w-6" />
              </span>
              <div>
                <p className="text-3xl font-black text-white">45+</p>
                <p className="text-sm font-semibold text-white/80">Years Experience</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <div>
                <p className="text-3xl font-black text-white">Licensed</p>
                <p className="text-sm font-semibold text-white/80">& Insured</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={`tel:${business.phone}`} className="btn-primary w-full sm:w-auto">
              <Phone className="h-4 w-4" /> Call Now: {business.displayPhone}
            </a>
            <a href="/contact" className="btn-blue w-full sm:w-auto">
              <CalendarCheck className="h-4 w-4" /> Request Service
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.1 }} className="mx-auto w-full max-w-md lg:justify-self-end">
          <EstimateForm />
        </motion.div>
      </div>
    </section>
  );
}
