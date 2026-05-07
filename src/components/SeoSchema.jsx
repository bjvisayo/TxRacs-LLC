import { business } from '../utils/business';

export function SeoSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: business.name,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    telephone: business.phone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address,
      addressLocality: 'Cypress',
      addressRegion: 'TX',
      postalCode: '77429',
      addressCountry: 'US',
    },
    areaServed: business.serviceAreas.map((area) => ({ '@type': 'City', name: `${area}, Texas` })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:30',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '12:30',
      },
    ],
    priceRange: '$$',
    url: 'https://txracs.com/',
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
