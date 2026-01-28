import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({}); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?search=${searchTerm}`);
        setProducts(response.data);
      } catch (error) { console.error(error); }
    };
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (error) { console.error(error); }
    };
    fetchProducts();
    fetchReviews();
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
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fdfcf0', minHeight: '100vh', width: '100vw' }}>
      
      {/* HERO SECTION */}
      <div style={{ 
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/mithi hajli.jpeg")', 
        backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', textAlign: 'center' 
      }}>
        <h1 style={{ fontSize: '3rem', margin: '0', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Summaiya's Delightful Treats</h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', opacity: '0.9' }}>"Authentic Homemade Sweets Delivered with Love"</p>
        <div style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px 20px', borderRadius: '50px', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.3)' }}>
          📍 All Items Available Any Time!
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-50px auto 0', padding: '0 20px' }}>
        {/* SEARCH BAR */}
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '50px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'center' }}>
          <input 
            type="text" placeholder="Search for Khajli, Samose, Magaj..." 
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '80%', border: 'none', outline: 'none', fontSize: '1rem' }}
          />
        </div>

        {/* PRODUCT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
          {products.map(product => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }}>
              <img src={product.Img} alt={product.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0', color: '#5d4037' }}>{product.name}</h3>
                <p style={{ color: '#e67e22', fontWeight: 'bold', fontSize: '1.2rem', margin: '10px 0' }}>{product.price}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', backgroundColor: '#fdfcf0', padding: '10px', borderRadius: '12px' }}>
                  <button onClick={() => updateQuantity(product.id, -1)} style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', width: '35px', height: '35px', cursor: 'pointer' }}>-</button>
                  <span style={{ fontWeight: 'bold' }}>{cart[product.id] || 0} KG</span>
                  <button onClick={() => updateQuantity(product.id, 1)} style={{ background: '#5d4037', color: 'white', border: 'none', borderRadius: '8px', width: '35px', height: '35px', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* REVIEWS SECTION */}
        <section style={{ margin: '80px 0' }}>
          <h2 style={{ textAlign: 'center', color: '#5d4037', marginBottom: '40px' }}>Real Stories from Customers</h2>
          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px' }}>
            {reviews.map(rev => (
              <div key={rev.id} style={{ minWidth: '300px', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' }}>
                <p style={{ fontStyle: 'italic', color: '#6d4c41' }}>"{rev.comment}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontWeight: 'bold', color: '#5d4037' }}>{rev.user}</span>
                  <span style={{ color: '#f1c40f' }}>{"★".repeat(rev.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* STICKY FIGMA-STYLE CHECKOUT BAR */}
      {calculateTotal() > 0 && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '500px', backgroundColor: '#5d4037', padding: '15px 30px', borderRadius: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: 'white' }}>
          <div>
            <p style={{ margin: '0', fontSize: '0.8rem', opacity: '0.8' }}>Ready to order?</p>
            <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: 'bold' }}>Total: ₹{calculateTotal()}</p>
          </div>
          <button onClick={handleSendOrder} style={{ backgroundColor: '#25D366', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            🛒 Send to WhatsApp
          </button>
        </div>
      )}

      <footer style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#5d4037', color: 'white' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Summaiya's Delightful Treats</p>
        <p>📞 840-193-0835 | 📍 Surat, Gujarat</p>
        <p style={{ marginTop: '20px', opacity: '0.6', fontSize: '0.8rem' }}>© 2026 Crafted with ❤️ for Mom</p>
      </footer>
    </div>
  );
}

export default App;