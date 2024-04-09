import { createReducer } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  order: null,
  error: null,
  };

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("orderRequest", (state) => {
      state.loading = true;
    })
    .addCase("orderSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
     
    })
    .addCase("orderFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    
});
