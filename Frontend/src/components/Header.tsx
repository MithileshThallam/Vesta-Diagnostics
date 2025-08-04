"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import CartBadge from "./cartBadge"
import UserProfile from "./UserProfile"
import { useNavigate } from "react-router-dom"

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
        "25-Hydroxy Vitamin D, Serum",
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
        "Bone Densitometry Right Femur/Flip",
        "Bone Densitometry Spine",
        "CT Abdomen & Pelvis Plain",
        "CT Chest/Thorax Plain",
        "CT Neck Plain Study",
        "CT PNS (Axial+Coronal)",
        "CT Right Knee (3D Study)",
        "CT Temporal Bone",
        "HRCT Chest",
        "Mammography Bilateral",
        "MRI Brain Plain",
        "MRI Dorsal Spine / Thoracic Spine",
        "MRI Lumbar Spine",
        "MRI Right Foot",
        "MRI Right Knee Joint",
        "MRI Stroke Protocol",
        "Ultrasound Doppler Bilateral Lower Limbs, Venous",
        "Ultrasound Doppler Left Lower Limb, Venous",
        "Ultrasound NT Scan",
        "Ultrasound Soft Parts",
        "Ultrasound Transvaginal Scan (TVS)",
        "X-Ray Erect Abdomen",
        "X-Ray LS Spine AP And LAT View",
        "X-Ray PNS (Water View)",
        "X-Ray Right Knee AP/LAT View(Standing)",
        "X-Ray Right Foot AP View"
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
                  <a href={item.href}>{item.name}</a>
                </Button>

                {item.name === "Tests" && isTestsHovered && (
                  <div className="hidden lg:block absolute top-full -left-72 mt-2 w-[800px] bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50">
                    <div className="grid grid-cols-2 gap-6">
                      {testCategories.map((category) => (
                        <div key={category.name} className="space-y-2">
                          <h3 className="font-bold text-lg text-primary mb-2">{category.name}</h3>
                          <ul className="space-y-1">
                            {category.tests.slice(0, 10).map((test) => (
                              <li key={test}>
                                <a
                                  href="#"
                                  className="text-sm text-gray-700 hover:text-primary hover:underline"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  {test}
                                </a>
                              </li>
                            ))}
                          </ul>
                          {category.tests.length > 10 && (
                            <a
                              href="/tests"
                              className="text-sm text-primary hover:underline font-medium"
                            >
                              View all {category.name.toLowerCase()} tests...
                            </a>
                          )}
                        </div>
                      ))}
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