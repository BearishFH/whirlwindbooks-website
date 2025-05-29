import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-deeper-ash py-16 px-6 border-t border-gold/10 relative">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-5 mix-blend-overlay"></div>

      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="flex flex-wrap justify-center space-x-12 mb-8">
          <Link
            href="/terms"
            className="text-soft-ivory/60 hover:text-gold transition-all duration-300 font-serif text-base tracking-wide relative group"
          >
            Terms of Service
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/privacy"
            className="text-soft-ivory/60 hover:text-gold transition-all duration-300 font-serif text-base tracking-wide relative group"
          >
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/eu-data"
            className="text-soft-ivory/60 hover:text-gold transition-all duration-300 font-serif text-base tracking-wide relative group"
          >
            EU Data Policy
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-soft-ivory/60 hover:text-gold transition-all duration-300 font-serif text-base tracking-wide relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="text-center">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6"></div>
          <p className="text-soft-ivory/40 text-sm font-serif tracking-wide">
            © 2025 Whirlwind · A Bearish FH INC Company
          </p>
        </div>
      </div>
    </footer>
  )
}
