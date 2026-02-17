/* =====================================================
   main.js
   CleaningRatio – Global JS (navigation + utilities)
   Simple, safe, GitHub Pages–friendly
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".nav-mobile");

  const openMenu = () => {
    if (!hamburger || !mobileNav) return;
    document.body.classList.add("menu-open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.hidden = false;
    mobileNav.classList.add("is-open");
  };

  const closeMenu = () => {
    if (!hamburger || !mobileNav) return;
    document.body.classList.remove("menu-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");

    // allow drawer transition to finish, then hide
    window.setTimeout(() => {
      if (hamburger.getAttribute("aria-expanded") === "false") {
        mobileNav.hidden = true;
      }
    }, 180);
  };

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const expanded = hamburger.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });

    // Close when tapping outside (backdrop area)
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("menu-open")) return;
      const target = e.target;
      if (!(target instanceof Element)) return;

      const clickedInsideNav = mobileNav.contains(target);
      const clickedHamburger = hamburger.contains(target);
      if (!clickedInsideNav && !clickedHamburger) closeMenu();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu();
      }
    });

    // Close after choosing a link
    mobileNav.addEventListener("click", (e) => {
      const target = e.target;
      if (target instanceof Element && target.closest("a")) closeMenu();
    });
  }

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
