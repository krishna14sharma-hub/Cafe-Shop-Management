import Page from './Page.js'; 

export default class HomePage {
    async render() {
        const app = document.getElementById('app');
        try {
            const [menuRes, comboRes] = await Promise.all([
                fetch(`/api/menu?t=${Date.now()}`),
                fetch(`/api/menu/combos?t=${Date.now()}`)
            ]);

            const menu = await menuRes.json();
            const combos = await comboRes.json();

            app.innerHTML = `
                <section class="thoughts-wrapper">
                    <div class="thought-box">"A cup of coffee is a shared moment of peace."</div>
                    <div class="thought-box">"The best way to start your day is with a perfect cup of coffee."</div>
                              <div class="thought-box">"A cup of coffee is a shared moment of peace."</div>
                    <div class="thought-box">"The best way to start your day is with a perfect cup of coffee."</div>
                </section>
                <h2 class="section-title">Choose Your <span>Food</span></h2>
                <div class="product-grid">${this.generateGrid(menu, false)}</div>
                
                <h2 class="section-title">Special <span>Combos</span></h2>
                <div class="product-grid">${this.generateGrid(combos, true)}</div>
            `;
        } catch (e) {
            app.innerHTML = "<h2>Server Connection Failed</h2>";
        }
    }

    generateGrid(data, isCombo) {
        return data.map(item => `
            <div class="card ${isCombo ? 'combo-card' : ''}">
                <div class="img-placeholder">${isCombo ? 'COMBO' : 'PLATE'}</div>
                <h4>${isCombo ? item.comboName : item.itemName}</h4>
                ${isCombo ? `<p class="description">${item.comboDescription}</p>` : ''}
                <p class="price">₹${isCombo ? item.comboPrice : item.price}</p>
                <button class="btn-order" onclick="placeOrder(${isCombo ? item.comboId : item.id})">
                    Order Now
                </button>
            </div>
        `).join('');
    }
}