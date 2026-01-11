/*SWITCH TAB BETWEEN MISSION & VISION */
const tabs = document.querySelectorAll(".switch-tab");
const contents = document.querySelectorAll(".tab-text");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Remove active state from all tabs
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        // Activate clicked tab
        tab.classList.add("active");

        // Show matching content
        const target = tab.getAttribute("data-tab");
        document
            .querySelector(`.tab-text[data-content="${target}"]`)
            .classList.add("active");
    });
});

/*
   FAQ ACCORDION (CONTACT PAGE)
    */

const faqItems = document.querySelectorAll(".faq-left details");

faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
        if (item.open) {
            faqItems.forEach(other => {
                if (other !== item) {
                    other.open = false;
                }
            });
        }
    });
});


// offline donate accordion

document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion details");

    accordions.forEach(function (current) {
        current.addEventListener("toggle", function () {
            if (current.open) {
                accordions.forEach(function (other) {
                    if (other !== current) {
                        other.removeAttribute("open");
                    }
                });
            }
        });
    });
});

// COPYRIGHT FUNCTION FOR FOOTER
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
});