"use client"

import HeroSlider from "@/components/Home/HeroSlider"
import AboutUs from "@/components/Home/AboutUs"
import Services from "@/components/Home/Services"
import RadiologyDepartment from "@/components/Home/RadiologyDepartment"
import WhyChooseUs from "@/components/Home/WhyChooseUs"
import Header from "@/components/Header"
// import OurVisionaries from "@/components/Home/OurVisionaries"

const Home = () => {

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <AboutUs />
      <Services />
      <WhyChooseUs />
      <RadiologyDepartment/>
      {/* <OurVisionaries/> */}

    </div>
  )
}

export default Home
