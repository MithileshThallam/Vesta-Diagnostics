import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

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
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-primary bg-clip-text text-transparent p-2">
              Vesta Diagnostics
            </h1>
          </div>

          {/* Desktop Navigation - Shows on medium screens and up */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="nav"
                size="sm"
                asChild
                className="text-sm lg:text-base"
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Shows on medium screens and up */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <Button variant="outline" size="sm" className="text-sm lg:text-base lg:px-6">
              Book a Demo
            </Button>
            <Button 
              variant="premium" 
              size="sm" 
              className="text-sm lg:text-base lg:px-6"
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button - Shows on small screens only */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-soft border-b border-gray-100">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="nav"
                  size="lg"
                  asChild
                  className="w-full justify-start text-left px-4 py-3"
                >
                  <a 
                    href={item.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full"
                  >
                    {item.name}
                  </a>
                </Button>
              ))}
              <div className="pt-3 space-y-3 border-t border-gray-100">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full px-4 py-3"
                >
                  Book a Demo
                </Button>
                <Button 
                  variant="premium" 
                  size="lg" 
                  className="w-full px-4 py-3"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                >
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