"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { APP_STORE_URL } from "@/lib/links"
import { BOOKS, type Book } from "@/lib/books"
import Reveal from "./reveal"

export default function FeaturedSeries() {
  const [active, setActive] = useState<Book | null>(null)
  const shelfRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => {
    setActive(null)
    lastTriggerRef.current?.focus()
  }, [])

  // Escape to close + lock background scroll while the preview is open.
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [active, close])

  const nudge = (dir: 1 | -1) => {
    const el = shelfRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: "smooth" })
  }

  return (
    <section id="featured-series" className="ww-section scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="ww-eyebrow">Find your kind of mystery</span>
            <h2 className="ww-display mt-4 text-[clamp(32px,7.5vw,64px)] font-medium leading-[1] text-[#f5ead4]">
              Pick the cover that
              <br className="hidden sm:block" /> won&rsquo;t let go.
            </h2>
          </div>
          <div className="flex items-end gap-6">
            <p className="max-w-sm text-[15.5px] leading-[1.65] text-[#a99c8b] md:text-[16px]">
              Every story opens with a free first chapter. Tap a cover, read the real
              opening lines, and decide on the writing — not a sales pitch.
            </p>
            <div className="hidden shrink-0 gap-2 lg:flex">
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => nudge(dir)}
                  aria-label={dir === -1 ? "Scroll the shelf left" : "Scroll the shelf right"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(245,234,212,.18)] text-[#d9cbb5] transition-colors duration-300 hover:border-[#d2a35f] hover:text-[#f0d59b]"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d={dir === -1 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* shelf */}
        <div
          ref={shelfRef}
          className="ww-no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 md:-mx-6 md:gap-6 md:px-6"
        >
          {BOOKS.map((b, i) => (
            <Reveal key={b.slug} delay={Math.min(i, 4) * 70} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget
                  setActive(b)
                }}
                className="group w-[152px] text-left sm:w-[178px] lg:w-[210px]"
                aria-haspopup="dialog"
              >
                <div className="relative overflow-hidden rounded-[6px_14px_14px_6px] shadow-[0_28px_50px_rgba(0,0,0,.5)] ring-1 ring-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_38px_70px_rgba(0,0,0,.6)] group-hover:ring-[rgba(210,163,95,.45)]">
                  <img
                    src={`/covers/${b.slug}.jpg`}
                    alt={`Cover of ${b.title}`}
                    width={420}
                    height={630}
                    className="aspect-[2/3] w-full object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-white/5"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    <span className="inline-flex items-center rounded-full bg-[#d2a35f] px-3 py-1 font-sans text-[11px] font-bold text-[#24170c]">
                      Read chapter 1 free
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <strong className="ww-display block text-[15px] font-medium leading-snug text-[#f5ead4] transition-colors duration-300 group-hover:text-[#f0d59b] lg:text-[16px]">
                    {b.title}
                  </strong>
                  <span className="mt-0.5 block font-sans text-[11.5px] text-[#a99c8b] lg:text-[12px]">
                    {b.genre}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="mt-1 h-3 rounded-[50%] bg-[linear-gradient(90deg,transparent,rgba(210,163,95,.4),rgba(255,255,255,.1),rgba(210,163,95,.4),transparent)] blur-[1px]"
        />

        <p className="mt-6 text-center font-sans text-[12.5px] text-[#8f8474] lg:hidden">
          Swipe to see more mysteries
        </p>
      </div>

      {/* chapter-one preview */}
      {active && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          onClick={close}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <div
            className="relative z-10 grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[20px] bg-[#efe8dc] text-[#2c2520] shadow-[0_60px_140px_rgba(0,0,0,.7)] sm:rounded-[26px] md:grid-cols-[300px_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative hidden md:block">
              <img
                src={`/covers/${active.slug}.jpg`}
                alt={`Cover of ${active.title}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="relative overflow-auto p-6 sm:p-8 md:p-11">
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close the chapter one preview"
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/80 text-xl leading-none text-[#5b4f45] transition-colors hover:bg-white sm:right-4 sm:top-4"
              >
                <span aria-hidden="true">×</span>
              </button>

              <p className="font-sans text-[11px] font-black uppercase tracking-[.16em] text-[#9a693f]">
                Chapter one preview
              </p>
              <h3
                id="preview-title"
                className="ww-display mb-1 mt-2 pr-10 text-[26px] leading-tight sm:text-[34px]"
              >
                {active.title}
              </h3>
              <p className="mb-5 font-sans text-[12.5px] font-semibold text-[#8d5938]">{active.genre}</p>

              <p className="text-[15.5px] leading-[1.8] text-[#554b43] [font-family:Georgia,serif] sm:text-[16px] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:text-[56px] [&::first-letter]:leading-[.7] [&::first-letter]:text-[#7e4932] sm:[&::first-letter]:text-[64px]">
                {active.excerpt}
              </p>

              <div className="mt-8 flex flex-col gap-4 border-t border-[#d7cabc] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-sans text-[12px] text-[#84766c]">
                  Chapter 1 is free · read or listen
                </span>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ww-btn ww-btn-gold !min-h-[48px] !text-[15px]"
                >
                  Read it in the app
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
