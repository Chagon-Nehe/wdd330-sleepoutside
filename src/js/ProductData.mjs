const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {
    // no params needed
  }

  async convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await this.convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await this.convertToJson(response);
    //console.log(data.Result);

    return data.Result;
  }
}
