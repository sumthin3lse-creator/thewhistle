import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center text-center text-white">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80')` 
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">The Whistle Stop</h1>
        <p className="text-2xl md:text-3xl font-medium mb-6 text-gray-200">
          We Love Cooking For You!
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Stuart's beloved sandwich shop specializing in mouthwatering Philly cheesesteaks, 
          hearty breakfast burritos, and fresh seafood favorites.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#b31b1b] hover:bg-[#8a1515] text-white font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg">
            View Menu
          </button>
          <button className="bg-white hover:bg-gray-100 text-[#b31b1b] font-bold py-3 px-8 rounded-md transition duration-300 shadow-lg text-lg">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
