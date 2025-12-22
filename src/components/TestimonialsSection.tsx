import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
          size={18}
          className={i < rating ? "fill-primary text-primary" : "text-muted"}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it — hear from the folks who keep coming back
            </p>
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollRevealItem key={index}>
              <Card className="bg-card border-border/50 h-full">
                <CardContent className="p-6">
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="mt-4 text-foreground/90 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="mt-4 font-semibold text-primary">
                    — {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}
