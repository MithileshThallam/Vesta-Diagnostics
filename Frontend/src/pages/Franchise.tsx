import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, ArrowRight, ChevronRight } from "lucide-react"
import diagnosticCenter from "/CHero.png"

const Franchise = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    profession: "",
    commercialSpace: "",
    investmentBudget: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Application Submitted",
      description: "Our team will reach out to you within 48 hours.",
    //   variant: "success"
    })
    console.log("Franchise application:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const benefits = [
    { title: "Proven Business Model", description: "Established system with high success rate" },
    { title: "Comprehensive Training", description: "Full operational and technical training" },
    { title: "Marketing Support", description: "National branding and local marketing tools" },
    { title: "Quality Equipment", description: "State-of-the-art diagnostic technology" },
    { title: "Ongoing Support", description: "Dedicated franchise manager" },
    { title: "Revenue Potential", description: "Multiple revenue streams from diagnostics" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={diagnosticCenter} 
            alt="Modern Diagnostic Center" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vesta-navy/95 to-vesta-navy/80"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20">
              <span className="bg-gradient-to-r from-vesta-orange to-yellow-400 bg-clip-text text-transparent">
                Franchise Opportunity
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Own a <span className="bg-gradient-to-r from-vesta-orange to-yellow-400 bg-clip-text text-transparent">Vesta Diagnostics</span> Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Partner with India's fastest growing diagnostic chain and bring quality healthcare to your community
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-vesta-orange to-yellow-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 text-lg px-8 py-6"
              onClick={() => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Apply Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-b from-vesta-navy/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: "150+", label: "Centers Nationwide" },
              { value: "95%", label: "Success Rate" },
              { value: "2-3 Years", label: "ROI Period" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <p className="text-3xl font-bold text-vesta-navy mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vesta-navy">
                Why Choose Vesta Diagnostics Franchise?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Vesta Diagnostics is revolutionizing healthcare accessibility in India with our network of 
                advanced diagnostic centers. Join us to be part of this growth story while building a profitable business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-vesta-orange/50 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-vesta-orange/10 rounded-lg mr-4">
                      <CheckCircle className="h-6 w-6 text-vesta-orange" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600 pl-12">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Inquiry Form */}
      <section id="franchise-form" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-vesta-navy">Start Your Franchise Journey</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Complete this form and our franchise team will contact you with detailed information
              </p>
            </div>
            
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <div className="w-2 h-2 bg-vesta-orange rounded-full mr-3"></div>
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center">
                          Full Name <span className="text-vesta-orange ml-1">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                          Email Address <span className="text-vesta-orange ml-1">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center">
                          Phone Number <span className="text-vesta-orange ml-1">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center">
                          City / Location <span className="text-vesta-orange ml-1">*</span>
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <div className="w-2 h-2 bg-vesta-orange rounded-full mr-3"></div>
                      Business Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profession" className="text-sm font-medium text-gray-700 flex items-center">
                        Current Profession / Business <span className="text-vesta-orange ml-1">*</span>
                      </Label>
                      <Input
                        id="profession"
                        type="text"
                        value={formData.profession}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Commercial Space Available?
                        </Label>
                        <RadioGroup
                          value={formData.commercialSpace}
                          onValueChange={(value) => handleInputChange('commercialSpace', value)}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="space-yes" className="text-vesta-orange border-gray-300" />
                            <Label htmlFor="space-yes" className="text-sm text-gray-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="space-no" className="text-vesta-orange border-gray-300" />
                            <Label htmlFor="space-no" className="text-sm text-gray-700">No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Investment Budget
                        </Label>
                        <Select value={formData.investmentBudget} onValueChange={(value) => handleInputChange('investmentBudget', value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="below-10l">Below ₹10L</SelectItem>
                            <SelectItem value="10-20l">₹10–20L</SelectItem>
                            <SelectItem value="20-30l">₹20–30L</SelectItem>
                            <SelectItem value="above-30l">Above ₹30L</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <div className="w-2 h-2 bg-vesta-orange rounded-full mr-3"></div>
                      Additional Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message or Questions
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your background, experience, or any questions you have..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="min-h-[120px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6 space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-base font-semibold bg-gradient-to-r from-vesta-orange to-yellow-500 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 group"
                    >
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Our franchise team will contact you within 24-48 hours
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Franchise