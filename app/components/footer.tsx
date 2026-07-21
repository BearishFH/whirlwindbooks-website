import Image from "next/image"
import Link from "next/link"
import { APP_STORE_URL } from "@/lib/links"

const LEGAL = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/eu-data", label: "EU Data Policy" },
  { href: "/contact", label: "Contact" },
]

const SECTIONS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#featured-series", label: "The mysteries" },
  { href: "#read-or-listen", label: "Read or listen" },
  { href: "#story-worlds", label: "Story worlds" },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(210,163,95,.14)] bg-[#070606] px-5 py-14 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/whirlwind-logo.png" alt="" width={32} height={32} className="h-8 w-8" />
              <span className="ww-display text-[20px] font-medium text-[#f0d59b]">Whirlwind</span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-[1.65] text-[#8f8474]">
              Original mystery and thriller novels for iPhone and iPad. Read or
              listen — chapter one is always free.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ww-btn ww-btn-ghost mt-6 !min-h-[46px] !text-[14px]"
            >
              Get it on the App Store
            </a>
          </div>

          <nav aria-label="Sections">
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-[.16em] text-[#d2a35f]">
              Explore
            </h2>
            <ul className="mt-3 space-y-1">
              {SECTIONS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 text-[15px] text-[#a99c8b] transition-colors duration-300 hover:text-[#f5ead4]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="font-sans text-[11px] font-bold uppercase tracking-[.16em] text-[#d2a35f]">
              Legal
            </h2>
            <ul className="mt-3 space-y-1">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-[15px] text-[#a99c8b] transition-colors duration-300 hover:text-[#f5ead4]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="ww-rule my-10" />

        <p className="text-center font-sans text-[12.5px] tracking-wide text-[#8f8474]">
          © {new Date().getFullYear()} Whirlwind · A Bearish FH INC Company
        </p>
      </div>
    </footer>
  )
}
