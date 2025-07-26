"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Microscope, Clock, Shield, Users, Award, Zap, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const WhyChooseUs = () => {
  const [activeCard, setActiveCard] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Memoized features array to prevent re-creation on every render
  const features = useMemo(
    () => [
      {
        icon: Microscope,
        title: "Advanced AI Technology",
        description:
          "Cutting-edge diagnostic equipment powered by artificial intelligence for unmatched precision and early detection.",
        stat: "99.9%",
        statLabel: "Accuracy Rate",
        color: "from-blue-500 via-cyan-500 to-teal-500",
        position: { top: "10%", left: "15%" },
      },
      {
        icon: Clock,
        title: "Lightning Fast Results",
        description:
          "Get your test results in record time with our streamlined digital processes and automated systems.",
        stat: "2-4 hrs",
        statLabel: "Average Turnaround",
        color: "from-green-500 via-emerald-500 to-teal-500",
        position: { top: "10%", right: "15%" },
      },
      {
        icon: Shield,
        title: "ISO Certified Excellence",
        description:
          "International quality standards with rigorous quality control and accreditation from leading bodies.",
        stat: "ISO 15189",
        statLabel: "Certified Labs",
        color: "from-purple-500 via-violet-500 to-indigo-500",
        position: { top: "50%", left: "5%" },
      },
      {
        icon: Users,
        title: "Expert Medical Team",
        description: "Board-certified pathologists and experienced technicians with decades of combined expertise.",
        stat: "200+",
        statLabel: "Medical Experts",
        color: "from-orange-500 via-red-500 to-pink-500",
        position: { top: "50%", right: "5%" },
      },
      {
        icon: Award,
        title: "Trusted Healthcare Partner",
        description: "25+ years of excellence with recognition from leading healthcare organizations worldwide.",
        stat: "50,000+",
        statLabel: "Patients Served",
        color: "from-yellow-500 via-orange-500 to-red-500",
        position: { bottom: "10%", left: "15%" },
      },
      {
        icon: Zap,
        title: "Digital Innovation Hub",
        description: "Seamless digital experience from booking to results with our award-winning mobile platform.",
        stat: "4.9★",
        statLabel: "App Rating",
        color: "from-pink-500 via-rose-500 to-red-500",
        position: { bottom: "10%", right: "15%" },
      },
    ],
    [],
  )

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Optimized card cycling with setInterval instead of requestAnimationFrame
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Set new interval for cycling cards
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % features.length)
    }, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isVisible, prefersReducedMotion, features.length])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Static background elements - converted to CSS-only animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Reduced complexity background blobs */}
        <div className="background-blob-1" />
        <div className="background-blob-2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-vesta-orange/10 to-vesta-navy/10 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-vesta-orange" />
            <span className="text-vesta-navy font-medium">What Sets Us Apart</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-vesta-navy to-vesta-orange mb-8 leading-tight">
            Excellence in Every
            <br />
            <span className="relative bg-gradient-primary bg-clip-text text-transparent">
              Diagnosis
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full" />
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Choosing Vesta Diagnostics means choosing a healthcare partner committed to precision, innovation, and your
            well-being. Experience the difference that comes with cutting-edge technology and expert care.
          </p>
        </div>

        {/* Main Interactive Section */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Doctor Image - only animate continuously rotating elements */}
          <div className="relative z-20 flex justify-center items-center">
            <div className="relative">
              {/* Rotating rings - only elements that need will-change */}
              <div className="rotating-ring-outer" />
              <div className="rotating-ring-inner" />

              {/* Doctor Image Container */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-white to-slate-100 shadow-2xl border-4 border-white">
                <img
                  src="/Features.jpg"
                  alt="Vesta Diagnostics Medical Professional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/10 to-transparent" />

                {/* Static floating stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-vesta-orange">25+</div>
                  <div className="text-xs text-slate-600">Years</div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-200">
                  <div className="text-2xl font-bold text-vesta-navy">50K+</div>
                  <div className="text-xs text-slate-600">Patients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Only animate active and previous card */}
          <div className="absolute inset-0 w-full h-full">
            {features.map((feature, index) => {
              const isActive = activeCard === index
              const isPrevious = activeCard === (index - 1 + features.length) % features.length
              const shouldAnimate = isActive || isPrevious

              // Only render cards that need animation or are visible
              if (!isVisible && !shouldAnimate) return null

              return (
                <div
                  key={index}
                  className={`absolute feature-card ${isActive ? "feature-card--active" : ""} ${isPrevious ? "feature-card--previous" : ""}`}
                  style={feature.position}
                >
                  <div
                    className={`group relative p-6 bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/50 ${
                      isActive ? "ring-2 ring-vesta-orange/50" : ""
                    }`}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <div
                      className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-4 icon-container`}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vesta-orange group-hover:to-vesta-navy transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 leading-relaxed max-w-xs">{feature.description}</p>

                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                        >
                          {feature.stat}
                        </div>
                        <div className="text-xs text-slate-500">{feature.statLabel}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-vesta-orange transition-all duration-300" />
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
