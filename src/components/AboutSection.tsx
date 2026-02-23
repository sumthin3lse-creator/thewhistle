import { Heart, Users, Award, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";
import exteriorImage from "@/assets/restaurant-exterior.png";

const features = [
  {
    icon: Heart,
    title: "Philly Born",
    description: "Paul & Nora McGovern built The Whistle Stop into a Stuart institution with uncompromising Philadelphia authenticity since 2004",
    color: "bg-red-50 dark:bg-red-950/30",
    iconColor: "text-red-500",
  },
  {
    icon: Users,
    title: "A New Era",
    description: "Acquired by Ariel Seafoods in 2023 — same DNA, now backed by the infrastructure of a globally recognized wholesale operation",
    color: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500",
  },
  {
    icon: Award,
    title: "Next-Level Execution",
    description: "Same recipes and legendary homemade cheese sauce, now fueled by premium supply chain and quality control",
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
                A Port Salerno Tradition, Elevated.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                For nearly two decades, Paul and Nora McGovern built The Whistle Stop into more than just a restaurant — they built a Stuart institution. The gold standard was set with uncompromising authenticity, from the homemade cheese sauce to the fresh-baked bread. In 2023, The Whistle Stop entered a new era when it was acquired by Ariel Seafoods. The mission was simple: preserve the DNA and back it with the power of a globally recognized wholesale operation. Same corner. Same recipes. Next-level execution.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline mt-6 text-lg group"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
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
                  alt="The Whistle Stop Restaurant Exterior in Port Salerno Florida" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-card rounded-3xl p-8 md:p-12 warm-shadow border border-border/50">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Your Hometown Staple, Powered by a Powerhouse.
                </h3>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Today, The Whistle Stop remains your hometown staple. We are still serving the heavy-hitting, Pennsylvania-style comfort food you grew up on, but now we are fueled by the infrastructure, quality control, and premium supply chain of an international powerhouse. Nestled across from the marina in Port Salerno, we're the same destination you know and love — elevated. We love cooking for you.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
