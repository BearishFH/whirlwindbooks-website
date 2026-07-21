"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { APP_STORE_URL } from "@/lib/links"

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#featured-series", label: "The mysteries" },
  { href: "#read-or-listen", label: "Read or listen" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "border-b border-[rgba(210,163,95,.18)] bg-[rgba(9,8,8,.82)] shadow-[0_10px_40px_rgba(0,0,0,.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <a
        href="#featured-series"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-[#f0d59b] focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-bold focus:text-[#24170c]"
      >
        Skip to the mysteries
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
        <a href="#top" className="group flex items-center gap-3" aria-label="Whirlwind — back to top">
          <Image
            src="/whirlwind-logo.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9"
          />
          <span className="ww-display text-[20px] font-medium tracking-wide text-[#f0d59b] md:text-2xl">
            Whirlwind
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 font-sans text-[14px] text-[#c9bcaa] transition-colors duration-300 hover:text-[#f5ead4]"
            >
              {item.label}
              <span className="absolute bottom-1 left-0 h-px w-0 bg-[#d2a35f] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ww-btn ww-btn-gold !min-h-[42px] !px-4 !text-[14px] md:!min-h-[46px] md:!px-5 md:!text-[15px]"
        >
          Get the app
        </a>
      </div>
    </header>
  )
}
