import { Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeader } from '../components/SectionHeader';

const reviews = [
  {
    name: 'Cypress Homeowner',
    text: 'Fast response, clear pricing, and the AC was cooling again the same day. Professional from the first call.',
  },
  {
    name: 'Local Business Owner',
    text: 'TxRacs handled our commercial refrigeration issue quickly and kept us updated the whole time.',
  },
  {
    name: 'Greater Houston Client',
    text: 'Honest recommendations and clean installation work. The team treated our home with real care.',
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-slate-50 py-20">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Reviews"
          title="Trusted by Homeowners & Businesses"
          description="Dependable service, practical guidance, and workmanship that keeps comfort systems running when Texas weather works overtime."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <article className="h-full rounded-2xl bg-white p-7 shadow-card transition duration-300 hover:-translate-y-1">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, item) => (
                    <Star key={item} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-7 text-slate-600">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-6 font-black text-ink">{review.name}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
