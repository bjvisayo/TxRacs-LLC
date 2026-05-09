import { CalendarCheck, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';
import { business } from '../utils/business';

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
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100';

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const lead = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      submittedAt: new Date().toISOString(),
    };

    if (!lead.name || !lead.phone || !lead.service) {
      setError('Please enter your name, phone number, and service needed.');
      setStatus('idle');
      return;
    }

    const existingLeads = JSON.parse(localStorage.getItem('txracs_quote_requests') || '[]');
    localStorage.setItem('txracs_quote_requests', JSON.stringify([lead, ...existingLeads].slice(0, 25)));

    const subject = encodeURIComponent(`New Quote Request - ${lead.service}`);
    const body = encodeURIComponent(
      `Name: ${lead.name}\nPhone: ${lead.phone}\nEmail: ${lead.email || 'Not provided'}\nService Needed: ${lead.service}\nMessage: ${lead.message || 'Not provided'}`,
    );

    setError('');
    setStatus('sent');
    window.location.href = `mailto:${business.email}?subject=${subject}&body=${body}`;
    form.reset();
  }

  return (
    <form className="rounded-2xl bg-white p-6 shadow-premium sm:p-8" onSubmit={handleSubmit}>
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
        {compact && <input type="hidden" name="message" defaultValue="Submitted from compact quote form." />}
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>}
      {status === 'sent' && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          Quote request prepared. Your email app should open to send it.
        </p>
      )}

      <button type="submit" className="btn-blue mt-4 w-full">
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
