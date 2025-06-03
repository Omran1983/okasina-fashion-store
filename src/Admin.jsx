import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { uploadImage } from './uploadImage';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('');

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('name');
    if (!error) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');
    const imageUrl = await uploadImage(image);
    if (!imageUrl) return setStatus('Image upload failed.');

    const { error } = await supabase.from('products').insert([{
      name,
      price,
      sizes: sizes.split(',').map(s => s.trim()),
      description,
      image: imageUrl,
      category: 'Manual',
      stock: '100 in stock'
    }]);

    if (error) {
      setStatus('Failed to upload product.');
    } else {
      setStatus('✅ Product uploaded!');
      fetchProducts();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Admin Dashboard</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-10 space-y-4">
        <input placeholder="Product Name" className="w-full border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Price (e.g. Rs 1999)" className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Sizes (comma separated)" className="w-full border p-2 rounded" value={sizes} onChange={e => setSizes(e.target.value)} />
        <textarea placeholder="Description" className="w-full border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button className="bg-purple-600 text-white py-2 px-6 rounded" type="submit">Upload Product</button>
        <p className="text-sm text-gray-600 mt-2">{status}</p>
      </form>

      <h2 className="text-xl font-semibold mb-4">🧾 Product List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded shadow p-4">
            <img src={p.image} className="w-full h-48 object-cover rounded mb-2" />
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.description}</p>
            <p className="text-purple-600 font-semibold">{p.price}</p>
            <p className="text-sm text-gray-500">Sizes: {p.sizes?.join(', ')}</p>
            <p className="text-sm text-gray-500">{p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
