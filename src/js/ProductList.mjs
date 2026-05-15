import { renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
        return`
            <li class="product-card">
                <a href="#">
                    <img src="${product.Image}" alt="${product.Name}">
                    <h3 class="card_brand">${product.Brand.Name}</h3>
                    <h2 class="card_name">${product.Name}</h2>
                    <p class="product-card_price">$${product.FinalPrice}</p>
                </a>
            </li>
        `;
    }

export default class ProductList{
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // Get products from dataSource
        this.list = await this.dataSource.getData(this.category);
        this.renderList(products);
    }
    renderList(products) {

        //Call the utility function
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            products,
            "afterbegin",
            true
        );        
    }
}