import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-56 object-cover"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200.png?text=No+Image')}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="font-semibold mb-1">Rs {parseFloat(product.price).toFixed(2)}</p>
              <p className="text-sm text-gray-500">
                Sizes: {Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
