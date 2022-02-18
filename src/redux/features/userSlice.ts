import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserDetailsAndSetJwtCookieByLogin } from "../../api-client/users-api";
import { LoginDetailsModel } from "../../models/LoginDetails.model";
import { UserModel } from "../../models/User.model";
import { RootState } from "../app/store";

export interface UserState {
  value: UserModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
}

const initialState: UserState = {
  value: null,
  status: "idle",
  statusCode: 200,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (loginDetails: LoginDetailsModel, thunkApi) => {
    try {
      const response = await fetchUserDetailsAndSetJwtCookieByLogin(
        loginDetails
      );
      const { data: user } = response;

      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.status);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.status = "idle";
      state.statusCode = 200;
      state.value = null;
    },
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
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
      })
      .addCase(
        fetchUserDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload;
        }
      );
  },
});

export const { resetUserState } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.value;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
