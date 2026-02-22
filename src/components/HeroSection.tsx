export const HeroSection = () => (
  <section>
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </div>

    <div className="flex flex-col items-center gap-3 py-6 bg-background">
      <a
        href="https://thewhistlestop.menu/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primary/85 text-primary-foreground font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg inline-block"
      >
        We Love Cooking For You
      </a>
      <a
        href="https://www.doordash.com/store/the-whistle-stop-by-ariel-seafoods-stuart-25598507/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary text-sm font-medium underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-primary transition-colors"
      >
        Order DoorDash
      </a>
    </div>
  </section>
);
