import React, { useState } from "react";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [chatOpen, setChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("customer");
  const [selectedSize, setSelectedSize] = useState({});
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const products = [
    {
      id: 1,
      name: "Elegant Ladies Pants",
      price: "Rs 899",
      stock: "150 in stock",
      category: "Ladies Pants",
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "New",
    },
    {
      id: 2,
      name: "Stylish Ladies Trousers",
      price: "Rs 799",
      stock: "150 in stock",
      category: "Ladies Trousers",
      image:
        "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Bestseller",
    },
    {
      id: 3,
      name: "Traditional Churidar",
      price: "Rs 1299",
      stock: "150 in stock",
      category: "Churidar",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Trending",
    },
    {
      id: 4,
      name: "Elegant Pant Sets",
      price: "Rs 1499",
      stock: "150 in stock",
      category: "Pant Sets",
      image:
        "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Popular",
    },
    {
      id: 5,
      name: "Designer Kurtis",
      price: "Rs 999",
      stock: "150 in stock",
      category: "Kurtis",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Featured",
    },
    {
      id: 6,
      name: "Traditional Saris",
      price: "Rs 1799",
      stock: "150 in stock",
      category: "Saris",
      image:
        "https://images.unsplash.com/photo-1594633312688-9b349122cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Limited",
    },
    {
      id: 7,
      name: "Fashionable Cord Sets",
      price: "Rs 1599",
      stock: "150 in stock",
      category: "Cord Sets",
      image:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80 ",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"],
      badge: "Hot",
    },
  ];

  const testimonials = [
    {
      name: "Sarah L.",
      role: "Regular Customer",
      quote:
        "The quality of the clothes at OKASINA is exceptional. I especially love their kurtis - they're so comfortable and stylish!",
      rating: 5,
    },
    {
      name: "Priya M.",
      role: "First-time Buyer",
      quote:
        "I was hesitant to buy online, but their virtual try-on feature helped me choose the perfect size. The pant set I ordered fits perfectly!",
      rating: 4.5,
    },
    {
      name: "Anita R.",
      role: "Frequent Shopper",
      quote:
        "Their customer service is amazing. When I had an issue with my order, they resolved it immediately. Plus, their sari collection is stunning!",
      rating: 5,
    },
  ];

  const toggleSize = (productId, size) => {
    setSelectedSize((prev) => ({
      ...prev,
      [productId]: size,
    }));
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

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div id="app-container" className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-tshirt text-purple-600 text-2xl mr-2"></i>
                <span className="text-xl font-bold text-gray-900">OKASINA Trading</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === "home"
                      ? "border-purple-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveTab("shop")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === "shop"
                      ? "border-purple-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Shop
                </button>
                <button
                  onClick={() => setActiveTab("collections")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === "collections"
                      ? "border-purple-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  Collections
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === "about"
                      ? "border-purple-600 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
                >
                  About
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="hidden md:flex items-center mr-4">
                <i className="fas fa-phone-alt text-purple-600 mr-2"></i>
                <div className="text-sm">
                  <div>6254283</div>
                  <div>57944614</div>
                </div>
              </div>
              <button className="bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600">
                <span className="sr-only">Search</span>
                <i className="fas fa-search h-6 w-6"></i>
              </button>
              <button
                id="ai-assistant-btn"
                className="ml-3 bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
              >
                <span className="sr-only">AI Assistant</span>
                <i className="fas fa-robot h-6 w-6"></i>
              </button>
              <button className="ml-3 bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600">
                <span className="sr-only">Account</span>
                <i className="fas fa-user h-6 w-6"></i>
              </button>
              <button className="ml-3 bg-gray-100 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 relative">
                <span className="sr-only">Cart</span>
                <i className="fas fa-shopping-bag h-6 w-6"></i>
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-600"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <i className="fas fa-bars h-6 w-6"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative gradient-bg overflow-hidden">
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
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                      >
                        Shop Now
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                      >
                        Call Us: 6254283
                      </a>
                    </div>
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
                  <p className="mb-2">
                    <i className="fas fa-map-marker-alt mr-2"></i>Morrisson Street, Souillac, Mauritius
                  </p>
                  <p className="mb-4">
                    <i className="fas fa-clock mr-2"></i>Open Mon-Sat: 9:00 AM - 6:00 PM
                  </p>
                  <div className="flex space-x-4">
                    <a href="tel:6254283" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center">
                      <i className="fas fa-phone mr-2"></i>6254283
                    </a>
                    <a href="tel:57944614" className="bg-white text-purple-600 px-4 py-2 rounded-lg flex items-center">
                      <i className="fas fa-mobile-alt mr-2"></i>57944614
                    </a>
                  </div>
                </div>
              </div>
              <img
                className="h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80 "
                alt="Fashion store"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              "All Items",
              "Ladies Pants",
              "Ladies Trousers",
              "Churidar",
              "Pant Sets",
              "Kurtis",
              "Saris",
            ].map((category, index) => (
              <a key={index} href="#" className="group text-center">
                <div className="bg-gray-100 rounded-lg p-4 group-hover:bg-purple-100 transition-colors">
                  {category === "Ladies Pants" && <i className="fas fa-female text-purple-600 text-2xl mb-2"></i>}
                  {category === "Ladies Trousers" && <i className="fas fa-vest text-purple-600 text-2xl mb-2"></i>}
                  {category === "Churidar" && <i className="fas fa-hat-cowboy text-purple-600 text-2xl mb-2"></i>}
                  {category === "Pant Sets" && <i className="fas fa-vest-patches text-purple-600 text-2xl mb-2"></i>}
                  {category === "Kurtis" && <i className="fas fa-robe text-purple-600 text-2xl mb-2"></i>}
                  {category === "Saris" && <i className="fas fa-scarf text-purple-600 text-2xl mb-2"></i>}
                  {category === "All Items" && <i className="fas fa-tshirt text-purple-600 text-2xl mb-2"></i>}
                  <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700">{category}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <i className="fas fa-filter mr-2"></i>Filter
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                <i className="fas fa-sort mr-2"></i>Sort
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-lg overflow-hidden shadow-md relative">
                <div
                  className={`badge absolute top-2 left-2 z-10 px-2 py-1 text-sm font-semibold rounded-md ${
                    product.badge === "New"
                      ? "bg-rose-500 text-white"
                      : product.badge === "Bestseller"
                      ? "bg-green-500 text-white"
                      : product.badge === "Trending"
                      ? "bg-yellow-500 text-white"
                      : product.badge === "Popular"
                      ? "bg-blue-500 text-white"
                      : product.badge === "Featured"
                      ? "bg-purple-500 text-white"
                      : product.badge === "Limited"
                      ? "bg-red-500 text-white"
                      : "bg-orange-500 text-white"
                  }`}
                >
                  {product.badge}
                </div>
                <div className="h-64 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">Available in 9 sizes</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold text-purple-600">{product.price}</span>
                    <span className="text-sm text-green-600 font-medium">{product.stock}</span>
                  </div>
                  <div className="product-actions mt-3 flex space-x-2">
                    <button className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
                      <i className="fas fa-shopping-cart mr-2"></i>Add to Cart
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                      <i className="fas fa-heart text-gray-600"></i>
                    </button>
                  </div>
                  <div className="mt-3 size-selector grid grid-cols-3 gap-2">
                    {product.sizes.slice(0, 3).map((size) => (
                      <React.Fragment key={size}>
                        <input
                          type="radio"
                          name={`size-${product.id}`}
                          id={`size-${size}-${product.id}`}
                          className="hidden"
                          onChange={() => toggleSize(product.id, size)}
                        />
                        <label
                          htmlFor={`size-${size}-${product.id}`}
                          className="border border-gray-300 rounded-md text-center py-1 text-sm cursor-pointer hover:border-purple-500"
                        >
                          {size}
                        </label>
                      </React.Fragment>
                    ))}
                    {product.sizes.slice(3, 6).map((size) => (
                      <React.Fragment key={size}>
                        <input
                          type="radio"
                          name={`size-${product.id}`}
                          id={`size-${size}-${product.id}`}
                          className="hidden"
                          onChange={() => toggleSize(product.id, size)}
                        />
                        <label
                          htmlFor={`size-${size}-${product.id}`}
                          className="border border-gray-300 rounded-md text-center py-1 text-sm cursor-pointer hover:border-purple-500"
                        >
                          {size}
                        </label>
                      </React.Fragment>
                    ))}
                    {product.sizes.slice(6).map((size) => (
                      <React.Fragment key={size}>
                        <input
                          type="radio"
                          name={`size-${product.id}`}
                          id={`size-${size}-${product.id}`}
                          className="hidden"
                          onChange={() => toggleSize(product.id, size)}
                        />
                        <label
                          htmlFor={`size-${size}-${product.id}`}
                          className="border border-gray-300 rounded-md text-center py-1 text-sm cursor-pointer hover:border-purple-500"
                        >
                          {size}
                        </label>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to shop fashion
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              OKASINA Trading provides innovative solutions to enhance your shopping experience.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative ai-recommendation p-4 bg-purple-50 rounded-lg shadow-md">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <p className="ml-16 text-lg font-medium text-gray-900">AI Fashion Assistant</p>
              <p className="ml-16 text-base text-gray-500">
                Our AI assistant helps you find the perfect outfit based on your preferences, body type, and occasion.
              </p>
            </div>
            <div className="relative virtual-tryon p-4 bg-purple-50 rounded-lg shadow-md">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <i className="fas fa-mobile-alt text-xl"></i>
              </div>
              <p className="ml-16 text-lg font-medium text-gray-900">Virtual Try-On</p>
              <p className="ml-16 text-base text-gray-500">
                See how clothes look on you before buying with our augmented reality virtual try-on feature.
              </p>
            </div>
            <div className="relative p-4 bg-purple-50 rounded-lg shadow-md">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <i className="fas fa-truck text-xl"></i>
              </div>
              <p className="ml-16 text-lg font-medium text-gray-900">Fast Delivery</p>
              <p className="ml-16 text-base text-gray-500">
                Get your orders delivered quickly with our efficient logistics network across Mauritius.
              </p>
            </div>
            <div className="relative p-4 bg-purple-50 rounded-lg shadow-md">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                <i className="fas fa-exchange-alt text-xl"></i>
              </div>
              <p className="ml-16 text-lg font-medium text-gray-900">Easy Returns</p>
              <p className="ml-16 text-base text-gray-500">
                Not satisfied? Return or exchange items easily within 7 days of purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our customers say
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={`https://picsum.photos/id/ ${idx}/256/256`}
                    alt={testimonial.name}
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-purple-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.quote}</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) =>
                    i + 1 <= Math.floor(testimonial.rating) ? (
                      <i key={i} className="fas fa-star"></i>
                    ) : testimonial.rating % 1 !== 0 && i === Math.floor(testimonial.rating) ? (
                      <i key={i} className="fas fa-star-half-alt"></i>
                    ) : (
                      <i key={i} className="far fa-star"></i>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-purple-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Subscribe to our newsletter
              </h2>
              <p className="mt-3 text-lg leading-6 text-purple-200">
                Get the latest updates on new arrivals, special offers, and fashion tips.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-700 focus:ring-white"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="mt-3 text-sm text-purple-200">
                We care about your data. Read our{" "}
                <a href="#" className="text-white font-medium underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Customer Service</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <button
        className="fab bg-purple-600 text-white"
        onClick={chatOpen ? closeChat : openChat}
        aria-label="Toggle chat"
      >
        <i className="fas fa-robot h-6 w-6"></i>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Product Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <p>This is a detailed view of the selected product.</p>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {chatOpen && (
        <div className="fixed bottom-20 right-20 w-80 h-96 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Live Chat</h3>
            <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="h-56 overflow-y-scroll">
            <div className="chat-bubble p-2 mb-2 bg-purple-100 rounded-md">
              Hello! How can we help you today?
            </div>
            <div className="user-bubble p-2 ml-auto mb-2 bg-blue-100 rounded-md text-right">
              Hi, I'm looking for a specific dress style.
            </div>
          </div>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Admin Panel Sidebar */}
      {view === "admin" && (
        <div className={`admin-sidebar fixed top-0 left-0 h-full ${sidebarExpanded ? "w-64" : "w-16"} bg-gray-900 p-4 transition-all duration-300 ease-in-out`}>
          <button onClick={toggleSidebar} className="text-white mb-4">
            {sidebarExpanded ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-right"></i>}
          </button>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-white hover:text-purple-300">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-purple-300">
                Inventory
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-purple-300">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-purple-300">
                Customers
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Admin Main Content */}
      {view === "admin" && (
        <div className="admin-main ml-64 transition-all duration-300 ease-in-out">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="mt-2 text-gray-600">Manage your inventory, orders, and customers here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;