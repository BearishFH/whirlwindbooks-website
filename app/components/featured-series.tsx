"use client"

import { useState } from "react"
import { APP_STORE_URL } from "@/lib/links"

type Book = {
  slug: string
  title: string
  genre: string
  hook: string
  excerpt: string
}

const BOOKS: Book[] = [
  {
    slug: "the-cyprus-agenda",
    title: "The Cyprus Agenda",
    genre: "Thriller · International intrigue",
    hook: "Twelve bottles. One could topple governments.",
    excerpt:
      "There are only twelve bottles like it in the world. Tonight, I'm stealing the one that could topple governments. The other eleven are accounted for — museums, vaults, a sultan's cellar no one has opened in thirty years. This one sits behind glass in a villa above the sea, guarded by men who have never once imagined it could leave.",
  },
  {
    slug: "death-by-golden-honey-spirals",
    title: "Death by Golden Honey Spirals",
    genre: "Cozy · Culinary mystery",
    hook: "The diplomat had seventeen minutes to live.",
    excerpt:
      "The diplomat was going to die in exactly seventeen minutes, and Theodora Papadakis was humming while she arranged the final tray of pastries. She did not know this yet, of course. She only knew that the honey had come out perfectly this morning, thin and gold and catching the light like something you'd swear was alive.",
  },
  {
    slug: "aztec-gold-blood-red",
    title: "Aztec Gold, Blood Red",
    genre: "Thriller · Heist",
    hook: "A poisoned dart. A poolside toast. A killer still smiling.",
    excerpt:
      "The blowgun dart hit Carlos Mendoza in the neck just as he raised his margarita in celebration, the feathered projectile piercing his sun-bronzed skin with a soft thock that was barely audible over the mariachi band playing poolside.",
  },
  {
    slug: "blood-diamonds-silk-scarves",
    title: "Blood Diamonds & Silk Scarves",
    genre: "Thriller · International",
    hook: "The courier arrived at the worst possible moment.",
    excerpt:
      "The courier arrived at the exact moment Amara Al-Rashid was selecting diamonds for the spring collection. He carried a single package, unmarked, and a note in handwriting she had spent ten years trying to forget.",
  },
  {
    slug: "blood-and-pearls",
    title: "Blood and Pearls",
    genre: "Thriller · Family revenge",
    hook: "The winch handle was still slick with blood.",
    excerpt:
      "The yacht winch handle was still slick with blood when Sofia Restrepo let it slip from her fingers into the crystalline waters of Lyford Cay. Seventy years of the family's secrets had led to this exact moment, and only she knew how many of them had drowned already.",
  },
  {
    slug: "fire-spice",
    title: "Fire & Spice",
    genre: "Romance · Mystery",
    hook: "A chef, a dead critic, and a past she buried.",
    excerpt:
      "The critic who could end her career was face-down in the cellar, and the only fingerprints on the bottle beside him were about to become the least of her problems.",
  },
  {
    slug: "the-pearl-diver-s-secret",
    title: "The Pearl Diver's Secret",
    genre: "Thriller · Coastal",
    hook: "A groom dies underwater at his own wedding.",
    excerpt:
      "He went under smiling, in front of two hundred guests, and came up as evidence. The bride hadn't screamed yet. She was still counting the seconds, the way she'd been taught to, waiting for a head that would never break the surface.",
  },
  {
    slug: "archivist-of-algiers",
    title: "Archivist of Algiers",
    genre: "Thriller · Espionage",
    hook: "One classified file. A mentor's warning, too late.",
    excerpt:
      "The document should not have existed, and the moment Yusuf understood what he was holding, his mentor's face went the colour of old paper. 'Put it back,' the old man whispered. 'Put it back and forget the drawer was ever unlocked.'",
  },
]

export default function FeaturedSeries() {
  const [active, setActive] = useState<Book | null>(null)

  return (
    <section id="featured-series" className="relative px-6 py-24 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="ww-eyebrow">Find your kind of mystery</span>
            <h2 className="ww-display mt-4 text-[clamp(38px,5vw,66px)] font-medium leading-[.98] text-[#f5ead4]">
              Pick the cover that
              <br />
              won&rsquo;t let go.
            </h2>
          </div>
          <p className="max-w-sm text-[#a99c8b]">
            Every story opens with a free first chapter. Tap a cover, read the
            opening, and decide on the writing — not a sales pitch.
          </p>
        </div>

        {/* shelf */}
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BOOKS.map((b) => (
            <button
              key={b.slug}
              onClick={() => setActive(b)}
              className="group w-[210px] shrink-0 snap-start text-left"
            >
              <div className="relative overflow-hidden rounded-[6px_14px_14px_6px] shadow-[0_28px_50px_rgba(0,0,0,.5)] ring-1 ring-white/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_38px_70px_rgba(0,0,0,.6)]">
                <img
                  src={`/covers/${b.slug}.jpg`}
                  alt={b.title}
                  className="aspect-[2/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d2a35f] px-3 py-1 text-[11px] font-bold text-[#24170c]">
                    Read chapter 1 free
                  </span>
                </div>
              </div>
              <div className="mt-3 px-0.5">
                <strong className="ww-display block text-[16px] text-[#f5ead4]">{b.title}</strong>
                <span className="text-[12px] text-[#a99c8b]">{b.genre}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-1 h-3 rounded-[50%] bg-[linear-gradient(90deg,transparent,rgba(210,163,95,.4),rgba(255,255,255,.1),rgba(210,163,95,.4),transparent)] blur-[1px]" />
      </div>

      {/* modal reader */}
      {active && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-5"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div
            className="relative z-10 grid max-h-[92vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[26px] bg-[#efe8dc] text-[#2c2520] shadow-[0_60px_140px_rgba(0,0,0,.7)] md:grid-cols-[300px_1fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative hidden md:block">
              <img src={`/covers/${active.slug}.jpg`} alt={active.title} className="h-full w-full object-cover" />
            </div>
            <div className="relative overflow-auto p-8 md:p-11">
              <button
                onClick={() => setActive(null)}
                aria-label="Close preview"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white/70 text-xl"
              >
                ×
              </button>
              <small className="font-black uppercase tracking-[.16em] text-[#9a693f]">Chapter one preview</small>
              <h3 className="ww-display mb-1 mt-2 text-[34px] leading-tight">{active.title}</h3>
              <p className="mb-5 text-[13px] font-semibold text-[#8d5938]">{active.genre}</p>
              <p className="text-[16px] leading-[1.8] text-[#554b43] [font-family:Georgia,serif] [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:text-[64px] [&::first-letter]:leading-[.7] [&::first-letter]:text-[#7e4932]">
                {active.excerpt}
              </p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#d7cabc] pt-6">
                <span className="text-[12px] text-[#84766c]">Chapter 1 is free · read or listen</span>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center rounded-full bg-gradient-to-br from-[#f1d9a4] to-[#c48d49] px-5 font-bold text-[#24170c]"
                >
                  Read it in the app →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
