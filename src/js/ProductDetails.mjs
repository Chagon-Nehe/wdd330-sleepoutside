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

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("add-to-cart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.NameWithoutBrand} agregado al carrito!`);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector(".product-brand").textContent = product.Brand.Name;
  document.querySelector(".product-name").textContent =
    product.NameWithoutBrand;

  const productImage = document.querySelector("#productImage");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  // const euroPrice = new Intl.NumberFormat("us-US",
  //   {
  //     style: "currency", currency: "EUR",
  //   }).format(Number(product.FinalPrice) * 0.85);
  document.querySelector("#productPrice").textContent =
    `$${product.FinalPrice}`;
  document.querySelector("#productColor").textContent =
    product.Colors[0].ColorName;
  document.querySelector("#productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.querySelector("#add-to-cart").dataset.id = product.Id;
}

// ************* Alternative Display Product Details Method *******************
// function productDetailsTemplate(product) {
//   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${product.Image}"
//       alt="${product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${product.FinalPrice}</p>
//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//     </div></section>`;
// }
