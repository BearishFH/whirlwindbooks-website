const testimonials = [
  {
    quote: "Better than Audible.",
    author: "Sarah M.",
  },
  {
    quote: "These stories are addictive.",
    author: "James K.",
  },
  {
    quote: "Whirlwind is my new daily habit.",
    author: "Maria L.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">What Readers Say</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center p-6 bg-black/50 rounded-lg">
              <blockquote className="text-xl italic mb-4 text-gray-300">"{testimonial.quote}"</blockquote>
              <cite className="text-orange-400 font-medium">— {testimonial.author}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
