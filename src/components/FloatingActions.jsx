import { MessageCircle, Phone } from 'lucide-react';
import { business } from '../utils/business';

export function FloatingActions() {
  return (
    <>
      <a
        href={business.whatsapp}
        className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-1 lg:bottom-6"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <a href={`tel:${business.phone}`} className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-2xl bg-cta py-4 text-sm font-black text-white shadow-xl shadow-red-500/30 lg:hidden">
        <Phone className="h-4 w-4" />
        Call Now: {business.displayPhone}
      </a>
    </>
  );
}
