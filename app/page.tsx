import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import Header from "./components/header"
import HeroSection from "./components/hero-section"
import HowItWorks from "./components/how-it-works"
import FeaturedSeries from "./components/featured-series"
import ReadOrListen from "./components/read-or-listen"
import StoryWorlds from "./components/story-worlds"
import Manifesto from "./components/manifesto"
import AppCTA from "./components/app-cta"
import Footer from "./components/footer"
import MysteryParticles from "./components/mystery-particles"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  // Signed-in visitors go straight to the web app.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) redirect("/browse")

  return (
    <div className="relative min-h-screen bg-[#0a0909]">
      <MysteryParticles />
      <div aria-hidden="true" className="ww-grain" />

      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <HowItWorks />
          <FeaturedSeries />
          <ReadOrListen />
          <StoryWorlds />
          <Manifesto />
          <AppCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
