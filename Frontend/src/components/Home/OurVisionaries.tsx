import { useEffect, useRef, useState } from "react";

const OurVisionaries = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Reduced threshold for earlier trigger
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visionaries = [
    {
      name: "M. Lokesh",
      role: "Founder & CEO",
      bio: "Pioneering healthcare innovation with 20+ years of experience in diagnostic excellence and patient care.",
      image: "/Doc1.png",
      phone: "+91 9876543210"
    },
    {
      name: "Dr. Prashanti Yella",
      role: "Chief Medical Officer",
      bio: "Leading medical authority in pathology with expertise in advanced diagnostic techniques and quality assurance.",
      image: "/Doc2.png",
      phone: "+91 9876543210"
    },
    {
      name: "Dr. Akarsh Yella",
      role: "Head of Radiology",
      bio: "Specialist in medical imaging and radiology with a passion for precision diagnostics and cutting-edge technology.",
      image: "/Doc3.png",
      phone: "+91 9876543210"
    },
    {
      name: "Ram Pranav",
      role: "Head of Radiology",
      bio: "Specialist in medical imaging and radiology with a passion for precision diagnostics and cutting-edge technology.",
      image: "/Doc3.png",
      phone: "+91 9876543210"
    }
  ];

  const hasOddCount = visionaries.length % 2 !== 0;
  const firstVisionary = hasOddCount ? visionaries[0] : null;
  const remainingVisionaries = hasOddCount ? visionaries.slice(1) : visionaries;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 md:py-16"
      aria-labelledby="visionaries-heading"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[hsl(var(--vesta-orange))]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[hsl(var(--vesta-navy))]/20 rounded-full filter blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div
        className={`text-center mb-8 md:mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <h2
          id="visionaries-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-[hsl(var(--vesta-orange))] to-[hsl(var(--vesta-navy))] bg-clip-text text-transparent"
        >
          Our Visionaries
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The exceptional leaders driving innovation in diagnostic healthcare
        </p>
      </div>

      {/* Profiles Container */}
      <div className={`w-full max-w-6xl mx-auto transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* First centered card for odd count */}
        {hasOddCount && firstVisionary && (
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="w-full max-w-md group">
              <div className="h-full bg-card rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-[hsl(var(--vesta-orange))]/30">
                {/* Profile Image */}
                <div className="relative mx-auto mb-5 w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--vesta-orange))] to-[hsl(var(--vesta-navy))] rounded-full p-1">
                    <div className="relative w-full h-full overflow-hidden rounded-full">
                      <img
                        src={firstVisionary.image}
                        alt={`Portrait of ${firstVisionary.name}`}
                        className="absolute top-0 left-0 w-full h-auto min-h-full object-cover"
                        loading="lazy"
                        width={160}
                        height={160}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[hsl(var(--vesta-orange))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"
                    aria-hidden="true"
                  />
                </div>

                {/* Profile Info */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {firstVisionary.name}
                  </h3>

                  <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[hsl(var(--vesta-orange))]/10 to-[hsl(var(--vesta-navy))]/10 rounded-full">
                    <span className="text-xs md:text-sm font-semibold text-[hsl(var(--vesta-orange))]">
                      {firstVisionary.role}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {firstVisionary.bio}
                  </p>

                  {/* Phone Number */}
                  {firstVisionary.phone && (
                    <div className="pt-2 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a
                        href={`tel:${firstVisionary.phone.replace(/\D/g, '')}`}
                        className="text-sm md:text-base text-muted-foreground hover:text-[hsl(var(--vesta-orange))] transition-colors"
                      >
                        {firstVisionary.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-1 w-12 md:w-16 bg-gradient-to-r from-[hsl(var(--vesta-orange))] to-[hsl(var(--vesta-navy))] rounded-full mx-auto opacity-70 group-hover:opacity-100 group-hover:w-20 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        )}

        {/* Grid for remaining visionaries (2 per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
          {remainingVisionaries.map((person, index) => (
            <div
              key={person.name}
              className="group"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="h-full bg-card rounded-xl md:rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-[hsl(var(--vesta-orange))]/30 focus-within:ring-2 focus-within:ring-[hsl(var(--vesta-orange))] focus-within:ring-offset-2">
                {/* Profile Image */}
                <div className="relative mx-auto mb-5 w-32 h-32 md:w-40 md:h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--vesta-orange))] to-[hsl(var(--vesta-navy))] rounded-full p-1">
                    <img
                      src={person.image}
                      alt={`Portrait of ${person.name}`}
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[hsl(var(--vesta-orange))] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"
                    aria-hidden="true"
                  />
                </div>

                {/* Profile Info */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {person.name}
                  </h3>

                  <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r from-[hsl(var(--vesta-orange))]/10 to-[hsl(var(--vesta-navy))]/10 rounded-full">
                    <span className="text-xs md:text-sm font-semibold text-[hsl(var(--vesta-orange))]">
                      {person.role}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {person.bio}
                  </p>

                  {/* Phone Number */}
                  {person.phone && (
                    <div className="pt-2 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <a
                        href={`tel:${person.phone.replace(/\D/g, '')}`}
                        className="text-sm md:text-base text-muted-foreground hover:text-[hsl(var(--vesta-orange))] transition-colors"
                      >
                        {person.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Bottom accent line */}
                <div
                  className="mt-6 h-1 w-12 md:w-16 bg-gradient-to-r from-[hsl(var(--vesta-orange))] to-[hsl(var(--vesta-navy))] rounded-full mx-auto opacity-70 group-hover:opacity-100 group-hover:w-20 transition-all duration-300"
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVisionaries;