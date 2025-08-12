// "use client"

// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import { useState } from "react"
// import UserProfile from "./UserProfile"

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isTestsHovered, setIsTestsHovered] = useState(false)

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Tests", href: "/tests" },
//     { name: "Franchise", href: "/franchise" },
//     { name: "Contact", href: "/contactus" },
//   ]

//   const testsByCategory = [
//   {
//     category: "endocrinology",
//     tests: [
//       "T3, T4, TSH",
//       "LH",
//       "FSH",
//       "Testosterone",
//       "Prolactin"
//     ]
//   },
  
//   {
//     category: "haematology",
//     tests: [
//       "Complete Blood Count",
//       "Erythrocyte Sedimentation Rate",
//       "RBC Count",
//       "WBC Count",
//       "Platelet Count",
//       "Blood Group"
//     ]
//   },
//   {
//     category: "microbiology",
//     tests: [
//       "Sputum for A+B",
//       "Blood Cultures",
//       "Urine Cultures",
//       "Fungal Test (Skin)",
//       "Fungal Test (Nail)"
//     ]
//   },
//   {
//     category: "cardiology",
//     tests: [
//       "Lipoprotein",
//       "Apolipoprotein A",
//       "Apolipoprotein B",
//       "High Sensitivity C-Reactive Protein",
//       "ApoB/ApoA Ratio"
//     ]
//   },
//   {
//     category: "serology",
//     tests: [
//       "Widal Test",
//       "Dengue Serology",
//       "NDRL",
//       "C-Reactive Protein",
//       "ASO Titer",
//       "Rheumatoid Factor",
//       "PNT Test",
//       "HCV Antibody",
//       "HIV Test",
//       "Malaria Parasite Antigen",
//       "HBsAg"
//     ]
//   },
//   {
//     category: "immunology",
//     tests: [
//       "ANA Profile",
//       "Anti-CCP Antibodies"
//     ]
//   },
//   {
//     category: "biochemistry",
//     tests: [
//       "Random Blood Sugar",
//       "Blood Urea",
//       "Serum Creatinine",
//       "Serum Uric Acid",
//       "Serum Calcium",
//       "Iron",
//       "Cholesterol",
//       "Triglycerides",
//       "Serum Bilirubin",
//       "SGOT (AST)",
//       "SGPT (ALT)",
//       "Serum Electrolytes",
//       "Serum Proteins",
//       "HbA1c",
//       "Vitamin B12",
//       "Vitamin D3",
//       "Alkaline Phosphatase",
//       "Gamma-Glutamyl Transferase",
//       "Ferritin",
//       "Total Iron-Binding Capacity"
//     ]
//   }
// ];

//   return (
//     <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* Logo */}
//           <div className="flex items-center space-x-3 flex-shrink-0">
//             <img
//               src="/logo.png"
//               alt="Vesta Logo"
//               className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-xl"
//             />
//             <h1 className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
//               Vesta Diagnostics
//             </h1>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8 relative">
//             {navItems.map((item) => (
//               <div
//                 key={item.name}
//                 className="relative"
//                 onMouseEnter={() => item.name === "Tests" ? setIsTestsHovered(true) : null}
//                 onMouseLeave={() => item.name === "Tests" ? setIsTestsHovered(false) : null}
//               >
//                 <Button variant="nav" size="sm" asChild className="text-base">
//                   <a href={item.href}>{item.name}</a>
//                 </Button>

//                 {item.name === "Tests" && isTestsHovered && (
//                   <div
//                     className="hidden lg:block absolute top-6 -left-[400px] mt-2 w-[1000px] bg-white shadow-dropdown rounded-lg border border-gray-200 z-50"
//                     onMouseEnter={() => setIsTestsHovered(true)}
//                     onMouseLeave={() => setIsTestsHovered(false)}
//                   >
//                     <div className="p-6">
//                       <div className="text-center mb-6">
//                         <h2 className="text-2xl font-bold text-primary">Top Tests</h2>
//                       </div>
//                       <div className="grid grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
//                         {testCategories.map((category) => (
//                           <div key={category.name} className="space-y-3 text-center">
//                             <h3 className="font-bold text-lg text-primary mb-3">{category.name}</h3>
//                             <div className="grid grid-cols-2 gap-4 text-left">
//                               <div className="space-y-0">
//                                 <ul className="space-y-0">
//                                   {category.tests.slice(0, Math.ceil(category.tests.length / 2)).map((test, index) => (
//                                     <li key={test}>
//                                       <div className="flex items-start py-2">
//                                         <span className="text-primary mr-2 mt-1.5 text-xs">•</span>
//                                         <a
//                                           href="#"
//                                           className="text-sm text-gray-700 hover:text-primary transition-smooth text-wrap leading-relaxed whitespace-normal break-words"
//                                           onClick={(e) => e.preventDefault()}
//                                         >
//                                           {test}
//                                         </a>
//                                       </div>
//                                       {index < Math.ceil(category.tests.length / 2) - 1 && (
//                                         <div className="border-b border-dashed border-gray-200"></div>
//                                       )}
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                               <div className="space-y-0">
//                                 <ul className="space-y-0">
//                                   {category.tests.slice(Math.ceil(category.tests.length / 2)).map((test, index) => (
//                                     <li key={test}>
//                                       <div className="flex items-start py-2">
//                                         <span className="text-primary mr-2 mt-1.5 text-xs">•</span>
//                                         <a
//                                           href="#"
//                                           className="text-sm text-gray-700 hover:text-primary transition-smooth leading-relaxed line-clamp-1"
//                                           onClick={(e) => e.preventDefault()}
//                                         >
//                                           {test}
//                                         </a>
//                                       </div>
//                                       {index < Math.floor(category.tests.length / 2) - 1 && (
//                                         <div className="border-b border-dashed border-gray-200"></div>
//                                       )}
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             </div>
//                             <div className="pt-4">
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <UserProfile />
//           </div>

//           {/* Mobile Menu Button */}
//           <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
//             {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
//             <div className="px-4 py-6 space-y-4">
//               {navItems.map((item) => (
//                 <Button key={item.name} variant="nav" size="lg" asChild className="w-full justify-start text-left">
//                   <a href={item.href} onClick={() => setIsMenuOpen(false)}>
//                     {item.name}
//                   </a>
//                 </Button>
//               ))}
//               <div className="pt-4 border-t border-gray-100">
//                 <UserProfile />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }

// export default Header

"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import UserProfile from "./UserProfile"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTestsHovered, setIsTestsHovered] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tests", href: "/tests" },
    { name: "Franchise", href: "/franchise" },
    { name: "Contact", href: "/contactus" },
  ]

  const testsByCategory = [
    {
      category: "endocrinology",
      tests: ["T3, T4, TSH", "LH", "FSH", "Testosterone", "Prolactin"],
    },
    {
      category: "haematology",
      tests: [
        "Complete Blood Count",
        "Erythrocyte Sedimentation Rate",
        "RBC Count",
        "WBC Count",
        "Platelet Count",
        "Blood Group",
      ],
    },
    {
      category: "microbiology",
      tests: ["Sputum for A+B", "Blood Cultures", "Urine Cultures", "Fungal Test (Skin)", "Fungal Test (Nail)"],
    },
    {
      category: "cardiology",
      tests: [
        "Lipoprotein",
        "Apolipoprotein A",
        "Apolipoprotein B",
        "High Sensitivity C-Reactive Protein",
        "ApoB/ApoA Ratio",
      ],
    },
    {
      category: "serology",
      tests: [
        "Widal Test",
        "Dengue Serology",
        "NDRL",
        "C-Reactive Protein",
        "ASO Titer",
        "Rheumatoid Factor",
        "PNT Test",
        "HCV Antibody",
        "HIV Test",
        "Malaria Parasite Antigen",
        "HBsAg",
      ],
    },
    {
      category: "immunology",
      tests: ["ANA Profile", "Anti-CCP Antibodies"],
    },
    {
      category: "biochemistry",
      tests: [
        "Random Blood Sugar",
        "Blood Urea",
        "Serum Creatinine",
        "Serum Uric Acid",
        "Serum Calcium",
        "Iron",
        "Cholesterol",
        "Triglycerides",
        "Serum Bilirubin",
        "SGOT (AST)",
        "SGPT (ALT)",
        "Serum Electrolytes",
        "Serum Proteins",
        "HbA1c",
        "Vitamin B12",
        "Vitamin D3",
        "Alkaline Phosphatase",
        "Gamma-Glutamyl Transferase",
        "Ferritin",
        "Total Iron-Binding Capacity",
      ],
    },
  ]

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <img src="/logo.png" alt="Vesta Logo" className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-xl" />
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vesta Diagnostics
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => (item.name === "Tests" ? setIsTestsHovered(true) : null)}
                onMouseLeave={() => (item.name === "Tests" ? setIsTestsHovered(false) : null)}
              >
                <Button variant="nav" size="sm" asChild className="text-base">
                  <a href={item.href}>{item.name}</a>
                </Button>

                {item.name === "Tests" && isTestsHovered && (
                  <div
                    className="hidden lg:block absolute top-6 -left-[300px] mt-2 w-[800px] bg-white shadow-dropdown rounded-lg border border-gray-200 z-50"
                    onMouseEnter={() => setIsTestsHovered(true)}
                    onMouseLeave={() => {
                      setIsTestsHovered(false)
                      setHoveredCategory(null)
                    }}
                  >
                    <div className="flex h-[400px]">
                      {/* Left Panel - Categories */}
                      <div className="w-1/3 border-r border-gray-200 p-4">
                        <h3 className="text-lg font-semibold text-primary mb-4">Test Categories</h3>
                        <ul className="space-y-2">
                          {testsByCategory.map((categoryData) => (
                            <li key={categoryData.category}>
                              <button
                                className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize transition-colors ${
                                  hoveredCategory === categoryData.category
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                onMouseEnter={() => setHoveredCategory(categoryData.category)}
                              >
                                {categoryData.category}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Panel - Tests */}
                      <div className="w-2/3 p-4">
                        {hoveredCategory ? (
                          <div>
                            <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                              {hoveredCategory} Tests
                            </h3>
                            <div className="max-h-[320px] overflow-y-auto">
                              <ul className="space-y-2">
                                {testsByCategory
                                  .find((cat) => cat.category === hoveredCategory)
                                  ?.tests.map((test) => (
                                    <li key={test}>
                                      <a
                                        href="#"
                                        className="block px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        {test}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-center">
                            <div>
                              <div className="text-gray-400 mb-2">
                                <svg
                                  className="w-12 h-12 mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                              <p className="text-gray-500 text-sm">Hover over a category to view available tests</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
              <div className="pt-4 border-t border-gray-100">
                <UserProfile />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header