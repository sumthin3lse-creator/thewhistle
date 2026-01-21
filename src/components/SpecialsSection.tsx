import { Calendar, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const weeklySpecials = [
  {
    day: "Monday",
    special: "Meatloaf, Mashed Potatoes & Gravy with Garlic Toast",
  },
  {
    day: "Tuesday",
    special: "Cuban Sandwich & Fries",
  },
  {
    day: "Wednesday",
    special: "Open Face Hot Roast Beef with Mashed Potatoes & Gravy",
  },
  {
    day: "Thursday",
    special: "Cuban Sandwich & Fries",
  },
  {
    day: "Friday",
    special: "Pork Loin, Mashed Potatoes & Gravy, with Green Beans & Garlic Toast",
  },
];

export function SpecialsSection() {
  return (
    <section id="specials" className="section-padding bg-accent text-accent-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--accent-foreground)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-10 left-10 opacity-10">
        <Sparkles className="w-20 h-20" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 rotate-180">
        <Sparkles className="w-16 h-16" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                Don't Miss Out
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Weekly Specials
              </h2>
              <p className="text-lg md:text-xl text-accent-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Come enjoy our delicious daily specials! Available for a limited time
                — call ahead to reserve yours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="space-y-4">
            {weeklySpecials.map((item, index) => (
              <ScrollRevealItem key={item.day}>
                <motion.div 
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10 hover:bg-accent-foreground/10 transition-all duration-300 group"
                  whileHover={{ x: 8, backgroundColor: "hsla(var(--accent-foreground) / 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 sm:w-44">
                    <motion.div 
                      className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="font-display font-bold text-lg">
                      {item.day}
                    </span>
                  </div>
                  <div className="h-px sm:h-8 sm:w-px bg-accent-foreground/20 hidden sm:block" />
                  <p className="text-accent-foreground/80 flex-1 text-lg">
                    {item.special}
                  </p>
                </motion.div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-accent-foreground/50 mb-4 text-lg">
                Saturday specials vary — ask when you visit!
              </p>
              <motion.a
                href="tel:7722201020"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Call to Reserve a Special
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
