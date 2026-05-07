import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { business } from '../utils/business';
import { useScrollLock } from '../hooks/useScrollLock';
import { Logo } from './Logo';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.48 0 .13 5.35.13 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.8 1.48h.01c6.58 0 11.93-5.35 11.94-11.93 0-3.19-1.24-6.18-3.48-8.43Zm-8.46 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.23-.37a9.9 9.9 0 0 1-1.52-5.29c0-5.48 4.46-9.93 9.95-9.93 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.91 7.01c0 5.48-4.46 9.91-9.99 9.91Zm5.45-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-nav backdrop-blur">
      <nav className="container-premium flex h-20 items-center justify-between">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-bold text-slate-700 transition hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={business.whatsapp} className="grid h-11 w-11 place-items-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5" aria-label="Message TxRacs on WhatsApp">
            <WhatsAppIcon />
          </a>
          <a href={`tel:${business.phone}`} className="btn-primary px-5 py-3">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100 text-slate-900 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Logo />
            <button className="grid h-11 w-11 place-items-center rounded-xl bg-slate-100" onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-10 grid gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl bg-softBlue px-5 py-4 text-lg font-black text-ink">
                {link.label}
              </a>
            ))}
            <a href={`tel:${business.phone}`} className="btn-primary mt-2 w-full">
              <Phone className="h-4 w-4" />
              Call Now: {business.displayPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
