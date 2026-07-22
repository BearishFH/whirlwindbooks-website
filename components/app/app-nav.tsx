"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const NAV = [
  { href: "/browse", label: "Browse" },
  { href: "/library", label: "My Library" },
]

export function AppNav({ email }: { email?: string | null }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(210,163,95,.18)] bg-[rgba(9,8,8,.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-[rgba(6,5,8,.85)] to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/browse" className="group flex items-center gap-2.5" aria-label="Whirlwind">
            <Image
              src="/whirlwind-logo.png"
              alt=""
              width={34}
              height={34}
              priority
              className="h-8 w-8 transition-transform group-hover:scale-110"
            />
            <span className="ww-display hidden text-[19px] font-medium tracking-wide text-[#f0d59b] sm:inline">
              Whirlwind
            </span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-6">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans text-[14px] transition-colors ${
                    active ? "text-[#f5ead4]" : "text-[#a99c8b] hover:text-[#f5ead4]"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/account"
            title={email ?? "Account"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(210,163,95,.35)] bg-[rgba(210,163,95,.12)] font-sans text-sm font-bold uppercase text-[#f0d59b] transition-colors hover:bg-[rgba(210,163,95,.22)]"
          >
            {(email?.[0] ?? "W").toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  )
}
