import type { MetadataRoute } from "next"
import { getShowcaseBooks } from "@/lib/showcase"

const SITE = "https://whirlwindbooks.com"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE}/browse`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/subscribe`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/refund`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ]

  // Every book gets an indexable detail page — great for long-tail "title" search.
  const books = await getShowcaseBooks(200).catch(() => [])
  const bookRoutes: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${SITE}/book/${b.id}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...bookRoutes]
}
