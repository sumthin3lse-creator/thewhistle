import { Link } from "react-router-dom";
import { ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import CartSheet from "@/components/CartSheet";
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
      { name: "Classic Philly Cheesesteak", description: "Thinly sliced ribeye steak, grilled onions, melted provolone on a fresh hoagie roll", price: 12.99 },
      { name: "Whiz Wit", description: "Traditional Philly style with Cheez Whiz and grilled onions", price: 12.99 },
      { name: "Pepper Cheesesteak", description: "Ribeye steak with sautéed peppers, onions, and American cheese", price: 13.49 },
      { name: "Mushroom Cheesesteak", description: "Loaded with sautéed mushrooms, onions, and Swiss cheese", price: 13.49 },
      { name: "Pizza Cheesesteak", description: "Topped with marinara sauce and melted mozzarella", price: 13.99 },
      { name: "Bacon Cheesesteak", description: "Crispy bacon, ribeye steak, and melted cheddar", price: 14.49 },
    ]
  },
  {
    name: "Breakfast Burritos",
    description: "Hearty morning burritos packed with fresh ingredients",
    image: breakfastBurrito,
    items: [
      { name: "Classic Breakfast Burrito", description: "Scrambled eggs, cheese, bacon, and home fries wrapped in a warm tortilla", price: 9.99 },
      { name: "Meat Lovers Burrito", description: "Eggs, bacon, sausage, ham, cheese, and peppers", price: 11.99 },
      { name: "Veggie Sunrise Burrito", description: "Eggs, peppers, onions, mushrooms, spinach, and cheese", price: 9.99 },
      { name: "Chorizo Burrito", description: "Spicy chorizo, scrambled eggs, jalapeños, and pepper jack cheese", price: 11.49 },
      { name: "Steak & Egg Burrito", description: "Grilled steak, scrambled eggs, cheese, and sautéed onions", price: 12.99 },
      { name: "Southwest Burrito", description: "Eggs, black beans, corn, salsa, cheese, and sour cream", price: 10.49 },
    ]
  },
  {
    name: "Smash Burgers",
    description: "Juicy, crispy-edged smash burgers made to order",
    image: smashBurger,
    items: [
      { name: "Classic Smash Burger", description: "Two smashed patties, American cheese, pickles, onion, special sauce on brioche", price: 11.99 },
      { name: "Bacon Smash", description: "Double patty, crispy bacon, cheddar cheese, lettuce, tomato, mayo", price: 13.49 },
      { name: "Mushroom Swiss Smash", description: "Double patty, sautéed mushrooms, melted Swiss, garlic aioli", price: 13.49 },
      { name: "BBQ Smash", description: "Double patty, bacon, cheddar, onion rings, tangy BBQ sauce", price: 13.99 },
      { name: "Jalapeño Popper Smash", description: "Double patty, cream cheese, jalapeños, pepper jack, bacon", price: 14.49 },
      { name: "Single Smash", description: "One smashed patty, American cheese, pickles, onion, special sauce", price: 8.99 },
    ]
  },
  {
    name: "Fresh Subs",
    description: "Classic deli-style subs with premium meats and fresh vegetables",
    image: italianSub,
    items: [
      { name: "Italian Sub", description: "Ham, capicola, salami, provolone, lettuce, tomato, onion, oil & vinegar", price: 11.99 },
      { name: "Turkey Club Sub", description: "Roasted turkey, bacon, Swiss, lettuce, tomato, mayo", price: 11.99 },
      { name: "Roast Beef Sub", description: "Thinly sliced roast beef, provolone, horseradish mayo, onion", price: 12.49 },
      { name: "Chicken Parm Sub", description: "Breaded chicken cutlet, marinara, melted mozzarella", price: 12.99 },
      { name: "Meatball Sub", description: "House-made meatballs, marinara sauce, melted provolone", price: 11.99 },
      { name: "BLT Sub", description: "Crispy bacon, fresh lettuce, ripe tomato, mayo on toasted bread", price: 10.99 },
    ]
  }
];

const sides = [
  { name: "Fresh Cut Fries", price: 4.49 },
  { name: "Onion Rings", price: 5.49 },
  { name: "Cheese Fries", price: 5.99 },
  { name: "Mozzarella Sticks", price: 7.99 },
  { name: "Side Salad", price: 4.99 },
];

const drinks = [
  { name: "Fountain Drink", price: 2.49 },
  { name: "Bottled Water", price: 1.99 },
  { name: "Fresh Lemonade", price: 3.49 },
  { name: "Iced Tea", price: 2.99 },
];

export default function OrderOnline() {
  const { addItem, totalItems } = useCart();
  const { toast } = useToast();

  const handleAddItem = (item: { name: string; price: number }, category: string) => {
    addItem({ name: item.name, price: item.price, category });
    toast({
      title: "Added to cart",
      description: `${item.name} added to your order`,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card warm-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <span className="font-display text-xl font-bold text-primary">The Whistle Stop</span>
              <span className="text-xs text-muted-foreground">by Ariel Seafoods</span>
            </div>
            <CartSheet />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-primary py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Order for Pickup
          </h1>
          <p className="text-primary-foreground/90">
            Build your order and pick it up fresh!
          </p>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-foreground font-medium">Want delivery instead?</span>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Order on DoorDash
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <div className="container mx-auto px-4 py-12">
        {menuCategories.map((category, categoryIndex) => (
          <section key={category.name} className="mb-16">
            {/* Category Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-full md:w-1/4">
                <div className="relative rounded-xl overflow-hidden warm-shadow aspect-[4/3]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-3/4 text-center md:text-left">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-card rounded-xl p-4 warm-shadow hover:warm-shadow-hover transition-all duration-300 border border-border/50 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <span className="text-primary font-bold ml-2 whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-3">
                    {item.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddItem(item, category.name)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add to Order
                  </Button>
                </div>
              ))}
            </div>

            {categoryIndex < menuCategories.length - 1 && (
              <div className="border-b border-border mt-12" />
            )}
          </section>
        ))}

        {/* Sides & Drinks */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Sides */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">
              Sides
            </h2>
            <div className="space-y-3">
              {sides.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center bg-card rounded-lg p-3"
                >
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-primary font-semibold ml-2">${item.price.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem(item, "Sides")}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Drinks */}
          <div className="bg-secondary/50 rounded-2xl p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">
              Drinks
            </h2>
            <div className="space-y-3">
              {drinks.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center bg-card rounded-lg p-3"
                >
                  <div className="flex-1">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-primary font-semibold ml-2">${item.price.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem(item, "Drinks")}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Checkout CTA */}
        {totalItems > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
            <div className="container mx-auto flex items-center justify-between">
              <span className="text-foreground font-medium">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
              </span>
              <Button asChild size="lg">
                <Link to="/order">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mb-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} The Whistle Stop by Ariel Seafoods. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
