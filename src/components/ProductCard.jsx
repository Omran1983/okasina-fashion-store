// FILE: src/components/ProductCard.jsx
import React from 'react';
import { useCart } from '../hooks/useCart';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 flex flex-col justify-between">
      <img
        src={product.image_url}
        alt={product.name}
        className="h-48 object-cover w-full rounded-md mb-4"
      />
      <h3 className="text-lg font-bold text-slate-800">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-2 font-semibold text-purple-700">Rs {product.price}</div>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
