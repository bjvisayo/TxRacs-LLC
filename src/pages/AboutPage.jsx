import { PageHero } from '../components/PageHero';
import { AboutSection } from '../sections/AboutSection';
import { ContactCtaSection } from '../sections/ContactCtaSection';
import { ServiceAreasSection } from '../sections/ServiceAreasSection';
import { TrustStrip } from '../sections/TrustStrip';

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About TxRacs LLC"
        title="Family-Owned HVAC Experts Serving Cypress, Texas"
        description="Meet the local team focused on honest recommendations, responsive scheduling, and dependable HVAC and refrigeration workmanship."
      />
      <AboutSection />
      <TrustStrip />
      <ServiceAreasSection />
      <ContactCtaSection />
    </>
  );
}
