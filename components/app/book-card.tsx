import Link from "next/link"
import type { Book } from "@/lib/catalog-types"
import { coverUrl, genreLabel, hasAudio, localisedTitle } from "@/lib/catalog-types"

export function BookCard({ book, width = "w-[150px] md:w-[172px]" }: { book: Book; width?: string }) {
  const cover = coverUrl(book)
  const title = localisedTitle(book)
  const audio = hasAudio(book)

  return (
    <Link
      href={`/book/${book.id}`}
      className={`group relative ${width} flex-none`}
      aria-label={title}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-white/[0.06] bg-[#17130f] shadow-[0_10px_30px_rgba(0,0,0,.45)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[rgba(210,163,95,.4)] group-hover:shadow-[0_18px_44px_rgba(0,0,0,.6)]">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-3 text-center">
            <span className="ww-display text-sm leading-tight text-[#d9cbb5]">{title}</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {audio ? (
          <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-[#f0d59b] backdrop-blur-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          </span>
        ) : null}
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="ww-display truncate text-[14px] font-medium text-[#f5ead4]">{title}</p>
        <p className="truncate font-sans text-[11px] uppercase tracking-wide text-[#8a7d6c]">
          {genreLabel(book.genre)}
        </p>
      </div>
    </Link>
  )
}
