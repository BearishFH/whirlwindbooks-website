"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-ash-grey/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4 group">
          <div className="relative">
            <Image
              src="/whirlwind-logo.png"
              alt="Whirlwind"
              width={36}
              height={36}
              className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-serif font-medium text-gold shimmer-text tracking-wide">Whirlwind</span>
        </div>

        <nav>
          <Link
            href="https://app.whirlwind.com/login"
            className="text-gold hover:text-ivory transition-all duration-300 font-serif text-lg tracking-wide relative group"
          >
            Login
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
