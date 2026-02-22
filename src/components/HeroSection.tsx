export const HeroSection = () => (
  <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-center justify-center">
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>

    <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
      <button className="bg-[#b31b1b] hover:bg-[#8a1515] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg">
        View Menu
      </button>
    </div>
  </section>
);
