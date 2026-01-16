import heroSandwich from "@/assets/hero-sandwich.jpg";
import breakfastBurrito from "@/assets/breakfast-burrito.jpg";
import smashBurger from "@/assets/smash-burger.jpg";
import italianSub from "@/assets/italian-sub.jpg";
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
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
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
          </div>
        </ScrollReveal>

        <ScrollRevealStagger className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {menuItems.map((item) => (
            <ScrollRevealItem key={item.name}>
              <div className="group bg-card rounded-2xl overflow-hidden warm-shadow hover:warm-shadow-hover transition-all duration-300 h-full">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Customer Favorite
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold text-lg ml-2 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>

        <ScrollReveal delay={0.4}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Plus breakfast sandwiches, sides, and daily specials!
            </p>
            <a
              href="/menu"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View Full Menu
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
