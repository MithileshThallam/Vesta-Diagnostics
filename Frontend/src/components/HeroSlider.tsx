import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "/HeroSlider/hero-1.png";
import hero2 from "/HeroSlider/hero-2.png";
import hero3 from "/HeroSlider/hero-3.png";
import hero4 from "/HeroSlider/hero-4.png";
import hero5 from "/HeroSlider/hero-5.png";

// Updated slides with mobile-friendly shorter versions
const slides = [
  {
    id: 1,
    image: hero1,
    title: "Advanced Diagnostic Excellence",
    mobileTitle: "Diagnostic Excellence",
    subtitle: "Where cutting-edge technology meets precision healthcare",
    mobileSubtitle: "Cutting-edge precision healthcare",
    description: "Experience the future of medical diagnostics with our state-of-the-art facilities and innovative testing solutions.",
    mobileDescription: "State-of-the-art diagnostic facilities and innovative testing.",
  },
  {
    id: 2,
    image: hero2,
    title: "Global Network, Local Care",
    mobileTitle: "Global Network",
    subtitle: "Connected centers, personalized service",
    mobileSubtitle: "Personalized diagnostic service",
    description: "Our extensive network of diagnostic centers ensures world-class healthcare is always within your reach.",
    mobileDescription: "World-class healthcare within your reach.",
  },
  {
    id: 3,
    image: hero3,
    title: "Comprehensive Testing Suite",
    mobileTitle: "Testing Suite",
    subtitle: "From routine to specialized diagnostics",
    mobileSubtitle: "Routine to specialized diagnostics",
    description: "Advanced molecular diagnostics, genetic testing, and AI-powered analysis for accurate, timely results.",
    mobileDescription: "Advanced diagnostics with AI-powered analysis.",
  },
  {
    id: 4,
    image: hero4,
    title: "Expert Medical Professionals",
    mobileTitle: "Medical Experts",
    subtitle: "Precision diagnostics, expert interpretation",
    mobileSubtitle: "Expert diagnostic interpretation",
    description: "Our team of specialists combines years of experience with the latest diagnostic technologies.",
    mobileDescription: "Specialists with latest diagnostic technologies.",
  },
  {
    id: 5,
    image: hero5,
    title: "Data-Driven Healthcare",
    mobileTitle: "Data-Driven Care",
    subtitle: "Intelligence that transforms care",
    mobileSubtitle: "Intelligent healthcare",
    description: "Harness the power of medical data analytics for better health outcomes and personalized treatment plans.",
    mobileDescription: "Better outcomes through data analytics.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  return (
    <section 
      className="relative h-screen overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

            {/* Content - Responsive with mobile-specific text */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl ml-0 md:ml-12 p-4 md:p-0">
                  <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                    <span className="md:hidden">{slide.mobileTitle}</span>
                    <span className="hidden md:inline">{slide.title}</span>
                  </h2>
                  <p className="text-base xs:text-lg sm:text-xl lg:text-2xl text-white/90 mb-2 sm:mb-4 font-medium">
                    <span className="md:hidden">{slide.mobileSubtitle}</span>
                    <span className="hidden md:inline">{slide.subtitle}</span>
                  </p>
                  <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-white/80 mb-4 sm:mb-8 max-w-2xl leading-relaxed">
                    <span className="md:hidden">{slide.mobileDescription}</span>
                    <span className="hidden md:inline">{slide.description}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Button 
                      variant="premium" 
                      size="sm" 
                      className="text-xs sm:text-sm md:text-lg px-4 py-2 sm:px-6 sm:py-3"
                    >
                      Get Started
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs sm:text-sm md:text-lg bg-white/90 text-text-dark border-white/90 hover:bg-white px-4 py-2 sm:px-6 sm:py-3"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div
          className="h-full transition-all duration-5000 ease-linear"
          style={{
            width: isAutoPlaying ? `${((currentSlide + 1) / slides.length) * 100}%` : "0%",
            background: 'linear-gradient(90deg, #F05A28 0%, #1A1449 100%)'
          }}
        />
      </div>
    </section>
  );
};

export default HeroSlider;