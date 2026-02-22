import { Award, Newspaper, Trophy, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const awards = [
  {
    icon: Trophy,
    title: "Best Seafood in Stuart",
    source: "Treasure Coast Foodie Awards",
    year: "2024",
  },
  {
    icon: Award,
    title: "Top 10 Cheesesteaks in Florida",
    source: "Florida Food & Travel",
    year: "2023",
  },
  {
    icon: Crown,
    title: "Community Favorite",
    source: "Stuart Main Street Association",
    year: "2024",
  },
  {
    icon: Star,
    title: "Best Hidden Gem",
    source: "Palm Beach Post Dining Guide",
    year: "2023",
  },
];

const pressMentions = [
  {
    outlet: "TC Palm",
    headline: "This Stuart seafood shop is serving up Philly-style cheesesteaks that rival the originals",
    url: "#",
  },
  {
    outlet: "Stuart Magazine",
    headline: "The Whistle Stop: Where fresh seafood meets classic American comfort food",
    url: "#",
  },
  {
    outlet: "Treasure Coast Foodie",
    headline: "5 must-try dishes at The Whistle Stop by Ariel Seafoods",
    url: "#",
  },
];

export function AwardsSection() {
  return (
    <section id="awards" className="section-padding bg-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Recognition
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-accent-foreground text-balance">
              Awards & Press
            </h2>
            <p className="text-lg md:text-xl text-accent-foreground/60 max-w-2xl mx-auto">
              We're honored to be recognized for our commitment to quality food and genuine hospitality
            </p>
          </div>
        </ScrollReveal>

        {/* Awards Grid */}
        <ScrollRevealStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 max-w-5xl mx-auto">
          {awards.map((award, index) => (
            <ScrollRevealItem key={index}>
              <motion.div
                className="bg-background/10 backdrop-blur-sm border border-accent-foreground/10 rounded-2xl p-6 text-center h-full group"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/25 transition-colors">
                  <award.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-accent-foreground mb-1">
                  {award.title}
                </h3>
                <p className="text-sm text-accent-foreground/50 mb-2">{award.source}</p>
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {award.year}
                </span>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>

        {/* Press Mentions */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-accent-foreground">In the Press</h3>
            </div>

            <div className="space-y-3">
              {pressMentions.map((mention, index) => (
                <motion.a
                  key={index}
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-background/10 backdrop-blur-sm border border-accent-foreground/10 rounded-xl px-6 py-4 group hover:bg-background/20 transition-colors"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-primary shrink-0 w-28">
                    {mention.outlet}
                  </span>
                  <span className="text-accent-foreground/80 text-sm md:text-[15px] leading-snug group-hover:text-accent-foreground transition-colors">
                    {mention.headline}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}