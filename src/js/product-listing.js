import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

function getCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category") || "tents";
}

const category = getCategoryFromUrl();
const listElement = document.querySelector(".product-list");

// Update page title dynamically based on category
const titleElement = document.querySelector("section.products > h2");
if (titleElement) {
  const formattedCategory = category.replace(/-/g, " ");
  titleElement.textContent = `Top Products: ${formattedCategory.charAt(0).toUpperCase()}${formattedCategory.slice(1)}`;
}

const dataSource = new ProductData();
const productList = new ProductList(category, dataSource, listElement);
productList.init();
