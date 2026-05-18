import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import toolReducer from "../features/tools/toolSlice.js";
import categoryReducer from "../features/categories/categorySlice.js";
import folderReducer from "../features/folders/folderSlice.js";
import savedToolReducer from "../features/savedTools/savedToolSlice.js";
import dashboardReducer from "../features/dashboard/dashboardSlice.js"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tools: toolReducer,
    categories: categoryReducer,
    folders: folderReducer,
    savedTools: savedToolReducer,
    dashboard: dashboardReducer, 
  },
});
