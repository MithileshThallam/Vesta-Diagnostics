import HeroSlider from "@/components/HeroSlider"
import AboutUs from "@/components/AboutUs"
import WhyChooseUs from "@/components/WhyChooseUs"
import Services from "@/components/Services"
import RadiologyDepartment from "@/components/RadiologyDepartment"

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSlider />
      <AboutUs />
      <WhyChooseUs />
      <RadiologyDepartment/>
      <Services />
    </div>
  )
}

export default Home
