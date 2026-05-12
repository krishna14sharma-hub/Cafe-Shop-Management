export default class HomePage {
    async render() {
        const app = document.getElementById('app');

        // Logic: Define the global function for the buttons
        // We use window. so the HTML onclick can "see" it
        window.addToCart = (id, isCombo, price, name) => {
            let cart = JSON.parse(localStorage.getItem('agora_cart')) || [];

            const existingItem = cart.find(item => item.id === id && item.isCombo === isCombo);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, isCombo, quantity: 1 });
            }

            localStorage.setItem('agora_cart', JSON.stringify(cart));

            // Logic: Immediate visual update
            this.updateCartBadge();
            alert(`${name} added to cart!`);
        };

        try {
            const [menuRes, comboRes] = await Promise.all([
                fetch(`/api/menu?t=${Date.now()}`),
                fetch(`/api/menu/combos?t=${Date.now()}`)
            ]);
            const menu = await menuRes.json();
            const combos = await comboRes.json();

            app.innerHTML = `
                <section class="hero-container">
                    <div class="hero-text">
                        <h1>Good Food For <span class="highlight-green">Good Health</span></h1>
                    </div>
                </section>

                <h2 class="section-title">Fresh from <span class="highlight-green">Our Kitchen</span></h2>
                <div class="product-grid">
                    ${this.generateCards(menu, false)}
                </div>

                <h2 class="section-title">Curated <span class="highlight-green">Combo Meals</span></h2>
                <div class="product-grid">
                    ${this.generateCards(combos, true)}
                </div>
            `;

            // Sync the badge with what's already in localStorage
            this.updateCartBadge();

        } catch (e) {
            app.innerHTML = "<h2>Server Connection Failed</h2>";
        }
    }

    // Logic: This now counts items in localStorage, not the database!
    updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('agora_cart')) || [];
        const countElement = document.getElementById('cartCount');
        if (countElement) {
            // Logic: Sum up all quantities in the cart
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            countElement.innerText = totalItems;
        }
    }

    generateCards(items, isCombo) {
        return items.map(item => {
            const id = isCombo ? item.comboId : item.id;
            const name = isCombo ? item.comboName : item.itemName;
            const price = isCombo ? item.comboPrice : item.price;

            return `
                <div class="card">
                    <h3>${name}</h3>
                    <p class="price">₹${price}</p>
                    <button class="btn-order" onclick="addToCart(${id}, ${isCombo}, ${price}, '${name}')">
                        Add to Cart
                    </button>
                </div>
            `;
        }).join('');
    }
}