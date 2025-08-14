// Initialize AOS (Animate on Scroll)
AOS.init();

// Sticky Header on Scroll
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

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
        setTimeout(typeWriter, 160); // Adjust typing speed here (in ms)
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
