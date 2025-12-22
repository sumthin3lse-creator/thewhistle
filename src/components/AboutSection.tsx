import { Heart, Users, Award } from "lucide-react";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every sandwich crafted with care using quality ingredients",
  },
  {
    icon: Users,
    title: "Family-Owned",
    description: "Locally-owned and operated since re-opening in 2023",
  },
  {
    icon: Award,
    title: "Stuart's Favorite",
    description: "Serving the community with exceptional food & service",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-primary font-medium tracking-widest uppercase mb-3">
                Our Story
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                About The Whistle Stop
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The Whistle Stop by Ariel Seafoods is a beloved sandwich shop in
                Stuart, FL, serving up a delicious blend of favorites. Specializing
                in mouthwatering Philly cheesesteaks and hearty breakfast burritos,
                our menu is designed to satisfy every craving.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <ScrollRevealItem key={feature.title}>
                <div className="bg-card rounded-xl p-8 warm-shadow hover:warm-shadow-hover transition-shadow duration-300 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From savory Smash Burgers to classic Breakfast Sandwiches and
                delectable Subs, we offer a wide variety of options to please all
                palates. Re-opened in 2023 under new ownership, we take pride in
                providing quality ingredients and exceptional service to customers
                throughout Stuart and the surrounding communities.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
