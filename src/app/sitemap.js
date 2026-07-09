// app/sitemap.js
// Live at: https://mparesearch.com/sitemap.xml

const SITE_URL = "https://mparesearch.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL; // e.g. https://api.mparesearch.com/api/v1

// Regenerate sitemap every 1 hour without needing a redeploy
export const revalidate = 3600;

// ---------- 1. STATIC ROUTES ----------
// Update this list to match every static page inside your `app` folder.
function getStaticRoutes() {
  const pages = [
    { url: "", priority: 1.0, changeFrequency: "yearly" },
    { url: "articles", priority: 0.9, changeFrequency: "daily" },
    { url: "submit", priority: 0.8, changeFrequency: "monthly" },
    { url: "about", priority: 0.7, changeFrequency: "monthly" },
    { url: "contact", priority: 0.6, changeFrequency: "monthly" },
    { url: "editorial-board", priority: 0.6, changeFrequency: "monthly" },
    { url: "guidelines", priority: 0.7, changeFrequency: "monthly" },
    { url: "ai-policy", priority: 0.3, changeFrequency: "yearly" },
    { url: "issue", priority: 0.3, changeFrequency: "yearly" },
  ];

  return pages.map((page) => ({
    url: `${SITE_URL}/${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

// ---------- 2. DYNAMIC ROUTES: PUBLISHED ARTICLES ----------
// Uses your real endpoint: GET /manuscripts/published?page=1&limit=10000
async function getArticleRoutes() {
  try {
    const res = await fetch(
      `${API_URL}/manuscripts/published?page=1&limit=10000`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error("Sitemap: failed to fetch articles", res.status);
      return [];
    }

    const data = await res.json();
    const articles = data?.articles || [];

    return articles
      .filter((a) => a.slug) // safety: skip anything without a slug
      .map((article) => ({
        url: `${SITE_URL}/articles/${article.slug}`,
        lastModified: article.updatedAt
          ? new Date(article.updatedAt)
          : article.publishedAt
          ? new Date(article.publishedAt)
          : new Date(),
        changeFrequency: "monthly",
        priority: article.isEditorChoice ? 0.9 : 0.7,
      }));
  } catch (error) {
    console.error("Sitemap: error fetching article routes", error);
    return [];
  }
}

export default async function sitemap() {
  const staticRoutes = getStaticRoutes();
  const articleRoutes = await getArticleRoutes();

  return [...staticRoutes, ...articleRoutes];
}