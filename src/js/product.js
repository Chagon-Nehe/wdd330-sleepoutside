import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam } from "./utils.mjs";

const productId = getParam("id"); // product id param is 'id'

const dataSource = new ProductData(); // NO category passed

const product = new ProductDetails(productId, dataSource);
product.init();
