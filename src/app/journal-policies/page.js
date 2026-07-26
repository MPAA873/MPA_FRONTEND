import JournalPoliciesPage from "@/components/JournalPolicies/JournalPoliciesPage";

const PAGE_TITLE = "Journal Policies";
const PAGE_DESCRIPTION =
  "Read MPA Research's journal policies: open access, licensing & copyright (CC BY 4.0), article processing charges, peer review, publication ethics, editorial independence, plagiarism, archiving, corrections & retractions, complaints & appeals, authorship, conflicts of interest, data availability, and AI tool use.";

export const metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "journal policies",
    "open access policy",
    "peer review policy",
    "publication ethics",
    "article processing charges",
    "CC BY 4.0 license",
    "plagiarism policy",
    "COPE guidelines",
    "editorial independence",
    "authorship policy",
    "AI policy journal",
    "MPA Research",
  ],
  alternates: {
    canonical: "/journal-policies",
  },
  openGraph: {
    type: "article",
    title: `${PAGE_TITLE} | MPA Research`,
    description: PAGE_DESCRIPTION,
    url: "https://mparesearch.com/journal-policies",
    siteName: "MPA Research",
    locale: "en_US",
    images: [
      {
        url: "/newLogo.png",
        width: 1200,
        height: 630,
        alt: "MPA Research Journal Policies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | MPA Research`,
    description: PAGE_DESCRIPTION,
    images: ["/newLogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Page() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mparesearch.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal Policies",
        item: "https://mparesearch.com/journal-policies",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://mparesearch.com/journal-policies",
    name: "Journal Policies | MPA Research",
    description: PAGE_DESCRIPTION,
    url: "https://mparesearch.com/journal-policies",
    isPartOf: {
      "@type": "WebSite",
      name: "MPA Research",
      url: "https://mparesearch.com",
    },
    publisher: {
      "@type": "Organization",
      name: "MPA Research",
      url: "https://mparesearch.com",
      logo: "https://mparesearch.com/newLogo.png",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <JournalPoliciesPage />
    </main>
  );
}