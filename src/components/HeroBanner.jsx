// FILE: src/components/HeroBanner.jsx

import React from 'react';

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white">
      <div className="text-center px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">NEW SUMMER COLLECTION</h2>
        <p className="text-lg md:text-xl font-medium mb-6">Up to 50% Off Select Styles</p>
        <a
          href="#products"
          className="inline-block px-6 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
        >
          SHOP NOW
        </a>
      </div>
    </div>
  );
}
