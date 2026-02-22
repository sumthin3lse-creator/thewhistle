import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { SpecialsSection } from "@/components/SpecialsSection";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { AwardsSection } from "@/components/AwardsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import TawkChat from "@/components/TawkChat";
import { MobileActionBar } from "@/components/MobileActionBar";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "The Whistle Stop by Ariel Seafoods",
  "image": "https://thewhistle.lovable.app/favicon.ico",
  "url": "https://thewhistle.lovable.app",
  "telephone": "(772) 220-1020",
  "email": "thewhistlestopstuart@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4920 SE Dixie Hwy",
    "addressLocality": "Stuart",
    "addressRegion": "FL",
    "postalCode": "34997",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 27.1737,
    "longitude": -80.2342
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "15:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "servesCuisine": ["American", "Seafood", "Deli", "Sandwiches"],
  "menu": "https://thewhistle.lovable.app/#menu",
  "acceptsReservations": "false",
  "sameAs": [
    "https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
  ]
};

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(restaurantSchema)}
        </script>
      </Helmet>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <SpecialsSection />
      <SocialMediaSection />
      <AwardsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <TawkChat />
      <MobileActionBar />
      {/* Spacer for mobile bottom bar */}
      <div className="h-14 lg:hidden" />
    </main>
  );
};

export default Index;
