import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  // render product details to the page
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails();

    // add to cart button event handler
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
      

  }
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }
  renderProductDetails() {
    productDetailsTemplate(this.product);
  }

}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.name;

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  
  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].colorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
  // document.getElementById("productPrice").textContent = product.FinalPrice;

  const priceElement = document.getElementById("productPrice");
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  if (isDiscounted) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
        100,
    );

    priceElement.innerHTML = `
      <span class="original-price">
        $${product.SuggestedRetailPrice}
      </span>

      <span class="sale-price">
        $${product.FinalPrice}
      </span>

      <span class="discount-badge">
        ${discountPercent}% OFF
      </span>
    `;
  } else {
    priceElement.textContent = `$${product.FinalPrice}`;
  }

  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
