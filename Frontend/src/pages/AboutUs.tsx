"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Clock, Phone } from "lucide-react"

const AboutUs = () => {
  const directors = [
    {
      id: 1,
      name: "Dr. Akarsh Yella",
      designation: "Direcor",
      image: "/Doc-1.png",
    },
    {
      id: 2,
      name: "Dr. Prashanti Yella",
      designation: "Director",
      image: "/Doc-2.png",
    },
    {
      id: 3,
      name: "Mr. Munta Lokesh",
      designation: "Director",
      image: "/Doc-3.png",
    },
    {
      id: 4,
      name: "Mr. Ram Pranav",
      designation: "Director",
      image: "/Doc-4.png",
    },
  ]

  const milestones = [
    { 
      icon: Users, 
      text: "3,000+ patients served monthly", 
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      count: "3K+"
    },
    { 
      icon: Award, 
      text: "60,000+ patients in 2 years", 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      count: "60K+"
    },
    { 
      icon: Clock, 
      text: "Free home pickup samples", 
      color: "text-green-600",
      bgColor: "bg-green-50",
      count: "24/7"
    },
    { 
      icon: CheckCircle, 
      text: "State-of-the-art facilities", 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      count: "100+"
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Image */}
      <section className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="/SHero.png"
          alt="Modern Diagnostic Laboratory"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              Leading the future of medical diagnostics with precision, innovation, and unwavering commitment to
              healthcare excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Pioneering Healthcare Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Vesta Diagnostics, we combine cutting-edge technology with compassionate care to deliver accurate,
                timely diagnostic services. Our commitment to excellence has made us a trusted partner in healthcare for
                thousands of patients and medical professionals.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With modern facilities, advanced equipment, and a team of experienced professionals, we ensure that
                every test is conducted with the highest standards of accuracy and reliability. Our comprehensive range
                of diagnostic services covers everything from routine health checkups to specialized testing.
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/Contact/contact-1.webp"
                  alt="Vesta Diagnostics Center"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Contact Card */}
              <Card className="absolute -bottom-6 -left-6 bg-white shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">24/7 Support</p>
                      <p className="text-lg font-bold text-gray-900">8886299108</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Milestones</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key achievements that demonstrate our commitment to excellence in diagnostic healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-0 bg-white group"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${milestone.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <milestone.icon className={`w-8 h-8 ${milestone.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {milestone.count}
                  </h3>
                  <p className="text-sm font-medium text-gray-600 text-center">
                    {milestone.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the visionary leaders driving innovation and excellence in diagnostic healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {directors.map((director) => (
              <Card key={director.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-orange-200 transition-all duration-300">
                      <img
                        src={director.image || "/placeholder.svg"}
                        alt={director.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{director.name}</h3>
                  <p className="text-sm font-medium text-gray-600 mb-4">{director.designation}</p>

                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full mx-auto"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Experience Excellence in Diagnostics</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust Vesta Diagnostics for accurate, reliable, and timely
              diagnostic services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3"
                onClick={() => (window.location.href = "/tests")}
              >
                Book Your Test Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold px-8 py-3 bg-transparent"
                onClick={() => (window.location.href = "/contactus")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs