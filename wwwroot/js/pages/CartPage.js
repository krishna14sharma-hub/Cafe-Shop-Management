window.updateQty = (id, change) => {
    let cart = JSON.parse(localStorage.getItem('agora_cart')) || [];
    const itemIndex = cart.findIndex(i => i.id === id);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('agora_cart', JSON.stringify(cart));

        // Logic: Instead of reloading the whole browser, just re-run the render
        // This keeps the user on the Cart Page and updates the UI instantly.
        const page = new CartPage();
        page.render();
    }
};

export default class CartPage {
    async render() {

        const app = document.getElementById('app');
        const cart = JSON.parse(localStorage.getItem('agora_cart')) || [];

        // Logic: Calculate Total Price
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        app.innerHTML = `
            <div class="cart-page-container">
                <h2 class="section-title">Review <span class="highlight-green">Your Order</span></h2>
                
                <div class="cart-layout">
                    <div class="cart-items">
                        ${cart.length > 0 ? this.generateCartList(cart) : '<p class="empty-msg">Your cart is empty. Night owls need fuel!</p>'}
                    </div>

                    <div class="checkout-panel">
                        <h3>Order Summary</h3>
                        <hr>
                        <div class="summary-row">
                            <span>Total Amount:</span>
                            <span class="total-price">₹${total}</span>
                        </div>
                        
                        <div class="input-group">
                            <label>Customer Name</label>
                            <input type="text" id="customerName" placeholder="Enter your name">
                        </div>

                        <button class="btn-order full-width" onclick="finalizeOrder()">
                            Proceed to Payment
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Logic: Define the finalization function
        window.finalizeOrder = () => this.handleCheckout();
    }

    generateCartList(cart) {
        return cart.map(item => `
            <div class="cart-item-row">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-qty" onclick="updateQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-qty" onclick="updateQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
    }

    async handleCheckout() {
        const nameInput = document.getElementById('customerName');
        const name = nameInput ? nameInput.value : "";
        const cart = JSON.parse(localStorage.getItem('agora_cart')) || [];

        if (!name) return alert("Please enter your name!");
        if (cart.length === 0) return alert("Your cart is empty!");

        const orderPacket = {
            customerName: name,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity
            }))
        };

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPacket)
            });

            if (response.ok) {
                alert(`Thanks ${name}! Order received.`);
                localStorage.removeItem('agora_cart'); // Clear cart on success
                window.location.href = '/'; // Go back to home
            }
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    }
}