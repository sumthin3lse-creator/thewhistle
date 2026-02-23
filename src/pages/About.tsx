import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Users, Award, MapPin, Clock, Utensils, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "@/components/ScrollReveal";
import exteriorImage from "@/assets/restaurant-exterior.png";
import interiorImage from "@/assets/restaurant-interior.png";

const values = [
  {
    icon: Heart,
    title: "Philly Born",
    description:
      "Paul & Nora McGovern built a Stuart institution with uncompromising Philadelphia authenticity — the gold standard since 2004.",
  },
  {
    icon: Users,
    title: "A New Era",
    description:
      "Acquired by Ariel Seafoods in 2023 — same DNA, now backed by the infrastructure and premium supply chain of a globally recognized operation.",
  },
  {
    icon: Award,
    title: "Next-Level Execution",
    description:
      "Same recipes, same legendary homemade cheese sauce and fresh-baked bread — now fueled by world-class quality control.",
  },
  {
    icon: MapPin,
    title: "Your Hometown Staple",
    description:
      "Still your Port Salerno destination. Heavy-hitting, Pennsylvania-style comfort food — elevated. We love cooking for you.",
  },
];

const timeline = [
  {
    year: "2004 — Philly Comes to Florida",
    description:
      "Paul and Nora McGovern brought a piece of the City of Brotherly Love to Stuart, building The Whistle Stop into more than a restaurant — a Stuart institution. The gold standard was set with uncompromising authenticity.",
  },
  {
    year: "2023 — A New Era",
    description:
      "The Whistle Stop was acquired by Ariel Seafoods. The mission was simple: do not change the DNA — preserve it, protect it, and back it with the power of a globally recognized wholesale operation.",
  },
  {
    year: "Today — Tradition, Elevated",
    description:
      "Same corner. Same recipes. Next-level execution. Still serving heavy-hitting, Pennsylvania-style comfort food, now fueled by the infrastructure, quality control, and premium supply chain of an international powerhouse. We love cooking for you.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>About Us | The Whistle Stop by Ariel Seafoods — Port Salerno</title>
        <meta
          name="description"
          content="A Port Salerno tradition, elevated. Nearly two decades of Philly authenticity, now powered by Ariel Seafoods. Same corner, same recipes, next-level execution."
        />
      </Helmet>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full border-[3px] border-primary" />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border-[3px] border-primary rotate-45" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <ScrollReveal>
            <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Our Story
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              A Port Salerno Tradition, Elevated.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Same corner. Same recipes. Next-level execution. We love cooking for you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden warm-shadow">
                <img
                  src={exteriorImage}
                  alt="The Whistle Stop restaurant exterior in Port Salerno, Florida"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Built on Legacy, Backed by Power.
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    For nearly two decades, Paul and Nora McGovern built The Whistle Stop into more than just a restaurant — they built a Stuart institution. The gold standard was set with uncompromising authenticity, from the homemade cheese sauce to the fresh-baked bread. It became the heartbeat of the community.
                  </p>
                  <p>
                    In 2023, The Whistle Stop entered a new era when it was acquired by Ariel Seafoods. The mission was simple: do not change the DNA — preserve it, protect it, and back it with the power of a globally recognized wholesale operation. Today, we are still serving the heavy-hitting, Pennsylvania-style comfort food you grew up on, now fueled by world-class infrastructure and quality control.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                Our Journey
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                From Philly to Port Salerno
              </h2>
            </div>
          </ScrollReveal>
          <ScrollRevealStagger className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <ScrollRevealItem key={index}>
                <motion.div
                  className="bg-card rounded-2xl p-8 warm-shadow border border-border/50 flex gap-6 items-start"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {item.year}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* Interior Image + Values */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
                What We Stand For
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Our Values
              </h2>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value) => (
              <ScrollRevealItem key={value.title}>
                <motion.div
                  className="bg-card rounded-2xl p-8 warm-shadow border border-border/50 h-full"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>

          <ScrollReveal delay={0.3}>
            <div className="max-w-4xl mx-auto mt-16 rounded-2xl overflow-hidden warm-shadow">
              <img
                src={interiorImage}
                alt="Inside The Whistle Stop restaurant in Port Salerno, Florida"
                className="w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visit CTA */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <motion.div
              className="max-w-3xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
              <div className="relative">
                <Coffee className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Come See Us!
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-4">
                  4920 SE Dixie Hwy, Stuart, FL 34997
                </p>
                <p className="text-primary-foreground/70 mb-8">
                  Mon–Fri 7AM–3PM &nbsp;|&nbsp; Sat 8AM–2PM &nbsp;|&nbsp; Sun
                  Closed
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://thewhistlestop.menu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-white/90 transition"
                  >
                    <Utensils className="w-4 h-4" />
                    Order Online
                  </a>
                  <a
                    href="https://maps.google.com/?q=4920+SE+Dixie+Hwy+Stuart+FL+34997"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary-foreground/20 transition"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
