import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Search form logic
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    window.location.href = `/product-listing/?category=${encodeURIComponent(query)}`;
  }
});