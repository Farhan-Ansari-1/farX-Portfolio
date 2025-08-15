// Initialize AOS (Animate on Scroll)
AOS.init();

// --- Utility: Throttle Function ---
// Prevents a function from being called too frequently.
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Sticky Header on Scroll
const header = document.querySelector(".site-header");
const handleHeaderScroll = () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
};
window.addEventListener("scroll", throttle(handleHeaderScroll, 100));

// Typing Animation for Headline
document.addEventListener("DOMContentLoaded", () => {
  const headline = document.getElementById("headline");
  if (headline) {
    const text = headline.textContent;
    headline.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        headline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150); // Adjust typing speed here (in ms)
       } else {
        // Typing is done, hide the cursor
        headline.classList.add("typing-done");
      }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }
});

// Tabbed Interface for Skills/Projects
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    // Deactivate all buttons and panes
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));

    // Activate the clicked button and corresponding pane
    btn.classList.add("active");
    const activePane = document.getElementById(tabId);
    if (activePane) {
      activePane.classList.add("active");
    }
  });
});

// Hamburger Menu Logic
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((n) => n.addEventListener("click", closeMenu));

// --- Back to Top Button ---
const backToTopBtn = document.getElementById("back-to-top-btn");

// Show button on scroll
const handleBackToTopScroll = () => {
  if (window.scrollY > 200) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
};
window.addEventListener("scroll", throttle(handleBackToTopScroll, 150));

// Scroll to top on click
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
