import React, { useState } from 'react';

function App() {
  const [selectedSize, setSelectedSize] = useState('');
  const [chatOpen, setChatOpen] = useState(false);

  const sizes = ['All Sizes', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL'];

  const products = [
    { id: 1, name: "Ladies Trousers", price: 1799, stock: 150, size: "S", image: "https://picsum.photos/id/1/400/600 " },
    { id: 2, name: "Churidar", price: 1899, stock: 130, size: "M", image: "https://picsum.photos/id/2/400/600 " },
    { id: 3, name: "Kurti Set", price: 1999, stock: 120, size: "L", image: "https://picsum.photos/id/3/400/600 " },
    { id: 4, name: "Traditional Sari", price: 2499, stock: 100, size: "Free Size", image: "https://picsum.photos/id/4/400/600 " },
    { id: 5, name: "Party Kurti", price: 2299, stock: 110, size: "XL", image: "https://picsum.photos/id/5/400/600 " },
    { id: 6, name: "Cord Set", price: 1899, stock: 90, size: "3XL", image: "https://picsum.photos/id/6/400/600 " }
  ];

  const filteredProducts = selectedSize === '' 
    ? products 
    : products.filter(p => p.size === selectedSize);
  
  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #7c3aed, #f43f5e)',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>OKASINA Trading</h1>
        <p>Morrisson Street, Souillac | Open Mon–Sat: 9AM–6PM</p>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '40px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #7c3aed, #f43f5e)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'white' }}>Welcome to Our Fashion Store</h2>
        <p style={{ fontSize: '1.2rem', color: '#ddd' }}>
          Experience the future of shopping with virtual try-ons and smart recommendations.
        </p>
        <button style={{
          marginTop: '20px',
          padding: '12px 24px',
          backgroundColor: 'white',
          color: '#7c3aed',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          Shop Now
        </button>
      </section>

      {/* Size Filter */}
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
        <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize || ''} style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc'
        }}>
          {sizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>

        {/* Product Grid */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                width: '250px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px 8px 0 0' }} />
                <div style={{ padding: '16px' }}>
                  <h4 style={{ fontSize: '1.2rem', margin: '8px 0' }}>{product.name}</h4>
                  <p style={{ color: '#666' }}>Available in size: {product.size}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <span style={{ fontWeight: 'bold', color: '#7c3aed' }}>Rs {product.price}</span>
                    <span style={{ color: 'green' }}>{product.stock} in stock</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ margin: 'auto' }}>No products found.</p>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <section style={{
        padding: '40px 20px',
        backgroundColor: '#f3f3f3'
      }}>
        <h3 style={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px' }}>What Our Customers Say</h3>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '800px',
          margin: 'auto'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <strong>Priya M.</strong> - First-time Buyer
            <p>"The virtual try-on feature helped me choose the perfect outfit."</p>
            <div style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</div>
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <strong>Anita R.</strong> - Fashion Enthusiast
            <p>"Best shopping experience ever! Fast delivery and amazing support team 😍"</p>
            <div style={{ color: '#fbbf24' }}>⭐⭐⭐⭐⭐</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '30px',
        borderTop: '1px solid #ccc',
        backgroundColor: 'white',
        marginTop: '40px'
      }}>
        <p>Call Us: 6254283 | Location: Souillac, Mauritius</p>
        <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
          © 2025 OKASINA Trading. All rights reserved.
        </p>
      </footer>

      {/* AI Chat Button */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#7c3aed',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        zIndex: 100
      }} onClick={() => setChatOpen(true)}>
        🤖
      </div>

      {/* AI Chat Modal */}
      {chatOpen && (
        <div style={{
          position: 'fixed',
          top: '100px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd'
          }}>
            <h3 style={{ fontWeight: 'bold' }}>AI Assistant</h3>
            <button onClick={() => setChatOpen(false)} style={{ color: 'white', fontSize: '1.2rem' }}>✖</button>
          </div>
          <div style={{
            padding: '16px',
            overflowY: 'auto',
            flex: 1
          }}>
            <div style={{
              backgroundColor: '#f3f3f3',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '10px'
            }}>
              Hello! How can I assist you today?
            </div>
          </div>
          <div style={{
            padding: '12px',
            borderTop: '1px solid #ddd',
            backgroundColor: '#fff'
          }}>
            <input type="text" placeholder="Type your message..." style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px 0 0 6px',
              outline: 'none'
            }} />
            <button style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '0 6px 6px 0',
              cursor: 'pointer'
            }}>Send</button>
          </div>
        </div>
      )}

      {/* Bottom Nav for Mobile */}
      <div style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px',
        zIndex: 100
      }}>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#7c3aed',
          fontSize: '0.8rem'
        }}>🏠 Home</button>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#7c3aed',
          fontSize: '0.8rem'
        }}>🛒 Store</button>
        <button style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#7c3aed',
          fontSize: '0.8rem'
        }}>👤 Admin</button>
      </div>
    </div>
  );
}

export default App;