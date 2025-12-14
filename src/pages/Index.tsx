import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { MenuSection } from "@/components/MenuSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SpecialsSection } from "@/components/SpecialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StickyOrderButton } from "@/components/StickyOrderButton";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
      <SpecialsSection />
      <ContactSection />
      <Footer />
      <StickyOrderButton />
    </main>
  );
};

export default Index;
