document.addEventListener("DOMContentLoaded", initHeroSlider);

function initHeroSlider() {
  const slidesData = [
    {
      headline: "Give a little. Change a lot.",
      subtitle:
        "Help today because tomorrow you may be the one who needs helping."
    },
    {
      headline: "Education builds the future.",
      subtitle:
        "Every child deserves access to knowledge and opportunity."
    },
    {
      headline: "Together, we can make a change",
      subtitle:
        "Together we can create lasting change in communities."
    }
  ];

  const slides = document.querySelectorAll(".slide");
  const headlineEl = document.getElementById("headline");
  const subtitleEl = document.getElementById("subtitle");
  const heroSection = document.querySelector(".hero");
  const dotsContainer = document.getElementById("heroDots");
  if (!slides.length || !headlineEl || !subtitleEl) return;


  let currentIndex = 0;
  let typingTimeout;
  let slideInterval;
  let dots = [];

  /* SET BACKGROUND IMAGES */
  slides.forEach(slide => {
    slide.style.backgroundImage = `url(${slide.dataset.bg})`;
  });

  /* TYPEWRITER */
  function typeText(element, text, speed = 70, callback) {
    element.textContent = "";
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        typingTimeout = setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    dots = [];

    slidesData.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = index;
        changeSlide(currentIndex);
        startSlider();
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });
  }

  /* CHANGE SLIDE */
  function changeSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    clearTimeout(typingTimeout);
    headlineEl.textContent = "";
    subtitleEl.textContent = "";

    typeText(headlineEl, slidesData[index].headline, 80, () => {
      typeText(subtitleEl, slidesData[index].subtitle, 30);
    });
  }

  /* AUTO SLIDER */
  function startSlider() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      changeSlide(currentIndex);
    }, 6000);
  }

  /* INIT */
  createDots();
  changeSlide(0);
  startSlider();
}



//impact section


const counters = document.querySelectorAll(".stat-number");

function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const isK = target >= 1000;
    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = isK
        ? (value / 1000).toFixed(1) + "k+"
        : value + "+";

      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = isK
        ? target / 1000 + "k+"
        : target + "+";
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}



// testimonial

const slides = document.querySelectorAll(".testimonial-slide");

let index = 0;

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}


setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);



const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // optional: animate once
      }
    });
  },
  {
    threshold: 0.1
  }
);

reveals.forEach(el => observer.observe(el));
