class ImpactSection extends HTMLElement {
    connectedCallback() {
        fetch("includes/impact.html")
            .then(res => {
                if (!res.ok) throw new Error("Impact fetch failed");
                return res.text();
            })
            .then(html => {
                this.innerHTML = html;
                this.initCounters();
            })
            .catch(err => console.error(err));
    }

    initCounters() {
        if (typeof window.initCounters === "function") {
            window.initCounters();
        }
    }
}

customElements.define("impact-section", ImpactSection);
