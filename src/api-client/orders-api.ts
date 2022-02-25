import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/orders",
});

export async function fetchNumAllOrders(): Promise<number> {
  const {
    data: { numOfAllOrders },
  } = await api.get("/num-of-all-orders");
  return numOfAllOrders;
}

export async function fetchDatesWithThreeOrders(): Promise<string[]> {
  const { data: numOfAllOrders } = await api.get("/dates-with-three-orders", {
    withCredentials: true,
  });
  return numOfAllOrders;
}
