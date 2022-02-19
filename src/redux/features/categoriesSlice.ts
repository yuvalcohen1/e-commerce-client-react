import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api-client/categories-api";
import { CategoryModel } from "../../models/Category.model";
import { RootState } from "../app/store";

export interface CategoriesState {
  value: CategoryModel[] | null;
  selectedCategory: CategoryModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: CategoriesState = {
  value: null,
  selectedCategory: null,
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkApi) => {
    try {
      const response = await fetchCategories();
      const { data: categories } = response;

      return categories;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<CategoryModel | null>) => {
      state.selectedCategory = action.payload;
    },
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
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
        state.selectedCategory = action.payload.find(
          (category) => category.categoryName === "All"
        )!;
      })
      .addCase(getCategories.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.value = null;
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data;
      });
  },
});

export const { selectCategory } = categoriesSlice.actions;

export const selectCategoriesState = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
