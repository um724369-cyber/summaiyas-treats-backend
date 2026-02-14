const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// 1. Middleware
app.use(cors());
app.use(express.json()); // This allows the server to handle JSON data (useful for later!)

// 2. Data (Our "Database")
// Ensure these names match your routes exactly
// Change 's' to 'reviews'
const reviews = [
  { id: 1, user: "Aisha", comment: "The Mithi Khajli is so crispy! Just like home.", rating: 5 },
  { id: 2, user: "Rahul", comment: "Best Varke Samose in town. Totally worth it.", rating: 5 },
  { id: 3, user: "Sana", comment: "Chane Ka Magaj is very fresh.", rating: 4 }
];

// Change 'ts' to 'products'
const products = [
  { id: 1, name: "Redmi", price: "450/-KG", Img: "/images/radmi.jpeg" },
  { id: 2, name: "Khari Khajli", price: "450/-KG", Img: "/images/khari kahjli.jpeg" },
  { id: 3, name: "Mithi Khajli", price: "450/-KG", Img: "/images/mithi hajli.jpeg" },
  { id: 4, name: "Varke Samose", price: "580/-KG", Img: "/images/var ka samosa.jpeg" },
  { id: 5, name: "Chane Ka Magaj", price: "600/-KG", Img: "/images/chana ka maga.jpeg" }
];

// 3. Routes
// Product Search Route
app.get('/api/products', (req, res) => {
  const query = req.query.search;
  if (query) {
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(products);
});

// Reviews Route
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

// 4. Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`😋 Summaiya's Delightful Treats API is live!`);
});