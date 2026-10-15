import Publisher from "@/components/Publisher.jsx";

const SITE_URL = "https://mparesearch.com";
const PAGE_URL = `${SITE_URL}/publisher`;

export const metadata = {
  title: "Publisher Information | MPA Research Consultancy",
  description:
    "MPA Research Consultancy is an independent research and scholarly publishing organization based in Greater Noida, India, and the publisher of MPA Research, an international, peer-reviewed, open-access multidisciplinary journal.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Publisher Information | MPA Research Consultancy",
    description:
      "Publisher details, journal relationship, and contact information for MPA Research Consultancy, publisher of MPA Research.",
    url: PAGE_URL,
    siteName: "MPA Research",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Publisher Information | MPA Research Consultancy",
    description:
      "Publisher details, journal relationship, and contact information for MPA Research Consultancy.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${PAGE_URL}#organization`,
      name: "MPA Research Consultancy",
      url: PAGE_URL,
      email: "info@mparesearch.com",
      telephone: ["+91-9452292537", "+91-8923580628"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "A-206, Pristine Avenue, Gaurs City – 2",
        addressLocality: "Greater Noida",
        addressRegion: "Uttar Pradesh",
        postalCode: "201009",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Periodical",
      name: "MPA Research",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${PAGE_URL}#organization` },
    },
    {
      "@type": "WebPage",
      "@id": PAGE_URL,
      url: PAGE_URL,
      name: "Publisher Information | MPA Research Consultancy",
      about: { "@id": `${PAGE_URL}#organization` },
    },
  ],
};

export default function PublisherPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Publisher />
    </main>
  );
}