import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import foodPhillys from "@/assets/food-phillys.jpg";
import foodSalads from "@/assets/food-salads.jpg";
import foodUnclePumpkin from "@/assets/food-uncle-pumpkin.png";
import foodSweets from "@/assets/food-sweets.jpg";
import foodTrainWreck from "@/assets/food-train-wreck.jpg";
import foodSalernoClub from "@/assets/food-salerno-club.png";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";
import { FoodDetailDialog } from "./FoodDetailDialog";

const foodShowcase = [
  {
    src: foodPhillys,
    alt: "Our Philly cheesesteaks",
    label: "Our Philly's",
    description: "Choose from our legendary Beef Philly, Chicken Philly, or go half & half — all loaded with melted cheese and grilled onions on a fresh hoagie roll.",
  },
  {
    src: foodSalads,
    alt: "Fresh salads",
    label: "Our Salads",
    description: "Fresh, crisp, and packed with flavor — choose from The Titanic, the Chopped Hoagie, or the Deluxe. Every salad is made to order with the freshest ingredients.",
  },
  {
    src: foodUnclePumpkin,
    alt: "The Uncle Pumpkin burger",
    label: "The Uncle Pumpkin",
    description: "A towering double smash burger stacked with crispy bacon, caramelized onions, melted American cheese, and a golden onion ring on top. A Whistle Stop legend.",
  },
  {
    src: foodSweets,
    alt: "Sweet treats and desserts",
    label: "The Sweets",
    description: "Satisfy your sweet tooth with our fresh-baked cinnamon rolls, blueberry muffins, chocolate chip cookies, fudge brownies, and hand-scooped ice cream.",
  },
  {
    src: foodSalads,
    alt: "The Titanic salad",
    label: "The Titanic",
    description: "Our signature salad — a mountain of fresh tuna salad over crisp mixed greens with cucumbers, tomatoes, and your choice of dressing. It's unsinkable.",
  },
  {
    src: foodTrainWreck,
    alt: "The Train Wreck breakfast",
    label: "The Train Wreck",
    description: "A glorious breakfast pile-up: crispy home fries topped with eggs, bacon, sausage, ham, peppers, onions, and smothered in cheese sauce. Our most famous dish.",
  },
  {
    src: foodSalernoClub,
    alt: "The Salerno Club sandwich",
    label: "The Salerno Club",
    description: "A triple-decker club stacked high with turkey, ham, crispy bacon, lettuce, tomato, and mayo on toasted bread. Served with chips — a classic done right.",
  },
];

export function MenuSection() {
  const [selectedItem, setSelectedItem] = useState<typeof foodShowcase[0] | null>(null);

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

        {/* Food Showcase Grid - 7 items */}
        <ScrollRevealStagger className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3">
          {foodShowcase.map((food, i) => (
            <ScrollRevealItem
              key={food.label}
              className={i === 6 ? "col-span-2 sm:col-span-1" : ""}
            >
              <motion.button
                onClick={() => setSelectedItem(food)}
                className="group relative overflow-hidden rounded-xl border border-border shadow-md w-full text-left cursor-pointer"
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
              </motion.button>
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

      <FoodDetailDialog
        item={selectedItem}
        open={!!selectedItem}
        onOpenChange={(open) => { if (!open) setSelectedItem(null); }}
      />
    </section>
  );
}
