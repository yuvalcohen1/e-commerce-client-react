import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchUserDetailsAndSetJwtCookieByLogin,
  fetchUserDetailsAndSetJwtCookieByRegister,
} from "../../api-client/users-api";
import { LoginDetailsModel } from "../../models/LoginDetails.model";
import { RegisterDetailsModel } from "../../models/RegisterDetails.model";
import { UserModel } from "../../models/User.model";
import { RootState } from "../app/store";

export interface UserState {
  value: UserModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: UserState = {
  value: null,
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const fetchUserDetailsByLogin = createAsyncThunk(
  "user/fetchUserDetailsByLogin",
  async (loginDetails: LoginDetailsModel, thunkApi) => {
    try {
      const response = await fetchUserDetailsAndSetJwtCookieByLogin(
        loginDetails
      );
      const { data: user } = response;

      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const fetchUserDetailsByRegister = createAsyncThunk(
  "user/fetchUserDetailsByRegister",
  async (registerDetails: RegisterDetailsModel, thunkApi) => {
    try {
      const response = await fetchUserDetailsAndSetJwtCookieByRegister(
        registerDetails
      );
      const { data: user } = response;

      return user;
    } catch (error: any) {
      const rejectValue = {
        data: error.response.data,
        status: error.response.status,
      };

      return thunkApi.rejectWithValue(rejectValue);
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
      state.errorMessage = "";
    },
    getUserState: (state, action) => {
      state.status = "idle";
      state.statusCode = 200;
      state.value = action.payload;
      state.errorMessage = "";
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
      .addCase(fetchUserDetailsByLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetailsByLogin.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        fetchUserDetailsByLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(fetchUserDetailsByRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetailsByRegister.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        fetchUserDetailsByRegister.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      );
  },
});

export const { getUserState, resetUserState } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.value;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
