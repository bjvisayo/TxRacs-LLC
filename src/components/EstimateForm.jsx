import { CalendarCheck, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';

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
  const isSubmitting = status === 'submitting';

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100';

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const lead = {
      name: String(formData.get('name') || '').trim(),
      phone: String(formData.get('phone') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      service: String(formData.get('service') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    if (!lead.name || !lead.phone || !lead.service) {
      setError('Please enter your name, phone number, and service needed.');
      setStatus('idle');
      return;
    }

    setError('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to submit your request.');
      }

      setStatus('sent');
      form.reset();
    } catch (submissionError) {
      setStatus('idle');
      setError(submissionError.message || 'We could not submit your request right now. Please call us directly.');
    }
  }

  return (
    <form className="w-full rounded-2xl bg-white p-5 shadow-premium sm:p-8" onSubmit={handleSubmit}>
      <div className="text-center">
        <h3 className="text-xl font-black text-ink sm:text-2xl">Get Your Free Estimate</h3>
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
          Quote request received. We will contact you shortly.
        </p>
      )}

      <button type="submit" className="btn-blue mt-4 w-full disabled:cursor-not-allowed disabled:opacity-70" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CalendarCheck className="h-4 w-4" aria-hidden="true" />}
        {isSubmitting ? 'Sending Request...' : 'Schedule Service'}
      </button>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Your information is secure & confidential
      </p>
    </form>
  );
}
