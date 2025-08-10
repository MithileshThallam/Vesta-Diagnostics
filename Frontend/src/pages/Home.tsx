"use client"

import HeroSlider from "@/components/Home/HeroSlider"
import AboutUs from "@/components/Home/AboutUs"
import Services from "@/components/Home/Services"
import WhyChooseUs from "@/components/Home/WhyChooseUs"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const handleBookSlot = () => {
    navigate("/tests")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <AboutUs />
      <Services />
      <WhyChooseUs />

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-vesta-orange to-vesta-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">Book your diagnostic tests today</p>
          <Button
            onClick={handleBookSlot}
            size="lg"
            className="bg-white text-vesta-navy hover:bg-white/90 font-semibold px-8 py-3"
          >
            Book a Slot Now
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Home
