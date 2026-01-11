class SiteFooter extends HTMLElement {
    connectedCallback() {
        fetch("includes/footer.html")
            .then(res => {
                if (!res.ok) throw new Error("Footer fetch failed");
                return res.text();
            })
            .then(html => {
                this.innerHTML = html;
            })
            .catch(err => console.error(err));
    }
}

customElements.define("site-footer", SiteFooter);
