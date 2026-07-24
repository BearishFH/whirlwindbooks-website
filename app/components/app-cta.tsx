import { APP_STORE_URL } from "@/lib/links"
import { ALL_COVERS } from "@/lib/books"
import Reveal from "./reveal"

export default function AppCTA() {
  // Duplicated once so the -50% marquee translate loops seamlessly.
  const strip = [...ALL_COVERS, ...ALL_COVERS]

  return (
    <section id="get" className="relative overflow-hidden pb-24 pt-16 md:pb-32 md:pt-20">
      {/* the shelf, streaming past */}
      <div className="ww-marquee-mask relative">
        <div className="ww-marquee" aria-hidden="true">
          {strip.map((cover, i) => (
            <img
              key={`${cover.slug}-${i}`}
              src={`/covers/${cover.slug}.jpg`}
              alt=""
              width={260}
              height={390}
              loading="lazy"
              decoding="async"
              className="h-[130px] w-auto rounded-[4px_9px_9px_4px] object-cover opacity-45 shadow-[0_18px_36px_rgba(0,0,0,.55)] ring-1 ring-white/10 md:h-[170px]"
            />
          ))}
        </div>
        <p className="sr-only">
          Covers from the Whirlwind catalogue: {ALL_COVERS.map((c) => c.title).join(", ")}.
        </p>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#090808_0%,transparent_18%,transparent_82%,#090808_100%),linear-gradient(180deg,transparent_40%,#090808_100%)]"
        />
      </div>

      <Reveal className="relative mx-auto -mt-8 max-w-3xl px-5 text-center md:-mt-10 md:px-6">
        <span className="ww-eyebrow justify-center">New mysteries every week</span>

        <h2 className="ww-display mx-auto mt-5 max-w-2xl text-[clamp(34px,8vw,68px)] font-medium leading-[1.02] text-[#f5ead4]">
          Read chapter one free.
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.7] text-[#d9cbb5] md:text-[17px]">
          Pick a mystery and start reading in seconds — right here in your browser,
          no account needed. Read it or listen to it, in your language.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/browse"
            className="ww-btn ww-btn-gold !min-h-[58px] w-full !px-8 !text-[16px] sm:w-auto md:!text-[17px]"
          >
            Start reading free
            <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ww-btn ww-btn-ghost !min-h-[58px] w-full !px-8 !text-[16px] sm:w-auto md:!text-[17px]"
          >
            <svg viewBox="0 0 384 512" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Get the iOS app
          </a>
        </div>

        <p className="mt-5 font-sans text-[12.5px] text-[#8f8474] md:text-[13px]">
          Free to start · read or listen · new mysteries every week
        </p>
      </Reveal>
    </section>
  )
}
