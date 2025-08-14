import { Sparkles } from "lucide-react"

const TestsHeroSection = () => {
  return (
    <section
      className="relative h-[60vh] min-h-[600px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/TestHero.webp')",  // Added url() here
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Premium overlay with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Premium badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-6 py-3 rounded-full mb-8 backdrop-blur-md">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-white font-medium tracking-wider ">PREMIUM DIAGNOSTICS</span>
        </div>

        {/* Main heading with elegant typography */}
        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          <span className="block font-light">Exceptional</span>
          <span className="relative">
            Medical Diagnostics
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-primary rounded-full" />
          </span>
        </h1>

        {/* Subheading with subtle animation on hover */}
        <p className="text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto mb-10 transition-all duration-300 hover:text-white hover:tracking-wide">
          Precision medicine powered by cutting-edge technology and unparalleled expertise.
          Experience diagnostics redefined.
        </p>

        {/* Premium CTA button */}
        <button className="bg-transparent border-2 border-vesta-orange text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-vesta-orange/20 hover:border-vesta-orange/80 transition-all duration-300 group">
          <span className="flex items-center justify-center space-x-2">
            <span>Explore Our Services</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </button>
      </div>

      {/* Premium subtle elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default TestsHeroSection