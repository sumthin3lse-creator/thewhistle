import { Link } from "react-router-dom";
import { ArrowLeft, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroSandwich from "@/assets/hero-sandwich.jpg";
import breakfastBurrito from "@/assets/breakfast-burrito.jpg";
import smashBurger from "@/assets/smash-burger.jpg";
import italianSub from "@/assets/italian-sub.jpg";

const menuCategories = [
  {
    name: "Philly Cheesesteaks",
    description: "Authentic, mouthwatering cheesesteaks with perfectly grilled steak",
    image: heroSandwich,
    items: [
      { name: "Classic Philly Cheesesteak", description: "Thinly sliced ribeye steak, grilled onions, melted provolone on a fresh hoagie roll", price: "$12.99" },
      { name: "Whiz Wit", description: "Traditional Philly style with Cheez Whiz and grilled onions", price: "$12.99" },
      { name: "Pepper Cheesesteak", description: "Ribeye steak with sautéed peppers, onions, and American cheese", price: "$13.49" },
      { name: "Mushroom Cheesesteak", description: "Loaded with sautéed mushrooms, onions, and Swiss cheese", price: "$13.49" },
      { name: "Pizza Cheesesteak", description: "Topped with marinara sauce and melted mozzarella", price: "$13.99" },
      { name: "Bacon Cheesesteak", description: "Crispy bacon, ribeye steak, and melted cheddar", price: "$14.49" },
    ]
  },
  {
    name: "Breakfast Burritos",
    description: "Hearty morning burritos packed with fresh ingredients",
    image: breakfastBurrito,
    items: [
      { name: "Classic Breakfast Burrito", description: "Scrambled eggs, cheese, bacon, and home fries wrapped in a warm tortilla", price: "$9.99" },
      { name: "Meat Lovers Burrito", description: "Eggs, bacon, sausage, ham, cheese, and peppers", price: "$11.99" },
      { name: "Veggie Sunrise Burrito", description: "Eggs, peppers, onions, mushrooms, spinach, and cheese", price: "$9.99" },
      { name: "Chorizo Burrito", description: "Spicy chorizo, scrambled eggs, jalapeños, and pepper jack cheese", price: "$11.49" },
      { name: "Steak & Egg Burrito", description: "Grilled steak, scrambled eggs, cheese, and sautéed onions", price: "$12.99" },
      { name: "Southwest Burrito", description: "Eggs, black beans, corn, salsa, cheese, and sour cream", price: "$10.49" },
    ]
  },
  {
    name: "Smash Burgers",
    description: "Juicy, crispy-edged smash burgers made to order",
    image: smashBurger,
    items: [
      { name: "Classic Smash Burger", description: "Two smashed patties, American cheese, pickles, onion, special sauce on brioche", price: "$11.99" },
      { name: "Bacon Smash", description: "Double patty, crispy bacon, cheddar cheese, lettuce, tomato, mayo", price: "$13.49" },
      { name: "Mushroom Swiss Smash", description: "Double patty, sautéed mushrooms, melted Swiss, garlic aioli", price: "$13.49" },
      { name: "BBQ Smash", description: "Double patty, bacon, cheddar, onion rings, tangy BBQ sauce", price: "$13.99" },
      { name: "Jalapeño Popper Smash", description: "Double patty, cream cheese, jalapeños, pepper jack, bacon", price: "$14.49" },
      { name: "Single Smash", description: "One smashed patty, American cheese, pickles, onion, special sauce", price: "$8.99" },
    ]
  },
  {
    name: "Fresh Subs",
    description: "Classic deli-style subs with premium meats and fresh vegetables",
    image: italianSub,
    items: [
      { name: "Italian Sub", description: "Ham, capicola, salami, provolone, lettuce, tomato, onion, oil & vinegar", price: "$11.99" },
      { name: "Turkey Club Sub", description: "Roasted turkey, bacon, Swiss, lettuce, tomato, mayo", price: "$11.99" },
      { name: "Roast Beef Sub", description: "Thinly sliced roast beef, provolone, horseradish mayo, onion", price: "$12.49" },
      { name: "Chicken Parm Sub", description: "Breaded chicken cutlet, marinara, melted mozzarella", price: "$12.99" },
      { name: "Meatball Sub", description: "House-made meatballs, marinara sauce, melted provolone", price: "$11.99" },
      { name: "BLT Sub", description: "Crispy bacon, fresh lettuce, ripe tomato, mayo on toasted bread", price: "$10.99" },
    ]
  }
];

const sides = [
  { name: "Fresh Cut Fries", price: "$4.49" },
  { name: "Onion Rings", price: "$5.49" },
  { name: "Cheese Fries", price: "$5.99" },
  { name: "Mozzarella Sticks", price: "$7.99" },
  { name: "Side Salad", price: "$4.99" },
];

const drinks = [
  { name: "Fountain Drink", price: "$2.49" },
  { name: "Bottled Water", price: "$1.99" },
  { name: "Fresh Lemonade", price: "$3.49" },
  { name: "Iced Tea", price: "$2.99" },
];

export default function Menu() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card warm-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex flex-col text-right">
            <span className="font-display text-xl font-bold text-primary">The Whistle Stop</span>
            <span className="text-xs text-muted-foreground">by Ariel Seafoods</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-primary py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Our Full Menu
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Fresh ingredients, bold flavors, and recipes made with love. Something for everyone!
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <div className="container mx-auto px-4 py-16">
        {menuCategories.map((category, categoryIndex) => (
          <section key={category.name} className="mb-20">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
              <div className="w-full md:w-1/3">
                <div className="relative rounded-2xl overflow-hidden warm-shadow aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-lg">{category.description}</p>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-card rounded-xl p-6 warm-shadow hover:warm-shadow-hover transition-all duration-300 border border-border/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold text-lg ml-2 whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {categoryIndex < menuCategories.length - 1 && (
              <div className="border-b border-border mt-16" />
            )}
          </section>
        ))}

        {/* Sides & Drinks */}
        <section className="grid md:grid-cols-2 gap-12">
          {/* Sides */}
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Sides
            </h2>
            <div className="space-y-4">
              {sides.map((item) => (
                <div key={item.name} className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-primary font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks */}
          <div className="bg-secondary/50 rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
              Drinks
            </h2>
            <div className="space-y-4">
              {drinks.map((item) => (
                <div key={item.name} className="flex justify-between items-center border-b border-border/50 pb-3">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className="text-primary font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-16 bg-card rounded-2xl p-10 warm-shadow">
          <h3 className="font-display text-2xl font-bold text-foreground mb-4">
            Ready to Order?
          </h3>
          <p className="text-muted-foreground mb-6">
            Call us or order online for pickup or delivery!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/order-online" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Order for Pickup
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:7722201020" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                (772) 220-1020
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} The Whistle Stop by Ariel Seafoods. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
