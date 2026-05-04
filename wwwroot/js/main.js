import { navigate } from './Router.js';

// 1. Initialize the App
window.onload = () => navigate('home');

// 2. Navigation Handlers

// Use the correct selector that matches your HTML class
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        // 1. Prevent the page from refreshing
        e.preventDefault();

        // 2. Get the page name (e.g., "home", "gallery")
        const target = e.currentTarget.getAttribute('data-page');

        // 3. Debugging: Check your console to see if this prints
        console.log("Navigating to:", target);

        if (target) {
            navigate(target);
        }
    });
});

// 3. Top Icon Logic
document.getElementById('theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// 4. Global Functions (Needed for inline onclick events in your cards)
async function placeOrder(selectedId) {
    const orderPacket = { MenuItemId: selectedId, Quantity: 1 };
    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPacket)
        });
        if (response.ok) {
            alert("Order Added Successfully!");
            const count = document.getElementById('cartCount');
            if (count) count.innerText = parseInt(count.innerText || 0) + 1;
        }
    } catch (error) { console.error("Network error:", error); }
}

window.placeOrder = placeOrder;






//-----------------------------------------------------------------

//// Function to fetch menu items from SQL and render them as cards
//async function renderHome() {
//    const app = document.getElementById('app');
//    if (!app) return;

//    try {
//        // Fetching from your C# API endpoints for menu and combos with cache-busting query parameter
//        const [menuResponse, comboResponse] = await Promise.all([
//            fetch(`/api/menu?t=${Date.now()}`),
//            fetch(`/api/menu/combos?t=${Date.now()}`)
//        ]);
//        if (!menuResponse.ok || !comboResponse.ok) {
//            throw new Error("Failed to fetch data from the server.");
//        }

//        const csharpMenu = await menuResponse.json();
//        const csharpCombos = await comboResponse.json();

//        if (csharpMenu.length === 0) {
//            app.innerHTML = "<h2>No items found in the database.</h2>";
//            return;
//        }

//        // Generating the UI using the "Artesian" style structure
//        app.innerHTML = `
//            <section class="thoughts-wrapper">
//                <div class="thought-box">"A cup of coffee is a shared moment of peace."</div>
//                <div class="thought-box">"Fresh flavors, brewed daily for your soul."</div>
//            </section>

//            <h2 class="section-title">Choose Your <span>Food</span></h2>
//            <div class="product-grid">
//                ${csharpMenu.map(item => `
//                    <div class="card">
//                        <div class="img-placeholder">PLATE</div>
//                        <h4>${item.itemName || "Unnamed Item"}</h4>
//                        <p class="price">₹${item.price || 0}</p>
//                        <button class="btn-order" onclick="placeOrder(${item.id})">Order Now</button>
//                    </div>
//                `).join('')}
//            </div>

//            // <h2 class="section-title">Choose Your <span>Combos</span></h2>
//            //<div class="product-grid">
//            //    ${csharpCombos.map(combo => `
//            //        <div class="card combo-card">
//            //            <div class="img-placeholder">COMBO</div>
//            //            <h4>${combo.comboName || "Unnamed Item"}</h4>
//            //            <p class="description">${combo.comboDescription || "No description available"}</p>
//            //            <p class="price">₹${combo.comboPrice || 0}</p>
//            //            <button class="btn-order" onclick="placeOrder(${combo.comboId})">Order Now</button>
//            //        </div>
//            //    `).join('')}
//            //</div>
//        `;
//    } catch (error) {
//        app.innerHTML = "<h2>Server Connection Failed</h2>";
//        console.error("Fetch error:", error);
//    }
//}

//// Function to handle the Order button click
//async function placeOrder(selectedId) {
//    const orderPacket = {
//        MenuItemId: selectedId,
//        Quantity: 1
//    };

//    try {
//        const response = await fetch('https://localhost:7246/api/order', {
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify(orderPacket)
//        });
//        console.log("sdf", response)

//        if (response.ok) {
//            alert("Order Added Successfully!");
//            const cartCount = document.getElementById('cartCount');
//            if (cartCount) {
//                cartCount.innerText = parseInt(cartCount.innerText || 0) + 1;
//            }
//        }
//    } catch (error) {
//        console.error("Network error:", error);
//    }
//}

//// Expose functions to the global window object for HTML onclick events
//window.placeOrder = placeOrder;
//window.renderHome = renderHome;

//// Initialize the home screen on load
//window.onload = renderHome;