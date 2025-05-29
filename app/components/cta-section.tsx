export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-deeper-ash via-dark-ash to-ash-grey relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,180,131,0.1)_0%,transparent_70%)]"></div>

      <div className="container mx-auto max-w-5xl text-center relative z-20">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-serif font-medium mb-8 text-gold leading-tight mystery-glow">
            Fall in love with mystery again.
          </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shimmer-line"></div>
        </div>

        <p className="text-2xl md:text-3xl font-serif text-soft-ivory mb-16 tracking-wide">
          Read Whirlwind in your voice, in your time.
        </p>

        <div className="space-y-6">
          <button className="inline-block bg-gradient-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold text-deeper-ash font-serif font-medium py-5 px-12 rounded-sm text-xl transition-all duration-500 shadow-2xl hover:shadow-gold/20 tracking-wide transform hover:scale-105 mystery-button">
            Subscribe for Unlimited Access
          </button>

          <p className="text-sm font-serif text-soft-ivory/60 tracking-wide">Or continue browsing and buy as you go.</p>
        </div>
      </div>
    </section>
  )
}
