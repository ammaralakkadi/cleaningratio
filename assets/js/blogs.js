/* =====================================================
   blogs.js
   CleaningRatio – Blog registry, filters, search, load more
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const blogLibrary = document.getElementById("blog-library");
  const filters = Array.from(document.querySelectorAll(".blog-filter"));
  const searchInput = document.getElementById("blog-search");
  const loadMoreBtn = document.getElementById("load-more");

  if (!blogLibrary) return;

  const BLOG_REGISTRY = [
    {
      title: "How to Dilute Bleach for Floor Cleaning Safely",
      url: "blogs/how-to-dilute-bleach-for-floor-cleaning.html",
      tag: "Bleach",
      description:
        "A practical guide to bleach dilution for floors, including ratio examples, safety reminders, and common mistakes to avoid.",
      meta: "7 min read • Bleach dilution",
      category: "bleach dilution safety",
    },
    {
      title: "How to Mix All-Purpose Cleaner in a Spray Bottle",
      url: "blogs/how-to-mix-all-purpose-cleaner-spray-bottle.html",
      tag: "Dilution",
      description:
        "Simple ratio steps for spray bottle mixing with quick examples, measuring tips, and label-first safety reminders.",
      meta: "6 min read • Spray bottle mixing",
      category: "dilution spray-bottle",
    },
    {
      title: "Essential Oil Dilution Ratios for Home Cleaning",
      url: "blogs/essential-oil-dilution-ratios-for-cleaning.html",
      tag: "Essential Oils",
      description:
        "A clear starting guide to essential oil mixing ratios for home cleaning blends, with practical examples and safe usage notes.",
      meta: "8 min read • Essential oils",
      category: "essential-oil dilution",
    },
  ];

  function renderBlogs() {
    blogLibrary.innerHTML = "";

    BLOG_REGISTRY.forEach((blog) => {
      const link = document.createElement("a");
      link.href = blog.url;
      link.className = "blog-card";
      link.dataset.category = blog.category;

      link.innerHTML = `
        <span class="blog-card-tag">${blog.tag}</span>
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>
        <div class="blog-card-meta">${blog.meta}</div>
      `;

      blogLibrary.appendChild(link);
    });
  }

  renderBlogs();

  const cards = Array.from(document.querySelectorAll(".blog-card"));
  if (!cards.length) return;

  let activeFilter = "all";
  let visibleCount = 9;

  function applyVisibility() {
    const query = (searchInput?.value || "").toLowerCase().trim();

    const filtered = cards.filter((card) => {
      const cats = (card.dataset.category || "").toLowerCase();
      const text = (card.innerText || "").toLowerCase();
      const matchFilter = activeFilter === "all" || cats.includes(activeFilter);
      const matchQuery = !query || text.includes(query);
      return matchFilter && matchQuery;
    });

    cards.forEach((card) => card.classList.add("is-hidden"));
    filtered
      .slice(0, visibleCount)
      .forEach((card) => card.classList.remove("is-hidden"));

    if (loadMoreBtn) {
      loadMoreBtn.style.display =
        filtered.length > visibleCount ? "inline-block" : "none";
    }
  }

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter || "all";
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      visibleCount = 9;
      applyVisibility();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      visibleCount = 9;
      applyVisibility();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      visibleCount += 9;
      applyVisibility();
    });
  }

  applyVisibility();
});
