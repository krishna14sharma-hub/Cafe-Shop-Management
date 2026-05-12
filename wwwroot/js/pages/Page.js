
export default class Page {
    constructor() {
        this.app = document.getElementById('app');
    }

    // Every page will override this to return its own HTML
    render() {
        return "";
    }

    // Optional: for pages that need to fetch data after rendering
    async init() { }
}


// any page that inherits from Page doesn't have to keep searching the HTML for the "app" div; it’s already available as this.app.