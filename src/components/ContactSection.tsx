import { MapPin, Phone, Mail, Clock, ExternalLink, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "./ScrollReveal";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "4920 SE Dixie Hwy, Stuart, FL 34997",
    href: "https://maps.google.com/?q=4920+SE+Dixie+Hwy+Stuart+FL+34997",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(772) 220-1020",
    href: "tel:7722201020",
  },
  {
    icon: Mail,
    label: "Email",
    value: "thewhistlestopstuart@gmail.com",
    href: "mailto:thewhistlestopstuart@gmail.com",
  },
];

const hours = [
  { days: "Monday - Friday", time: "7:00 AM - 3:00 PM" },
  { days: "Saturday", time: "8:00 AM - 2:00 PM" },
  { days: "Sunday", time: "Closed" },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-primary font-semibold tracking-[0.2em] uppercase text-sm mb-4">
              Visit Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop by for a meal or give us a call. We can't wait to serve you!
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <ScrollRevealStagger className="space-y-6">
            {/* Contact Details */}
            <ScrollRevealItem>
              <div className="bg-card rounded-3xl p-8 warm-shadow border border-border/50">
                <h3 className="font-display text-2xl font-bold text-foreground mb-8">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 group"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <item.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <div className="pt-1">
                        <p className="text-sm text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-foreground font-semibold group-hover:text-primary transition-colors flex items-center gap-1">
                          {item.value}
                          {item.icon === MapPin && <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollRevealItem>

            {/* Hours */}
            <ScrollRevealItem>
              <div className="bg-card rounded-3xl p-8 warm-shadow border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {hours.map((item) => (
                    <div
                      key={item.days}
                      className="flex justify-between items-center py-3 border-b border-border/50 last:border-0"
                    >
                      <span className="text-foreground font-medium">
                        {item.days}
                      </span>
                      <span
                        className={`font-semibold ${
                          item.time === "Closed"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollRevealStagger>

          {/* Map & CTA */}
          <ScrollRevealStagger className="space-y-6">
            {/* Map Embed */}
            <ScrollRevealItem>
              <div className="bg-card rounded-3xl overflow-hidden warm-shadow h-80 border border-border/50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.8!2d-80.2342!3d27.1737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d93db0d6d78d25%3A0x5c5e5e5e5e5e5e5e!2s4920%20SE%20Dixie%20Hwy%2C%20Stuart%2C%20FL%2034997!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Whistle Stop Location"
                />
              </div>
            </ScrollRevealItem>

            {/* Order CTA */}
            <ScrollRevealItem>
              <motion.div 
                className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative circles */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full" />
                
                <div className="relative">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                    Ready to Order?
                  </h3>
                  <p className="text-primary-foreground/80 mb-8 text-lg">
                    Get your favorites delivered straight to your door with DoorDash!
                  </p>
                  <Button variant="secondary" size="lg" className="font-semibold shadow-lg" asChild>
                    <a
                      href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Order on DoorDash
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </ScrollRevealItem>
          </ScrollRevealStagger>
        </div>
      </div>
    </section>
  );
}
