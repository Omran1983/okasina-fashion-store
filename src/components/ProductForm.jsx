// FILE: src/components/ProductForm.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProductForm({ refresh }) {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image_url = '';

    if (formData.image) {
      const fileName = `${Date.now()}_${formData.image.name}`;
      const { data, error } = await supabase.storage.from('product-images').upload(fileName, formData.image);

      if (error) {
        console.error('Image upload failed:', error);
        return;
      }

      const { publicUrl } = supabase.storage.from('product-images').getPublicUrl(fileName).data;
      image_url = publicUrl;
    }

    const { error } = await supabase.from('products').insert([
      {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image_url,
      },
    ]);

    if (error) {
      console.error('Product insert failed:', error);
    } else {
      setFormData({ name: '', description: '', price: '', image: null });
      refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div>
        <label>Price (Rs):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="input"
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      </div>
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Add Product
      </button>
    </form>
  );
}
