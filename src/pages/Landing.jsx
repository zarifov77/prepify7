import NavBar from '../components/ui/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HybridSection from '../components/landing/HybridSection'
import Pricing from '../components/landing/Pricing'
import FAQ from '../components/landing/FAQ'
import CTABanner from '../components/landing/CTABanner'
import Footer from '../components/landing/Footer'
import OrbBackground from '../components/ui/OrbBackground'

export default function Landing() {
  return (
    <div className="min-h-screen relative">
      <NavBar />
      <Hero />
      <OrbBackground />
      <Features />
      <HybridSection />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  )
}