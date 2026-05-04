import Page from './Page.js';

export default class GalleryPage extends Page {
    render() {
        this.app.innerHTML = `
            <h2 class="section-title">Cafe <span>Gallery</span></h2>
            <div class="gallery-grid">
                <div class="card"><div class="img-placeholder">Coffee Art</div></div>
                <div class="card"><div class="img-placeholder">Elite Pro Event</div></div>
                <div class="card"><div class="img-placeholder">Interior</div></div>
            </div>
        `;
    }
}