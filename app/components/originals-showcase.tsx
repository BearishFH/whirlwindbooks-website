import Link from "next/link"
import { getShowcaseBooks } from "@/lib/showcase"

// "Hundreds of originals, only here" social-proof section, built from REAL
// current catalogue covers (not a hardcoded set). Includes the reader rating.
export async function OriginalsShowcase() {
  const books = await getShowcaseBooks(18).catch(() => [])
  // Two rows for a fuller wall.
  const rowA = books.filter((_, i) => i % 2 === 0)
  const rowB = books.filter((_, i) => i % 2 === 1)

  return (
    <section id="originals" className="relative overflow-hidden border-t border-[rgba(210,163,95,.12)] bg-[#080707] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="ww-eyebrow mb-4 justify-center">Whirlwind Originals</p>
          <h2 className="ww-display text-3xl font-medium leading-tight text-[#f5ead4] md:text-5xl">
            Hundreds of mysteries you&apos;ll find <span className="text-[#f0d59b]">nowhere else</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-serif text-[17px] leading-relaxed text-[#a99c8b]">
            Every Whirlwind story is an original — written for Whirlwind, exclusive to Whirlwind. A
            growing library of whodunits, thrillers and cozy capers to read or listen to, with fresh
            cases landing every week.
          </p>

          {/* Reader social proof — real numbers: 25 five-star reviews, 1,000+ readers. */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.08)] px-5 py-2.5">
            <span className="tracking-tight text-[#f0d59b]" aria-hidden>★★★★★</span>
            <span className="font-sans text-[14px] font-semibold text-[#f5ead4]">25 five-star reviews</span>
            <span className="hidden text-[#6f665a] sm:inline">·</span>
            <span className="font-sans text-[13px] text-[#a99c8b]">read by 1,000+</span>
          </div>
        </div>
      </div>

      {/* Real cover wall */}
      {books.length > 0 ? (
        <div className="mt-14 space-y-4 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          {[rowA, rowB].map((row, r) => (
            <div key={r} className="flex gap-4 overflow-hidden">
              <div
                className="flex shrink-0 gap-4"
                style={{ animation: `${r % 2 ? "ww-marq-rtl" : "ww-marq-ltr"} ${62 + r * 12}s linear infinite` }}
              >
                {[...row, ...row].map((b, i) => (
                  <Link
                    key={`${b.id}-${i}`}
                    href={`/book/${b.id}`}
                    className="group relative block h-[180px] w-[120px] flex-none overflow-hidden rounded-lg ring-1 ring-white/10 md:h-[220px] md:w-[147px]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.cover}
                      alt={b.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-14 text-center">
        <Link href="/browse" className="ww-btn ww-btn-gold !min-h-[52px] !px-9 text-[15px]">
          Browse the library
        </Link>
        <p className="mt-4 font-sans text-[13px] text-[#7c7060]">
          Chapter one of every book is free · Read in your browser or the app
        </p>
      </div>

      <style>{`
        @keyframes ww-marq-ltr { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes ww-marq-rtl { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </section>
  )
}
