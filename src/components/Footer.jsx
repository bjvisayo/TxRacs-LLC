import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { business } from '../utils/business';
import { Logo } from './Logo';

const quickLinks = ['Home', 'About Us', 'Services', 'Reviews', 'Contact'];
const footerAreas = ['Cypress, TX', 'Houston, TX', 'Tomball, TX', 'Katy, TX', 'Spring, TX', 'Hockley, TX'];

export function Footer() {
  return (
    <footer className="bg-[#0c2238] py-14 text-blue-100">
      <div className="container-premium grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-6">
            Your trusted family-owned HVAC & Refrigeration experts serving Cypress, Houston, and surrounding areas.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Twitter].map((Icon, index) => (
              <a key={index} href="/" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-primary" aria-label="Social profile">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <a key={link} href={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' us', '').replace(' ', '-')}`} className="text-sm transition hover:text-white">
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Service Areas</h3>
          <div className="mt-5 grid gap-3">
            {footerAreas.map((area) => (
              <span key={area} className="text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-black text-white">Contact Us</h3>
          <div className="mt-5 grid gap-4 text-sm">
            <p className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>
                {business.address}
                <br />
                {business.cityStateZip}
              </span>
            </p>
            <a href={`tel:${business.phone}`} className="flex items-center gap-3 transition hover:text-white">
              <Phone className="h-4 w-4 text-primary" /> {business.displayPhone}
            </a>
            <a href={`mailto:${business.email}`} className="flex items-center gap-3 transition hover:text-white">
              <Mail className="h-4 w-4 text-primary" /> {business.email}
            </a>
          </div>
          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs">
            <p className="font-black text-white">Business Hours</p>
            <div className="mt-3 grid gap-2">
              {business.hours.map((item) => (
                <div key={item.day} className="flex justify-between gap-4">
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="container-premium mt-10 border-t border-white/10 pt-6 text-center text-xs text-blue-200">
        &copy; {new Date().getFullYear()} TxRacs LLC. All rights reserved.
      </div>
    </footer>
  );
}
