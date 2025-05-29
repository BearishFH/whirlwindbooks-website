import Link from "next/link"
import { Mail } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ash-grey py-20 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,180,131,0.05)_0%,transparent_70%)]"></div>

      <div className="container mx-auto max-w-4xl relative z-20">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-ivory transition-all duration-300 font-serif mb-6"
          >
            ← Back to Whirlwind
          </Link>
        </div>

        <div className="bg-dark-ash/80 backdrop-blur-sm rounded-lg p-10 shadow-2xl border border-gold/10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gold mystery-glow mb-4">Contact Us</h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-deeper-ash/50 border border-gold/20 rounded-lg p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6 shadow-lg shadow-black/30">
                <Mail className="w-8 h-8 text-gold" />
              </div>

              <h2 className="text-2xl font-serif font-medium text-gold mb-6">Get in Touch</h2>

              <p className="text-soft-ivory/90 mb-8 leading-relaxed">
                Have questions about Whirlwind? We'd love to hear from you. Please reach out to us at:
              </p>

              <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-6 inline-block">
                <p className="text-gold font-medium text-xl">contact@bearishfh.com</p>
              </div>

              <p className="text-soft-ivory/70 text-sm">Please include "Subject: Whirlwind Books" in your email.</p>

              <div className="mt-12 pt-8 border-t border-gold/10">
                <p className="text-soft-ivory/60 italic">
                  Our team will respond to your inquiry as soon as possible, typically within 2 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
