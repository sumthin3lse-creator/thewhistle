import { Instagram, Facebook, MapPin, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";
import { Button } from "@/components/ui/button";

import foodPhoto3 from "@/assets/food-photo-3.png";
import foodPhoto4 from "@/assets/food-photo-4.png";
import foodPhoto5 from "@/assets/food-photo-5.png";
import foodPhoto6 from "@/assets/food-photo-6.png";
import foodPhoto7 from "@/assets/food-photo-7.png";
import foodPhoto8 from "@/assets/food-photo-8.png";
import foodPhoto9 from "@/assets/food-photo-9.png";
import foodPhoto10 from "@/assets/food-photo-10.png";
import foodPhoto11 from "@/assets/food-photo-11.png";

const instagramPosts = [
  { image: foodPhoto3, alt: "Delicious food platter at The Whistle Stop Stuart FL" },
  { image: foodPhoto4, alt: "Fresh sandwich from The Whistle Stop Stuart FL" },
  { image: foodPhoto5, alt: "Loaded fries at The Whistle Stop Stuart FL" },
  { image: foodPhoto6, alt: "Seafood special at The Whistle Stop Stuart FL" },
  { image: foodPhoto7, alt: "Smash burger close-up at The Whistle Stop Stuart FL" },
  { image: foodPhoto8, alt: "Daily special at The Whistle Stop Stuart FL" },
  { image: foodPhoto9, alt: "Breakfast plate at The Whistle Stop Stuart FL" },
  { image: foodPhoto10, alt: "Sub sandwich from The Whistle Stop Stuart FL" },
  { image: foodPhoto11, alt: "Combo meal at The Whistle Stop Stuart FL" },
];

const facebookReviews = [
  {
    name: "Jennifer M.",
    rating: 5,
    text: "Hands down the best seafood in Stuart! Fresh catch every time, and the staff treats you like family. We drive 30 minutes just to eat here.",
    timeAgo: "2 weeks ago",
  },
  {
    name: "Carlos D.",
    rating: 5,
    text: "The cheesesteaks are legit Philly-style. I've been searching for years and finally found the real deal right here in Florida.",
    timeAgo: "1 month ago",
  },
  {
    name: "Linda K.",
    rating: 5,
    text: "Amazing food, huge portions, and very affordable. The smash burgers are incredible. This place deserves way more recognition!",
    timeAgo: "3 weeks ago",
  },
];

const socialLinks = [
  {
    platform: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/thewhistlestopbyarielseafoods/",
    label: "@thewhistlestopbyarielseafoods",
    color: "from-pink-500 to-purple-600",
  },
  {
    platform: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=100063586674218",
    label: "The Whistle Stop by Ariel Seafoods",
    color: "from-blue-600 to-blue-700",
  },
  {
    platform: "Google",
    icon: MapPin,
    href: "https://maps.app.goo.gl/YourGoogleLink",
    label: "Find us on Google Maps",
    color: "from-green-500 to-emerald-600",
  },
];

export function SocialMediaSection() {
  return (
    <section id="social" className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Follow Along
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground text-balance">
              Stay Connected
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow us on social media for daily specials, behind-the-scenes looks, and mouth-watering photos
            </p>
          </div>
        </ScrollReveal>

        {/* Instagram Grid */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Instagram</h3>
                  <p className="text-sm text-muted-foreground">@thewhistlestopbyarielseafoods</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.instagram.com/thewhistlestopbyarielseafoods/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Follow <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 max-w-4xl mx-auto">
              {instagramPosts.map((post, index) => (
                <motion.a
                  key={index}
                  href="https://www.instagram.com/thewhistlestopbyarielseafoods/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Facebook Reviews */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">Facebook Reviews</h3>
                  <p className="text-sm text-muted-foreground">See what people are saying</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.facebook.com/profile.php?id=100063586674218"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Review Us <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            </div>

            <ScrollRevealStagger className="grid md:grid-cols-3 gap-6">
              {facebookReviews.map((review, index) => (
                <ScrollRevealItem key={index}>
                  <motion.div
                    className="bg-card border border-border/50 rounded-2xl p-6 h-full warm-shadow hover-lift"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                        />
                      ))}
                    </div>
                    <p className="text-foreground/80 leading-relaxed mb-4 text-[15px]">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600/10 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">{review.name.charAt(0)}</span>
                        </div>
                        <p className="font-semibold text-foreground text-sm">{review.name}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              ))}
            </ScrollRevealStagger>
          </div>
        </ScrollReveal>

        {/* Social Links */}
        <ScrollRevealStagger className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {socialLinks.map((link, index) => (
            <ScrollRevealItem key={index}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-5 warm-shadow hover-lift group"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground text-sm">{link.platform}</p>
                  <p className="text-xs text-muted-foreground truncate">{link.label}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            </ScrollRevealItem>
          ))}
        </ScrollRevealStagger>
      </div>
    </section>
  );
}