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
      title: "How to Dilute Bleach for Toilet Cleaning (Bowl + Seat)",
      url: "blogs/how-to-dilute-bleach-for-toilet-cleaning.html",
      tag: "Bleach",
      description:
        "A label-first, practical way to use bleach for toilet cleaning: dilution approach, safe application steps, what to avoid, and when not to use bleach.",
      meta: "10 min read • Bleach dilution",
      category: "bleach dilution toilet cleaning",
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
      title:
        "Can You Mix Bleach and Dish Soap? What Happens, What to Do Instead",
      url: "blogs/can-you-mix-bleach-and-dish-soap.html",
      tag: "Safety",
      description:
        "Don’t mix bleach and dish soap. Why it’s risky, what to do if it happened, and a safer step-by-step cleaning workflow.",
      meta: "12 min read • Safety",
      category: "safety bleach dish-soap mixing",
    },
    {
      title:
        "Can You Mix Bleach and Ammonia? What Happens, What to Do, Safer Alternatives",
      url: "blogs/can-you-mix-bleach-and-ammonia.html",
      tag: "Safety",
      description:
        "Never mix bleach and ammonia. What can happen, what to do if it was accidental, and safer ways to clean without mixing products.",
      meta: "11 min read • Safety",
      category: "safety bleach ammonia mixing",
    },
    {
      title: "Can You Mix Bleach and Baking Soda?",
      url: "blogs/can-you-mix-bleach-and-baking-soda.html",
      tag: "Safety",
      description:
        "Avoid mixing bleach and baking soda in the same container. What can go wrong, why it’s not “stronger,” and safer, label-first options.",
      meta: "8 min read • Bleach safety",
      category: "bleach mixing safety",
    },
    {
      title:
        "How Many Drops of Essential Oil in a Diffuser? (Low, Normal, Strong)",
      url: "blogs/how-many-drops-essential-oil-in-diffuser.html",
      tag: "Essential Oils",
      description:
        "A conservative drops guide by diffuser size (100–500 mL), plus how to scale ratios without overdoing it.",
      meta: "9 min read • Diffuser ratios",
      category: "essential oil diffuser",
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
      title:
        "How Long Does Diluted Bleach Last? Storage, Potency, and When to Remix",
      url: "blogs/how-long-does-diluted-bleach-last.html",
      tag: "Bleach",
      description:
        "Diluted bleach loses strength over time. A practical, label-first way to store it, label it, and decide when to remix instead of guessing.",
      meta: "12 min read • Bleach basics",
      category: "bleach diluted shelf life storage",
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
      title: "What Does a 1:50 Dilution Mean? (Simple Math + Bottle Examples)",
      url: "blogs/what-does-1-to-50-dilution-mean.html",
      tag: "Dilution",
      description:
        "1:50 explained in plain language (parts vs total), plus quick real examples for liters, gallons, and common spray bottles—calculator-backed so you don’t mis-mix.",
      meta: "11 min read • Dilution basics",
      category: "dilution ratio basics 1-50",
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
      title: "Cleaning Dilution for a Mop Bucket (3L, 5L, 10L Examples)",
      url: "blogs/mop-bucket-cleaning-dilution-examples.html",
      tag: "Dilution",
      description:
        "Practical mop bucket dilution examples for 3L, 5L, and 10L, plus common ratios and measuring tips to avoid guesswork.",
      meta: "6 min read • Mop bucket mixing",
      category: "dilution mop-bucket",
    },
    {
      title: "How to Dilute Bleach for a Spray Bottle",
      url: "blogs/how-to-dilute-bleach-for-spray-bottle.html",
      tag: "Bleach",
      description:
        "Exact bleach spray bottle dilution examples for 500 mL, 750 mL, and 1 liter. Simple measuring steps, common mistakes, and label-first safety notes.",
      meta: "6 min read • Spray bottle bleach",
      category: "bleach dilution spray-bottle",
    },
    {
      title: "How to Dilute Cleaner for a 32 oz Spray Bottle",
      url: "blogs/how-to-dilute-cleaner-for-32-oz-spray-bottle.html",
      tag: "Dilution",
      description:
        "Exact, repeatable mixing for a 32 oz spray bottle using common dilution ratios. Fast steps, mistakes to avoid, and calculator help.",
      meta: "6 min read • 32 oz bottle",
      category: "dilution spray-bottle 32oz",
    },
    {
      title: "What Does 1:64 Dilution Mean?",
      url: "blogs/what-does-1-to-64-dilution-mean.html",
      tag: "Dilution",
      description:
        "A clear explanation of 1:64 dilution (parts vs total), how to avoid mix-ups, and how to convert it to any container size.",
      meta: "5 min read • Ratio basics",
      category: "dilution ratio basics 1-64",
    },
    {
      title: "What Does 1:128 Dilution Mean?",
      url: "blogs/what-does-1-to-128-dilution-mean.html",
      tag: "Dilution",
      description:
        "What 1:128 means in plain language and why small measuring errors matter. Simple guidance to convert it for bottles and buckets.",
      meta: "5 min read • Ratio basics",
      category: "dilution ratio basics 1-128",
    },
    {
      title:
        "What Does 1:256 Dilution Mean? (Exact Amounts for Common Bottles)",
      url: "blogs/what-does-1-to-256-dilution-mean.html",
      tag: "Dilution",
      description:
        "What 1:256 means in plain language, plus exact concentrate amounts for common bottles and buckets. Measure correctly and follow the product label.",
      meta: "9 min read • Ratio basics",
      category: "dilution ratio basics 1-256",
    },
    {
      title: "How Much Concentrate for 1 Gallon of Water?",
      url: "blogs/how-much-concentrate-for-1-gallon-of-water.html",
      tag: "Dilution",
      description:
        "A label-first way to get the right concentrate amount for 1 gallon—whether your label uses ratios or dosing like “oz per gallon.”",
      meta: "6 min read • 1 gallon mixing",
      category: "dilution gallon mixing",
    },
    {
      title: "How to Scale a Cleaning Label That Says “mL per Liter”",
      url: "blogs/how-to-scale-ml-per-liter-cleaning-labels.html",
      tag: "Dilution",
      description:
        "If your label says “mL per liter,” scale it to any bottle or bucket size without guessing—plus the common label wording traps to watch.",
      meta: "6 min read • Label scaling",
      category: "dilution labels ml-per-liter",
    },
    {
      title: "How to Mix Cleaning Solution for a 5-Gallon Bucket",
      url: "blogs/how-to-mix-cleaning-solution-for-5-gallon-bucket.html",
      tag: "Dilution",
      description:
        "A practical way to mix a 5-gallon bucket solution correctly, avoid over-strong mixes, and keep a repeatable recipe for mopping.",
      meta: "6 min read • 5-gallon bucket",
      category: "dilution bucket 5-gallon",
    },
    {
      title:
        "How Much Bleach for a 5-Gallon Bucket? (Label-First Method + Exact Amounts)",
      url: "blogs/how-much-bleach-for-5-gallon-bucket.html",
      tag: "Bleach",
      description:
        "There’s no universal amount—use your bleach label ratio and your real bucket fill level. Calculator-backed steps for consistent mixing.",
      meta: "13 min read • Bleach dilution",
      category: "bleach dilution bucket 5-gallon",
    },
    {
      title: "Bleach Dilution for Laundry: A Practical, Label-First Guide",
      url: "blogs/bleach-dilution-for-laundry-a-practical-label-first-guide.html",
      tag: "Bleach",
      description:
        "Laundry bleach basics with a conservative, label-first approach: fabric checks, measured dosing, what to avoid, and calculator help when mixing.",
      meta: "6 min read • Laundry bleach",
      category: "bleach dilution laundry safety",
    },
    {
      title: "How to Dilute Bleach for Mold Cleanup (Safety-First Basics)",
      url: "blogs/how-to-dilute-bleach-for-mold-cleanup-safety-first-basics.html",
      tag: "Bleach",
      description:
        "Safety-first basics for bleach dilution during mold cleanup: label-first mixing, ventilation reminders, and the mistakes that cause problems.",
      meta: "6 min read • Bleach safety",
      category: "bleach dilution mold safety",
    },
    {
      title: "Essential Oil Room Spray Ratio (100 mL, 500 mL, 1 L)",
      url: "blogs/essential-oil-room-spray-ratio.html",
      tag: "Essential Oils",
      description:
        "Room spray ratios by bottle size with a conservative approach. Simple steps, how to stay consistent, and calculator support for drop estimates.",
      meta: "6 min read • Room spray",
      category: "essential-oils room-spray ratio",
    },
    {
      title:
        "Essential Oil Dilution for Body Lotion (Conservative Ratios + Exact Drops)",
      url: "blogs/essential-oil-dilution-for-body-lotion.html",
      tag: "Essential Oils",
      description:
        "A conservative way to scent body lotion with essential oils: simple starting ratios, exact drops by size using the calculator, and patch-test reminders.",
      meta: "10 min read • Leave-on lotion",
      category: "essential-oils lotion dilution",
    },
    {
      title: "Essential Oil Roller Bottle Ratio (10 mL & 30 mL)",
      url: "blogs/essential-oil-roller-bottle-ratio-10ml-30ml.html",
      tag: "Essential Oils",
      description:
        "Practical roller bottle ratios for 10 mL and 30 mL with a conservative approach, simple mixing steps, and calculator support for drop estimates.",
      meta: "6 min read • Roller bottle",
      category: "essential-oils roller-bottle ratio",
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
