// FILE: src/components/HomepageLayout.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    label: "Sarees",
    image: "https://images.unsplash.com/photo-1634790353660-e054b9b1e56a",
  },
  {
    label: "Kurtis",
    image: "https://images.unsplash.com/photo-1625210436686-240cf352b91a",
  },
  {
    label: "Lehengas",
    image: "https://images.unsplash.com/photo-1625644980692-755e259db78f",
  },
  {
    label: "Shararas",
    image: "https://images.unsplash.com/photo-1625231497407-77a6bd9762b0",
  },
];

export default function HomepageLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-['Poppins']">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gradient-to-r from-pink-50 to-rose-100">
        <div className="flex flex-col justify-center px-10 py-16">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
            Modern Elegance, <br /> Rooted in Heritage
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Explore sarees, kurtis, lehengas & more — handpicked with love, delivered across Mauritius.
          </p>
          <Link
            to="/"
            className="w-fit bg-rose-600 hover:bg-rose-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-lg transition"
          >
            Shop the Collection
          </Link>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1625210442014-bc2e7e5a28ec"
            alt="hero fashion model"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
      </section>

      {/* Shop By Category */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-rose-600">
          🛍️ Shop By Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ label, image }) => (
            <div key={label} className="relative group overflow-hidden rounded-xl shadow-xl">
              <img
                src={`${image}?auto=format&fit=crop&w=600&q=80`}
                alt={label}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition duration-300">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statement Block */}
      <section className="bg-black text-center py-24 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          🧵 Tradition Meets Trend
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Each outfit is curated for the bold, modern woman who values heritage and elegance. Discover wearable statements with every stitch.
        </p>
      </section>
    </div>
  );
}
