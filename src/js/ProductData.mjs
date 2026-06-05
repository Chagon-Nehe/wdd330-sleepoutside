const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  constructor() {
    // no params needed
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await this.convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await this.convertToJson(response);
    return data.Result;
  }

  async convertToJson(response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
}
