// FILE: src/components/product/ProductFilters.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProductFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    color: '',
    price: '',
    fabric: '',
    occasion: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    onFilter(filters);
  }, [filters]);

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <select name="category" value={filters.category} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Categories</option>
        <option value="Sarees">Sarees</option>
        <option value="Kurtis">Kurtis</option>
        <option value="Salwar Kameez">Salwar Kameez</option>
        <option value="Tunics">Tunics</option>
        <option value="Dresses">Dresses</option>
        <option value="Bottoms">Bottoms</option>
        <option value="Accessories">Accessories</option>
      </select>

      <select name="size" value={filters.size} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Sizes</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>

      <select name="color" value={filters.color} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Colors</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Yellow">Yellow</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
        <option value="Multi-color">Multi-color</option>
      </select>

      <select name="price" value={filters.price} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Prices</option>
        <option value="low">Under Rs 1,000</option>
        <option value="mid">Rs 1,000 – Rs 2,500</option>
        <option value="high">Above Rs 2,500</option>
      </select>

      <select name="fabric" value={filters.fabric} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Fabrics</option>
        <option value="Cotton">Cotton</option>
        <option value="Silk">Silk</option>
        <option value="Georgette">Georgette</option>
        <option value="Chiffon">Chiffon</option>
        <option value="Rayon">Rayon</option>
        <option value="Linen">Linen</option>
        <option value="Velvet">Velvet</option>
      </select>

      <select name="occasion" value={filters.occasion} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Occasions</option>
        <option value="Casual">Casual</option>
        <option value="Office Wear">Office Wear</option>
        <option value="Wedding">Wedding</option>
        <option value="Party">Party</option>
        <option value="Religious / Cultural">Religious / Cultural</option>
      </select>
    </div>
  );
}