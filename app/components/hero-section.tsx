"use client"

import { useState } from "react"

export default function HeroSection() {
  const [playing, setPlaying] = useState(false)
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section className="ww-noir-bg relative isolate flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:pt-36">
      {/* atmospheric character wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/lucien-new.png"
          alt=""
          aria-hidden
          className="h-full w-full scale-105 object-cover object-[65%_center] brightness-[.55] saturate-[.85]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,6,6,.98) 0%, rgba(7,6,6,.9) 35%, rgba(7,6,6,.38) 68%, rgba(7,6,6,.72) 100%), linear-gradient(180deg, rgba(7,6,6,.45), transparent 28%, transparent 62%, #090808 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.7fr]">
        {/* copy */}
        <div className="relative z-10">
          <span className="ww-eyebrow">Original mysteries for modern readers</span>
          <h1 className="ww-display mt-6 text-[clamp(56px,8vw,110px)] font-medium leading-[.9] text-[#f5ead4]">
            The next clue is{" "}
            <em className="not-italic font-normal italic text-[#f0d59b]">waiting.</em>
          </h1>
          <p className="mt-7 max-w-xl text-[clamp(17px,2vw,21px)] leading-relaxed text-[#d9cbb5]">
            Choose a mystery, read the first chapter free, and step into original
            stories built to keep you saying &ldquo;one more page.&rdquo;
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("featured-series")}
              className="inline-flex min-h-[54px] items-center gap-3 rounded-full bg-gradient-to-br from-[#f1d9a4] to-[#c48d49] px-6 font-bold text-[#24170c] shadow-[0_12px_30px_rgba(196,141,73,.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(196,141,73,.32)]"
            >
              Choose your first mystery
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("experience")}
              className="inline-flex min-h-[54px] items-center rounded-full border border-[rgba(245,234,212,.16)] bg-white/[.04] px-6 font-bold text-[#f5ead4] transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(245,234,212,.32)] hover:bg-white/[.08]"
            >
              See the experience
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-[13px] text-[#bdb1a1]">
            <span>Chapter 1 is free</span>
            <span className="text-[#d2a35f]">•</span>
            <span>Read or listen</span>
            <span className="text-[#d2a35f]">•</span>
            <span>No ads</span>
          </div>
        </div>

        {/* phone reader */}
        <div className="relative grid min-h-[560px] place-items-center [perspective:1200px]">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(210,163,95,.22),transparent_65%)] blur-2xl" />
          <div className="ww-case-note">
            He had three passports, two names, and one rule: never steal without leaving a story behind.
          </div>
          <div className="ww-phone">
            <div className="ww-phone-screen">
              <div className="ww-reader-top">
                <img src="/lucien-new.png" alt="Lucien mystery series artwork" />
                <div className="ww-reader-meta">
                  <small>Book one</small>
                  <h3 className="ww-display mt-1.5 text-[31px]">Lucien</h3>
                </div>
              </div>
              <div className="ww-reader-body">
                <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#8c6d46]">
                  Chapter one
                </div>
                <h4 className="ww-display my-2 text-[24px]">The Blue Ledger</h4>
                <p>By the time the lights returned, the painting was still on the wall. The man beside it was not.</p>
                <p className="mt-2">Lucien smiled at the empty frame. Someone had finally learned how he liked to be invited.</p>
              </div>
            </div>
          </div>
          <button
            className="ww-audio"
            aria-label={playing ? "Pause sample narration" : "Play sample narration"}
            onClick={() => setPlaying((p) => !p)}
          >
            <span className="ww-audio-ring" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px]">
              {playing ? <path d="M7 5h4v14H7zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
