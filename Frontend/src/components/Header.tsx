"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import CartBadge from "./cartBadge"
import UserProfile from "./UserProfile"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tests", href: "/tests" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contactus" },
  ]

  const handleCartClick = () => {
    // TODO: Open cart modal/drawer
    console.log("Cart clicked")
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vesta Diagnostics
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button key={item.name} variant="nav" size="sm" asChild className="text-base">
                <a href={item.href}>{item.name}</a>
              </Button>
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
