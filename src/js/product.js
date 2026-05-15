import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// add product to cart function
function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart"); // get cart items from local storage
  if (!Array.isArray(cartItems)) {    // if cart items is not an array, initialize it as an empty array
    cartItems = [];
  }

  cartItems.push(product); // add product to cart items array

  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
