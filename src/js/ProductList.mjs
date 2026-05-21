function productCardTemplate(product) {
  return `<li class="product-card">

  <a href="product.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />
    <h2 class="card__name">${product.Brand.name} ${product.NameWithoutBrand}</h2>
    <p class="card__color">${product.Colors[0].colorName}</p>
    <p class="card__price">$${product.FinalPrice}</p>
  </a>
</li>`;
  
} 
function renderList(list) {
  const htmlStrings = list.map((product) => productCardTemplate(product));
  document.querySelector(".product-list").innerHTML = htmlStrings.join("");
} 
export default class ProductList {
  constructor(category, dataSource, listElement) {
    
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }


    async init() {
        const list = await this.dataSource.getData();
        renderList(list);
    }
}