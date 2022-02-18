import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface CitiesState {
  value: string[];
}

const initialState: CitiesState = {
  value: [
    "Jerusalem",
    "Tel Aviv",
    "Haifa",
    "Rishon Lezion",
    "Petah Tikva",
    "Ashdod",
    "Netanya",
    "Beer Sheva",
    "Bney Brak",
    "Holon",
  ],
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// export const {} = citiesSlice.actions;

// export const selectUser = (state: RootState) => state.user.value;
export const selectCitiesState = (state: RootState) => state.cities;

export default citiesSlice.reducer;
