"use client"

export default function HeroSection() {
  const scrollToStories = () => {
    document.getElementById("featured-series")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ash-grey via-dark-ash to-deeper-ash"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,180,131,0.1)_0%,transparent_70%)]"></div>

      <div className="text-center max-w-5xl mx-auto relative z-20">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-serif font-light mb-6 leading-tight text-ivory mystery-glow">
            Timeless Mysteries.
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8 shimmer-line"></div>
        </div>

        <p className="text-3xl md:text-4xl font-serif font-light mb-8 text-soft-ivory tracking-wide">
          Read. Listen. Fall into the story.
        </p>

        <p className="text-xl md:text-2xl text-soft-ivory/80 mb-16 max-w-3xl mx-auto font-serif leading-relaxed">
          Chapter 1 is always free. Continue with a book purchase or monthly access.
        </p>

        <div className="space-y-6">
          <button
            onClick={scrollToStories}
            className="inline-block bg-gradient-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold text-deeper-ash font-serif font-medium py-5 px-10 rounded-sm text-xl transition-all duration-500 shadow-2xl hover:shadow-gold/20 tracking-wide transform hover:scale-105 mystery-button"
          >
            Explore Stories
          </button>

          <div>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="text-gold hover:text-ivory transition-all duration-300 font-serif text-lg underline decoration-1 underline-offset-8 hover:underline-offset-4"
            >
              How it works
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
