//const API_URL = "https://localhost:7246/api/order";
//// thsi are called action class [httpGet] , [httpPost]
//let nextOrderId = 101; // starting Point
//async function placeOrder() { // sending method
//    const order = {
//        id: nextOrderId++,
//        itemName: "cappuccino",
//        quantity: 2
//    };

//    const response = await fetch(API_URL, {
//        method: "POST",
//        headers: {
//            "content-type": "application/json" // putting a label on the package
//        },
//        body: JSON.stringify(order) // shrink
//    });

//    if (response.ok) {
//        getOrder(); // now that the order is save, refresh the list
//    }
//  }
//   async function getOrder() { // showing method
//      const response = await fetch(API_URL);
//      const orderArray = await response.json(); // You are "Unboxing" the list of orders the server sent back

//      const list = document.getElementById("ordersList");
//      list.innerHTML = ""; // You are clearing the screen so you don't show the same order twice

//      orderArray.forEach(item => { // You are going through every "Unboxed" item one by one
//          const li = document.createElement("li"); // You are creating a new bullet point for each item.
//          li.textContent = `${item.itemName} - ${item.quantity}`;
//          list.appendChild(li); // You are physically sticking that bullet point onto your web page.
//      });
//}



// ------------------------------------------------------------------------------------




const API_URL = "https://localhost:7246/api/order";

// We pass the 'id' of the select box as a parameter
async function placeOrder(selectId) {
    const selectedItem = document.getElementById(selectId).value;

    const newOrder = {
        // You are achieving a unique number by using the current timestamp
        id: Date.now() % 10000,
        itemName: selectedItem,
        quantity: 1
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newOrder)
    });

    if (response.ok) {
        getOrders(); // Refresh the list automatically
    }
}

async function getOrders() {
    const response = await fetch(API_URL);
    const orders = await response.json();

    const list = document.getElementById("ordersList");

    // Check if there are any orders to achieve the 'no order loaded' logic
    if (orders.length === 0) {
        list.innerHTML = "<li>No orders loaded yet.</li>";
        return;
    }

    list.innerHTML = "";
    orders.forEach(item => {
        const li = document.createElement("li");
        // We add a 'Cooking' status visually
        li.innerHTML = `
            <span><span class="order-id">#${item.id}</span> - ${item.itemName}</span>
            <span style="color: orange; font-style: italic;">🍳 Cooking...</span>
        `;
        list.appendChild(li);
    });
}