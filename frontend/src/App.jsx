import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, revRes] = await Promise.all([
          axios.get(`https://summaiyas-treats-backend.onrender.com/api/products?search=${searchTerm}`),
          axios.get('https://summaiyas-treats-backend.onrender.com/api/reviews')
        ]);
        setProducts(prodRes.data);
        setReviews(revRes.data);
      } catch (error) { console.error("Error fetching data:", error); }
    };
    fetchData();
  }, [searchTerm]);

  const updateQuantity = (id, change) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + change) }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      const priceValue = parseInt(product.price.replace(/[^\d]/g, '')) || 0;
      return total + (priceValue * quantity);
    }, 0);
  };

  const handleSendOrder = () => {
    let orderItems = products.filter(p => cart[p.id] > 0);
    if (orderItems.length === 0) return;
    let message = "🌟 *New Order from Website* 🌟%0A%0A";
    orderItems.forEach(item => { message += `✅ ${item.name}: ${cart[item.id]} KG%0A`; });
    message += `%0A💰 *Total: ₹${calculateTotal()}*`;
    window.open(`https://wa.me/918401930835?text=${message}`, '_blank');
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fdfcf0', minHeight: '100vh', color: '#5d4037' }}>
      
      {/* 🏰 HERO SECTION */}
      <header style={{ 
        position: 'relative',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/mithi hajli.jpeg")', 
        backgroundSize: 'cover', backgroundPosition: 'center', height: '450px', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' 
      }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#e67e22', padding: '10px 20px', borderRadius: '30px', fontWeight: 'bold' }}>
          🛒 {Object.values(cart).reduce((a, b) => a + b, 0)} Items
        </div>
        <h1 style={{ fontSize: '3.5rem', margin: '0' }}>Summaiya's Delightful Treats</h1>
        <p style={{ fontSize: '1.4rem', fontStyle: 'italic' }}>"Authentic Homemade Surti Sweets"</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '-60px auto 0', padding: '0 20px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '50px', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
          <input 
            type="text" placeholder="Search for Khajli, Samose, Magaj..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.1rem' }}
          />
        </div>

        <section style={{ marginTop: '60px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {products.map(product => (
              <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <img src={product.Img} alt={product.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '25px' }}>
                  <h3>{product.name}</h3>
                  <p style={{ color: '#e67e22', fontWeight: 'bold' }}>{product.price}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fdfcf0', padding: '10px', borderRadius: '15px' }}>
                    <button onClick={() => updateQuantity(product.id, -1)} style={{ borderRadius: '10px', width: '40px', height: '40px' }}>-</button>
                    <span>{cart[product.id] || 0} KG</span>
                    <button onClick={() => updateQuantity(product.id, 1)} style={{ background: '#5d4037', color: 'white', borderRadius: '10px', width: '40px', height: '40px' }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 📍 MAP SECTION - FIXED EMBED URL */}
        <section style={{ margin: '100px 0', padding: '40px', backgroundColor: 'white', borderRadius: '30px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <h2>Visit Us</h2>
              <p>📍 Near Al Faiz Restaurant, Nagoriwad, Surat</p>
              <p>📞 840-193-0835</p>
            </div>
            <div style={{ flex: '1.5', minWidth: '300px', height: '350px', borderRadius: '20px', overflow: 'hidden' }}>
              <iframe 
                title="Shop Location" 
                src=" https://maps.app.goo.gl/N7z5yid8L5RzMgjj7" 
                 width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </section>
      </main>

      {calculateTotal() > 0 && (
        <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '600px', backgroundColor: '#5d4037', padding: '20px 40px', borderRadius: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', color: 'white', zIndex: 1000 }}>
          <p style={{ margin: '0', fontWeight: 'bold' }}>Total: ₹{calculateTotal()}</p>
          <button onClick={handleSendOrder} style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Order on WhatsApp</button>
        </div>
      )}
    </div>
  );
}

// 🌟 CRITICAL FIX: EXPORT DEFAULT APP
export default App;