import { PageHero } from '../components/PageHero';
import { ContactCtaSection } from '../sections/ContactCtaSection';
import { ReviewsSection } from '../sections/ReviewsSection';
import { TrustStrip } from '../sections/TrustStrip';

export function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer Reviews"
        title="Trusted HVAC Service With a Local Reputation"
        description="See why homeowners and businesses choose TxRacs LLC for responsive service, clean workmanship, and practical solutions."
      />
      <ReviewsSection />
      <TrustStrip />
      <ContactCtaSection />
    </>
  );
}
