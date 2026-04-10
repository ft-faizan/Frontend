import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUserAPI,
  loginUserAPI,
  getMeAPI,
  logoutUserAPI,
  updateNameAPI,
} from "./authAPI.js";

// 🔥 THUNKS (async actions)

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerUserAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginUserAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);



export const getMe = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      console.log("🔥 Calling /me API"); // 👈 ADD
      const res = await getMeAPI();
      console.log("✅ /me response:", res.data); // 👈 ADD
      return res.data;
    } catch (err) {
      console.log("❌ /me error:", err.response); // 👈 ADD
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await logoutUserAPI();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


export const updateName = createAsyncThunk(
  "auth/updateName",
  async (data, thunkAPI) => {
    try {
      const res = await updateNameAPI(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
// 🔥 SLICE

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isAuthChecked: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // ✅ FIX
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // ✅ IMPORTANT
      })

      // getMe

      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      // edit user name
      .addCase(updateName.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  },
});

export default authSlice.reducer;