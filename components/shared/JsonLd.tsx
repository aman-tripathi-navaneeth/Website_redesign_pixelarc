import { SITE_CONFIG } from "@/content/site";
import { SERVICES } from "@/content/services";

export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    logo: `${SITE_CONFIG.url}/images/company-logo.png`,
    image: `${SITE_CONFIG.url}/images/pixel-arc-building.png`,
    address: SITE_CONFIG.offices.map((office) => ({
      "@type": "PostalAddress",
      addressLocality: office.city,
      streetAddress: office.address,
    })),
    sameAs: SITE_CONFIG.socials.map((s) => s.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Technology & Digital Transformation Services",
      itemListElement: SERVICES.map((service, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.shortDescription,
          url: `${SITE_CONFIG.url}/services/${service.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}

