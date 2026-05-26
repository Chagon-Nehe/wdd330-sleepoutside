import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  // Use PrimaryMedium image URL for listing images
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
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.renderList(this.list);
  }

  renderList(products) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
      "afterbegin",
      true
    );
  }
}
