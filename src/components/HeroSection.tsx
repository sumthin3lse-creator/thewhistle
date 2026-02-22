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
        {/* Using a reliable public test video */}
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay to make text pop */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* The Text and Buttons */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-wide font-serif">
          The Whistle Stop
        </h1>
        <p className="text-xl md:text-3xl text-gray-200 mb-8 drop-shadow-md font-medium">
          We Love Cooking For You!
        </p>
        <button className="bg-[#b31b1b] hover:bg-[#8a1515] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg">
          View Menu
        </button>
      </div>
    </section>
  );
}
