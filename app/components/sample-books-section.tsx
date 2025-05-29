import { Play, BookOpen } from "lucide-react"

const sampleBooks = [
  {
    title: "The Midnight Detective",
    cover: "/placeholder.svg?height=300&width=200",
    languages: ["English", "Spanish", "French"],
    description: "A gripping tale of mystery in the heart of London",
  },
  {
    title: "Shadows in the Alley",
    cover: "/placeholder.svg?height=300&width=200",
    languages: ["English", "Arabic", "Italian"],
    description: "Uncover the secrets hidden in the city's darkest corners",
  },
]

export default function SampleBooksSection() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Featured Stories</h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {sampleBooks.map((book, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 transform transition-transform duration-300 group-hover:scale-105">
                <img src={book.cover || "/placeholder.svg"} alt={book.title} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full font-medium">
                      <Play className="w-4 h-4" />
                      <span>Listen</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-orange-400 text-black px-4 py-2 rounded-full font-medium">
                      <BookOpen className="w-4 h-4" />
                      <span>Read</span>
                    </button>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
              <p className="text-gray-300 mb-3">{book.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {book.languages.map((lang, langIndex) => (
                  <span key={langIndex} className="bg-gray-800 text-orange-400 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>

              <button className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                Start with Chapter 1 – Free →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
