import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import toolReducer from "../features/tools/toolSlice.js";
import categoryReducer from "../features/categories/categorySlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
      tools: toolReducer,
      categories: categoryReducer,
  },
});