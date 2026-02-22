import { ExternalLink } from "lucide-react";

export const HeroSection = () => (
  <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-end justify-center pb-12">
    <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>

    <div className="relative z-10 flex flex-col items-center gap-3">
      <a
        href="https://thewhistlestop.menu/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#b31b1b] hover:bg-[#8a1515] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg inline-block"
      >
        We Love Cooking For You
      </a>
      <a
        href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-white font-semibold text-sm underline underline-offset-4 hover:text-white/80 transition"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Order DoorDash
      </a>
    </div>
  </section>
);
