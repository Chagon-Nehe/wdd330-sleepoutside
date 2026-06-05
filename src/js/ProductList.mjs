import { renderListWithTemplate } from "./utils.mjs";

// Helper function to generate HTML template for a single product
function productCardTemplate(product) {
  const imageUrl = product.Images?.PrimaryMedium?.Url || "";

  return `
    <li class="product-card">
      <a href="../product_pages/index.html?id=${product.Id}">
        <img src="${imageUrl}" alt="${product.Name}" />
        <h3 class="card_brand">${product.Brand?.Name || ""}</h3>
        <h2 class="card_name">${product.Name}</h2>
        <p class="product-card_price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = []; // Initialize to store data for sorting
  }

  async init() {
    // Fetch product data based on category
    const list = await this.dataSource.getData(this.category);
    this.products = list;

    // Render the initial list
    this.renderList(this.products);

    // Set up sorting event listener
    const sortSelect = document.getElementById("sortProducts");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortProducts(e.target.value);
      });
    }
  }

  renderList(list) {
    // Clear existing content if your utility requires it, or rely on its internal logic
    this.listElement.innerHTML = "";

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }

  sortProducts(sortType) {
    const sortedProducts = [...this.products];

    switch (sortType) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
        break;

      case "name-desc":
        sortedProducts.sort((a, b) => b.Name.localeCompare(a.Name));
        break;

      case "price-asc":
        sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;

      case "price-desc":
        sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }

    // Re-render with the newly sorted array
    this.renderList(sortedProducts);
  }
}
