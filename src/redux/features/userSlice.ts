import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserDetailsAndSetJwtCookieByLogin } from "../../api-client/users-api";
import { LoginDetailsModel } from "../../models/LoginDetails.model";
import { UserModel } from "../../models/User.model";
import { RootState } from "../app/store";

export interface UserState {
  value: UserModel | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  value: null,
  status: "idle",
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (loginDetails: LoginDetailsModel) => {
    const user = await fetchUserDetailsAndSetJwtCookieByLogin(loginDetails);

    return user;
  }
);

export const userSlice = createSlice({
  name: "user",
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
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
