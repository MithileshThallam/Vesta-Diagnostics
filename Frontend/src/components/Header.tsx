import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import CartBadge from "./cartBadge"
import UserProfile from "./UserProfile"
import { useNavigate, Link } from "react-router-dom"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTestsHovered, setIsTestsHovered] = useState(false)
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tests", href: "/tests" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contactus" },
  ]

  const testCategories = [
    {
      name: "Pathology",
      tests: [
        "25 - Hydroxy Vitamin D, Serum",
        "ANA Profile, Serum",
        "Anti Cyclic Citrullinated Peptide (Anti CCP), Serum",
        "Apolipoprotein A1, Serum",
        "Blood Urea Nitrogen (BUN), Serum",
        "Calcium, Serum",
        "Complete Urine Examination (CUE), Urine",
        "Culture And Sensitivity - Automated/Vitek 2, Blood",
        "Dengue IgM Antibody, ELISA Serum",
        "Electrolytes, Serum",
        "Glycosylated Hemoglobin (HbA1C), EDTA Whole Blood",
        "Hemogram, EDTA Whole Blood",
        "Hepatitis C Antibody (Anti-HCV), Serum",
        "Iron with TIBC, Serum",
        "Lipoprotein A (Lp A), Serum",
        "Pap Smear, Liquid Based Cytology",
        "Prostate Specific Antigen (PSA) Total, Serum",
        "Thyroid Antibodies (TG & TPO), Serum",
        "Thyroid Stimulating Hormone (TSH) Ultrasensitive, Serum",
        "Vitamin B12 (Cyanocobalamin), Serum"
      ]
    },
    {
      name: "Radiology",
      tests: [
        "Bone Densitometry Right Forearm",
        "Bone Densitometry Whole Body",
        "CT Brain Plain",
        "CT KUB Plain",
        "CT Peripheral Angiogram",
        "CT Pulmonary Angiogram",
        "CT Right Wrist (3D Study)",
        "CT Urography Plain",
        "M.R.C.P.",
        "MRI Abdomen and Pelvis",
        "MRI Cervical Spine",
        "MRI Left Shoulder Joint",
        "MRI Right Ankle Joint",
        "MRI Right Hand",
        "MRI Sella + Contrast",
        "Ultrasound Abdomen Pelvis",
        "Ultrasound Doppler Carotid",
        "Ultrasound Neck",
        "Ultrasound Pelvis-Female",
        "Ultrasound TIFFA",
        "X-Ray Chest PA View",
        "X-Ray HSG (Hysterosalpingogram)",
        "X-Ray Pelvis With Both Hip AP View",
        "X-Ray Right Foot AP View",
        "X-Ray Right Shoulder AP View"
      ]
    }
  ]

  const handleCartClick = () => {
    navigate('/cart');
    console.log("Cart clicked")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl pb-1 lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vesta Diagnostics
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.name === "Tests" ? setIsTestsHovered(true) : null}
                onMouseLeave={() => item.name === "Tests" ? setIsTestsHovered(false) : null}
              >
                <Button variant="nav" size="sm" asChild className="text-base">
                  <Link to={item.href}>{item.name}</Link>
                </Button>

                {item.name === "Tests" && isTestsHovered && (
                  <div
                    className="hidden lg:block absolute top-6 -left-[400px] mt-2 w-[1000px] bg-white shadow-dropdown rounded-lg border border-gray-200 z-50"
                    onMouseEnter={() => setIsTestsHovered(true)}
                    onMouseLeave={() => setIsTestsHovered(false)}
                  >
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-primary">Top Tests</h2>
                      </div>
                      <div className="grid grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
                        {testCategories.map((category) => (
                          <div key={category.name} className="space-y-3 text-center">
                            <h3 className="font-bold text-lg text-primary mb-3">{category.name}</h3>
                            {/* <div className="border-b border-dashed border-gray-300 mb-4"></div> */}
                            <div className="grid grid-cols-2 gap-4 text-left">
                              <div className="space-y-0">
                                <ul className="space-y-0">
                                  {category.tests.map((test, index) => (
                                    <li key={test}>
                                      <div className="flex items-start py-2">
                                        <span className="text-primary mr-2 mt-1.5 text-xs">•</span>
                                        <a
                                          href="#"
                                          className="text-sm text-gray-700 hover:text-primary transition-smooth text-wrap leading-relaxed whitespace-normal break-words"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {test}
                                        </a>
                                      </div>
                                      {index < Math.ceil(category.tests.length / 2) - 1 && (
                                        <div className="border-b border-dashed border-gray-200"></div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-0">
                                <ul className="space-y-0">
                                  {category.tests.map((test, index) => (
                                    <li key={test}>
                                      <div className="flex items-start py-2">
                                        <span className="text-primary mr-2 mt-1.5 text-xs">•</span>
                                        <a
                                          href="#"
                                          className="text-sm text-gray-700 hover:text-primary transition-smooth leading-relaxed line-clamp-1"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          {test}
                                        </a>
                                      </div>
                                      {index < Math.floor(category.tests.length / 2) - 1 && (
                                        <div className="border-b border-dashed border-gray-200"></div>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="pt-4">
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <CartBadge onClick={handleCartClick} />
            <UserProfile />
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Button key={item.name} variant="nav" size="lg" asChild className="w-full justify-start text-left">
                  <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </a>
                </Button>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <CartBadge onClick={handleCartClick} className="flex-1 mr-2" />
                  <div className="flex-1">
                    <UserProfile />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header