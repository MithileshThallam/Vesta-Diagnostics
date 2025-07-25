import { Shield, Award, Users, Clock } from "lucide-react"

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "50,000+", label: "Patients Served" },
    { icon: Award, value: "25+", label: "Years Experience" },
    { icon: Shield, value: "99.9%", label: "Accuracy Rate" },
    { icon: Clock, value: "24/7", label: "Support Available" },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text-dark mb-6">
                Trusted Healthcare Partner Since{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">1999</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Vesta Diagnostics, we've been at the forefront of medical innovation for over two decades. Our
                commitment to excellence, precision, and patient care has made us a trusted name in diagnostic
                healthcare across the globe.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From our humble beginnings as a single diagnostic center to becoming a comprehensive healthcare network,
                we've never lost sight of our core mission: providing accurate, timely, and accessible diagnostic
                services that empower better health decisions.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-vesta-orange mx-auto mb-3" />
                  <div className="text-3xl font-bold text-text-dark mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-hover">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Vesta Diagnostics medical team"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-hover max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-text-dark">ISO Certified</div>
                  <div className="text-sm text-muted-foreground">Quality Assured</div>
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
