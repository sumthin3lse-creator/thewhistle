import { Heart, Users, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";
import exteriorImage from "@/assets/restaurant-exterior.png";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every sandwich crafted with care using quality ingredients",
    color: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-500",
  },
  {
    icon: Users,
    title: "Family-Owned",
    description: "Locally-owned and operated since re-opening in 2023",
    color: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500",
  },
  {
    icon: Award,
    title: "Stuart's Favorite",
    description: "Serving the community with exceptional food & service",
    color: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 opacity-10">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-5 rotate-12">
        <div className="w-40 h-40 rounded-full border-[3px] border-primary" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                Our Story
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 text-balance">
                About The Whistle Stop
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The Whistle Stop by Ariel Seafoods is a beloved sandwich shop in
                Stuart, FL, serving up a delicious blend of favorites. Specializing
                in mouthwatering Philly cheesesteaks and hearty breakfast burritos,
                our menu is designed to satisfy every craving.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <ScrollRevealItem key={feature.title}>
                <motion.div 
                  className="bg-card rounded-2xl p-8 warm-shadow hover-lift text-center h-full border border-border/50"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden warm-shadow hover-lift">
                <img 
                  src={exteriorImage} 
                  alt="The Whistle Stop Restaurant Exterior in Stuart Florida" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-card rounded-3xl p-8 md:p-12 warm-shadow border border-border/50">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  From savory Smash Burgers to classic Breakfast Sandwiches and
                  delectable Subs, we offer a wide variety of options to please all
                  palates. Re-opened in 2023 under new ownership, we take pride in
                  providing quality ingredients and exceptional service to customers
                  throughout Stuart and the surrounding communities.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
