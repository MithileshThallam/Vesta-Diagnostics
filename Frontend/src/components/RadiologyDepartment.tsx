import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, Shield, Clock, Award, Play, Pause, Scan, HeartPulse, Stethoscope, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const radiologyTests = [
  {
    id: 1,
    name: "X-Ray",
    description: "High-resolution digital X-ray imaging for bone fractures, chest conditions, and joint problems",
    image: "https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?auto=compress&cs=tinysrgb&w=800",
    priceRange: "$25 - $75",
    duration: "5-10 mins",
    features: ["Digital imaging", "Instant results", "Bone & chest analysis"],
    gradient: "from-blue-500 to-cyan-400",
    icon: Scan
  },
  {
    id: 2,
    name: "Ultrasound",
    description: "Advanced ultrasound technology for pregnancy monitoring, organ examination, and soft tissue analysis",
    image: "https://images.pexels.com/photos/7089021/pexels-photo-7089021.jpeg?auto=compress&cs=tinysrgb&w=800",
    priceRange: "$80 - $200",
    duration: "15-30 mins",
    features: ["Real-time imaging", "Non-invasive", "Pregnancy & organ scans"],
    gradient: "from-purple-500 to-pink-400",
    icon: HeartPulse
  },
  {
    id: 3,
    name: "CT Scan",
    description: "State-of-the-art computed tomography for detailed cross-sectional body imaging and diagnosis",
    image: "https://images.pexels.com/photos/7089022/pexels-photo-7089022.jpeg?auto=compress&cs=tinysrgb&w=800",
    priceRange: "$300 - $800",
    duration: "10-20 mins",
    features: ["3D imaging", "Detailed analysis", "Full body scans"],
    gradient: "from-green-500 to-emerald-400",
    icon: Stethoscope
  },
  {
    id: 4,
    name: "MRI",
    description: "Magnetic Resonance Imaging with cutting-edge technology for brain, spine, and soft tissue examination",
    image: "https://images.pexels.com/photos/7089023/pexels-photo-7089023.jpeg?auto=compress&cs=tinysrgb&w=800",
    priceRange: "$500 - $1,500",
    duration: "30-60 mins",
    features: ["Magnetic imaging", "Brain & spine focus", "Soft tissue detail"],
    gradient: "from-orange-500 to-red-400",
    icon: Brain
  }
];

const RadiologyDepartment = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredTest, setHoveredTest] = useState<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % radiologyTests.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % radiologyTests.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + radiologyTests.length) % radiologyTests.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentTest = radiologyTests[currentSlide];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-vesta-orange/10 to-vesta-navy/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-cyan-500/5 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-vesta-navy to-vesta-orange rounded-full text-white text-sm font-semibold mb-6 shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            Advanced Radiology Department
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-vesta-navy via-vesta-orange to-vesta-navy bg-clip-text text-transparent">
              Precision Diagnostic Imaging
            </span>
            <br />
            <span className="text-gray-900">For Accurate Medical Assessments</span>
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Image Slider */}
          <div className="relative group">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:shadow-2xl">
              {/* Main Image with Parallax Effect */}
              <div className="relative h-full overflow-hidden">
                <img
                  src={currentTest.image}
                  alt={currentTest.name}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out transform group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${currentTest.gradient} opacity-30`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className={`px-4 py-2 bg-gradient-to-r ${currentTest.gradient} rounded-full text-sm font-bold shadow-lg flex items-center`}>
                    <currentTest.icon className="w-4 h-4 mr-2" />
                    {currentTest.priceRange}
                  </div>
                  <div className="flex items-center space-x-2 text-sm bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{currentTest.duration}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-3 drop-shadow-md">{currentTest.name}</h3>
                <p className="text-white/90 text-sm leading-relaxed max-w-lg drop-shadow-md">{currentTest.description}</p>
              </div>

              {/* Navigation Controls */}
              <div className="absolute top-6 right-6 flex space-x-2">
                <button
                  onClick={toggleAutoPlay}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors shadow-sm"
                  aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoPlaying ? 
                    <Pause className="w-5 h-5 text-white" /> : 
                    <Play className="w-5 h-5 text-white" />
                  }
                </button>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110 shadow-sm"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {radiologyTests.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-vesta-orange w-8 scale-110 shadow-md"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="space-y-8">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We offer a full spectrum of diagnostic imaging services performed by board-certified radiologists 
                using the latest technology to ensure accurate results and minimal patient discomfort.
              </p>
            </div>

            {/* Test Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {radiologyTests.map((test, index) => {
                const isActive = currentSlide === index;
                return (
                  <button
                    key={test.id}
                    onClick={() => setCurrentSlide(index)}
                    onMouseEnter={() => setHoveredTest(test.id)}
                    onMouseLeave={() => setHoveredTest(null)}
                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 border ${
                      isActive
                        ? "bg-gradient-to-br from-vesta-navy to-vesta-orange text-white shadow-lg transform scale-[1.02]"
                        : "bg-white hover:bg-gray-50 border-gray-200 hover:border-vesta-orange/50 hover:shadow-md"
                    } text-left h-full flex flex-col`}
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg mr-3 ${
                        isActive ? "bg-white/20" : "bg-vesta-orange/10"
                      }`}>
                        <test.icon className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-vesta-orange"
                        }`} />
                      </div>
                      <h4 className={`font-bold text-lg ${
                        isActive ? "text-white" : "text-gray-900"
                      }`}>
                        {test.name}
                      </h4>
                    </div>
                    <p className={`text-sm mb-3 ${
                      isActive ? "text-white/90" : "text-gray-600"
                    }`}>
                      {test.priceRange}
                    </p>
                    <ul className="space-y-2 mt-auto">
                      {test.features.map((feature, idx) => (
                        <li key={idx} className={`text-xs flex items-start ${
                          isActive ? "text-white/80" : "text-gray-500"
                        }`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2 ${
                            isActive ? "bg-white/80" : "bg-vesta-orange"
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-vesta-navy to-vesta-orange text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 text-lg px-8 py-6 flex-1"
                >
                  Schedule an Appointment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-vesta-orange text-vesta-orange hover:bg-vesta-orange hover:text-white transition-all duration-200 text-lg px-8 py-6 flex-1"
                >
                  Learn About Procedures
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">FDA Approved Equipment</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">ISO Certified Lab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RadiologyDepartment;