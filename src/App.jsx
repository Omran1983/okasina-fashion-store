import React, { useState } from 'react';

function App() {
  const products = [
    { id: 1, name: "Ladies Trousers", price: "Rs 799", stock: "150 in stock", image: "https://picsum.photos/id/1/400/600 ", sizes: ["S", "M", "L", "XL"], category: "Ladies Trousers" },
    { id: 2, name: "Churidar", price: "Rs 1299", stock: "130 in stock", image: "https://picsum.photos/id/2/400/600 ", sizes: ["M", "L", "Free Size"], category: "Churidar" },
    { id: 3, name: "Kurti Set", price: "Rs 1999", stock: "120 in stock", image: "https://picsum.photos/id/3/400/600 ", sizes: ["M", "L", "XL", "Free Size"], category: "Kurtis" },
    { id: 4, name: "Traditional Sari", price: "Rs 2499", stock: "100 in stock", image: "https://picsum.photos/id/4/400/600 ", sizes: ["Free Size"], category: "Saris" },
    { id: 5, name: "Party Wear Pant Set", price: "Rs 1999", stock: "110 in stock", image: "https://picsum.photos/id/5/400/600 ", sizes: ["L", "XL", "2XL", "3XL"], category: "Pant Sets" },
    { id: 6, name: "Cord Set", price: "Rs 1899", stock: "90 in stock", image: "https://picsum.photos/id/6/400/600 ", sizes: ["S", "M", "L", "XL", "3XL"], category: "Cord Sets" }
  ];

  const [selectedSize, setSelectedSize] = useState('');
  const sizes = ["All Sizes", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL", "7XL", "8XL", "9XL", "10XL", "Free Size"];

  const filteredProducts = selectedSize === "" || selectedSize === "All Sizes"
    ? products
    : products.filter(product => product.sizes.includes(selectedSize));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-purple-600">OKASINA Trading</h1>
          <select 
            onChange={(e) => setSelectedSize(e.target.value)} 
            value={selectedSize} 
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            {sizes.map((size, index) => (
              <option key={index} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg text-white p-6 text-center">
        <h2 className="text-2xl font-bold">Welcome to OKASINA Trading</h2>
        <p className="mt-2">Experience the future of shopping with virtual try-ons and smart recommendations.</p>
        <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-all">Shop Now</button>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Sizes: {product.sizes.join(', ')}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg text-purple-600 font-bold">{product.price}</span>
                    <span className="text-sm text-green-600">{product.stock}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-6 text-center text-sm text-gray-500 mt-10">
        © 2025 OKASINA Trading. All rights reserved.
      </footer>
    </div>
  );
}

export default App;