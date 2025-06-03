// FILE: src/App.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaUser, FaTools, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import HomepageLayout from './components/HomepageLayout';

export default function App() {
  const navItems = [
    { label: 'Customer View', icon: <FaUser />, to: '/' },
    { label: 'Admin Panel', icon: <FaTools />, to: '/admin' },
    { label: 'Cart', icon: <FaShoppingCart />, to: '/cart' },
    { label: 'Order Summary', icon: <FaClipboardList />, to: '/summary' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-slate-100 to-purple-100 p-4">
      <h1 className="text-center text-4xl font-extrabold text-purple-800 mb-8">
        🛍️ OKASINA Fashion Store
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {navItems.map(({ label, icon, to }) => (
          <Link
		  key={to}
		  to={to}
		  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-purple-300 text-purple-700 font-medium shadow-sm hover:bg-purple-50 hover:text-purple-900 transition-all duration-200"
		>
		  <span className="text-lg">{icon}</span>
		  <span className="text-sm tracking-wide">{label}</span>
		</Link>
        ))}
      </div>

      {/* Dynamic content goes here */}
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
