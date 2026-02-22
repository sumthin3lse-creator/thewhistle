import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import foodPhoto3 from "@/assets/food-photo-3.png";
import foodPhoto4 from "@/assets/food-photo-4.png";
import foodPhoto5 from "@/assets/food-photo-5.png";
import foodPhoto6 from "@/assets/food-photo-6.png";
import foodPhoto7 from "@/assets/food-photo-7.png";
import foodPhoto8 from "@/assets/food-photo-8.png";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const foodShowcase = [
  { src: foodPhoto3, alt: "Delicious meal from our kitchen", label: "Fresh & Local" },
  { src: foodPhoto4, alt: "House specialty dish", label: "House Special" },
  { src: foodPhoto5, alt: "Chef's favorite plate", label: "Chef's Pick" },
  { src: foodPhoto6, alt: "Popular menu item", label: "Fan Favorite" },
  { src: foodPhoto7, alt: "Signature sandwich", label: "Signature Subs" },
  { src: foodPhoto8, alt: "Breakfast classic", label: "Breakfast Classics" },
];

export function MenuSection() {
  return (
    <section id="menu" className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-20">
            <motion.span 
              className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What We Serve
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Our Menu Highlights
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Fresh ingredients, bold flavors, and recipes made with love. Discover
              why Stuart locals keep coming back for more.
            </p>
          </div>
        </ScrollReveal>

        {/* From Our Kitchen Showcase */}
        <ScrollRevealStagger className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3">
          {foodShowcase.map((food) => (
            <ScrollRevealItem key={food.label}>
              <motion.div
                className="group relative overflow-hidden rounded-xl border border-border shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={food.src}
                  alt={food.alt}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="font-display text-sm font-bold text-white drop-shadow sm:text-lg">
                    {food.label}
                  </span>
                </div>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-14 md:mt-16">
            <p className="text-muted-foreground mb-6 text-lg">
              Plus breakfast sandwiches, sides, and daily specials!
            </p>
            <a
              href="https://www.thewhistlestop.menu"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-3"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
