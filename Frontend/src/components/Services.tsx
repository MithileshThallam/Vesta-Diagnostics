"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Brain,
  Dna,
  Activity,
  Eye,
  Stethoscope,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Heart,
      title: "Cardiac Diagnostics",
      description: "Comprehensive heart health assessments including ECG, echocardiography, and stress testing.",
      features: ["ECG & Holter Monitoring", "Echocardiography", "Stress Testing", "Cardiac Biomarkers"],
      image: "/placeholder.svg?height=300&width=400&text=Cardiac+Diagnostics",
      color: "from-red-500 to-pink-500",
      stat: "24/7",
      statLabel: "Emergency Care",
    },
    {
      icon: Brain,
      title: "Neurological Testing",
      description: "Advanced brain and nervous system diagnostics using cutting-edge imaging technology.",
      features: ["MRI Brain Scans", "EEG Testing", "Nerve Conduction", "Cognitive Assessment"],
      image: "/placeholder.svg?height=300&width=400&text=Neurological+Testing",
      color: "from-purple-500 to-indigo-500",
      stat: "95%",
      statLabel: "Early Detection",
    },
    {
      icon: Dna,
      title: "Genetic Testing",
      description: "Personalized genetic analysis for hereditary conditions and treatment optimization.",
      features: ["DNA Sequencing", "Hereditary Screening", "Pharmacogenomics", "Cancer Genetics"],
      image: "/placeholder.svg?height=300&width=400&text=Genetic+Testing",
      color: "from-green-500 to-emerald-500",
      stat: "1000+",
      statLabel: "Genetic Markers",
    },
    {
      icon: Activity,
      title: "Laboratory Services",
      description: "Complete range of blood tests, biochemistry, and molecular diagnostics.",
      features: ["Blood Chemistry", "Hormone Testing", "Infectious Disease", "Tumor Markers"],
      image: "/placeholder.svg?height=300&width=400&text=Laboratory+Services",
      color: "from-blue-500 to-cyan-500",
      stat: "2-4 hrs",
      statLabel: "Results Ready",
    },
    {
      icon: Eye,
      title: "Radiology & Imaging",
      description: "State-of-the-art imaging services including CT, MRI, ultrasound, and X-ray.",
      features: ["CT Scans", "MRI Imaging", "Ultrasound", "Digital X-Ray"],
      image: "/placeholder.svg?height=300&width=400&text=Radiology+Imaging",
      color: "from-orange-500 to-yellow-500",
      stat: "HD",
      statLabel: "Image Quality",
    },
    {
      icon: Stethoscope,
      title: "Preventive Health",
      description: "Comprehensive health checkups and preventive screening packages.",
      features: ["Executive Checkups", "Cancer Screening", "Diabetes Panel", "Wellness Packages"],
      image: "/placeholder.svg?height=300&width=400&text=Preventive+Health",
      color: "from-teal-500 to-green-500",
      stat: "360°",
      statLabel: "Health Check",
    },
  ]

  const itemsPerView = 3
  const maxIndex = Math.max(0, services.length - itemsPerView)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / services.length
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
    }
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
    scrollToIndex(newIndex)
  }

  const prevSlide = () => {
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
    scrollToIndex(newIndex)
  }

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, maxIndex, isVisible])

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 right-20 w-72 h-72 bg-gradient-to-r from-vesta-orange/20 to-vesta-navy/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-32 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center space-x-2 bg-gradient-to-r from-vesta-orange/10 to-vesta-navy/10 px-6 py-3 rounded-full mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Sparkles className="w-5 h-5 text-vesta-orange animate-pulse" />
            <span className="text-vesta-navy font-medium">Our Services</span>
          </div>

          <h2
            className={`text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-vesta-navy to-vesta-orange mb-6 leading-tight transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Comprehensive Diagnostic Solutions
          </h2>

          <p
            className={`text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Advanced diagnostic solutions powered by cutting-edge technology and expert medical professionals.
          </p>
        </div>

        {/* Services Slider */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            aria-label="Previous services"
          >
            <ChevronLeft className="w-6 h-6 text-vesta-navy" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            aria-label="Next services"
          >
            <ChevronRight className="w-6 h-6 text-vesta-navy" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <Card
                key={index}
                className={`flex-shrink-0 w-80 group hover:shadow-xl border-0 shadow-soft bg-white transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  />

                  {/* Stat Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                    <div
                      className={`text-lg font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                    >
                      {service.stat}
                    </div>
                    <div className="text-xs text-slate-600">{service.statLabel}</div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} p-3 transition-transform duration-300 group-hover:rotate-6`}
                    >
                      <service.icon className="w-full h-full text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-vesta-orange transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed text-slate-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-vesta-orange mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-vesta-orange group-hover:text-white group-hover:border-vesta-orange transition-all duration-300 bg-transparent border-gray-200 hover:shadow-md"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-vesta-orange to-vesta-navy scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-vesta-orange to-vesta-navy p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-shadow duration-300">
            <Heart className="w-6 h-6" />
            <div className="text-left">
              <div className="text-lg font-semibold">Need a Specific Test?</div>
              <div className="text-white/80 text-sm">Our experts are here to help you choose</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
