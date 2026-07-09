import ArticleDetailClient from "@/components/ArticleDetailClient";

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
      title: "Article Not Found | MPA Research",
    };
  }

  const authorNames = article.authors?.map((a) => a.name) || [];
  const description = article.abstract
    ? article.abstract.slice(0, 160)
    : "Peer-reviewed research article published in MPA Research.";
  const canonicalUrl = `https://mparesearch.com/articles/${article.slug}`;

  return {
    title: `${article.title} | MPA Research`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description,
      url: canonicalUrl,
      siteName: "MPA Research",
      type: "article",
      publishedTime: article.publishedAt,
      authors: authorNames,
      images: article.files?.manuscriptImage
        ? [{ url: article.files.manuscriptImage }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.files?.manuscriptImage ? [article.files.manuscriptImage] : [],
    },
    keywords: article.keywords?.join(", "),
    other: {
      citation_title: article.title,
      citation_author: authorNames,
      citation_publication_date: article.publishedAt
        ? new Date(article.publishedAt).toISOString().split("T")[0]
        : "",
      citation_journal_title: "MPA Research",
      citation_volume: article.volume ? String(article.volume) : "",
      citation_issue: article.issue ? String(article.issue) : "",
      citation_firstpage: article.paperNumber || "",
      citation_pdf_url: article.files?.manuscriptFile?.url || "",
      citation_abstract_html_url: canonicalUrl,
      citation_language: "en",
      ...(article.doi && {
        citation_doi: article.doi.replace("https://doi.org/", ""),
      }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = await getManuscript(slug);

  return <ArticleDetailClient article={article} />;
}