import HeroSlider from "@/components/HeroSlider"
import AboutUs from "@/components/AboutUs"
import WhyChooseUs from "@/components/WhyChooseUs"
import Services from "@/components/Services"

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <AboutUs />
      <WhyChooseUs />
      <Services />
    </div>
  )
}

export default Home
