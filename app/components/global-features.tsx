import { Headphones, BookOpen, BarChart3, Shield } from "lucide-react"

const features = [
  {
    icon: Headphones,
    title: "Narrated in 8 Languages",
    gradient: "from-rose-500/20 to-pink-500/20",
  },
  {
    icon: BookOpen,
    title: "Original Stories Added Monthly",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: BarChart3,
    title: "Smart Reading Stats & Bookmarks",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Shield,
    title: "No Ads. No Noise. Just Story.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
]

export default function GlobalFeatures() {
  return (
    <section className="py-24 px-6 bg-dark-ash relative">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-5 mix-blend-overlay"></div>

      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-full shadow-xl shadow-black/20 group-hover:shadow-gold/10 transition-all duration-500 border border-gold/20 group-hover:border-gold/40`}
                >
                  <feature.icon className="w-8 h-8 text-gold group-hover:text-ivory transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h3 className="text-lg font-serif font-medium text-gold group-hover:text-ivory transition-colors duration-300">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
