// js/Router.js
import HomePage from './pages/HomePage.js';
import GalleryPage from './pages/GalleryPage.js';
import CartPage from './pages/CartPage.js';

const routes = {
    'home': new HomePage(),
    'gallery': new GalleryPage(),
    'cart': new CartPage()
};

export async function navigate(pageName) {
    const page = routes[pageName];

    if (page) {
        // Logic: Simply tell the page class to execute its render logic
        // Inside HomePage.js, it will find #app and fill it.
        await page.render();
    } else {
        // Fallback Logic: If a page name is typoed, go back home
        console.warn(`Page not found: ${pageName}. Redirecting to home.`);
        await routes['home'].render();
    }
}