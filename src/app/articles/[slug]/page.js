// app/articles/[slug]/page.js

import ArticleDetailClient from "@/components/ArticleDetailClient";

const SITE_URL = "https://mparesearch.com";
const JOURNAL_NAME = "MPA Research";

async function getManuscript(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/manuscripts/published/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.manuscript || null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getManuscript(slug);

  if (!article) {
    return {
      title: `Article Not Found | ${JOURNAL_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const authorNames = article.authors?.map((a) => a.name) || [];
  const description = article.abstract
    ? article.abstract.slice(0, 160)
    : `Peer-reviewed research article published in ${JOURNAL_NAME}.`;
  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;
  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toISOString().split("T")[0]
    : "";

  // Keywords can arrive as a JSON-stringified array (see keywords parsing
  // logic in ArticleDetailClient) — normalize here too for citation_keywords.
  let keywordList = [];
  try {
    keywordList = Array.isArray(article.keywords)
      ? JSON.parse(article.keywords[0] || "[]")
      : [];
  } catch {
    keywordList = Array.isArray(article.keywords) ? article.keywords : [];
  }

  return {
    title: `${article.title} | ${JOURNAL_NAME}`,
    description,
    keywords: keywordList.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: article.title,
      description,
      url: canonicalUrl,
      siteName: JOURNAL_NAME,
      type: "article",
      publishedTime: article.publishedAt,
      authors: authorNames,
      images: article.files?.manuscriptImage
        ? [{ url: article.files.manuscriptImage, width: 1200, height: 630 }]
        : [{ url: `${SITE_URL}/newLogo.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.files?.manuscriptImage
        ? [article.files.manuscriptImage]
        : [`${SITE_URL}/newLogo.png`],
    },

    // ---------- GOOGLE SCHOLAR (Highwire Press tags) ----------
    // Google Scholar ONLY reads these specific meta tag names.
    // Every article page MUST have: citation_title, citation_author,
    // citation_publication_date, citation_pdf_url, citation_journal_title.
    other: {
      citation_title: article.title,
      citation_author: authorNames, // renders one <meta> per author automatically
      citation_publication_date: publishedDate,
      citation_online_date: publishedDate,
      citation_journal_title: JOURNAL_NAME,
      citation_journal_abbrev: "MPA Res.",
      citation_publisher: JOURNAL_NAME,
      citation_volume: article.volume ? String(article.volume) : "",
      citation_issue: article.issue ? String(article.issue) : "",
      citation_firstpage: article.paperNumber || "",
      citation_pdf_url: article.files?.manuscriptFile?.url || "",
      citation_abstract_html_url: canonicalUrl,
      citation_fulltext_html_url: canonicalUrl,
      citation_language: "en",
      citation_keywords: keywordList,
      ...(article.doi && {
        citation_doi: article.doi.replace("https://doi.org/", ""),
      }),
      // One citation_author_institution per author, in the same order —
      // Scholar pairs them positionally with citation_author.
      ...(authorNames.length > 0 && {
        citation_author_institution:
          article.authors?.map((a) => a.affiliation || "") || [],
      }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getManuscript(slug);

  if (!article) {
    return <ArticleDetailClient article={null} />;
  }

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}`;

  // ---------- JSON-LD structured data ----------
  // Helps regular Google Search show rich results (not read by Scholar,
  // but important for normal SEO / Google Search Console).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    name: article.title,
    description: article.abstract,
    url: canonicalUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: (article.authors || []).map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: a.affiliation
        ? { "@type": "Organization", name: a.affiliation }
        : undefined,
    })),
    publisher: {
      "@type": "Organization",
      name: JOURNAL_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/newLogo.png`,
      },
    },
    ...(article.files?.manuscriptImage && {
      image: article.files.manuscriptImage,
    }),
    ...(article.doi && {
      sameAs: article.doi,
      identifier: article.doi,
    }),
    ...(article.volume && { volumeNumber: String(article.volume) }),
    ...(article.issue && { issueNumber: String(article.issue) }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailClient article={article} />
    </>
  );
}