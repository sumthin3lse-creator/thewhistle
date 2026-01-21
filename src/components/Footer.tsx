import { Facebook, Instagram, Heart } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-accent-foreground py-16 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Logo & Tagline */}
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={logo} 
                alt="The Whistle Stop by Ariel Seafoods" 
                className="h-20 w-auto mx-auto md:mx-0 mb-4"
              />
              <p className="text-accent-foreground/60 text-sm flex items-center justify-center md:justify-start gap-1">
                Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Stuart, FL
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.a
                href="https://www.facebook.com/thewhistlestopbyarielseafoods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/thewhistlestopbyarielseafoods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-accent-foreground/5 border border-accent-foreground/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          <hr className="border-accent-foreground/10 my-10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-accent-foreground/50">
            <p>© {currentYear} The Whistle Stop by Ariel Seafoods. All rights reserved.</p>
            <p className="flex items-center gap-1">
              4920 SE Dixie Hwy, Stuart, FL 34997
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
