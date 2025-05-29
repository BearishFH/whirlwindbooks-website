import { BookOpen, Star } from "lucide-react"

const series = [
  {
    title: "Lucien von Castellanos",
    subtitle: "Book One",
    tagline: "The criminal who steals for legacy, fun, and profit — and never gets caught.",
    style: "Thriller · Mystery · International Intrigue",
    image: "/lucien-character.png",
    accent: "from-emerald-900/20 to-teal-900/20",
    borderColor: "border-emerald-400/30",
  },
  {
    title: "Thea",
    subtitle: "",
    tagline: "A Greek baker solving crimes in post-WWII Liechtenstein — one pastry at a time.",
    style: "Cozy Mystery · Historical · Light-hearted",
    image: "/thea-character.png",
    accent: "from-amber-900/20 to-orange-900/20",
    borderColor: "border-amber-400/30",
  },
]

export default function FeaturedSeries() {
  return (
    <section id="featured-series" className="py-24 px-6 bg-deeper-ash relative">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-5 mix-blend-overlay"></div>

      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-gold mystery-glow mb-6">Featured Series</h2>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shimmer-line"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {series.map((book, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${book.accent} backdrop-blur-sm rounded-lg p-8 shadow-2xl hover:shadow-gold/10 transition-all duration-700 border ${book.borderColor} transform hover:-translate-y-2 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="relative z-10">
                <div className="mb-8 overflow-hidden rounded-lg shadow-2xl">
                  <img
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-96 object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="text-3xl font-serif font-medium text-gold group-hover:text-ivory transition-colors duration-300">
                      {book.title}
                    </h3>
                    {book.subtitle && (
                      <span className="bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-serif border border-gold/30">
                        {book.subtitle}
                      </span>
                    )}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xl font-serif italic text-soft-ivory/90 leading-relaxed">{book.tagline}</p>

                  <p className="text-sm font-sans text-soft-ivory/60 uppercase tracking-widest">{book.style}</p>

                  <button className="flex items-center space-x-3 bg-gradient-to-r from-gold to-dark-gold hover:from-dark-gold hover:to-gold text-deeper-ash font-serif font-medium py-4 px-8 rounded-sm transition-all duration-500 shadow-lg hover:shadow-xl group-hover:shadow-gold/20 transform hover:scale-105">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-lg">Read Chapter 1 Free</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
