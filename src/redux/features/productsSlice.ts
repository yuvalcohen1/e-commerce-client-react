import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductModel } from "../../models/Product.model";
import { RootState } from "../app/store";
import {
  fetchAllProducts,
  fetchProductsByCategoryId,
  fetchProductsByProductName,
} from "../thunks/products-thunks";

export interface ProductsState {
  value: ProductModel[];
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: ProductsState = {
  value: [],
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        fetchProductsByCategoryId.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = [];
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        fetchAllProducts.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = [];
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(fetchProductsByProductName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByProductName.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchProductsByProductName.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        if (action.payload) {
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      });
  },
});

// export const {  } = productSlice.actions;

export const selectProductsState = (state: RootState) => state.products;

export default productsSlice.reducer;
