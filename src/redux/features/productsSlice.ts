import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByCategoryId,
} from "../../api-client/products-api";
import { ProductModel } from "../../models/Product.model";
import { RootState } from "../app/store";

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

export const getProductsByCategoryId = createAsyncThunk(
  "products/getProductsByCategoryId",
  async (categoryId: string, thunkApi) => {
    try {
      const response = await fetchProductsByCategoryId(categoryId);
      const { data: products } = response;

      return products;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, thunkApi) => {
    try {
      const response = await fetchAllProducts();
      const { data: products } = response;

      return products;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

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
      .addCase(getProductsByCategoryId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsByCategoryId.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        getProductsByCategoryId.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = [];
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data;
      });
  },
});

// export const {  } = productSlice.actions;

export const selectProductsState = (state: RootState) => state.products;

export default productsSlice.reducer;
