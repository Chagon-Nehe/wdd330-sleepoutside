
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.dataSource = dataSource;
    this.category = category;
    this.listElement = listElement;
  }


    async init() {
        const list = await this.dataSource.getData();
        this.renderProductList(list);
    }
}