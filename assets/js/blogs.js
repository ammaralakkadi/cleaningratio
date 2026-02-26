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
      title: "Can You Mix Bleach and Vinegar?",
      url: "blogs/can-you-mix-bleach-and-vinegar.html",
      tag: "Safety",
      description:
        "No—don’t mix bleach and vinegar. Short safety reason, common mistakes, and what to do instead.",
      meta: "4 min read • Safety",
      category: "safety bleach mixing",
    },
    {
      title: "Bleach Dilution Mistakes to Avoid",
      url: "blogs/bleach-dilution-mistakes-to-avoid.html",
      tag: "Bleach",
      description:
        "The most common bleach dilution mistakes—too strong mixes, bad measuring, wrong surfaces, and what to do instead.",
      meta: "6 min read • Bleach safety",
      category: "bleach dilution mistakes safety",
    },
    {
      title: "What Does 1:10 Dilution Mean?",
      url: "blogs/what-does-1-to-10-dilution-mean.html",
      tag: "Dilution",
      description:
        "A simple explanation of 1:10 dilution with real examples for 500 mL bottles, 1 liter mixes, and buckets.",
      meta: "5 min read • Dilution basics",
      category: "dilution ratio basics",
    },
    {
      title: "How to Calculate Dilution Ratio (Concentrate to Final Volume)",
      url: "blogs/how-to-calculate-dilution-ratio.html",
      tag: "Dilution",
      description:
        "A practical way to calculate dilution ratios and exact amounts for bottles and buckets—plus when a calculator saves time.",
      meta: "7 min read • Calculator basics",
      category: "dilution ratio calculator",
    },
    {
      title: "How to Read Cleaning Dilution Instructions on Labels",
      url: "blogs/how-to-read-cleaning-dilution-labels.html",
      tag: "Dilution",
      description:
        "A simple guide to reading dilution labels (ratios, mL per liter, and %), with quick examples and calculator links.",
      meta: "6 min read • Label decoding",
      category: "dilution labels instructions",
    },
    {
      title: "How Much Cleaner Concentrate for a 500 mL Spray Bottle?",
      url: "blogs/how-much-concentrate-for-500ml-spray-bottle.html",
      tag: "Dilution",
      description:
        "Quick 500 mL mixing examples for common ratios (1:10–1:100), plus simple measuring steps and a calculator link.",
      meta: "5 min read • 500 mL bottle",
      category: "dilution spray-bottle 500ml",
    },
    {
      title: "How Much Cleaner Concentrate for 1 Liter of Solution?",
      url: "blogs/how-much-concentrate-for-1-liter.html",
      tag: "Dilution",
      description:
        "Quick 1-liter mixing examples for common ratios (1:10–1:100), plus simple measuring steps and a calculator link.",
      meta: "5 min read • 1 liter mix",
      category: "dilution 1-liter",
    },
    {
      title: "Cleaning Dilution for a Mop Bucket (3L, 5L, 10L)",
      url: "blogs/mop-bucket-cleaning-dilution-examples.html",
      tag: "Dilution",
      description:
        "Practical mop bucket dilution examples for 3L, 5L, and 10L, plus common ratios and measuring tips to avoid guesswork.",
      meta: "6 min read • Mop bucket mixing",
      category: "dilution mop-bucket",
    },
    {
      title: "How to Dilute Bleach for a Spray Bottle (500 mL, 1L)",
      url: "blogs/how-to-dilute-bleach-for-spray-bottle.html",
      tag: "Bleach",
      description:
        "Exact bleach spray bottle dilution examples for 500 mL, 750 mL, and 1 liter. Simple measuring steps, common mistakes, and label-first safety notes.",
      meta: "6 min read • Spray bottle bleach",
      category: "bleach dilution spray-bottle",
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
