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
      "Owners Paul & Nora McGovern brought authentic Philadelphia flavors to Stuart in 2004, respecting the tradition with every sandwich.",
  },
  {
    icon: Users,
    title: "20+ Years of Passion",
    description:
      "Two decades of Philly-born dedication in every grill press — from daily fresh-baked bread to our legendary homemade cheese sauce.",
  },
  {
    icon: Award,
    title: "Best Philly Ever",
    description:
      "Fresh-baked bread with the perfect 'crust-to-soft' ratio and legendary homemade cheese sauce that locals travel miles for.",
  },
  {
    icon: MapPin,
    title: "A True Destination",
    description:
      "Nestled across from the marina and a stone's throw from the Eastern Coastal Railway, we capture the funky, laid-back energy of Port Salerno.",
  },
];

const timeline = [
  {
    year: "2004 — Philly Comes to Florida",
    description:
      "Born and raised in Philadelphia, owners Paul and Nora McGovern brought a piece of the City of Brotherly Love to Stuart, opening The Whistle Stop with a mission to serve authentic Philly flavors.",
  },
  {
    year: "The Tradition",
    description:
      "Daily fresh-baked bread with the perfect 'crust-to-soft' ratio. Legendary homemade cheese sauce. When we say 'Best Philly Ever,' we aren't just boasting — we're honoring 20+ years of Philly-born passion.",
  },
  {
    year: "Today — A Port Salerno Landmark",
    description:
      "Nestled right across from the marina and a stone's throw from the Eastern Coastal Railway, The Whistle Stop captures the funky, laid-back energy of Port Salerno — a true destination for locals and visitors alike.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>About Us | The Whistle Stop — Authentic Philly in Port Salerno</title>
        <meta
          name="description"
          content="Learn about The Whistle Stop — owners Paul & Nora McGovern brought authentic Philadelphia flavors to Port Salerno in 2004. 20+ years of Philly-born passion in every grill press."
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
              A Real Taste of Philly, Right in Port Salerno.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Born in Philadelphia. Built in Port Salerno. 20+ years of passion in every grill press.
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
                  The Philly Connection
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    Born and raised in Philadelphia, owners Paul and Nora McGovern brought a piece of the City of Brotherly Love to Stuart in 2004. At The Whistle Stop, we don't just make sandwiches; we respect the tradition.
                  </p>
                  <p>
                    That means daily fresh-baked bread with the perfect "crust-to-soft" ratio and our legendary homemade cheese sauce that locals travel miles for. When we say it's the "Best Philly Ever," we aren't just boasting — we're bringing 20+ years of Philly-born passion to every grill press.
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
