import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden mt-10">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-vesta-orange/20 rounded-full animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Subtle Gradient Overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-vesta-orange/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-vesta-blue/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Contact Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Mail 
          className="absolute top-20 left-16 text-vesta-orange/30 medical-icon" 
          size={40}
        />
        <Phone 
          className="absolute top-1/3 right-20 text-vesta-blue/30 medical-icon" 
          size={36}
          style={{ animationDelay: "1s" }}
        />
        <MapPin 
          className="absolute bottom-1/3 left-12 text-vesta-navy/30 medical-icon" 
          size={38}
          style={{ animationDelay: "2s" }}
        />
        <MessageCircle 
          className="absolute bottom-20 right-16 text-vesta-orange/30 medical-icon" 
          size={42}
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-vesta-navy via-vesta-blue to-vesta-orange bg-clip-text text-transparent">
                Contact
              </span>
            </h1>
            
            <div className="space-y-6 animate-slide-in-left" style={{ animationDelay: "0.5s" }}>
              <p className="text-3xl md:text-4xl font-thin text-vesta-blue tracking-widest">
                Connect With Us
              </p>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Reach out to our team of healthcare professionals and discover how we can support your wellness journey
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-scale-in" style={{ animationDelay: "0.8s" }}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-vesta-orange/10 rounded-full flex items-center justify-center border border-vesta-orange/20 group-hover:bg-vesta-orange/20 transition-all duration-300">
                  <Mail className="text-vesta-orange" size={28} />
                </div>
                <p className="text-sm font-medium text-vesta-orange">Email</p>
                <p className="text-xs text-muted-foreground mt-1">hello@vesta.com</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-vesta-blue/10 rounded-full flex items-center justify-center border border-vesta-blue/20 group-hover:bg-vesta-blue/20 transition-all duration-300">
                  <Phone className="text-vesta-blue" size={28} />
                </div>
                <p className="text-sm font-medium text-vesta-blue">Phone</p>
                <p className="text-xs text-muted-foreground mt-1">+1 (555) 123-4567</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-vesta-navy/10 rounded-full flex items-center justify-center border border-vesta-navy/20 group-hover:bg-vesta-navy/20 transition-all duration-300">
                  <MapPin className="text-vesta-navy" size={28} />
                </div>
                <p className="text-sm font-medium text-vesta-navy">Location</p>
                <p className="text-xs text-muted-foreground mt-1">Medical District</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-vesta-orange/10 rounded-full flex items-center justify-center border border-vesta-orange/20 group-hover:bg-vesta-orange/20 transition-all duration-300">
                  <MessageCircle className="text-vesta-orange" size={28} />
                </div>
                <p className="text-sm font-medium text-vesta-orange">Support</p>
                <p className="text-xs text-muted-foreground mt-1">24/7 Available</p>
              </div>
            </div>

            <div className="mt-20 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              <div className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-vesta-navy/5 border border-vesta-navy/10">
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-vesta-orange rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-vesta-blue rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="w-3 h-3 bg-vesta-navy rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>
                <span className="text-2xl font-light text-vesta-navy tracking-wide">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vesta-navy/5 to-transparent"></div>
    </div>
  );
};

export default Contact;