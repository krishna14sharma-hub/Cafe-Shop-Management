const API_URL = "https://localhost:7246/api/order";

async function placeOrder() {
    const order = {
        id: Math.floor(Math.random() * 1000),
        itemName: "cappuccino",
        quantity: 2
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(order)
    });

    async function getOrder() {
        const response = await fetch(API_URL);
        const order = await response.json();

        const list = document.getElementById("ordersList");
        list.innerHTML = "";

        orders.forEach(order => {
            const li = document.createElement("li");
            li.textContent = `${order.itemName} - ${order.quantity}`;
            list.appendChild(li);
        });

    }
}