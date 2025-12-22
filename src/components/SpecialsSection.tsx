import { Calendar } from "lucide-react";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const weeklySpecials = [
  {
    day: "Monday",
    special: "Meatloaf, Mashed Potatoes & Gravy with Garlic Toast",
  },
  {
    day: "Tuesday",
    special: "Cuban Sandwich & Fries",
  },
  {
    day: "Wednesday",
    special: "Open Face Hot Roast Beef with Mashed Potatoes & Gravy",
  },
  {
    day: "Thursday",
    special: "Cuban Sandwich & Fries",
  },
  {
    day: "Friday",
    special: "Pork Loin, Mashed Potatoes & Gravy, with Green Beans & Garlic Toast",
  },
];

export function SpecialsSection() {
  return (
    <section id="specials" className="py-24 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase mb-3">
                Don't Miss Out
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Weekly Specials
              </h2>
              <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
                Come enjoy our delicious daily specials! Available for a limited time
                — call ahead to reserve yours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="space-y-4">
            {weeklySpecials.map((item) => (
              <ScrollRevealItem key={item.day}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors">
                  <div className="flex items-center gap-3 sm:w-40">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-display font-semibold text-lg">
                      {item.day}
                    </span>
                  </div>
                  <p className="text-primary-foreground/80 flex-1">
                    {item.special}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <p className="text-primary-foreground/60 mb-2">
                Saturday specials vary — ask when you visit!
              </p>
              <a
                href="tel:7722201020"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                📞 Call ahead to reserve a special
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
