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
    name: "All Day Breakfast",
    description: "Hearty breakfast favorites served all day long",
    image: breakfastBurrito,
    items: [
      { name: "Breakfast Platter", description: "2 eggs your way with choice of 1 meat, 1 side and toast", price: 9.95 },
      { name: "Omelette", description: "\"You build it\" 3 eggs scrambled, cheese, meat or vegetables, served with home fries & toast", price: 9.95 },
      { name: "Train Wreck", description: "2 scrambled eggs with bacon, ham & sausage, peppers, onions, home fries topped with homemade cheese sauce", price: 10.95 },
      { name: "Burrito", description: "3 eggs, cheese with choice of meat and home fries inside or outside", price: 9.95 },
      { name: "Biscuits and Gravy (Half)", description: "1 biscuit with homemade gravy", price: 2.95 },
      { name: "Biscuits and Gravy (Whole)", description: "2 biscuits with homemade gravy", price: 5.95 },
      { name: "French Toast", description: "2 deep fried slices cut into 4 triangles & a side of maple syrup", price: 4.95 },
      { name: "Egg & Cheese Sandwich", description: "1 meat on a kaiser roll", price: 4.95 },
      { name: "Breakfast Hoagie", description: "Served on a toasted hoagie roll, 3 eggs, cheese, home fries", price: 9.95 },
      { name: "Patty Melt", description: "1 patty grilled on rye with melted swiss & grilled onions", price: 8.95 },
    ]
  },
  {
    name: "Burgers & More",
    description: "5 oz each never frozen Angus beef patty on a grilled kaiser",
    image: smashBurger,
    items: [
      { name: "Smash Burger", description: "\"Build your way\" pick a cheese & pick toppings", price: 8.95 },
      { name: "Uncle Pumpkin", description: "2 patties, melted cheddar, grilled onions, bacon & 1 crispy onion ring", price: 11.95 },
      { name: "Patty Melt", description: "1 patty grilled on rye with melted swiss & grilled onions", price: 8.95 },
      { name: "Veggie Burger", description: "\"Build your way\"", price: 8.99 },
      { name: "Reuben", description: "Corned beef or turkey, sauerkraut, swiss, thousand island on rye", price: 9.95 },
      { name: "Hot Dog", description: "Make it your way! Add chili & cheese or kraut +$1", price: 4.95 },
      { name: "Grilled Chicken Sandwich", description: "Grilled chicken breast on a grilled kaiser, provolone, lettuce, tomato, onion & mayo", price: 10.95 },
      { name: "Corky Chicken", description: "2 crispy tenders on a grilled kaiser with lettuce, tomato & bacon, drizzled with honey mustard", price: 9.95 },
      { name: "Grilled Cheese", description: "Classic grilled cheese sandwich", price: 5.50 },
    ]
  },
  {
    name: "Philly's & Grilled Hoagies",
    description: "Our Famous Philly's - Served on a grilled hoagie roll topped with grilled onions & our homemade cheese sauce",
    image: heroSandwich,
    items: [
      { name: "Whole Philly", description: "Beef or chicken - around 10 inches", price: 13.95 },
      { name: "1/2 Philly", description: "Beef or chicken - about half a whole one", price: 9.95 },
      { name: "1/2 & 1/2 Beef & Chicken", description: "Why choose 1 when you can have both mixed together!", price: 14.95 },
      { name: "Grilled Hoagies", description: "Served on toasted hoagie roll", price: 11.99 },
      { name: "The Deuce", description: "Grilled chicken tossed in buffalo sauce & topped with our creamy coleslaw", price: 11.99 },
      { name: "Chicken Parmesan", description: "Crispy chicken, marinara, provolone & parmesan", price: 11.99 },
      { name: "Crispy Chicken Hoagie", description: "Crispy chicken, bacon, mayo, lettuce & tomato", price: 11.99 },
      { name: "Meatball Parmesan", description: "Meatballs, marinara, provolone & parmesan", price: 11.99 },
    ]
  },
  {
    name: "Wraps",
    description: "Fresh wraps made to order",
    image: italianSub,
    items: [
      { name: "Buffalo Chicken Wrap", description: "Crispy chicken tossed in buffalo topped with ranch, lettuce, tomato & onion", price: 11.95 },
      { name: "Chilled Chicken Wrap", description: "Grilled chicken, cheddar cheese, sour cream, rice & beans", price: 11.95 },
      { name: "Crispy Chicken Wrap", description: "Crispy chicken, bacon, ranch, lettuce, tomato & onion", price: 11.85 },
      { name: "Caesar Wrap", description: "Grilled chicken, lettuce, parmesan and caesar dressing", price: 11.95 },
      { name: "Turkey BLT Wrap", description: "Turkey, bacon, lettuce, tomato and mayo", price: 10.95 },
      { name: "Veggie Wrap", description: "Grilled onions, peppers, mushrooms, provolone, lettuce, tomato & banana peppers", price: 11.95 },
    ]
  },
  {
    name: "Cold Sandwiches",
    description: "Fresh lunch options",
    image: italianSub,
    items: [
      { name: "Italian Hot or Cold", description: "Salami, pepperoni, capicola, provolone, served on a hoagie roll", price: 11.95 },
      { name: "Ham and Cheese", description: "Served on a hoagie roll, add toppings of your choice", price: 10.75 },
      { name: "Turkey and Cheese", description: "Served on a hoagie roll, add toppings of your choice", price: 10.75 },
      { name: "Salerno Club", description: "Turkey, ham, bacon, lettuce, tomato and mayo stacked on 3 slices of toast", price: 11.95 },
      { name: "BLT", description: "No explanation needed! Just choose your toast!", price: 8.95 },
    ]
  },
  {
    name: "Salads",
    description: "Fresh and delicious salads",
    image: italianSub,
    items: [
      { name: "Titanic Salad", description: "Choose 1 scoop of either tuna, chicken or egg salad served on a bed of lettuce, tomato, cucumber & onion", price: 8.95 },
      { name: "Cobb Salad", description: "Grilled or crispy chicken, bacon, lettuce, tomato, onion, cucumber & a hard boiled egg", price: 11.95 },
      { name: "Chef Salad", description: "Turkey ham, lettuce, tomato, onion, shredded cheddar, cucumber & a hard boiled egg", price: 11.95 },
      { name: "Caesar Salad", description: "Grilled chicken, lettuce, tomato, cucumber & caesar dressing", price: 11.95 },
      { name: "Chopped Hoagie Salad", description: "Salami, pepperoni, provolone, lettuce, tomato, onion & banana peppers chopped", price: 11.95 },
      { name: "Buffalo Chicken Salad", description: "Crispy buffalo style chicken, lettuce, tomato, onion, cucumber & hard boiled egg", price: 11.95 },
      { name: "Deluxe Salad", description: "Grilled chicken, bacon, tomato, onion, banana peppers, hard boiled egg, shredded cheddar, homemade croutons", price: 12.95 },
    ]
  },
  {
    name: "Platters & Kids Meals",
    description: "Hearty platters and kid-friendly options",
    image: breakfastBurrito,
    items: [
      { name: "Grilled Chicken Platter", description: "Grilled chicken breast, rice, black beans", price: 12.95 },
      { name: "Chicken Tender Platter", description: "4 crispy tenders, fries, slaw & garlic toast", price: 13.50 },
      { name: "Kids Meal - 2 Chicken Tenders", description: "Pick 1: fries or chips - Substitute w/ mac & cheese +$1.50", price: 7.85 },
      { name: "Kids Meal - Smash Burger", description: "Pick 1: fries or chips - Substitute w/ mac & cheese +$1.50", price: 7.85 },
      { name: "Kids Meal - Hot Dog", description: "Pick 1: fries or chips - Substitute w/ mac & cheese +$1.50", price: 7.85 },
      { name: "Kids Meal - Mac N Cheese", description: "Pick 1: fries or chips", price: 7.85 },
      { name: "Kids Meal - Grilled Cheese", description: "Pick 1: fries or chips - Substitute w/ mac & cheese +$1.50", price: 7.85 },
    ]
  },
  {
    name: "The Sweet Spot",
    description: "Delicious desserts and sweet treats",
    image: breakfastBurrito,
    items: [
      { name: "Cinnamon Roll", description: "Try our buttered and grilled cinnamon roll - served with a side of icing", price: 3.55 },
      { name: "Blueberry Muffin", description: "Freshly baked blueberry muffin", price: 3.50 },
      { name: "Chocolate Chip Muffin", description: "Freshly baked chocolate chip muffin", price: 3.50 },
      { name: "Chocolate Chip Cookies (2)", description: "Two fresh baked cookies", price: 2.50 },
      { name: "Brownie", description: "Rich chocolate brownie", price: 2.50 },
      { name: "4 oz Ice Cream", description: "Strawberry, vanilla or chocolate", price: 2.50 },
    ]
  }
];

const sides = [
  { name: "Home Fries", price: 1.50 },
  { name: "Grits", price: 1.49 },
  { name: "Bacon (3 strips)", price: 3.00 },
  { name: "Sausage (2 links)", price: 2.00 },
  { name: "Toast", price: 2.00 },
  { name: "Fruit Cup", price: 2.00 },
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
              <span className="text-xs text-muted-foreground">We Love Cooking For You!</span>
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
            © {new Date().getFullYear()} The Whistle Stop. We Love Cooking For You!
          </p>
        </div>
      </footer>
    </main>
  );
}
