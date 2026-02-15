import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroSandwich from "@/assets/food-photo-10.png";
import breakfastBurrito from "@/assets/breakfast-burrito.jpg"; // Keep existing for now if no better option
import smashBurger from "@/assets/smash-burger.jpg"; // Keep existing
import italianSub from "@/assets/food-style-1.jpg";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const menuItems = [
  {
    name: "Famous Philly's",
    description:
      "Served on a grilled hoagie roll topped with grilled onions & our homemade cheese sauce. Beef or chicken available.",
    image: heroSandwich,
    featured: true,
    price: "From $9.95",
  },
  {
    name: "All Day Breakfast",
    description:
      "Train Wreck, omelettes, breakfast platters, burritos and more. Served all day!",
    image: breakfastBurrito,
    featured: true,
    price: "From $4.95",
  },
  {
    name: "Smash Burgers",
    description:
      "5 oz never frozen Angus beef patty on a grilled kaiser. Build your way with your choice of cheese & toppings.",
    image: smashBurger,
    featured: true,
    price: "From $8.95",
  },
  {
    name: "Cold Subs & Wraps",
    description:
      "Italian subs, BLTs, club sandwiches, and fresh wraps made with premium ingredients.",
    image: italianSub,
    featured: true,
    price: "From $8.95",
  },
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

        <ScrollRevealStagger className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <ScrollRevealItem key={item.name}>
              <motion.div 
                className="group relative bg-card rounded-2xl overflow-hidden warm-shadow hover-lift h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  {/* Featured badge */}
                  {item.featured && (
                    <motion.div 
                      className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      Customer Favorite
                    </motion.div>
                  )}
                  
                  {/* Price tag */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-foreground font-bold text-lg px-4 py-2 rounded-lg shadow-lg">
                    {item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  <h3 className="font-display text-2xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-14 md:mt-16">
            <p className="text-muted-foreground mb-6 text-lg">
              Plus breakfast sandwiches, sides, and daily specials!
            </p>
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-3"
            >
              View Full Menu
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
