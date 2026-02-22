export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden flex items-center justify-center">
      {/* The Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* The Text and Buttons */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide font-serif">

        <p className="text-xl md:text-3xl text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
        </p>
        <button className="bg-[#b31b1b] hover:bg-[#8a1515] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg">
          View Menu
        </button>
      </div>
    </section>
  );
}
