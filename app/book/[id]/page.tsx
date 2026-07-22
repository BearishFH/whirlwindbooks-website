import Link from "next/link"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getBook, getSimilarBooks } from "@/lib/catalog"
import {
  coverUrl,
  genreLabel,
  hasAudio,
  localisedDescription,
  localisedTitle,
  tagsArray,
} from "@/lib/catalog-types"
import { AppNav } from "@/components/app/app-nav"
import { BookRow } from "@/components/app/book-row"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const book = await getBook(id)
  return { title: book ? `${localisedTitle(book)} — Whirlwind` : "Whirlwind" }
}

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const book = await getBook(id)
  if (!book) notFound()

  const [similar] = await Promise.all([getSimilarBooks(book, 12)])

  const cover = coverUrl(book)
  const title = localisedTitle(book)
  const description = localisedDescription(book)
  const audio = hasAudio(book)
  const tags = tagsArray(book)

  return (
    <div className="min-h-screen bg-[#060508]">
      <AppNav email={user?.email} />

      {/* Backdrop */}
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover object-top blur-[2px]" />
        ) : (
          <div className="ww-noir-bg absolute inset-0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060508] via-[#060508]/70 to-[#060508]/40" />
      </div>

      <main className="relative z-10 mx-auto -mt-40 max-w-[1100px] px-5 pb-24 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end">
          <div className="w-[190px] flex-none md:w-[240px]">
            <div className="aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-[#17130f] shadow-[0_24px_60px_rgba(0,0,0,.6)]">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt={title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center p-4 text-center">
                  <span className="ww-display text-[#d9cbb5]">{title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <p className="ww-eyebrow mb-3">
              {genreLabel(book.genre)}
              {book.series?.name ? ` · ${book.series.name}` : ""}
            </p>
            <h1 className="ww-display text-4xl font-medium leading-tight text-[#f5ead4] md:text-5xl">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[13px] text-[#a99c8b]">
              {book.author?.name ? <span>by {book.author.name}</span> : null}
              {book.chapter_count ? <span>{book.chapter_count} chapters</span> : null}
              {book.word_count ? <span>{book.word_count.toLocaleString()} words</span> : null}
              {audio ? <span className="text-[#f0d59b]">Audio available</span> : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/read/${book.id}`} className="ww-btn ww-btn-gold !min-h-[50px]">
                ▶ Read
              </Link>
              {audio ? (
                <Link
                  href={`/read/${book.id}?mode=listen`}
                  className="ww-btn ww-btn-ghost !min-h-[50px]"
                >
                  🎧 Listen
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <p className="whitespace-pre-line font-serif text-[17px] leading-relaxed text-[#d9cbb5]">
            {description}
          </p>

          {tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-sans text-xs text-[#a99c8b]"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}

          {book.author?.description ? (
            <div className="mt-10 border-t border-white/10 pt-6">
              <h3 className="ww-display text-lg text-[#f5ead4]">About {book.author.name}</h3>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-[#a99c8b]">
                {book.author.description}
              </p>
            </div>
          ) : null}
        </div>

        {similar.length > 0 ? (
          <div className="-mx-5 mt-16 md:-mx-8">
            <BookRow title="More like this" books={similar} />
          </div>
        ) : null}
      </main>
    </div>
  )
}
