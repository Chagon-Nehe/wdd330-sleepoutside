
const baseURL = import.meta.env.VITE_SERVER_URL ?? "https://wdd330-backend.onrender.com/";

if (!baseURL) {
  throw new Error("VITE_SERVER_URL is not defined. Check your .env file.");
}


function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    console.log("Fetching product with id:", id);
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log("Raw data from API:", data);
    return data.Result;
  }
}

