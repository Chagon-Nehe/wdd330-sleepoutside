//import ProductData from "./ProductData.mjs";
//import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

// Load header and footer content from external HTML files
loadHeaderFooter();

// Initialize the alerts
const myAlerts = new Alert();
myAlerts.init();

/*const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, element);



// Initialize the product list
productList.init();*/
