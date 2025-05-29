import { BookOpen, ShoppingCart, Infinity } from "lucide-react"

const steps = [
  {
    icon: BookOpen,
    title: "Start Reading Free",
    description: "Every book opens with a free first chapter.",
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    icon: ShoppingCart,
    title: "Buy What You Love",
    description: "Unlock full stories à la carte from $2.99.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Infinity,
    title: "Or Subscribe for Unlimited Access",
    description: "One monthly price, every book, all in your language.",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-ash-grey relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,180,131,0.05)_0%,transparent_70%)]"></div>

      <div className="container mx-auto max-w-7xl relative z-20">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif font-medium text-gold mystery-glow mb-6">How It Works</h2>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto shimmer-line"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.gradient} backdrop-blur-sm rounded-full shadow-2xl shadow-black/30 group-hover:shadow-gold/20 transition-all duration-500 border border-gold/20 group-hover:border-gold/40`}
                >
                  <step.icon className="w-10 h-10 text-gold group-hover:text-ivory transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold rounded-full text-deeper-ash text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-2xl font-serif font-medium mb-6 text-gold group-hover:text-ivory transition-colors duration-300">
                {step.title}
              </h3>

              <p className="text-soft-ivory/80 font-serif leading-relaxed text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
