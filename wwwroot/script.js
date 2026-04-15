async function renderHome() {
    const app = document.getElementById('app');

    try {
        const response = await fetch('https://localhost:7246/api/menu');
        const csharpMenu = await response.json();

        const categories = ["Soft Drinks", "Shakes", "Other Drinks", "Continental", "Fast Food", "Desi Flavors"];

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
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                        <button onclick="placeOrder('${item.name}')">Order Now</button>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        app.innerHTML = "<p>Error: Is the C# server running at port 7246?</p>";
        console.error("Fetch error:", error);
    }
}

async function placeOrder(productName) {
    const orderData = {
        name: productName,
        quantity: 1
    };

    try {
        const response = await fetch('http://localhost:7246/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData) 
        });

        const result = await response.text();
        alert(result); // This will show "Order Placed Successfully"
    } catch (error) {
        alert("Failed to send order to server.");
    }
}

window.onload = renderHome;