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
    ...(window.BLOG_DATA_BLEACH || []),
    ...(window.BLOG_DATA_SAFETY || []),
    ...(window.BLOG_DATA_DILUTION || []),
    ...(window.BLOG_DATA_ESSENTIAL_OILS || []),
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
    if (loadMoreBtn) {
      const showing = Math.min(visibleCount, filtered.length);
      loadMoreBtn.textContent =
        filtered.length > showing
          ? `Load ${Math.min(9, filtered.length - showing)} more (${showing} of ${filtered.length})`
          : `Showing ${showing} of ${filtered.length}`;
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
