class IncludeComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const src = this.getAttribute("src");
        if (!src) return;

        fetch(src)
            .then(res => {
                if (!res.ok) throw new Error(`Fetch failed: ${src}`);
                return res.text();
            })
            .then(html => {
                this.innerHTML = html;
                this.afterLoad();
            })
            .catch(err => console.error(err));
    }

    // Hook for child components
    afterLoad() { }
}

customElements.define("include-component", IncludeComponent);
