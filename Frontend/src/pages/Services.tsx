import { useEffect, useState } from "react";
import { Stethoscope, Shield, Microscope, UserCheck } from "lucide-react";

const Services = () => {
  const [floatingElements, setFloatingElements] = useState<Array<{ id: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 10 + 15,
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden mt-5">
      {/* Geometric Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full bg-gradient-to-br from-vesta-blue/10 to-vesta-orange/10 float"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Service Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Stethoscope 
          className="absolute top-16 right-20 text-vesta-orange/20 float-delayed" 
          size={48}
        />
        <Shield 
          className="absolute top-1/3 left-12 text-vesta-blue/20 float" 
          size={40}
        />
        <Microscope 
          className="absolute bottom-1/3 right-16 text-vesta-navy/20 float-delayed" 
          size={44}
        />
        <UserCheck 
          className="absolute bottom-20 left-20 text-vesta-orange/20 float" 
          size={42}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
              <span className="text-vesta-navy">Serv</span>
              <span className="text-vesta-orange">ices</span>
            </h1>
            
            <div className="space-y-8 animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
              <p className="text-3xl md:text-4xl font-extralight text-vesta-blue tracking-wider">
                Healthcare Excellence
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Comprehensive medical services designed to provide exceptional care and innovative solutions for your health needs
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-scale-in" style={{ animationDelay: "0.8s" }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-vesta-navy/10 rounded-full flex items-center justify-center">
                  <Stethoscope className="text-vesta-navy" size={24} />
                </div>
                <p className="text-sm font-medium text-vesta-navy">Diagnostics</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-vesta-blue/10 rounded-full flex items-center justify-center">
                  <Shield className="text-vesta-blue" size={24} />
                </div>
                <p className="text-sm font-medium text-vesta-blue">Prevention</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-vesta-orange/10 rounded-full flex items-center justify-center">
                  <Microscope className="text-vesta-orange" size={24} />
                </div>
                <p className="text-sm font-medium text-vesta-orange">Research</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-vesta-navy/10 rounded-full flex items-center justify-center">
                  <UserCheck className="text-vesta-navy" size={24} />
                </div>
                <p className="text-sm font-medium text-vesta-navy">Care</p>
              </div>
            </div>

            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
              <div className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-gradient-to-r from-vesta-blue/10 to-vesta-orange/10 border border-vesta-blue/20">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-vesta-blue rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-vesta-orange rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <div className="w-2 h-2 bg-vesta-navy rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                </div>
                <span className="text-xl font-semibold text-vesta-navy">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;