// FILE: src/components/product/ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', image: null });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error fetching products:', error);
    else setProducts(data);
  };

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
      const { error: uploadError } = await supabase
        .storage
        .from('product-images')
        .upload(fileName, formData.image);

      if (uploadError) {
        console.error('Upload failed:', uploadError);
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
      }
    ]);

    if (error) {
      console.error('Product insert failed:', error);
    } else {
      setFormData({ name: '', description: '', price: '', image: null });
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">Add New Product</h2>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Product Name" className="w-full p-2 border rounded" />
        <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Description" className="w-full p-2 border rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="Price (Rs)" className="w-full p-2 border rounded" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add Product</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="font-semibold text-purple-600">Rs {product.price}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
