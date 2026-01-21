import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const testimonials = [
  {
    name: "Mike R.",
    rating: 5,
    quote: "Best cheesesteak I've had outside of Philly! The meat is always fresh and perfectly seasoned. This place is a hidden gem.",
  },
  {
    name: "Sarah T.",
    rating: 5,
    quote: "The breakfast burritos are HUGE and so delicious. Perfect way to start my morning. Staff is always friendly too!",
  },
  {
    name: "James L.",
    rating: 5,
    quote: "Finally found my go-to spot for smash burgers. Crispy edges, juicy center, and those hand-cut fries are addictive.",
  },
  {
    name: "Maria G.",
    rating: 4,
    quote: "Love the Italian sub here! Fresh ingredients and generous portions. The weekly specials are always worth trying.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground text-balance">
              What Our Customers Say
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it — hear from the folks who keep coming back
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <ScrollRevealItem key={index}>
              <motion.div 
                className="bg-card border border-border/50 rounded-2xl p-6 h-full warm-shadow hover-lift relative group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Quote icon */}
                <div className="absolute -top-3 -left-2 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Quote className="w-5 h-5 text-primary" />
                </div>

                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>
                
                <blockquote className="text-foreground/80 leading-relaxed mb-5 text-[15px]">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                </div>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
