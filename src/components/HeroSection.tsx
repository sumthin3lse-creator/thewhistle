import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-sandwich.jpg";

export function HeroSection() {
  const scrollToMenu = () => {
    const element = document.querySelector("#menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Delicious Philly Cheesesteak"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-primary-foreground/80 font-medium tracking-widest uppercase mb-4 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Stuart, Florida's Favorite Sandwich Shop
          </p>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-up"
            style={{ animationDelay: "0.2s", textShadow: "var(--text-shadow)" }}
          >
            The Whistle Stop
          </h1>

          <p
            className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-display italic animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            by Ariel Seafoods
          </p>

          <p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            Legendary Philly Cheesesteaks, Hearty Breakfast Burritos & Fresh
            Subs. Locally-owned, family-made with love since 2023.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Button variant="hero" size="lg" asChild>
              <a
                href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on DoorDash
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" onClick={scrollToMenu}>
              View Our Menu
            </Button>
          </div>

          {/* Info Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 text-primary-foreground/70 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>4920 SE Dixie Hwy, Stuart, FL</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Mon-Sat: 7AM - 3PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
