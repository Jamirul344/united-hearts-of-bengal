
/*
   FAQ ACCORDION (CONTACT PAGE)
    */

const faqItems = document.querySelectorAll(".faq-left details");

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      faqItems.forEach((other) => {
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
