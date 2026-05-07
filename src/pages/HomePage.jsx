import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FloatingActions } from '../components/FloatingActions';
import { AboutSection } from '../sections/AboutSection';
import { ContactCtaSection } from '../sections/ContactCtaSection';
import { HeroSection } from '../sections/HeroSection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { ServiceAreasSection } from '../sections/ServiceAreasSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TrustStrip } from '../sections/TrustStrip';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <TrustStrip />
        <ServiceAreasSection />
        <ContactCtaSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
