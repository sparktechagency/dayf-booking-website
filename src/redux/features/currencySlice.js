// src/store/currencySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD"
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    }
  }
});

// Selectors
export const selectCurrency = (state) => state.currency.currency;

// Action to dispatch
export const { setCurrency } = currencySlice.actions;

// Reducer to include in store
export default currencySlice.reducer;
