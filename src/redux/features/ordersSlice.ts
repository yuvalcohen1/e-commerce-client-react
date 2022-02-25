import { createSlice } from "@reduxjs/toolkit";
import { OrderModel } from "../../models/Order.model";
import { RootState } from "../app/store";
import { createOrder } from "../thunks/orders-thunks";

export interface OrdersState {
  lastOrder: OrderModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: OrdersState = {
  lastOrder: null,
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // resetUserState: (state) => {
    //   state.status = "idle";
    //   state.statusCode = 200;
    //   state.value = null;
    //   state.errorMessage = "";
    // },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.errorMessage = "";
        state.lastOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.lastOrder = null;
        if (action.payload) {
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      });
  },
});

// export const {} = ordersSlice.actions;

export const selectOrdersState = (state: RootState) => state.orders;

export default ordersSlice.reducer;
