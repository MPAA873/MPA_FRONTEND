import PrivacyPolicyContent from "@/components/Privacypolicycontent";

const SITE_URL = "https://www.mparesearch.com";
const PAGE_PATH = "/privacy-policy";
const EFFECTIVE_DATE = "2026-08-03";

export const metadata = {
  title: "Privacy Policy | MPA Research",
  description:
    "Read the MPA Research privacy policy to learn how we collect, use, store and protect the personal information of authors, reviewers, editors and website visitors.",
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
  },
  keywords: [
    "MPA Research privacy policy",
    "journal privacy policy",
    "manuscript data protection",
    "peer review confidentiality",
    "academic publisher privacy",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | MPA Research",
    description:
      "How MPA Research collects, uses, stores and protects the personal information of authors, reviewers, editors and readers.",
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "MPA Research",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MPA Research",
    description:
      "How MPA Research collects, uses, stores and protects your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  // JSON-LD structured data helps search engines understand this as a
  // legal/policy document tied to the MPA Research organization.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: `${SITE_URL}${PAGE_PATH}`,
    dateModified: EFFECTIVE_DATE,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: "MPA Research",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "MPA Research",
      url: SITE_URL,
      email: "info@mparesearch.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Privacy Policy",
          item: `${SITE_URL}${PAGE_PATH}`,
        },
      ],
    },
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyPolicyContent effectiveDate={EFFECTIVE_DATE} />
    </>
  );
}