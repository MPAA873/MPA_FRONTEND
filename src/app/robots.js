// app/robots.js
// Live at: https://mparesearch.com/robots.txt

const SITE_URL = "https://mparesearch.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/dashboard/",
          "/my-submissions",
          "/login",
          "/register",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/"],
      },
      {
        // Google Scholar's crawler — make sure it's explicitly allowed
        userAgent: "Googlebot-Scholar",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}