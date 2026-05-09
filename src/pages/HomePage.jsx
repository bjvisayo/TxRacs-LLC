import { AboutSection } from '../sections/AboutSection';
import { ContactCtaSection } from '../sections/ContactCtaSection';
import { HeroSection } from '../sections/HeroSection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { ServiceAreasSection } from '../sections/ServiceAreasSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TrustStrip } from '../sections/TrustStrip';

export function HomePage() {
  return (
    <>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <TrustStrip />
        <ServiceAreasSection />
        <ContactCtaSection />
    </>
  );
}
