import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    if (!this.product) return;
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.NameWithoutBrand || this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    const product = this.product;
    const container = document.querySelector(".product-detail");

    if (!product || !product.Id) {
      container.innerHTML = "<p>Product not found</p>";
      return;
    }

    // Use PrimaryLarge image URL for product details
    const imgSrc = product.Images?.PrimaryLarge?.Url || "";

    container.innerHTML = `
      <h3>${product.Brand?.Name || ""}</h3>

      <h2 class="divider">
        ${product.NameWithoutBrand}
      </h2>

      <img
        class="divider"
        src="${imgSrc}"
        alt="${product.NameWithoutBrand}"
      />

      <p class="product-card__price">
        $${product.FinalPrice}
      </p>

      <p class="product__color">
        ${product.Colors && product.Colors.length ? product.Colors[0].ColorName : ""}
      </p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart">
          Add to Cart
        </button>
      </div>
    `;
  }
}
