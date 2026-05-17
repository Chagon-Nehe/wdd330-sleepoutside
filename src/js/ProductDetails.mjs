import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
  }
  // render product details to the page
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails();

    // add to cart button event handler
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCartHandler.bind(this));
      

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
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.querySelector(".product-image");
  productImage.src = `../images/tents/${product.Image}`;
  productImage.alt = `${product.Brand.name} ${product.NameWithoutBrand}`;

  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlsimple;
  document.getElementById("productPrice").textContent = `$${product.Price}`;
  document.getElementById("productColor").textContent = product.Colors[0].colorName;

  document.getElementById("addToCart").dataset.productId = product.Id;
}