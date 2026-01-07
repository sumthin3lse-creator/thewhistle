import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Tagline */}
            <div className="text-center md:text-left">
              <img 
                src={logo} 
                alt="The Whistle Stop by Ariel Seafoods" 
                className="h-16 w-auto mx-auto md:mx-0 mb-2"
              />
              <p className="text-primary-foreground/50 text-sm mt-2">
                Locally-owned. Family-made. Always fresh.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/thewhistlestopbyarielseafoods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/thewhistlestopbyarielseafoods"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <hr className="border-primary-foreground/10 my-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© {currentYear} The Whistle Stop by Ariel Seafoods. All rights reserved.</p>
            <p>4920 SE Dixie Hwy, Stuart, FL 34997</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
