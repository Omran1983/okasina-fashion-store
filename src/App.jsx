import React, { useState, useEffect } from 'react';
import {
  auth,
  getProducts as fetchProducts,
  addProduct as saveProduct,
  loginWithGoogle,
  logout as firebaseLogout,
  uploadImage
} from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('customer'); // customer or admin
  const [selectedSize, setSelectedSize] = useState('');
  const [user, setUser] = useState(null);

  // Product Modal States
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState(25);
  const [productCategory, setProductCategory] = useState('Women');
  const [productSize, setProductSize] = useState('S');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [products, setProducts] = useState([]);

  // Load user and products
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        loadProducts();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadProducts = async () => {
    const fetched = await fetchProducts();
    setProducts(fetched);
  };

  // File upload handler
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const imageUrl = await uploadImage(file);
      setUploadedImages(prev => [...prev, imageUrl]);
    }
  };

  // Add product to Firebase
  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productStock) {
      alert("Please fill in all fields");
      return;
    }

    const newProduct = {
      name: productName,
      category: productCategory,
      price: parseInt(productPrice),
      stock: parseInt(productStock),
      size: productSize,
      image: uploadedImages[0],
      status: 'Active',
      createdAt: new Date(),
    };

    await saveProduct(newProduct);
    alert("Product added successfully!");
    closeModal();
    loadProducts();
  };

  // Admin functions
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setProductName('');
    setProductPrice('');
    setProductStock(25);
    setProductSize('S');
    setProductCategory('Women');
    setUploadedImages([]);
  };

  // Filtered products
  const filteredProducts = selectedSize
    ? products.filter(p => p.size === selectedSize)
    : products;

  return (
    <div className="bg-gray-50 min-h-screen font-sans" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Customer View */}
      {view === 'customer' && (
        <div id="customer-view">
          {/* Navigation */}
          <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <i className="fas fa-tshirt text-purple-600 text-2xl mr-2"></i>
                    <span className="text-xl font-bold text-gray-900">OKASINA Trading</span>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {!user ? (
                    <button onClick={loginWithGoogle} className="ml-3 bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                      <i className="fas fa-sign-in-alt h-6 w-6"></i>
                    </button>
                  ) : (
                    <button onClick={() => setView('admin')} className="ml-3 bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                      <i className="fas fa-tachometer-alt h-6 w-6"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="relative gradient-bg overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <div className="pt-10 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                  <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                      <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                        <span className="block">OKASINA Trading</span>
                        <span className="block text-rose-300">Morrisson Street, Souillac</span>
                      </h1>
                      <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Mauritius's premier AI-powered fashion destination. Experience the future of shopping with virtual try-ons and smart recommendations.
                      </p>
                      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                          <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                            Shop Now
                          </a>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                          <a href="tel:6254283" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10">
                            Call Us: 6254283
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                  <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="store-location rounded-xl p-6 max-w-md text-white">
                        <h3 className="text-xl font-bold mb-2">Our Location</h3>
                        <p className="mb-2"><i className="fas fa-map-marker-alt mr-2"></i> Morrisson Street, Souillac, Mauritius</p>
                        <p className="mb-4"><i className="fas fa-clock mr-2"></i> Open Mon-Sat: 9:00 AM - 6:00 PM</p>
                        <div className="flex space-x-4">
                          <a href="tel:6254283" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center">
                            <i className="fas fa-phone mr-2"></i> 6254283
                          </a>
                          <a href="tel:57944614" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center">
                            <i className="fas fa-mobile-alt mr-2"></i> 57944614
                          </a>
                        </div>
                      </div>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80 "
                      alt="Fashion Store"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {['All Items', 'Ladies Pants', 'Ladies Trousers', 'Churidar', 'Pant Sets', 'Kurtis', 'Saris', 'Cord Sets'].map((category) => (
                  <a key={category} href="#" className="group text-center">
                    <div className="bg-gray-100 rounded-lg p-4 group-hover:bg-purple-100 transition-colors">
                      <i className="fas fa-female text-purple-600 text-2xl mb-2"></i>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700">{category}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                <select
                  onChange={(e) => setSelectedSize(e.target.value)}
                  value={selectedSize}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-600 focus:border-purple-600"
                >
                  <option value="">All Sizes</option>
                  {['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 8).map((product) => (
                    <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden group">
                      <div className="h-64 overflow-hidden">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">Available in sizes: S - 10XL</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-lg font-bold text-purple-600">Rs {product.price}</span>
                          <span className={`text-sm font-medium ${product.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                            {product.stock} in stock
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">No products found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Priya M.", role: "First-time Buyer", review: "The virtual try-on feature helped me choose the perfect outfit. The quality is amazing!" },
                  { name: "Anita R.", role: "Fashion Enthusiast", review: "Best shopping experience ever! Fast delivery and amazing support team 😍" },
                  { name: "Sarah T.", role: "Regular Customer", review: "I was hesitant to buy online, but their virtual try-on feature helped me choose the perfect size."
                ].map((testimonial, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-4">
                      <img src={`https://picsum.photos/id/ ${idx}/200/200`} alt={testimonial.name} className="h-12 w-12 rounded-full" />
                      <div className="ml-4">
                        <h4 className="text-lg font-medium">{testimonial.name}</h4>
                        <p className="text-purple-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.review}</p>
                    <div className="mt-4 flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star"></i>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Choose OKASINA?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <i className="fas fa-robot text-xl"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI Fashion Assistant</p>
                  <p className="ml-16 text-base text-gray-500">Our AI helps you find the perfect outfit based on preferences, body type, and occasion.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <i className="fas fa-mobile-alt text-xl"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Virtual Try-On</p>
                  <p className="ml-16 text-base text-gray-500">See how clothes look on you before buying with our augmented reality try-on feature.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <i className="fas fa-truck text-xl"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Fast Delivery</p>
                  <p className="ml-16 text-base text-gray-500">Get your orders delivered quickly across Mauritius.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                    <i className="fas fa-heart text-xl"></i>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customer Satisfaction</p>
                  <p className="ml-16 text-base text-gray-500">We're committed to making sure every customer finds what they love.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat Button */}
          <div className="fab" onClick={openChat}>
            <i className="fas fa-robot text-2xl text-white"></i>
          </div>

          {/* AI Chat Modal */}
          {chatOpen && (
            <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col">
              <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-bold">AI Assistant</h3>
                <button onClick={closeChat}><i className="fas fa-minus text-white"></i></button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto bg-gray-50">
                <div className="mb-4">
                  <div className="bg-gray-200 p-3 rounded-lg inline-block max-w-xs">
                    <p className="text-sm">Hello! How can I assist you today?</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex">
                  <input type="text" placeholder="Type your message..." className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Nav (Mobile Only) */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-40">
            <button onClick={() => setView('customer')} className="flex flex-col items-center text-purple-600">
              <i className="fas fa-home"></i>
              <span className="text-xs">Home</span>
            </button>
            <button onClick={() => setView('admin')} className="flex flex-col items-center text-gray-500">
              <i className="fas fa-tachometer-alt"></i>
              <span className="text-xs">Admin</span>
            </button>
          </div>
        </div>
      )}

      {/* Admin View */}
      {view === 'admin' && user && (
        <div id="admin-view" className="min-h-screen bg-gray-100">
          {/* Sidebar */}
          <div className={`admin-sidebar fixed top-0 left-0 h-full bg-gray-900 text-white z-50 ${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all`}>
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
              {!isSidebarCollapsed && (
                <>
                  <div className="flex items-center">
                    <i className="fas fa-tshirt text-purple-600 text-2xl mr-2"></i>
                    <span className="text-xl font-bold">Admin</span>
                  </div>
                  <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                    <i className="fas fa-bars"></i>
                  </button>
                </>
              )}
              {isSidebarCollapsed && (
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white ml-auto">
                  <i className="fas fa-bars"></i>
                </button>
              )}
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" onClick={() => setActiveTab('dashboard')} className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-purple-600 group">
                    <i className="fas fa-tachometer-alt mr-3"></i>
                    <span className={!isSidebarCollapsed ? '' : 'hidden'}>Overview</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setActiveTab('products')} className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 group">
                    <i className="fas fa-tshirt mr-3"></i>
                    <span className={!isSidebarCollapsed ? '' : 'hidden'}>Products</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setActiveTab('orders')} className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 group">
                    <i className="fas fa-shopping-cart mr-3"></i>
                    <span className={!isSidebarCollapsed ? '' : 'hidden'}>Orders</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setView('customer')} className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 group">
                    <i className="fas fa-store mr-3"></i>
                    <span className={!isSidebarCollapsed ? '' : 'hidden'}>Storefront</span>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={firebaseLogout} className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 group">
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    <span className={!isSidebarCollapsed ? '' : 'hidden'}>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className={`admin-main min-h-screen bg-gray-100 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all`}>
            {/* Header */}
            <header className="bg-white shadow">
              <div className="px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </header>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white overflow-hidden shadow rounded-lg report-card">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                          <i className="fas fa-money-bill-wave text-purple-600 text-xl"></i>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Today's Sales</dt>
                            <dd className="text-lg font-medium text-gray-900">Rs 124,500</dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                  <button onClick={openModal} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                    <i className="fas fa-plus mr-2"></i>Add Product
                  </button>
                </div>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img src={product.image} alt={product.name} className="h-10 w-10 rounded" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">#{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs {product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{product.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <a href="#" className="text-purple-600 hover:text-purple-900"><i className="fas fa-edit"></i></a>
                              <a href="#" onClick={() => deleteProductFromDb(product.id)} className="text-pink-600 hover:text-pink-900"><i className="fas fa-trash"></i></a>
                              <a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-eye"></i></a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: '#1001', customer: 'John Doe', status: 'Completed', amount: 'Rs 4,299' },
                        { id: '#1000', customer: 'Jane Smith', status: 'Processing', amount: 'Rs 2,899' },
                        { id: '#999', customer: 'Robert Johnson', status: 'Shipped', amount: 'Rs 5,499' }
                      ].map((order, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{order.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Login Prompt */}
      {view === 'admin' && !user && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">Admin Login Required</h2>
            <p className="mb-6">Only authorized users can access the admin dashboard.</p>
            <button onClick={loginWithGoogle} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              Sign in with Google
            </button>
            <button onClick={() => setView('customer')} className="mt-4 text-gray-500 underline ml-4">
              Back to Store
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900">Add New Product</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SKU / Size</label>
                    <input
                      type="text"
                      value={productSize}
                      onChange={(e) => setProductSize(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-600 focus:ring-purple-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 dropzone rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer font-medium text-purple-600 hover:text-purple-900">
                            <span>Upload files</span>
                            <input id="file-upload" name="file-upload" type="file" multiple onChange={handleImageUpload} className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {uploadedImages.map((image, idx) => (
                        <img key={idx} src={image} alt="Preview" className="h-20 w-20 object-cover rounded" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddProduct}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 sm:ml-3 sm:w-auto">
                  Save
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}