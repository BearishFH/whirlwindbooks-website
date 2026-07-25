"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

// GDPR / UK-PECR cookie consent. Advertising/analytics cookies (the Meta Pixel)
// are OPT-IN: the pixel is initialised with consent "revoke" (see meta-pixel.tsx),
// so nothing is sent to Meta until the visitor clicks Accept here. Essential
// cookies (auth/session) always run — they're needed for the site to work.
const KEY = "ww-consent"

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let choice: string | null = null
    try {
      choice = localStorage.getItem(KEY)
    } catch {
      /* ignore */
    }
    if (choice === "granted") {
      try {
        window.fbq?.("consent", "grant")
      } catch {
        /* ignore */
      }
    } else if (!choice) {
      setShow(true)
    }
  }, [])

  function decide(granted: boolean) {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied")
    } catch {
      /* ignore */
    }
    if (granted) {
      try {
        window.fbq?.("consent", "grant")
      } catch {
        /* ignore */
      }
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-[rgba(210,163,95,.25)] bg-[#0b0a0a]/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:gap-5 md:px-6">
        <p className="flex-1 font-sans text-[13px] leading-relaxed text-[#cbbfa9]">
          We use essential cookies to run Whirlwind, plus analytics &amp; advertising
          cookies to understand how our ads perform. You can accept these or keep to
          essentials only. See our{" "}
          <Link href="/privacy" className="text-[#e9c884] underline underline-offset-2 hover:text-[#f5ead4]">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex flex-none gap-2.5">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-full border border-white/20 px-4 py-2 font-sans text-[13px] font-medium text-[#d9cbb5] transition-colors hover:border-white/40 hover:text-[#f5ead4]"
          >
            Essentials only
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-full bg-[#e9c884] px-5 py-2 font-sans text-[13px] font-semibold text-[#241a0d] transition-colors hover:bg-[#f0d59b]"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
