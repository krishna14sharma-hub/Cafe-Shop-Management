
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