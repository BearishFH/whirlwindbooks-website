import { headers } from "next/headers"
import { getShowcaseBooks } from "@/lib/showcase"

const SITE = "https://whirlwindbooks.com"

// Site-wide + homepage structured data (JSON-LD) — Google's most impactful SEO
// signal. Everything here is genuine: Organization, WebSite, the real
// subscription Product/Offer, and an ItemList of actual catalogue books.
// (A reader AggregateRating is added once we have the real rating + count.)
export async function StructuredData() {
  const [books, hdrs] = await Promise.all([
    getShowcaseBooks(20).catch(() => []),
    headers(),
  ])
  const nonce = hdrs.get("x-nonce") ?? undefined

  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Whirlwind",
      url: SITE,
      logo: `${SITE}/whirlwind-logo.png`,
      description:
        "Original mystery and thriller novels to read or listen to, exclusive to Whirlwind.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Whirlwind",
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Product",
      "@id": `${SITE}/#subscription`,
      name: "Whirlwind Unlimited",
      description:
        "Unlimited access to every original Whirlwind mystery — read or listen — with new stories every week.",
      brand: { "@id": `${SITE}/#organization` },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        lowPrice: "9.99",
        highPrice: "59.99",
        offerCount: 2,
        availability: "https://schema.org/InStock",
        url: `${SITE}/subscribe`,
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#catalogue`,
      name: "Whirlwind original mysteries",
      itemListElement: books.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Book",
          name: b.title,
          url: `${SITE}/book/${b.id}`,
          image: b.cover,
          bookFormat: "https://schema.org/EBook",
          author: { "@id": `${SITE}/#organization` },
          publisher: { "@id": `${SITE}/#organization` },
        },
      })),
    },
  ]

  const graphObj = { "@context": "https://schema.org", "@graph": graph }
  // Serialize + escape "<" so a value can never break out of the script element.
  const safeJson = JSON.stringify(graphObj).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  )
}
