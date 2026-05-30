import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // Initialize and load the data
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // Add listener to the Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  // Push item to local storage array
  addProductToCart() {
    let cartItems = getLocalStorage("so-cart");
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  // Call the external template function
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

// External helper function to populate the HTML
function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  // Set up product image
  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  // Set up descriptions and colors
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;

  // Smart Price Display (Handles Discounts)
  const priceElement = document.getElementById("productPrice");
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  if (isDiscounted) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100,
    );

    priceElement.innerHTML = `
      <span class="original-price">$${product.SuggestedRetailPrice}</span>
      <span class="sale-price">$${product.FinalPrice}</span>
      <span class="discount-badge">${discountPercent}% OFF</span>
    `;
  } else {
    priceElement.textContent = `$${product.FinalPrice}`;
  }
}
