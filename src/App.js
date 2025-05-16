import React, { useState, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('customer');
  const [selectedSize, setSelectedSize] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const openChat = () => {
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [products] = useState([
    ...['Ladies Pants', 'Ladies Trousers', 'Churidar', 'Pant Sets', 'Kurtis', 'Saris', 'Cord Sets'].flatMap((name, index) => {
      const baseId = 1 + index * 10;
      return ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'].map((size) => ({
        id: baseId + size.charCodeAt(0) % 90,
        name,
        category: 'Women',
        price: Math.floor(799 + Math.random() * 500),
        stock: 25,
        status: 'Active',
        size,
        image: `https://placehold.co/400x600/7c3aed/FFFFFF?text= ${encodeURIComponent(name)}+${size}`,
      }));
    }),
  ]);

  const [orders] = useState([
    { id: '#1001', customer: 'John Doe', status: 'Completed', amount: 'Rs 4,299' },
    { id: '#1000', customer: 'Jane Smith', status: 'Processing', amount: 'Rs 2,899' },
    { id: '#999', customer: 'Robert Johnson', status: 'Shipped', amount: 'Rs 5,499' },
  ]);

  const filteredProducts = products.filter(product => !selectedSize || product.size === selectedSize);

  return (
    <div className="bg-gray-50 min-h-screen font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Same content as above JSX version goes here */}
      {/* You'd need to convert JSX to React.createElement syntax for full App.js */}
      {/* Or just use App.jsx which is better for JSX */}
    </div>
  );
}