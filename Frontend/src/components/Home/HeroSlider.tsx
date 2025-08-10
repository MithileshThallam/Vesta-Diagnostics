import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingForm from "@/components/Home/BookingForm";
import { useNavigate } from "react-router-dom";
import hero1 from "/HeroSlider/hero-1.png";
import hero2 from "/HeroSlider/hero-2.png";
import hero3 from "/HeroSlider/hero-3.png";
import hero4 from "/HeroSlider/hero-4.png";
import hero5 from "/HeroSlider/hero-5.jpg";

const slides = [
  {
    id: 5,
    image: hero5,
    title: "Revolutionizing Radiology",
    subtitle: "Precision through advanced imaging",
    description: "Unlock clearer diagnoses with state-of-the-art radiology, enabling faster decisions and personalized treatment powered by imaging intelligence.",
  },
  {
    id: 1,
    image: hero1,
    title: "Advanced Diagnostic Excellence",
    subtitle: "Where cutting-edge technology meets precision healthcare",
    description: "Experience the future of medical diagnostics with our state-of-the-art facilities and innovative testing solutions.",
  },
  {
    id: 2,
    image: hero2,
    title: "Global Network, Local Care",
    subtitle: "Connected centers, personalized service",
    description: "Our extensive network of diagnostic centers ensures world-class healthcare is always within your reach.",
  },
  {
    id: 3,
    image: hero3,
    title: "Comprehensive Testing Suite",
    subtitle: "From routine to specialized diagnostics",
    description: "Advanced molecular diagnostics, genetic testing, and AI-powered analysis for accurate, timely results.",
  },
  {
    id: 4,
    image: hero4,
    title: "Expert Medical Professionals",
    subtitle: "Precision diagnostics, expert interpretation",
    description: "Our team of specialists combines years of experience with the latest diagnostic technologies.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const navigate = useNavigate();

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

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set new interval
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
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide(); // Swipe left
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide(); // Swipe right
    }
  };

  const handleBookSlot = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
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
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
                }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl ml-4 md:ml-12 p-4 md:p-0">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-3 sm:mb-4 font-medium">
                      {slide.subtitle}
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 cursor-pointer">
                      <Button variant="premium" size="lg" className="text-sm sm:text-lg">
                        Get Started
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-sm sm:text-lg bg-white/90 text-black border-white/90 hover:bg-white cursor-pointer"
                      >
                        Explore Tests
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouncing Book a Slot Button */}
        <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-20">
          <Button
            onClick={() => { navigate('/tests') }}
            className="px-6 py-3 text-lg font-bold bg-gradient-primary text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 animate-[bounce_2s_infinite]"
          >
            📅 Book a Slot Now
          </Button>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === currentSlide
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
              background: 'linear-gradient(90deg, hsl(15 96% 53%) 0%, hsl(248 81% 20%) 100%)'
            }}
          />
        </div>
      </section>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </>
  );
};

export default HeroSlider;