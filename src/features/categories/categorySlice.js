import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCategoryAPI,
  getCategoriesAPI,
  deleteCategoryAPI,
  updateCategoryAPI,
  getCategoryStatsAPI ,
   getUsersAPI,
} from "./categoryAPI";
import { getUserStatsAPI } from "./categoryAPI.js";


// 🔥 CREATE
export const createCategory = createAsyncThunk(
  "categories/create",
  async (data, thunkAPI) => {
    try {
      const res = await createCategoryAPI(data);
      return res.data.category;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔥 GET
// export const getCategories = createAsyncThunk(
//   "categories/get",
//   async ({ mode }, thunkAPI) => {
//     try {
//       const res = await getCategoriesAPI({ mode });
//       return res.data.categories;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message);
//     }
//   }
// );

export const getCategories = createAsyncThunk(
  "categories/get",
  async (params, thunkAPI) => {
    try {
      const res = await getCategoriesAPI(params);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔥 DELETE
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, thunkAPI) => {
    try {
      await deleteCategoryAPI(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔥 UPDATE
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateCategoryAPI(id, data);
      return res.data.category;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getCategoryStats = createAsyncThunk(
  "categories/stats",
  async (_, thunkAPI) => {
    try {
      const res = await getCategoryStatsAPI();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/get",
  async (_, thunkAPI) => {
    try {
      const res = await getUsersAPI();
      return res.data.users;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const getUserStats = createAsyncThunk(
  "users/stats",
  async (_, thunkAPI) => {
    try {
      const res = await getUserStatsAPI();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// SLICE
const categorySlice = createSlice({
  name: "categories",
 initialState: {
  categories: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,

  stats: {
    totalCategories: 0,
    myCategories: 0,
  },
  users: [],

  userStats: {
  totalUsers: 0,
  totalAdmins: 0,
  totalSuperAdmins: 0,
},
},
  reducers: {},
  extraReducers: (builder) => {
    builder
     // 🔥 GET CATEGORIES
    .addCase(getCategories.pending, (state) => {
      state.loading = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      // .addCase(createCategory.fulfilled, (state, action) => {
      //   state.categories.unshift(action.payload);
      // })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
    })
    .addCase(getCategoryStats.fulfilled, (state, action) => {
  state.stats.totalCategories = action.payload.totalCategories;
  state.stats.myCategories = action.payload.myCategories;
})

.addCase(getUsers.fulfilled, (state, action) => {
  state.users = action.payload;
})

.addCase(getUserStats.fulfilled, (state, action) => {
  state.userStats.totalUsers = action.payload.totalUsers;
  state.userStats.totalAdmins = action.payload.totalAdmins;
  state.userStats.totalSuperAdmins = action.payload.totalSuperAdmins;
});
    
},
});

export default categorySlice.reducer;