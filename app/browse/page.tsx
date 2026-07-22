import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { getAllBooks, getHomeSections } from "@/lib/catalog"
import type { Book } from "@/lib/catalog-types"
import { genreLabel } from "@/lib/catalog-types"
import { AppNav } from "@/components/app/app-nav"
import { BrowseHero } from "@/components/app/browse-hero"
import { BookRow } from "@/components/app/book-row"
import { BookCard } from "@/components/app/book-card"

export const metadata = { title: "Browse — Whirlwind" }
export const dynamic = "force-dynamic"

export default async function BrowsePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [sections, allBooks] = await Promise.all([getHomeSections(), getAllBooks(120)])

  // Build shelves from curated home sections; fall back to genre grouping.
  const sectionRows = sections
    .map((s) => ({
      title: s.title,
      books: (s.app_section_books ?? [])
        .map((sb) => sb.book_id)
        .filter((b): b is Book => !!b && !!b.id),
    }))
    .filter((r) => r.books.length > 0)

  // Genre rows from the full catalogue (nice to have even when sections exist).
  const byGenre = new Map<string, Book[]>()
  for (const b of allBooks) {
    const key = b.genre || "mystery"
    if (!byGenre.has(key)) byGenre.set(key, [])
    byGenre.get(key)!.push(b)
  }
  const genreRows = [...byGenre.entries()]
    .filter(([, books]) => books.length > 0)
    .map(([genre, books]) => ({ title: genreLabel(genre), books }))

  const hero = sectionRows[0]?.books[0] ?? allBooks[0] ?? null
  const hasAnything = sectionRows.length > 0 || allBooks.length > 0

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user?.email} />

      {hero ? (
        <BrowseHero book={hero} />
      ) : (
        <div className="h-24" />
      )}

      <main className={`relative z-10 space-y-10 pb-24 ${hero ? "-mt-16" : "pt-24"}`}>
        {sectionRows.map((row) => (
          <BookRow key={`s-${row.title}`} title={row.title} books={row.books} />
        ))}

        {/* When there are no curated sections, show genre shelves instead. */}
        {sectionRows.length === 0 &&
          genreRows.map((row) => (
            <BookRow key={`g-${row.title}`} title={row.title} books={row.books} />
          ))}

        {/* Full catalogue grid */}
        {allBooks.length > 0 ? (
          <section className="px-5 pt-4 md:px-8">
            <h2 className="ww-display mb-4 text-[19px] font-medium text-[#f5ead4] md:text-[22px]">
              Every mystery
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {allBooks.map((b) => (
                <BookCard key={b.id} book={b} width="w-full" />
              ))}
            </div>
          </section>
        ) : null}

        {!hasAnything ? (
          <div className="mx-auto max-w-md px-6 pt-32 text-center">
            <p className="ww-display text-2xl text-[#f5ead4]">The shelves are being stocked</p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[#a99c8b]">
              No published mysteries are available to your account right now. If this seems
              wrong, sign out and back in, or check the catalogue permissions.
            </p>
            <Link href="/account" className="ww-btn ww-btn-ghost mt-6 !min-h-[46px]">
              Account
            </Link>
          </div>
        ) : null}
      </main>
    </div>
  )
}
