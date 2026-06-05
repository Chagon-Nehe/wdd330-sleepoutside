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
    this.products = [];
  }

  async init() {
    // const list = await this.dataSource.getData();
    // this.renderList(list);
    this.products = await this.dataSource.getData(this.category);
    console.log(this.products);

    this.renderList(this.products);

    const sortSelect = document.getElementById("sortProducts");

    sortSelect.addEventListener("change", (e) => {
      // console.log(e.target.value);
      this.sortProducts(e.target.value);
    });
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

    this.renderList(sortedProducts);
  }

  renderList(list) {
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

    // apply use new utility function instead of the commented code above
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
