import { CalendarCheck, Lock } from 'lucide-react';

const services = [
  'AC Repair',
  'AC Installation',
  'Heating Repair',
  'Heating Installation',
  'Commercial HVAC',
  'Refrigeration',
  'Maintenance',
  'Emergency Service',
  'Thermostats',
];

export function EstimateForm({ compact = false }) {
  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100';

  return (
    <form className="rounded-2xl bg-white p-6 shadow-premium sm:p-8">
      <div className="text-center">
        <h3 className="text-2xl font-black text-ink">Get Your Free Estimate</h3>
        <p className="mt-2 text-sm text-slate-600">Same-day service available. No obligation quote.</p>
      </div>

      <div className={`mt-6 grid gap-3 ${compact ? 'sm:grid-cols-2' : ''}`}>
        <input className={inputClass} type="text" name="name" placeholder="Your Name" aria-label="Name" />
        <input className={inputClass} type="tel" name="phone" placeholder="Phone Number" aria-label="Phone" />
        <input className={`${inputClass} ${compact ? 'sm:col-span-2' : ''}`} type="email" name="email" placeholder="Email Address" aria-label="Email" />
        <select className={`${inputClass} ${compact ? 'sm:col-span-2' : ''}`} name="service" defaultValue="" aria-label="Service Needed">
          <option value="" disabled>
            Select Service Needed
          </option>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
        {!compact && (
          <textarea
            className={`${inputClass} min-h-24 resize-none`}
            name="message"
            placeholder="Tell us about your HVAC needs..."
            aria-label="Message"
          />
        )}
      </div>

      <button type="button" className="btn-blue mt-4 w-full">
        <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        Schedule Service
      </button>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Your information is secure & confidential
      </p>
    </form>
  );
}
