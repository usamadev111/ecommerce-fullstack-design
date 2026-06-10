import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice.js";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
