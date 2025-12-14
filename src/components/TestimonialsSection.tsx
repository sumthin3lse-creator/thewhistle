import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael R.",
    location: "Stuart, FL",
    rating: 5,
    text: "Best Philly cheesesteak I've had outside of Philadelphia! The meat is always fresh, the cheese perfectly melted. This place is a hidden gem in Stuart.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Sarah T.",
    location: "Palm City, FL",
    rating: 5,
    text: "The breakfast burritos are incredible! Huge portions, fresh ingredients, and the staff is so friendly. My new go-to breakfast spot!",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "David L.",
    location: "Jensen Beach, FL",
    rating: 5,
    text: "Finally, a real smash burger in the area! Crispy edges, juicy patties, and that special sauce is addictive. Worth every penny.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Jennifer M.",
    location: "Stuart, FL",
    rating: 5,
    text: "The Cuban sandwich here rivals anything I've had in Miami. Perfectly pressed, authentic flavors. The new owners really know what they're doing!",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Robert K.",
    location: "Hobe Sound, FL",
    rating: 5,
    text: "I stop here every week for the daily specials. The meatloaf Monday is comfort food at its finest. Great prices for the quality you get.",
    date: "2 months ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp" className="text-center mb-16">
          <p className="text-primary font-medium tracking-widest uppercase mb-3">
            What People Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Customer Reviews
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from our happy customers who keep coming back for more.
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <ScrollReveal variant="scaleIn">
            <div
              className="relative bg-card rounded-3xl p-8 md:p-12 warm-shadow"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <Quote className="w-12 h-12 text-primary/20" />
              </div>

              {/* Testimonial Content */}
              <div className="relative min-h-[280px] flex items-center justify-center">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                  >
                    {/* Stars */}
                    <div className="mb-6">
                      <StarRating rating={currentTestimonial.rating} />
                    </div>

                    {/* Review Text */}
                    <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed mb-8 max-w-2xl">
                      "{currentTestimonial.text}"
                    </blockquote>

                    {/* Author */}
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        {currentTestimonial.name}
                      </p>
                      <p className="text-muted-foreground">
                        {currentTestimonial.location} • {currentTestimonial.date}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4">
                <motion.button
                  onClick={goToPrevious}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4">
                <motion.button
                  onClick={goToNext}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted hover:bg-primary/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="grid grid-cols-3 gap-8 mt-12 text-center">
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  500+
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  4.9
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  Average Rating
                </p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                  100%
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  Fresh Ingredients
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
