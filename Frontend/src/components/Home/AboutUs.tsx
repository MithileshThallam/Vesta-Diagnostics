import { Shield, Award, Users, Clock } from "lucide-react"

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "60K+", label: "Patients in 2 Years" },
    { icon: Clock, value: "3000+", label: "Every Month" },
    { icon: Shield, value: "99.9%", label: "Accuracy" },
    { icon: Award, value: "ISO", label: "Certified" },
  ]

  return (
    <section id="about" className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between lg:flex-row gap-8 md:gap-12 lg:gap-16">
          {/* Content - Made smaller by adjusting flex basis */}
          <div className="space-y-6 md:space-y-8 order-2 lg:order-1 lg:basis-1/2">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4 md:mb-6">
                Trusted Healthcare Partner
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                Vesta Diagnostics delivers cutting-edge diagnostic services with precision and care. Our advanced 
                technology and expert team ensure reliable results you can trust.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Serving thousands of patients monthly, we've established ourselves as a leader in diagnostic excellence 
                and patient-centered care.
              </p>
            </div>

            {/* Stats Grid - Simplified for mobile */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 bg-white rounded-lg md:rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-vesta-orange mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-text-dark mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image - Made larger by adjusting flex basis and removing max height constraints */}
          <div className="relative order-1 lg:order-2 lg:basis-1/2">
            <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-hover h-full">
              <img
                src="/Aboutuspic.webp"
                alt="Vesta Diagnostics medical team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/20 to-transparent" />
            </div>

            {/* Floating Card - Repositioned for mobile */}
            <div className="absolute -bottom-4 left-4 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-hover max-w-[180px] md:max-w-xs">
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-text-dark">Quality Assured</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Accredited Labs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs