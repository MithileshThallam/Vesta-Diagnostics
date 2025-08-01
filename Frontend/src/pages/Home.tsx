import HeroSlider from "@/components/Home/HeroSlider"
import AboutUs from "@/components/Home/AboutUs"
import WhyChooseUs from "@/components/Home/WhyChooseUs"
import Services from "@/components/Home/Services"
import RadiologyDepartment from "@/components/Home/RadiologyDepartment"

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
