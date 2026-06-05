import { getLocalStorage, setLocalStorage } from "./utils.mjs";

//const baseURL = import.meta.env.VITE_SERVER_URL;

// Helper function to populate the HTML layout and calculate discounts
function productDetailsTemplate(product) {
  // Brand and Name
  document.querySelector(".product-brand").textContent =
    product.Brand?.Name || "";
  document.querySelector(".product-name").textContent =
    product.NameWithoutBrand || product.Name;

  // Product Image (Using PrimaryLarge)
  const productImage = document.getElementById("productImage");
  if (productImage) {
    productImage.src = product.Images?.PrimaryLarge?.Url || "";
    productImage.alt = product.NameWithoutBrand || product.Name;
  }

  // Color and Description
  const colorElement = document.getElementById("productColor");
  if (colorElement) {
    colorElement.textContent =
      product.Colors && product.Colors.length
        ? product.Colors[0].ColorName
        : "";
  }

  const descElement = document.getElementById("productDesc");
  if (descElement) {
    descElement.innerHTML = product.DescriptionHtmlSimple || "";
  }

  // Set data ID on the cart button
  const cartBtn = document.getElementById("addToCart");
  if (cartBtn) {
    cartBtn.dataset.id = product.Id;
  }

  // Smart Price Display (Handles Discounts)
  const priceElement = document.getElementById("productPrice");
  if (priceElement) {
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

    if (isDiscounted) {
      const discountPercent = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100,
      );

      priceElement.innerHTML = `
        <del class="original-price">$${product.SuggestedRetailPrice.toFixed(2)}</del>
        <span class="sale-price">$${product.FinalPrice.toFixed(2)}</span>
        <span class="discount-badge">${discountPercent}% OFF</span>
      `;
    } else {
      priceElement.textContent = `$${product.FinalPrice.toFixed(2)}`;
    }
  }
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // Initialize data, render layout, and bind actions
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    const container = document.querySelector(".product-detail");
    if (!this.product || !this.product.Id) {
      if (container) container.innerHTML = "<p>Product not found</p>";
      return;
    }

    // Render the product onto the page
    this.renderProductDetails();

    // Attach event listener to the button now that it exists in the DOM
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  // Adds the current product into local storage safely
  addProductToCart() {
    if (!this.product || !this.product.Id) return;

    let cartItems = getLocalStorage("so-cart");
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }

    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    alert(
      `${this.product.NameWithoutBrand || this.product.Name} added to cart!`,
    );
  }

  // Delegates UI updates to the template builder
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}
