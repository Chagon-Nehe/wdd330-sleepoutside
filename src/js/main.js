import ProductData from "./ProductData.mjs";
import { ProductList } from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, document.getElementById("product-list"));

// use asynch/await

async function init() {
    try {
        await productList.init();
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
    
}
init();