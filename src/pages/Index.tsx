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

const Index = () => {
  return (
    <main className="min-h-screen">
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
    </main>
  );
};

export default Index;
