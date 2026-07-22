"use client"

import { useRef } from "react"
import type { Book } from "@/lib/catalog-types"
import { BookCard } from "./book-card"

export function BookRow({ title, books }: { title: string; books: Book[] }) {
  const scroller = useRef<HTMLDivElement>(null)

  if (!books.length) return null

  function scroll(dir: -1 | 1) {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <section className="group/row relative">
      <div className="mb-3 flex items-center justify-between px-5 md:px-8">
        <h2 className="ww-display text-[19px] font-medium text-[#f5ead4] md:text-[22px]">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#d9cbb5] transition-colors hover:border-[rgba(210,163,95,.4)] hover:text-[#f0d59b]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 text-[#d9cbb5] transition-colors hover:border-[rgba(210,163,95,.4)] hover:text-[#f0d59b]"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="ww-no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-5 pb-2 md:px-8"
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  )
}
