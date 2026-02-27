import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ScrollReveal";

export function HiringBanner() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="bg-card rounded-2xl p-8 md:p-12 warm-shadow text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">Now Hiring</span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Join the Whistle Stop Family
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                We're looking for passionate team members to be part of a Port Salerno tradition. Great people, great food, great opportunity.
              </p>
              <Button size="lg" asChild>
                <Link to="/apply">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
