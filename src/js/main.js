// import ProductData from "./ProductData.mjs";
// import ProductList from "./ProductList.mjs";
// import Alert from "./Alert.js";

// const dataSource = new ProductData("tents");
// const element = document.querySelector(".product-list");
// const productList = new ProductList("tents", dataSource, element);

// // Initialize the alerts
// const myAlerts = new Alert();
// myAlerts.init();

// // Initialize the product list
// async function init() {
//   try {
//     await productList.init();
//   } catch (error) {
//     // console.error("Error fetching product data:", error);
//   }
// }
// init();

// //productList.init();

import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
