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

// Logic: Listen for clicks on the cart icon to trigger navigation
const cartTrigger = document.querySelector('.cart-container');

if (cartTrigger) {
    cartTrigger.addEventListener('click', () => {
        console.log("Intent: Routing to Cart Page");
        navigate('cart');
    });
}

// Logic: Explicitly target the cart icon in the header
document.addEventListener('DOMContentLoaded', () => {
    const cartBtn = document.querySelector('.cart-container');

    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Cart icon clicked! Navigating...");
            navigate('cart');
        });
    } else {
        console.error("Logic Error: .cart-container not found in HTML");
    }
});

window.placeOrder = placeOrder;




