import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/products",
});

export async function fetchNumOfAvailableProducts(): Promise<number> {
  const {
    data: { numOfAvailableProducts },
  } = await api.get("/num-of-available-products");
  return numOfAvailableProducts;
}
