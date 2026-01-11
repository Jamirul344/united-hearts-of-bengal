class SiteHeader extends HTMLElement {
    connectedCallback() {
        fetch("includes/header.html")
            .then(res => {
                if (!res.ok) throw new Error("Header fetch failed");
                return res.text();
            })
            .then(html => {
                this.innerHTML = html;
                this.initNavbar();
                this.setActiveMenu();
            })
            .catch(err => console.error(err));
    }

    initNavbar() {
        const toggle = this.querySelector("#navToggle");
        const menu = this.querySelector("#mobileMenu");

        if (!toggle || !menu) return;

        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.toggle("show");
            toggle.classList.toggle("open");
            toggle.setAttribute("aria-expanded", isOpen);
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("show");
                toggle.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    setActiveMenu() {
        const current = window.location.pathname.split("/").pop() || "index.html";

        this.querySelectorAll(".nav-menu a, .mobile-links a, .nav-cta")
            .forEach(link => {
                if (link.getAttribute("href") === current) {
                    link.classList.add("active");
                    link.setAttribute("aria-current", "page");
                }
            });
    }
}

customElements.define("site-header", SiteHeader);
