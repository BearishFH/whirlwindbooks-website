import { APP_STORE_URL } from "@/lib/links"

export default function AppCTA() {
  return (
    <section id="get" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <span className="ww-eyebrow justify-center">Your next obsession is one chapter away</span>
        <h2 className="ww-display mx-auto mt-5 max-w-2xl text-[clamp(38px,5.5vw,68px)] font-medium leading-[1] text-[#f5ead4]">
          Read chapter one free.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-[#d9cbb5]">
          Open the app, pick a mystery, and start reading in seconds — no account
          needed. Read it or listen to it, in your language.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[58px] items-center gap-3 rounded-full bg-gradient-to-br from-[#f1d9a4] to-[#c48d49] px-8 text-[17px] font-bold text-[#24170c] shadow-[0_14px_34px_rgba(196,141,73,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(196,141,73,.32)]"
          >
            <svg viewBox="0 0 384 512" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            Download on the App Store
          </a>
        </div>
        <p className="mt-5 text-[13px] text-[#8f8474]">
          Free to start · read or listen · new mysteries every week
        </p>
      </div>
    </section>
  )
}
