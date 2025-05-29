import { BookOpen, Globe, DollarSign } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Thousands of Original Stories",
    description: "Short & long mysteries — new every week",
  },
  {
    icon: Globe,
    title: "Narrated in 8 Languages",
    description: "English, Arabic, Spanish, French, Italian, Mandarin, Japanese, Korean",
  },
  {
    icon: DollarSign,
    title: "All Access. One Price.",
    description: "$12.99/month. Or try a story for just $2.99",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">What You Get</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-400 rounded-full mb-6">
                <feature.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
