import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryModel } from "../../models/Category.model";
import { RootState } from "../app/store";
import { fetchCategories } from "../thunks/categories-thunks";

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

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<CategoryModel | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryToNull: (state) => {
      state.selectedCategory = null;
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
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
        state.selectedCategory = action.payload.find(
          (category) => category.categoryName === "All"
        )!;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.value = null;
        if (action.payload) {
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      });
  },
});

export const { selectCategory, setSelectedCategoryToNull } =
  categoriesSlice.actions;

export const selectCategoriesState = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
