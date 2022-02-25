import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { OrderModel } from "../../models/Order.model";

const api = axios.create({
  baseURL: "http://localhost:4000/orders",
});

export const createOrder = createAsyncThunk<
  OrderModel,
  Partial<OrderModel>,
  { rejectValue: AxiosResponse }
>(
  "orders/createOrder",
  async (createOrderBody: Partial<OrderModel>, thunkApi) => {
    try {
      const { data: newOrder } = await api.post<OrderModel>(
        "/create-order",
        createOrderBody,
        {
          withCredentials: true,
        }
      );

      return newOrder as OrderModel;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response as AxiosResponse);
    }
  }
);
