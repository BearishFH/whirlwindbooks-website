import { APP_STORE_URL } from "@/lib/links"
import Reveal from "./reveal"

const MODES = [
  {
    key: "read",
    label: "Read it",
    body: "A clean, distraction-free reader built for long nights and short commutes. Just you and the page.",
  },
  {
    key: "listen",
    label: "Listen to it",
    body: "Every story is narrated, so the mystery keeps going while you drive, walk, cook or fall asleep to it.",
  },
  {
    key: "languages",
    label: "In your language",
    body: "Whirlwind stories are available in multiple languages — read or listen in the one that feels like home.",
  },
]

export default function ReadOrListen() {
  return (
    <section id="read-or-listen" className="ww-section scroll-mt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-7xl bg-[linear-gradient(90deg,transparent,rgba(210,163,95,.28),transparent)]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.95fr] lg:gap-20">
        <div>
          <Reveal>
            <span className="ww-eyebrow">One story, two ways in</span>
            <h2 className="ww-display mt-4 text-[clamp(32px,7.5vw,60px)] font-medium leading-[1.02] text-[#f5ead4]">
              Read it. Or let someone read it to you.
            </h2>
          </Reveal>

          <dl className="mt-10 space-y-8 md:mt-12">
            {MODES.map((mode, i) => (
              <Reveal key={mode.key} delay={i * 110} className="border-l border-[rgba(210,163,95,.28)] pl-5 md:pl-6">
                <dt className="ww-display flex items-center gap-3 text-[21px] text-[#f5ead4] md:text-[24px]">
                  {mode.label}
                  {mode.key === "listen" && (
                    <span className="ww-eq" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </dt>
                <dd className="mt-2 max-w-md text-[15.5px] leading-[1.65] text-[#a99c8b] md:text-[16px]">
                  {mode.body}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={200} className="mt-10">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ww-btn ww-btn-ghost w-full sm:w-auto"
            >
              Start with chapter one
            </a>
          </Reveal>
        </div>

        {/* visual: a cover with the listening state layered over it */}
        <Reveal delay={120} className="relative mx-auto w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-[8px_20px_20px_8px] shadow-[0_40px_90px_rgba(0,0,0,.6)] ring-1 ring-[rgba(210,163,95,.28)]">
            <img
              src="/covers/the-pearl-diver-s-secret.jpg"
              alt="Cover of The Pearl Diver's Secret"
              width={840}
              height={1260}
              className="aspect-[2/3] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(6,5,5,.92))]"
            />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="font-sans text-[10.5px] font-extrabold uppercase tracking-[.18em] text-[#f0d59b]">
                Now playing · chapter one
              </p>
              <p className="ww-display mt-2 text-[22px] leading-tight text-[#f5ead4] md:text-[26px]">
                The Pearl Diver&rsquo;s Secret
              </p>

              <div className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f0d59b] text-[#24170c]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M7 5h4v14H7zM14 5h4v14h-4z" />
                  </svg>
                </span>
                <span aria-hidden="true" className="h-[3px] flex-1 rounded-full bg-white/15">
                  <span className="block h-full w-[38%] rounded-full bg-[#d2a35f]" />
                </span>
                <span className="ww-eq" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-[14px] italic leading-relaxed text-[#a99c8b]">
            &ldquo;He went under smiling, in front of two hundred guests, and came up
            as evidence.&rdquo;
            <span className="mt-1 block not-italic font-sans text-[11.5px] uppercase tracking-[.14em] text-[#8f8474]">
              Opening line · The Pearl Diver&rsquo;s Secret
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
