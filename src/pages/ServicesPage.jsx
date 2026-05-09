import { PageHero } from '../components/PageHero';
import { ContactCtaSection } from '../sections/ContactCtaSection';
import { ServicesSection } from '../sections/ServicesSection';
import { TrustStrip } from '../sections/TrustStrip';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="HVAC & Refrigeration Services"
        title="Repair, Installation, Maintenance & Emergency Support"
        description="From residential AC repair to commercial refrigeration, TxRacs LLC keeps comfort and cooling systems running across greater Houston."
      />
      <ServicesSection />
      <TrustStrip />
      <ContactCtaSection />
    </>
  );
}
