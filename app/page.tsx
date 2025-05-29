import Header from "./components/header"
import HeroSection from "./components/hero-section"
import FeaturedSeries from "./components/featured-series"
import HowItWorks from "./components/how-it-works"
import GlobalFeatures from "./components/global-features"
import CTASection from "./components/cta-section"
import Footer from "./components/footer"
import MysteryParticles from "./components/mystery-particles"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ash-grey relative">
      <MysteryParticles />
      <div className="atmospheric-overlay"></div>
      <Header />
      <HeroSection />
      <FeaturedSeries />
      <HowItWorks />
      <GlobalFeatures />
      <CTASection />
      <Footer />
    </main>
  )
}
