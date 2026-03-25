const cafeData = {
    categories: ["Soft Drinks", "Shakes", "Other Drinks", "Continental", "Fast Food", "Desi Flavors"],
    topSelling: [
        { id: 1, name: "Espresso", price: 4.00 }, { id: 2, name: "Club Sandwich", price: 9.00 },
        { id: 3, name: "Berry Shake", price: 6.50 }, { id: 4, name: "Beef Burger", price: 11.00 },
        { id: 5, name: "Latte", price: 5.00 }, { id: 6, name: "Pasta", price: 13.00 },
        { id: 7, name: "Mocktail", price: 7.00 }, { id: 8, name: "Brownie", price: 4.50 },
        { id: 9, name: "Steak", price: 19.00 }
    ]
};

function renderHome() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <section class="thoughts-wrapper">
            <div class="thought-box">"A cup of coffee is a shared moment of peace."</div>
            <div class="thought-box">"Fresh flavors, brewed daily for your soul."</div>
        </section>

         <section class="offers-wrapper">
        <div class="offer-card promo-1" onclick="alert('Offer 1')">
            Get 20% Off Coffee
        </div>
        <div class="offer-card promo-2" onclick="alert('Offer 2')">
            Lunch Deal: Free Drink
        </div>
    </section>

        <h2 class="section-title">Feature Categories</h2>
        <div class="category-grid">
            ${cafeData.categories.map(cat => `<div class="card"><strong>${cat}</strong></div>`).join('')}
        </div>

        

        <h2 class="section-title">Top Selling Items</h2>
        <div class="product-grid">
            ${cafeData.topSelling.map(item => `
                <div class="card">
                    <div style="height:100px; background:#ddd; margin-bottom:10px">IMAGE</div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <button onclick="alert('Added!')">Add to Cart</button>
                </div>
            `).join('')}
        </div>

        <section id="about" class="info-section"><h2>About</h2><p>Our story starts in 1995...</p></section>
        <section id="gallery" class="info-section"><h2>Gallery</h2><p>Images coming soon...</p></section>
        <section id="contact" class="info-section"><h2>Contact</h2><p>123 Cafe Lane, City</p></section>
        <section id="feedback" class="info-section"><h2>Feedback</h2><p>Tell us your thoughts!</p></section>
    `;
}

window.onload = renderHome;