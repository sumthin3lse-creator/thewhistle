import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { motion } from "framer-motion";
import heroSandwich from "@/assets/hero-sandwich.jpg";
import breakfastBurrito from "@/assets/breakfast-burrito.jpg";
import smashBurger from "@/assets/smash-burger.jpg";
import italianSub from "@/assets/italian-sub.jpg";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
};

type MenuCategory = {
  title: string;
  subtitle: string;
  image: string;
  items: MenuItem[];
};

const menuCategories: MenuCategory[] = [
  {
    title: "Philly Cheesesteaks",
    subtitle: "Our legendary cheesesteaks, made with premium ribeye",
    image: heroSandwich,
    items: [
      {
        name: "Classic Philly Cheesesteak",
        description: "Thinly sliced ribeye, grilled onions, your choice of cheese (American, provolone, or Cheez Whiz) on a fresh hoagie roll",
        price: "$12.99",
        popular: true,
      },
      {
        name: "Mushroom Cheesesteak",
        description: "Ribeye steak with sautéed mushrooms, grilled onions, and melted provolone",
        price: "$13.99",
      },
      {
        name: "Pepper Cheesesteak",
        description: "Ribeye steak with sweet bell peppers, onions, and American cheese",
        price: "$13.99",
      },
      {
        name: "Cheesesteak Hoagie",
        description: "Our classic cheesesteak topped with lettuce, tomato, and mayo",
        price: "$14.49",
      },
      {
        name: "Pizza Steak",
        description: "Ribeye steak with marinara sauce and melted mozzarella cheese",
        price: "$14.49",
      },
    ],
  },
  {
    title: "Breakfast Burritos",
    subtitle: "Hearty morning favorites served all day",
    image: breakfastBurrito,
    items: [
      {
        name: "Classic Breakfast Burrito",
        description: "Scrambled eggs, cheese, choice of bacon or sausage, wrapped in a warm flour tortilla",
        price: "$9.99",
        popular: true,
      },
      {
        name: "Western Burrito",
        description: "Eggs, ham, peppers, onions, and cheddar cheese",
        price: "$10.99",
      },
      {
        name: "Veggie Breakfast Burrito",
        description: "Scrambled eggs with peppers, onions, mushrooms, tomatoes, and cheese",
        price: "$9.49",
      },
      {
        name: "Meat Lovers Burrito",
        description: "Eggs, bacon, sausage, ham, and melted cheddar cheese",
        price: "$12.99",
      },
      {
        name: "Breakfast Sandwich",
        description: "Eggs and cheese with your choice of meat on a toasted roll",
        price: "$7.99",
      },
    ],
  },
  {
    title: "Smash Burgers",
    subtitle: "Juicy, crispy-edged burgers made to order",
    image: smashBurger,
    items: [
      {
        name: "Classic Smash Burger",
        description: "Two smashed beef patties, American cheese, pickles, onions, special sauce on a brioche bun",
        price: "$11.99",
        popular: true,
      },
      {
        name: "Bacon Smash",
        description: "Double patties, crispy bacon, cheddar cheese, lettuce, tomato, and mayo",
        price: "$13.99",
      },
      {
        name: "Mushroom Swiss Burger",
        description: "Double patties with sautéed mushrooms and melted Swiss cheese",
        price: "$13.49",
      },
      {
        name: "BBQ Bacon Burger",
        description: "Double patties, bacon, cheddar, crispy onion rings, and tangy BBQ sauce",
        price: "$14.49",
      },
      {
        name: "Single Smash",
        description: "One smashed patty with American cheese, pickles, onions, and special sauce",
        price: "$8.99",
      },
    ],
  },
  {
    title: "Fresh Subs & Sandwiches",
    subtitle: "Classic deli-style subs made with premium ingredients",
    image: italianSub,
    items: [
      {
        name: "Italian Sub",
        description: "Genoa salami, capicola, ham, provolone, lettuce, tomato, onion, oil & vinegar",
        price: "$11.99",
        popular: true,
      },
      {
        name: "Turkey Club",
        description: "Sliced turkey breast, bacon, lettuce, tomato, and mayo on toasted bread",
        price: "$11.49",
      },
      {
        name: "Roast Beef Sub",
        description: "Thinly sliced roast beef with horseradish mayo, lettuce, tomato, and provolone",
        price: "$12.49",
      },
      {
        name: "Cuban Sandwich",
        description: "Roasted pork, ham, Swiss cheese, pickles, and mustard on pressed Cuban bread",
        price: "$12.99",
        popular: true,
      },
      {
        name: "BLT",
        description: "Crispy bacon, fresh lettuce, ripe tomatoes, and mayo on toasted bread",
        price: "$9.99",
      },
      {
        name: "Grilled Chicken Sub",
        description: "Grilled chicken breast with lettuce, tomato, and your choice of dressing",
        price: "$11.99",
      },
    ],
  },
];

const sides = [
  { name: "French Fries", price: "$3.99" },
  { name: "Onion Rings", price: "$4.99" },
  { name: "Tater Tots", price: "$3.99" },
  { name: "Side Salad", price: "$4.49" },
  { name: "Chips", price: "$1.99" },
];

const drinks = [
  { name: "Fountain Drinks", price: "$2.49" },
  { name: "Bottled Water", price: "$1.99" },
  { name: "Coffee", price: "$2.49" },
  { name: "Fresh Lemonade", price: "$3.49" },
];

const Menu = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium tracking-widest uppercase mb-3"
          >
            What We Serve
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Fresh ingredients, bold flavors, and recipes made with love. From legendary Philly cheesesteaks to hearty breakfast burritos — there is something for everyone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="default" size="lg" asChild>
              <a
                href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Order on DoorDash
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-20">
            {menuCategories.map((category, categoryIndex) => (
              <div key={category.title} className="scroll-mt-24" id={category.title.toLowerCase().replace(/\s+/g, "-")}>
                {/* Category Header */}
                <div className={`flex flex-col ${categoryIndex % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 mb-10`}>
                  <ScrollReveal
                    variant={categoryIndex % 2 === 0 ? "slideLeft" : "slideRight"}
                    className="lg:w-1/3"
                  >
                    <div className="relative rounded-2xl overflow-hidden warm-shadow aspect-square group">
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                          {category.title}
                        </h2>
                        <p className="text-primary-foreground/80 mt-2">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Menu Items */}
                  <StaggerContainer className="lg:w-2/3" staggerDelay={0.08}>
                    <div className="space-y-4">
                      {category.items.map((item) => (
                        <StaggerItem key={item.name}>
                          <motion.div
                            className="bg-card rounded-xl p-6 warm-shadow hover:warm-shadow-hover transition-all duration-300 group"
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {item.name}
                                  </h3>
                                  {item.popular && (
                                    <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                                      Popular
                                    </span>
                                  )}
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                              <span className="font-display text-xl font-bold text-primary whitespace-nowrap">
                                {item.price}
                              </span>
                            </div>
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerContainer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sides & Drinks */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal variant="fadeUp">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                Sides & Drinks
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sides */}
              <ScrollReveal variant="slideLeft" delay={0.1}>
                <div className="bg-card rounded-2xl p-8 warm-shadow h-full">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <span className="text-2xl">🍟</span> Sides
                  </h3>
                  <div className="space-y-4">
                    {sides.map((item) => (
                      <motion.div
                        key={item.name}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-display font-semibold text-primary">{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Drinks */}
              <ScrollReveal variant="slideRight" delay={0.2}>
                <div className="bg-card rounded-2xl p-8 warm-shadow h-full">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <span className="text-2xl">🥤</span> Drinks
                  </h3>
                  <div className="space-y-4">
                    {drinks.map((item) => (
                      <motion.div
                        key={item.name}
                        className="flex justify-between items-center py-2 border-b border-border last:border-0"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-foreground">{item.name}</span>
                        <span className="font-display font-semibold text-primary">{item.price}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary overflow-hidden">
        <ScrollReveal variant="scaleIn">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Order?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Get your favorites delivered straight to your door or call ahead for pickup!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="secondary" size="lg" asChild>
                  <a
                    href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    Order on DoorDash
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="heroOutline" size="lg" asChild>
                  <a href="tel:7722201020">
                    Call (772) 220-1020
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
};

export default Menu;
