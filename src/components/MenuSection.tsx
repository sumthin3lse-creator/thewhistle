import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import heroSandwich from "@/assets/hero-sandwich.jpg";
import breakfastBurrito from "@/assets/breakfast-burrito.jpg";
import smashBurger from "@/assets/smash-burger.jpg";
import italianSub from "@/assets/italian-sub.jpg";

const menuItems = [
  {
    name: "Philly Cheesesteaks",
    description:
      "Authentic, mouthwatering cheesesteaks with perfectly grilled steak and melted cheese on a fresh hoagie roll.",
    image: heroSandwich,
    featured: true,
  },
  {
    name: "Breakfast Burritos",
    description:
      "Hearty morning burritos packed with fluffy scrambled eggs, cheese, bacon, and fresh peppers.",
    image: breakfastBurrito,
    featured: true,
  },
  {
    name: "Smash Burgers",
    description:
      "Juicy, crispy-edged smash burgers with melted American cheese on a soft brioche bun.",
    image: smashBurger,
    featured: true,
  },
  {
    name: "Fresh Subs",
    description:
      "Classic deli-style subs with premium meats, fresh vegetables, and house-made dressings.",
    image: italianSub,
    featured: true,
  },
];

export function MenuSection() {
  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase mb-3">
            What We Serve
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Menu Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fresh ingredients, bold flavors, and recipes made with love. Discover
            why Stuart locals keep coming back for more.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" staggerDelay={0.12}>
          {menuItems.map((item) => (
            <StaggerItem key={item.name}>
              <motion.div
                className="group bg-card rounded-2xl overflow-hidden warm-shadow hover:warm-shadow-hover transition-all duration-300"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Customer Favorite
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal variant="fadeUp" delay={0.4} className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Plus breakfast sandwiches, sides, and daily specials!
          </p>
          <a
            href="tel:7722201020"
            className="text-primary font-semibold hover:underline"
          >
            Call (772) 220-1020 for full menu
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
