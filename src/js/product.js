import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");



const product = new ProductDetails(productId, dataSource);
product.init();

// add product to cart function
// function addProductToCart(product) {
//   let cartItems = getLocalStorage("so-cart"); // get cart items from local storage
//   if (!Array.isArray(cartItems)) {
//     // if cart items is not an array, initialize it as an empty array
//     cartItems = [];
//   }
//   // console.log("current cart items:", cartItems);
//   cartItems.push(product); // add product to cart items array

//   setLocalStorage("so-cart", cartItems);
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   // console.log("clicked, id:", e.target.dataset.id);
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   // console.log("product found:", product
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
