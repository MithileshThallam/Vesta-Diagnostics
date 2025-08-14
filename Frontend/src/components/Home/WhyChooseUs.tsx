import { useState, useEffect, useRef, useMemo } from "react"
import { Microscope, Clock, Shield, Users, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

const WhyChooseUs = () => {
  const [activeCard, setActiveCard] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
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
        mobilePosition: { top: "5%", left: "50%", transform: "translateX(-50%)" }
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
        mobilePosition: { top: "20%", right: "5%" }
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
        mobilePosition: { top: "35%", left: "5%" }
      },
      {
        icon: Users,
        title: "Expert Medical Team",
        description: "Board-certified pathologists and experienced technicians with decades of combined expertise.",
        stat: "200+",
        statLabel: "Medical Experts",
        color: "from-orange-500 via-red-500 to-pink-500",
        position: { top: "50%", right: "5%" },
        mobilePosition: { top: "35%", right: "5%" }
      },
    ],
    [],
  )

  // Check for mobile view and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener("change", handleChange)
    }
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
    if (!isVisible || prefersReducedMotion || isMobile) return

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
  }, [isVisible, prefersReducedMotion, features.length, isMobile])

  // Handle manual card selection
  const handleCardSelect = (index: number) => {
    setActiveCard(index)
    // Reset the auto-rotation timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!prefersReducedMotion && !isMobile) {
      intervalRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % features.length)
      }, 3000)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 lg:py-20 lg:pb-36 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Static background elements - converted to CSS-only animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Reduced complexity background blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-vesta-orange/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-vesta-orange/10 to-vesta-navy/10 px-4 py-2 md:px-6 md:py-3 rounded-full mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-vesta-orange" />
            <span className="text-sm md:text-base text-vesta-navy font-medium">What Sets Us Apart</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-vesta-navy to-vesta-orange mb-6 md:mb-8 leading-tight">
            Excellence in Every
            <br className="hidden sm:block" />
            <span className="relative bg-gradient-primary bg-clip-text text-transparent">
              Diagnosis
              <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full" />
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choosing Vesta Diagnostics means choosing a healthcare partner committed to precision, innovation, and your
            well-being. Experience the difference that comes with cutting-edge technology and expert care.
          </p>
        </div>

        {/* Main Interactive Section */}
        <div className="relative max-w-7xl mx-auto">
          {/* Central Doctor Image - only animate continuously rotating elements */}
          <div className="relative z-20 flex justify-center items-center mb-8 lg:mb-0">
            <div className="relative">
              {/* Rotating rings - only elements that need will-change */}
              <div className="absolute -inset-8 lg:-inset-12 rounded-full border-4 border-blue-200/30 animate-spin-slow [animation-duration:20s]" />
              <div className="absolute -inset-4 lg:-inset-8 rounded-full border-4 border-vesta-orange/20 animate-spin-slow [animation-duration:25s] [animation-direction:reverse]" />

              {/* Doctor Image Container */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden bg-gradient-to-br from-white to-slate-100 shadow-lg lg:shadow-2xl border-4 border-white">
                <img
                  src="/Features.webp"
                  alt="Vesta Diagnostics Medical Professional"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/10 to-transparent" />

                {/* Static floating stats */}
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-xl p-2 md:p-4 border border-slate-200">
                  <div className="text-lg md:text-2xl font-bold text-vesta-orange">25+</div>
                  <div className="text-xs text-slate-600">Years</div>
                </div>

                <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-xl p-2 md:p-4 border border-slate-200">
                  <div className="text-lg md:text-2xl font-bold text-vesta-navy">50K+</div>
                  <div className="text-xs text-slate-600">Patients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Different layout for mobile */}
          {isMobile ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`relative p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-white/50 transition-all duration-300 ${
                    activeCard === index ? "ring-2 ring-vesta-orange/50" : ""
                  }`}
                  onClick={() => handleCardSelect(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 mb-3`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{feature.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-lg font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.stat}
                      </div>
                      <div className="text-xs text-slate-500">{feature.statLabel}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>

                  {activeCard === index && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
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
                    className={`absolute w-64 transition-all duration-500 ease-in-out ${isActive ? 'z-10 scale-110 opacity-100' : 'z-0 scale-95 opacity-80'} ${isPrevious ? 'z-5' : ''}`}
                    style={feature.position}
                    onClick={() => handleCardSelect(index)}
                  >
                    <div
                      className={`group relative p-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 hover:shadow-xl cursor-pointer ${
                        isActive ? "ring-2 ring-vesta-orange/50" : ""
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                      />

                      <div
                        className={`relative w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-3.5 mb-4`}
                      >
                        <feature.icon className="w-full h-full text-white" />
                      </div>

                      <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-vesta-orange group-hover:to-vesta-navy transition-all duration-300">
                        {feature.title}
                      </h3>

                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{feature.description}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <div
                            className={`text-xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                          >
                            {feature.stat}
                          </div>
                          <div className="text-xs text-slate-500">{feature.statLabel}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-vesta-orange transition-all duration-300" />
                      </div>

                      {isActive && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile indicators */}
      {isMobile && (
        <div className="flex justify-center mt-8 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardSelect(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeCard === index ? 'bg-vesta-orange w-4' : 'bg-slate-300'
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Add these styles to your global CSS or use a style tag */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}

export default WhyChooseUs
