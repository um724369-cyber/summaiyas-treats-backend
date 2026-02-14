<?php include 'db.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Summaiya's Delightful Treats | Authentic Homemade Sweets</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-brown: #4a2c1d;
            --cream-bg: #f3e5d8;
            --gold-accent: #ffc107;
            --whatsapp-green: #25D366;
        }

        body { background-color: var(--cream-bg); font-family: 'Inter', sans-serif; color: var(--primary-brown); }
        
        /* Navigation */
        .navbar { background-color: white; border-bottom: 1px solid #e0d5cb; }
        .navbar-brand { font-weight: 700; color: var(--primary-brown) !important; letter-spacing: 1px; }

        /* Hero Section Styling (Fixes image_ccd6a2.png) */
        .hero-section { 
            padding: 80px 0; 
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('img/hero_sweets.png') center/cover;
            color: white;
            min-height: 80vh;
            display: flex;
            align-items: center;
        }
        .hero-title { font-weight: 700; font-size: 3.5rem; line-height: 1.2; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }

        /* Mobile Spacing Fixes (Solves image_cd307f.png) */
        @media (max-width: 768px) {
            .hero-section { padding: 60px 0 !important; text-align: center; }
            .hero-title { font-size: 2.2rem !important; margin-bottom: 25px; }
            .d-flex.gap-3 { flex-direction: column !important; gap: 15px !important; }
            .btn-lg { width: 100% !important; }
        }

        /* Quality Commitment Cards (Matches image_ccd681.png) */
        .quality-card { 
            background: white; border-radius: 15px; padding: 25px; 
            box-shadow: 0 4px 15px rgba(74, 44, 29, 0.1);
        }

        /* Product Cards (Matches image_cd4307.png) */
        .product-card-wrapper { position: relative; }
        .ghee-badge { 
            position: absolute; top: 15px; right: 15px; 
            background-color: var(--whatsapp-green); color: white; 
            padding: 5px 12px; border-radius: 50px; 
            font-size: 0.75rem; font-weight: bold; z-index: 10; 
        }
        .card { border: none; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.05); transition: 0.3s; }
        .card:hover { transform: translateY(-10px); }
        .card-img-top { height: 250px; object-fit: cover; }
        
        .btn-success-custom { 
            background-color: var(--whatsapp-green); border: none; 
            border-radius: 50px; color: white !important; 
            font-weight: 600; padding: 12px; border: none;
        }

        footer { background-color: var(--primary-brown) !important; color: #f3e5d8 !important; }
    </style>
</head>
<body>

    <nav class="navbar navbar-expand-lg py-3 sticky-top">
        <div class="container">
            <a class="navbar-brand" href="#">Summaiya's Delightful Treats</a>
            <div class="ms-auto">
                <a href="https://wa.me/918401930835" class="btn btn-dark rounded-pill px-4">Order Now</a>
            </div>
        </div>
    </nav>

    <section class="hero-section">
        <div class="container text-center text-lg-start">
            <div class="row align-items-center">
                <div class="col-lg-7">
                    <span class="badge bg-warning text-dark mb-3 rounded-pill px-3 py-2 fw-bold">Est. 2023</span>
                    <h1 class="hero-title">Authentic Indian Sweets</h1>
                    <p class="lead my-4 opacity-90">Made with Pure Ghee & Traditional Recipes Since 1998.</p>
                    <div class="d-flex gap-3">
                        <a href="#menu" class="btn btn-warning btn-lg rounded-pill px-5 fw-bold">View Full Menu</a>
                        <a href="https://wa.me/918401930835" class="btn btn-success-custom btn-lg px-5">Order on WhatsApp</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-5">
        <div class="container text-center">
            <h2 class="fw-bold mb-5">Why Choose Us?</h2>
            <div class="row g-4">
                <div class="col-md-4"><div class="quality-card h-100"><div class="fs-1 mb-3">✔️</div><h5 class="fw-bold">100% Pure Ghee</h5><p class="text-muted small">Authentic traditional recipes.</p></div></div>
                <div class="col-md-4"><div class="quality-card h-100"><div class="fs-1 mb-3">✔️</div><h5 class="fw-bold">Freshly Made</h5><p class="text-muted small">Cooked fresh for your order.</p></div></div>
                <div class="col-md-4"><div class="quality-card h-100"><div class="fs-1 mb-3">✔️</div><h5 class="fw-bold">Hygienic</h5><p class="text-muted small">Strict safety standards.</p></div></div>
            </div>
        </div>
    </section>

    <div id="menu" class="container py-5">
        <div class="row justify-content-center mb-5 text-center">
            <div class="col-lg-6">
                <h2 class="fw-bold mb-4">Customer Favorites</h2>
                <form action="index.php#menu" method="GET" class="d-flex">
                    <div class="input-group shadow-sm">
                        <input type="text" name="search" class="form-control rounded-pill-start border-0 ps-4 py-3" 
                               placeholder="Search sweets..." value="<?php echo isset($_GET['search']) ? htmlspecialchars($_GET['search']) : ''; ?>">
                        <button class="btn btn-warning rounded-pill-end px-4 fw-bold" type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="row">
            <?php
            $searchTerm = isset($_GET['search']) ? mysqli_real_escape_string($conn, $_GET['search']) : '';
            $query = !empty($searchTerm) ? "SELECT * FROM products WHERE name LIKE '%$searchTerm%'" : "SELECT * FROM products";
            $result = mysqli_query($conn, $query);
            while($row = mysqli_fetch_assoc($result)) {
            ?>
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="product-card-wrapper">
                        <span class="ghee-badge">✨ Pure Ghee</span>
                        <img src="img/<?php echo $row['name']; ?>.jpeg" class="card-img-top" alt="<?php echo $row['name']; ?>">
                    </div>
                    <div class="card-body text-center p-4">
                        <h5 class="card-title fw-bold"><?php echo $row['name']; ?></h5>
                        <p class="text-muted small mb-3"><?php echo $row['description']; ?></p>
                        <p class="fw-bold text-danger fs-5 mb-3">₹<?php echo $row['price']; ?>/kg</p>
                        
                        <div class="mb-3 px-3">
                            <label class="small fw-bold text-muted d-block mb-1">Select Quantity:</label>
                            <select id="qty_<?php echo $row['id']; ?>" class="form-select form-select-sm rounded-pill border-secondary">
                                <option value="1kg">1 kg</option>
                                <option value="2kg">2 kg</option>
                                <option value="5kg">5 kg (Family Pack)</option>
                            </select>
                        </div>

                        <button onclick="sendOrder('<?php echo addslashes($row['name']); ?>', '<?php echo $row['id']; ?>')" 
                                class="btn btn-success-custom w-100">
                           Order via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
            <?php } ?>
        </div>
    </div>

<div class="rounded-4 overflow-hidden shadow-sm mb-4" style="height: 400px;">
   
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5260.461750687444!2d72.8282434120593!3d21.203748666831125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f000e943ee3%3A0xa3c34ab6293520c6!2sAl%20faiz%20multicuisine%20restaurant!5e0!3m2!1sen!2sin!4v1770996130117!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        
    
</div>
<p class="text-muted small">
    📍 Near Al faiz multicuisine restaurant, Hattupura char rasta, Surat, Gujarat 395003
</p>

    <footer class="py-5">
        <div class="container text-center text-md-start">
            <div class="row">
                <div class="col-md-6 mb-4"><h4 class="fw-bold">MANSURI SWEETS</h4><p class="small opacity-75">Homemade goodness delivered with love.</p></div>
                <div class="col-md-6 text-md-end"><p class="mb-3">📞 +91 8401930835</p><a href="https://wa.me/918401930835" class="btn btn-warning rounded-pill px-4 fw-bold">Chat Now</a></div>
            </div>
            <hr class="my-4 opacity-25">
            <div class="text-center small opacity-75">© <?php echo date("Y"); ?> Mansuri Sweets | Designed & Developed by Mohammad Umair Mansuri</div>
        </div>
    </footer>

    <script>
    function sendOrder(productName, productId) {
        var qty = document.getElementById('qty_' + productId).value;
        var message = "Assalamu Alaikum, I want to order " + qty + " of " + productName;
        window.location.href = "https://wa.me/918401930835?text=" + encodeURIComponent(message);
    }
    </script>
</body>
</html>