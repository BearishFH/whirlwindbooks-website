import "server-only"
import { createClient } from "@supabase/supabase-js"
import { unstable_cache } from "next/cache"

export type ShowcaseBook = { id: string; title: string; cover: string }

// The marketing homepage has no user session, so to show REAL current covers
// from the catalogue we mint a short-lived anonymous session server-side (never
// exposed to the client) purely to read the public catalogue. Cached for an
// hour via unstable_cache so it runs rarely and the page stays fast.
export const getShowcaseBooks = unstable_cache(
  async (limit = 24): Promise<ShowcaseBook[]> => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      const sb = createClient(url, anon)
      const { data: auth } = await sb.auth.signInAnonymously()
      if (!auth?.session) return []
      const { data } = await sb
        .from("books")
        .select("id,title,book_covers(cover_url)")
        .limit(limit)
      await sb.auth.signOut().catch(() => {})
      // deno-lint-ignore no-explicit-any
      return (data ?? [])
        .map((b: any) => ({
          id: b.id as string,
          title: (b.title as string) ?? "",
          cover: (b.book_covers?.[0]?.cover_url as string) ?? "",
        }))
        .filter((b: ShowcaseBook) => !!b.cover)
    } catch {
      return []
    }
  },
  ["showcase-books-v1"],
  { revalidate: 3600 },
)
