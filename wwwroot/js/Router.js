// js/Router.js
import HomePage from './pages/HomePage.js';
import GalleryPage from './pages/GalleryPage.js';

const routes = {
    'home': new HomePage(),
    'gallery': new GalleryPage()
    // Add others: 'about', 'contact', 'login'
};

export async function navigate(pageName) {
    const page = routes[pageName] || routes['home'];

    // Clear and Render
    const html = await page.render();
    if (html) document.getElementById('app').innerHTML = html;

    // Initialize (Fetch data)
    if (page.init) await page.init();
}