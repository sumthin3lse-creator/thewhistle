import { Link } from "react-router-dom";
import { ArrowLeft, Phone, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      { name: "Breakfast Platter", description: "2 eggs your way with choice of 1 meat, 1 side and toast", price: "$9.95" },
      { name: "Omelette", description: "\"You build it\" 3 eggs scrambled, cheese, meat or vegetables, served with home fries & toast", price: "$9.95" },
      { name: "Train Wreck", description: "2 scrambled eggs with bacon, ham & sausage, peppers, onions, home fries topped with homemade cheese sauce", price: "$10.95" },
      { name: "Burrito", description: "3 eggs, cheese with choice of meat and home fries inside or outside", price: "$9.95" },
      { name: "Biscuits and Gravy (Half)", description: "1 biscuit with homemade gravy", price: "$2.95" },
      { name: "Biscuits and Gravy (Whole)", description: "2 biscuits with homemade gravy", price: "$5.95" },
      { name: "French Toast", description: "2 deep fried slices cut into 4 triangles & a side of maple syrup, covered in powdered sugar", price: "$4.95" },
      { name: "Egg & Cheese Sandwich", description: "1 meat on a kaiser roll", price: "$4.95" },
      { name: "Breakfast Hoagie", description: "Served on a toasted hoagie roll, 3 eggs, cheese, home fries", price: "$9.95" },
      { name: "Patty Melt", description: "1 patty grilled on rye with melted swiss & grilled onions", price: "$8.95" },
    ]
  },
  {
    name: "Burgers & More",
    description: "5 oz each never frozen Angus beef patty on a grilled kaiser",
    image: smashBurger,
    items: [
      { name: "Smash Burger", description: "\"Build your way\" pick a cheese & pick toppings", price: "$8.95" },
      { name: "Uncle Pumpkin", description: "2 patties, melted cheddar, grilled onions, bacon & 1 crispy onion ring", price: "$11.95" },
      { name: "Patty Melt", description: "1 patty grilled on rye with melted swiss & grilled onions", price: "$8.95" },
      { name: "Veggie Burger", description: "\"Build your way\"", price: "$8.99" },
      { name: "Reuben", description: "Corned beef or turkey, sauerkraut, swiss, thousand island on rye", price: "$9.95" },
      { name: "Hot Dog", description: "Make it your way! Add chili & cheese or kraut +$1", price: "$4.95" },
      { name: "Grilled Chicken", description: "Grilled chicken breast on a grilled kaiser, provolone, lettuce, tomato, onion & mayo", price: "$10.95" },
      { name: "Corky Chicken", description: "2 crispy tenders on a grilled kaiser with lettuce, tomato & bacon, drizzled with honey mustard", price: "$9.95" },
      { name: "Grilled Cheese", description: "Classic grilled cheese sandwich", price: "$5.50" },
      { name: "Chicken Noodle Soup (Cup)", description: "Homemade chicken noodle soup", price: "$4.25" },
      { name: "Chicken Noodle Soup (Bowl)", description: "Homemade chicken noodle soup - make it gourmet +$2", price: "$6.85" },
    ]
  },
  {
    name: "Philly's & Grilled Hoagies",
    description: "Our Famous Philly's - Served on a grilled hoagie roll topped with grilled onions & our homemade cheese sauce",
    image: heroSandwich,
    items: [
      { name: "Whole Philly", description: "Beef or chicken - around 10 inches", price: "$13.95" },
      { name: "1/2 Philly", description: "Beef or chicken - about half a whole one", price: "$9.95" },
      { name: "1/2 & 1/2 Beef & Chicken", description: "Why choose 1 when you can have both mixed together!", price: "$14.95" },
      { name: "Grilled Hoagies", description: "Served on toasted hoagie roll", price: "$11.99" },
      { name: "The Deuce", description: "Grilled chicken tossed in buffalo sauce & topped with our creamy coleslaw", price: "$11.99" },
      { name: "Chicken Parmesan", description: "Crispy chicken, marinara, provolone & parmesan", price: "$11.99" },
      { name: "Crispy Chicken", description: "Crispy chicken, bacon, mayo, lettuce & tomato", price: "$11.99" },
      { name: "Meatball Parmesan", description: "Meatballs, marinara, provolone & parmesan", price: "$11.99" },
    ]
  },
  {
    name: "Wraps",
    description: "Fresh wraps made to order",
    image: italianSub,
    items: [
      { name: "Buffalo Chicken", description: "Crispy chicken tossed in buffalo topped with ranch, lettuce, tomato & onion", price: "$11.95" },
      { name: "Chilled Chicken", description: "Grilled chicken, cheddar cheese, sour cream, rice & beans", price: "$11.95" },
      { name: "Crispy Chicken", description: "Crispy chicken, bacon, ranch, lettuce, tomato & onion", price: "$11.85" },
      { name: "Caesar", description: "Grilled chicken, lettuce, parmesan and caesar dressing", price: "$11.95" },
      { name: "Turkey BLT", description: "Turkey, bacon, lettuce, tomato and mayo", price: "$10.95" },
      { name: "Veggie Wrap", description: "Grilled onions, peppers, mushrooms, provolone, lettuce, tomato & banana peppers", price: "$11.95" },
    ]
  },
  {
    name: "Cold Sandwiches & Salads",
    description: "Fresh lunch options",
    image: italianSub,
    items: [
      { name: "Italian Hot or Cold", description: "Salami, pepperoni, capicola, provolone, served on a hoagie roll", price: "$11.95" },
      { name: "Ham and Cheese or Turkey and Cheese", description: "Served on a hoagie roll, add toppings of your choice", price: "$10.75" },
      { name: "Salerno Club", description: "Turkey, ham, bacon, lettuce, tomato and mayo stacked on 3 slices of toast", price: "$11.95" },
      { name: "BLT", description: "No explanation needed! Just choose your toast!", price: "$8.95" },
      { name: "Homemade Salads", description: "Sandwich or wrap, try it at a melt (+$2.00)", price: "$9.99" },
    ]
  },
  {
    name: "Salads",
    description: "Fresh and delicious salads",
    image: italianSub,
    items: [
      { name: "Titanic", description: "Choose 1 scoop of either tuna, chicken or egg salad served on a bed of lettuce, tomato, cucumber & onion", price: "$8.95" },
      { name: "Cobb", description: "Grilled or crispy chicken, bacon, lettuce, tomato, onion, cubed chicken, cucumber & a hard boiled egg", price: "$11.95" },
      { name: "Chef", description: "Turkey ham, lettuce, tomato, onion, shredded cheddar, cucumber & a hard boiled egg", price: "$11.95" },
      { name: "Caesar", description: "Grilled chicken, lettuce, tomato, cucumber & caesar dressing", price: "$11.95" },
      { name: "Chopped Hoagie", description: "Salami, pepperoni, provolone, lettuce, tomato, onion & banana peppers chopped", price: "$11.95" },
      { name: "Buffalo Chicken", description: "Crispy buffalo style chicken, lettuce, tomato, onion, cucumber & hard boiled egg", price: "$11.95" },
      { name: "Deluxe", description: "Grilled chicken, bacon, tomato, onion, banana peppers, hard boiled egg, shredded cheddar, homemade croutons", price: "$12.95" },
    ]
  },
  {
    name: "Platters & Kids Meals",
    description: "Hearty platters and kid-friendly options",
    image: breakfastBurrito,
    items: [
      { name: "Grilled Chicken Platter", description: "Grilled chicken breast, rice, black beans", price: "$12.95" },
      { name: "Chicken Tender Platter", description: "4 crispy tenders, fries, slaw & garlic toast", price: "$13.50" },
      { name: "Kids Meals", description: "Pick 1: fries or chips - Substitute w/ mac & cheese +$1.50. Options: 2 Chicken Tenders, Smash Burger, Hot Dog, Mac N Cheese, Grilled Cheese", price: "$7.85" },
    ]
  },
  {
    name: "The Sweet Spot",
    description: "Delicious desserts and sweet treats",
    image: breakfastBurrito,
    items: [
      { name: "Cinnamon Roll or Muffin", description: "Try our buttered and grilled cinnamon roll or muffin - served with a side of icing", price: "$3.55" },
      { name: "Blueberry or Chocolate Chip Muffin", description: "Freshly baked muffin", price: "$3.50" },
      { name: "Chocolate Chip Cookies (2)", description: "Two fresh baked cookies", price: "$2.50" },
      { name: "Brownie", description: "Rich chocolate brownie", price: "$2.50" },
      { name: "4 oz Ice Cream", description: "Strawberry, vanilla or chocolate", price: "$2.50" },
    ]
  }
];

const sides = [
  { name: "Home Fries or Grits", price: "Included" },
  { name: "Add Butter - Cheese", price: "+$0.50" },
  { name: "Bacon", price: "$3.00" },
  { name: "Pork Roll", price: "$2.00" },
  { name: "Sausage", price: "$2.00" },
  { name: "Ham", price: "$1.50" },
  { name: "1 Egg", price: "$1.00" },
  { name: "Egg Whites", price: "+$0.50" },
  { name: "Grits", price: "$1.49" },
  { name: "Butter", price: "+$0.50" },
  { name: "Cheese", price: "$2.00" },
  { name: "Toast", price: "$2.00" },
  { name: "Gravy", price: "$2.00" },
  { name: "Fruit", price: "$2.00" },
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
            <span className="text-xs text-muted-foreground">We Love Cooking For You!</span>
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
            7 AM – 3 PM, Monday – Saturday | 4920 SE Dixie Hwy, Stuart | Dine In or Pick-Up
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
              Breakfast Sides / Bread / Meats
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
            © {new Date().getFullYear()} The Whistle Stop. We Love Cooking For You!
          </p>
        </div>
      </footer>
    </main>
  );
}
