import Link from "next/link"
import type { Book } from "@/lib/catalog-types"
import {
  coverUrl,
  genreLabel,
  hasAudio,
  localisedDescription,
  localisedTitle,
} from "@/lib/catalog-types"

/** Cinematic featured book at the top of Browse. */
export function BrowseHero({ book }: { book: Book }) {
  const cover = coverUrl(book)
  const title = localisedTitle(book)
  const description = localisedDescription(book)

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      ) : (
        <div className="ww-noir-bg absolute inset-0" />
      )}

      {/* Legibility scrims */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060508] via-[#060508]/55 to-[#060508]/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#060508] via-[#060508]/40 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-16 md:px-8 md:pb-20">
        <p className="ww-eyebrow mb-3">Featured Mystery</p>
        <h1 className="ww-display max-w-2xl text-4xl font-medium leading-[1.05] text-[#f5ead4] md:text-6xl">
          {title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 font-sans text-[13px] text-[#c9bcaa]">
          <span className="rounded-full border border-[rgba(210,163,95,.35)] px-2.5 py-0.5 uppercase tracking-wide text-[#f0d59b]">
            {genreLabel(book.genre)}
          </span>
          {book.author?.name ? <span>{book.author.name}</span> : null}
          {hasAudio(book) ? <span className="text-[#f0d59b]">· Audio available</span> : null}
        </div>
        <p className="mt-4 max-w-xl font-sans text-[15px] leading-relaxed text-[#d9cbb5] line-clamp-3">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/read/${book.id}`} className="ww-btn ww-btn-gold !min-h-[50px]">
            ▶ Read now
          </Link>
          <Link href={`/book/${book.id}`} className="ww-btn ww-btn-ghost !min-h-[50px]">
            More info
          </Link>
        </div>
      </div>
    </section>
  )
}
