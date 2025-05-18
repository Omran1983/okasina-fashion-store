import React, { useState } from 'react';

function App() {
  const [selectedSize, setSelectedSize] = useState('');
  const import React, { useState } from 'react';

function App() {
  const [selectedSize, setSelectedSize] = useState('');
  const products = [
    { id: 1, name: "Elegant Ladies Pants", price: "Rs 899", stock: "150 in stock", image: "https://picsum.photos/id/1/400/600 ", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Churidar", price: "Rs 1299", stock: "150 in stock", image: "https://picsum.photos/id/2/400/600 ", sizes: ["M", "L", "Free Size"] }
  ];

  const sizes = ["All Sizes", "S", "M", "L", "XL", "Free Size"];
  const filteredProducts = selectedSize === "" || selectedSize === "All Sizes" 
    ? products 
    : products.filter(product => product.sizes.includes(selectedSize));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">OKASINA Trading</h1>

      {/* Size Filter */}
      <select 
        onChange={(e) => setSelectedSize(e.target.value)} 
        value={selectedSize}
        className="mb-6 border rounded px-3 py-1 text-sm"
      >
        {sizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Size: {product.sizes.join(', ')}</p>
              <p className="mt-2 font-bold text-purple-700">{product.price}</p>
              <p className="mt-1 text-green-600 text-sm">{product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App; = [
    { id: 1, name: "Elegant Ladies Pants", price: "Rs 899", stock: "150 in stock", image: "https://picsum.photos/id/1/400/600 ", sizes: ["S", "M", "L", "XL"] },
    { id: 2, name: "Churidar", price: "Rs 1299", stock: "150 in stock", image: "https://picsum.photos/id/2/400/600 ", sizes: ["M", "L", "Free Size"] }
  ];

  const sizes = ["All Sizes", "S", "M", "L", "XL", "Free Size"];
  const filteredProducts = selectedSize === "" || selectedSize === "All Sizes" 
    ? products 
    : products.filter(product => product.sizes.includes(selectedSize));

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">OKASINA Trading</h1>

      {/* Size Filter */}
      <select 
        onChange={(e) => setSelectedSize(e.target.value)} 
        value={selectedSize}
        className="mb-6 border rounded px-3 py-1 text-sm"
      >
        {sizes.map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Size: {product.sizes.join(', ')}</p>
              <p className="mt-2 font-bold text-purple-700">{product.price}</p>
              <p className="mt-1 text-green-600 text-sm">{product.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;