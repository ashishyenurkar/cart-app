import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: null,
  error: null,
  };

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productRequest", (state) => {
      state.loading = true;
    })
    .addCase("productSuccess", (state, action) => {
      state.loading = false;
      state.products = action.payload;
     
    })
    .addCase("productFailure", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    
});
