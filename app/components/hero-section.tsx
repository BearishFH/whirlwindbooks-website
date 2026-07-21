import { APP_STORE_URL } from "@/lib/links"

const PROOF = ["Chapter one is free", "Read or listen", "No account needed", "No ads"]

export default function HeroSection() {
  return (
    <section
      id="top"
      className="ww-noir-bg relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 md:px-6 md:pb-24 md:pt-36 lg:pb-16 lg:pt-28"
    >
      {/* atmospheric character wash */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/lucien-new.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover object-[72%_center] brightness-[.45] saturate-[.8] md:object-[65%_center] md:brightness-[.55] md:saturate-[.85]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,6,6,.98) 0%, rgba(7,6,6,.9) 35%, rgba(7,6,6,.38) 68%, rgba(7,6,6,.72) 100%), linear-gradient(180deg, rgba(7,6,6,.55), transparent 28%, transparent 55%, #090808 100%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.72fr] lg:gap-10">
        {/* copy */}
        <div className="relative z-10">
          <span className="ww-eyebrow">Original mysteries for modern readers</span>

          <h1 className="ww-display mt-5 text-[clamp(44px,11vw,110px)] font-medium leading-[.92] text-[#f5ead4] md:mt-6 md:leading-[.9]">
            The next clue is{" "}
            <em className="font-normal italic text-[#f0d59b]">waiting.</em>
          </h1>

          <p className="mt-6 max-w-xl text-[clamp(16px,4.4vw,21px)] leading-[1.6] text-[#d9cbb5] md:mt-7">
            Pick a mystery, read the first chapter free, and step into original
            stories built to keep you saying &ldquo;one more page.&rdquo; New
            mysteries every week.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ww-btn ww-btn-gold w-full sm:w-auto"
            >
              <svg viewBox="0 0 384 512" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Get it on the App Store
            </a>
            <a href="#featured-series" className="ww-btn ww-btn-ghost w-full sm:w-auto">
              Browse the mysteries
              <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
                <path
                  d="M12 5v14M6 13l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[12.5px] text-[#bdb1a1] md:text-[13px]">
            {PROOF.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-[#d2a35f]">•</span>}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* phone reader */}
        <div className="relative mx-auto grid w-full max-w-[380px] place-items-center py-10 [perspective:1200px] lg:py-0">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(210,163,95,.22),transparent_65%)] blur-2xl lg:h-[420px] lg:w-[420px]"
          />

          <p className="ww-case-note">
            He had three passports, two names, and one rule: never steal without
            leaving a story behind.
          </p>

          <div className="ww-phone">
            <div className="ww-phone-screen">
              <div className="ww-reader-top">
                <img src="/lucien-new.png" alt="" aria-hidden="true" />
                <div className="ww-reader-meta">
                  <small>Book one</small>
                  <p className="ww-display mt-1.5 text-[28px] leading-none md:text-[31px]">Lucien</p>
                </div>
              </div>
              <div className="ww-reader-body">
                <div className="font-sans text-[9.5px] font-extrabold uppercase tracking-[.18em] text-[#8c6d46]">
                  Chapter one
                </div>
                <p className="ww-display my-2 text-[22px] leading-tight text-[#2c2520] md:text-[24px]">
                  The Blue Ledger
                </p>
                <p>
                  By the time the lights returned, the painting was still on the wall.
                  The man beside it was not.
                </p>
                <p className="mt-2">
                  Lucien smiled at the empty frame. Someone had finally learned how he
                  liked to be invited.
                </p>
              </div>
            </div>
          </div>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ww-audio"
            aria-label="Listen to Whirlwind stories in the app on the App Store"
          >
            <span aria-hidden="true" className="ww-audio-ring" />
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[24px] md:w-[26px]" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
