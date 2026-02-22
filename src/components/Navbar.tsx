import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import logo from "@/assets/restaurant-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "https://thewhistlestop.menu/", isExternal: true },
  { label: "Specials", href: "#specials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-card/95 backdrop-blur-xl warm-shadow py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            <img
              src={logo}
              alt="The Whistle Stop by Ariel Seafoods"
              className={`w-auto transition-all duration-500 ease-out ${
                isScrolled ? "h-14 md:h-16 scale-95" : "h-16 md:h-20 scale-100"
              }`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors font-medium ${
                    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white hover:text-white/70"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`transition-colors font-medium ${
                    isScrolled ? "text-foreground/80 hover:text-primary" : "text-white hover:text-white/70"
                  }`}
                >
                  {link.label}
                </button>
              ),
            )}
          </div>

          {/* CTA & Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:7722201020"
              className={`flex items-center gap-2 transition-colors ${
                isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(772) 220-1020</span>
            </a>
            <a
              href="https://maps.google.com/?q=4920+SE+Dixie+Hwy,+Stuart,+FL+34997"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 transition-colors ${
                isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium text-sm">4920 SE Dixie Hwy</span>
            </a>
            <Button variant="default" size="sm" asChild>
              <a href="https://thewhistlestop.menu/" target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card rounded-lg mb-4 p-4 warm-shadow animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.isExternal ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
                  >
                    {link.label}
                  </button>
                ),
              )}
              <hr className="border-border" />
              <a
                href="tel:7722201020"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">(772) 220-1020</span>
              </a>
              <a
                href="https://maps.google.com/?q=4920+SE+Dixie+Hwy,+Stuart,+FL+34997"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2"
              >
                <MapPin className="w-4 h-4" />
                <span className="font-medium">4920 SE Dixie Hwy, Stuart, FL</span>
              </a>
              <Button variant="default" className="w-full" asChild>
                <a href="https://thewhistlestop.menu/" target="_blank" rel="noopener noreferrer">
                  Order Now
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
