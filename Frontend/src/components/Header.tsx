import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tests", href: "/tests" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contactus" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-semibold bg-gradient-primary bg-clip-text text-transparent p-2">
              Vesta Diagnostics
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="nav"
                size="sm"
                asChild
                className="text-base"
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="lg">
              Book a Demo
            </Button>
            <Button variant="premium" size="lg" onClick={()=> {navigate('/login')}}>
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-soft border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="nav"
                  size="lg"
                  asChild
                  className="w-full justify-start text-left"
                >
                  <a href={item.href} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </a>
                </Button>
              ))}
              <div className="pt-4 space-y-3 border-t border-gray-100">
                <Button variant="outline" size="lg" className="w-full">
                  Book a Demo
                </Button>
                <Button variant="premium" size="lg" className="w-full">
                  Log In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;