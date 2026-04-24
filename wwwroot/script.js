async function renderHome() {
    const app = document.getElementById('app');
    try {
        const response = await fetch('https://localhost:7246/api/menu');
        const csharpMenu = await response.json();

        console.log("Data from server:", csharpMenu);

        if (csharpMenu.length === 0) {
            app.innerHTML = "<h2>No items found in the database.</h2>";
            return;
        }

        app.innerHTML = ` 
            <section class="thoughts-wrapper">
                <div class="thought-box">"A cup of coffee is a shared moment of peace."</div>
                <div class="thought-box">"Fresh flavors, brewed daily for your soul."</div>
            </section>

            <h2 class="section-title">Top Selling Items</h2>
            <div class="product-grid">
                ${csharpMenu.map(item => `
                    <div class="card">
                        <div style="height:100px; background:#ddd; margin-bottom:10px">IMAGE</div>
                        <h4>${item.itemName || "No Name"}</h4>
                        <p>$${item.price || 0}</p>
                        <button onclick="placeOrder(${item.id})">Order Now</button>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        app.innerHTML = "<h2>Server Connection Failed</h2>";
        console.error("Fetch error:", error);
    }
}

// Inside your map function:


async function placeOrder(selectedId) {
    const orderPacket = {
        MenuItemId: selectedId, 
        Quantity: 1
    };

    try {
        const response = await fetch('https://localhost:7246/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPacket)
        });

        if (response.ok) {
            alert("Order Added Successfully!");
            const cartCount = document.getElementById('cartCount');
            cartCount.innerText = parseInt(cartCount.innerText || 0) + 1;
        } else {
            // Log the error to see exactly what C# is complaining about
            const errorText = await response.text();
            console.error("Order failed:", errorText);
        }
    } catch (error) {
        console.error("Network error:", error);
    }
}


window.onload = renderHome;