import type { MetadataRoute } from "next"

const SITE = "https://whirlwindbooks.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private/app-only surfaces don't belong in the index.
      disallow: ["/account", "/library", "/auth/", "/login"],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  }
}
