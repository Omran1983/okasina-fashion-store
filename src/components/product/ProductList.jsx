// FILE: src/components/product/ProductList.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ProductCard from '../ProductCard';
import ProductFilters from './ProductFilters';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    let query = supabase.from('products').select('*');

    if (filters.category) query = query.ilike('category', `%${filters.category}%`);
    if (filters.size) query = query.ilike('size', `%${filters.size}%`);
    if (filters.color) query = query.ilike('color', `%${filters.color}%`);
    if (filters.fabric) query = query.ilike('fabric', `%${filters.fabric}%`);
    if (filters.occasion) query = query.ilike('occasion', `%${filters.occasion}%`);

    if (filters.price === 'low') query = query.lte('price', 1000);
    else if (filters.price === 'mid') query = query.gte('price', 1000).lte('price', 2500);
    else if (filters.price === 'high') query = query.gte('price', 2500);

    const { data, error } = await query;
    if (!error) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:sticky top-4 h-fit bg-white shadow p-4 rounded mb-4 md:mb-0">
        <h3 className="text-lg font-bold mb-2 text-purple-700">🔍 Filter Products</h3>
        <ProductFilters onFilter={fetchProducts} />
      </div>

      <div className="w-full md:w-3/4 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
