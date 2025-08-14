

import { Phone, MapPin, User, Mail } from "lucide-react";
import contactHeroBg from "/CHero.png";

const ContactInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <section
        className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center bg-gradient-to-br from-background/95 to-secondary/40"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="animate-fade-in-up">
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Precision <span className="text-gradient">Diagnostics</span> For Better Health
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-10 px-4">
              Advanced medical testing with accuracy and care in Hyderabad
            </p>
          </div>
        </div>
        
        <div className="hidden sm:block absolute bottom-6 lg:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/80 rounded-full mt-2 animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      <section id="contact-content" className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <div className="animate-slide-up">
                <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 sm:mb-6">
                  Your Health <span className="text-primary">Partner</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                  At Vesta Diagnostics, we combine cutting-edge technology with compassionate care to deliver accurate test results you can trust.
                </p>
                
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-medium text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Our Facility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    <div className="group overflow-hidden rounded-lg border border-border/20 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300">
                      <img 
                        src="/Contact/contact-1.png" 
                        alt="Vesta Diagnostics building exterior" 
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="group overflow-hidden rounded-lg border border-border/20 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300">
                      <img 
                        src="/Contact/contact-2.png" 
                        alt="Vesta Diagnostics reception area" 
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="group overflow-hidden rounded-lg border border-border/20 hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 md:col-span-2 lg:col-span-1">
                      <img 
                        src="/Contact/contact-3.png" 
                        alt="Vesta Diagnostics laboratory" 
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:gap-6">
                  <div className="bg-card p-4 sm:p-6 rounded-xl border border-border/20 hover:border-primary/30 transition-all hover:shadow-lg hover:translate-y-[-4px]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-muted-foreground mb-1 text-sm sm:text-base">Pathologist</h3>
                        <p className="text-lg sm:text-xl font-semibold text-foreground">Dr. Rajeshwar Reddy</p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Vesta Diagnostics</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 sm:p-6 rounded-xl border border-border/20 hover:border-primary/30 transition-all hover:shadow-lg hover:translate-y-[-4px]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-muted-foreground mb-1 text-sm sm:text-base">Email Us</h3>
                        <a 
                          href="mailto:contact@vestadiagnostics.com" 
                          className="text-base sm:text-xl font-semibold text-primary hover:text-primary-accent transition-colors break-all sm:break-normal"
                        >
                          contact@vestadiagnostics.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gradient-to-br from-card to-primary/5 p-4 sm:p-6 rounded-xl border border-border/20 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-accent transition-colors" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                        <span>1</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground mb-2">Appointments</h3>
                      <a
                        href="tel:+91XXXXXXXXXX"
                        className="text-lg sm:text-xl font-bold text-primary hover:text-primary-accent transition-colors inline-flex items-center gap-2 flex-wrap"
                      >
                        +91 XXXXXXXXXX
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </a>
                      <p className="text-sm sm:text-base text-muted-foreground mt-2">
                        Monday - Saturday, 7:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-card to-primary/5 p-4 sm:p-6 rounded-xl border border-border/20 hover:shadow-lg transition-all group">
                  <div className="flex items-start gap-3 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-accent transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-playfair text-lg sm:text-xl font-semibold text-foreground mb-2">Our Diagnostic Center</h3>
                      <p className="text-base sm:text-lg font-medium text-foreground">
                        25-8-123, MG Road, Near Paradise Circle, Secunderabad - 500003, Telangana
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground mt-2 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Walk-ins welcome
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border border-border/20">
                <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-primary/5 to-primary-accent/5">
                  <h3 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground mb-2 sm:mb-3">
                    Our Diagnostic Center
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Visit our state-of-the-art facility in Secunderabad for all your diagnostic needs.
                  </p>
                </div>

                <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.263715316434!2d78.48685131538478!3d17.44395078804485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x5c3ef41c20a0f0a8!2sMG%20Rd%2C%20Secunderabad%2C%20Telangana%20500003!5e0!3m2!1sen!2sin!4v1623390276143!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />

                  <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 bg-card/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-2xl border border-border/20 flex items-center gap-2 sm:gap-3 animate-float max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-2rem)] lg:max-w-none">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary-accent rounded-full animate-pulse flex-shrink-0"></div>
                    <div className="min-w-0">
                      <p className="font-bold text-foreground text-sm sm:text-base truncate">Vesta Diagnostics</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Medical Laboratory</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 bg-card border-t border-border/20">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">Secunderabad, Telangana</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Diagnostic Center</p>
                      </div>
                    </div>
                    <a 
                      href="https://www.google.com/maps/place/MG+Rd,+Secunderabad,+Telangana+500003/@17.4439508,78.4868513,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb9158f201b205:0x5c3ef41c20a0f0a8!8m2!3d17.4439457!4d78.4894262!16s%2Fg%2F11c1z3w3qk?entry=ttu" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:text-primary-accent transition-colors flex items-center gap-1 text-sm sm:text-base whitespace-nowrap"
                    >
                      Get Directions
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" sm-width="16" sm-height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactInfo;