import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, document.getElementById("product-list"));

// Initialize the alerts
const myAlerts = new Alert();
myAlerts.init();

// Initialize the product list
async function init() {
    try {
        await productList.init();
    } catch (error) {
       // console.error("Error fetching product data:", error);
    }
    
}
init();