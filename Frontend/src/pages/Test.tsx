import { useEffect, useState } from "react";
import { Activity, Heart, Zap } from "lucide-react";

const Test = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-vesta-orange/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Medical Icons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Activity 
          className="absolute top-20 left-10 text-vesta-blue/30 medical-icon" 
          size={32}
          style={{ animationDelay: "0s" }}
        />
        <Heart 
          className="absolute top-40 right-20 text-vesta-orange/30 medical-icon" 
          size={28}
          style={{ animationDelay: "1s" }}
        />
        <Zap 
          className="absolute bottom-32 left-16 text-vesta-navy/30 medical-icon" 
          size={36}
          style={{ animationDelay: "2s" }}
        />
        <Activity 
          className="absolute bottom-20 right-16 text-vesta-blue/30 medical-icon" 
          size={30}
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-vesta-navy via-vesta-blue to-vesta-orange bg-clip-text text-transparent">
                Test
              </span>
            </h1>
            
            <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
              <p className="text-2xl md:text-3xl font-light text-muted-foreground tracking-wide">
                Advanced Diagnostic Solutions
              </p>
              <p className="text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Revolutionizing healthcare diagnostics with cutting-edge technology and precision testing
              </p>
            </div>

            <div className="mt-12 animate-scale-in" style={{ animationDelay: "0.6s" }}>
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-vesta-navy/5 border border-vesta-navy/10">
                <div className="w-3 h-3 bg-vesta-orange rounded-full animate-pulse"></div>
                <span className="text-lg font-medium text-vesta-navy">Coming Soon</span>
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

export default Test;