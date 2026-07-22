import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getBook, getSimilarBooks } from "@/lib/catalog"
import {
  coverUrl,
  genreLabel,
  hasAudio,
  localisedDescription,
  localisedTitle,
} from "@/lib/catalog-types"
import { AppNav } from "@/components/app/app-nav"
import { BookRow } from "@/components/app/book-row"

export const dynamic = "force-dynamic"

// Ad landing page. An ad for a specific book links to /start/<bookId>. The
// reader lands here, sees the advertised book, and their primary option is to
// read its first chapter FREE (no account) — with more mysteries below as the
// other options. Kept web-only; the iOS app has its own onboarding.
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBook(id)
  return {
    title: book ? `Read ${localisedTitle(book)} free — Whirlwind` : "Whirlwind",
    description: book ? localisedDescription(book).slice(0, 150) : undefined,
  }
}

export default async function StartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const book = await getBook(id)
  // If the advertised book can't be found, don't dead-end the ad click — send
  // them into the catalogue so they can still start reading something.
  if (!book) redirect("/browse")

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const similar = await getSimilarBooks(book, 12)
  const cover = coverUrl(book)
  const title = localisedTitle(book)
  const description = localisedDescription(book)
  const audio = hasAudio(book)

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user?.email} />

      {/* Cinematic backdrop from the advertised book's cover */}
      <div className="relative w-full overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40 blur-[6px]"
          />
        ) : (
          <div className="ww-noir-bg absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060508]/70 via-[#060508]/85 to-[#060508]" />

        <main className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center gap-10 px-5 pb-16 pt-28 md:flex-row md:items-center md:gap-14 md:pt-32">
          {/* Cover */}
          <div className="w-[210px] flex-none md:w-[260px]">
            <div className="aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#17130f] shadow-[0_30px_80px_rgba(0,0,0,.7)]">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt={title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center">
                  <span className="ww-display text-xl text-[#d9cbb5]">{title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Pitch + CTA */}
          <div className="flex-1 text-center md:text-left">
            <p className="ww-eyebrow mb-3">
              {genreLabel(book.genre)}
              {audio ? " · Read or listen" : ""}
            </p>
            <h1 className="ww-display text-4xl font-medium leading-tight text-[#f5ead4] md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-serif text-[17px] leading-relaxed text-[#d9cbb5] md:mx-0">
              {description.length > 320 ? description.slice(0, 320).trimEnd() + "…" : description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <Link href={`/read/${book.id}`} className="ww-btn ww-btn-gold !min-h-[54px] !px-8 text-[15px]">
                ▶ Read Chapter 1 — free
              </Link>
              {audio ? (
                <Link
                  href={`/read/${book.id}?mode=listen`}
                  className="ww-btn ww-btn-ghost !min-h-[54px] !px-7"
                >
                  🎧 Listen free
                </Link>
              ) : null}
            </div>

            <p className="mt-4 font-sans text-[13px] text-[#8a7d6c]">
              No account needed · The first chapter is on us · New mysteries every week
            </p>
          </div>
        </main>
      </div>

      {/* The other options — more mysteries they can start right now */}
      {similar.length > 0 ? (
        <div className="mx-auto max-w-[1600px] px-5 pb-24 md:px-8">
          <BookRow title="Or start another mystery" books={similar} />
          <div className="mt-10 text-center">
            <Link
              href="/browse"
              className="font-sans text-[14px] text-[#a99c8b] underline decoration-[#a99c8b]/40 underline-offset-4 transition-colors hover:text-[#f5ead4]"
            >
              Browse the full library →
            </Link>
          </div>
        </div>
      ) : (
        <div className="pb-24 text-center">
          <Link href="/browse" className="font-sans text-[14px] text-[#a99c8b] underline underline-offset-4 hover:text-[#f5ead4]">
            Browse the full library →
          </Link>
        </div>
      )}
    </div>
  )
}
