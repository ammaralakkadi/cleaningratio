/* =====================================================
   main.js
   CleaningRatio – Global JS (navigation + utilities)
   Simple, safe, GitHub Pages–friendly
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".nav-mobile");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", String(!expanded));
      mobileNav.hidden = expanded;
    });
  }

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
