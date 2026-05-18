import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStatsAPI, getActivityAPI } from "./dashboardAPI";

export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats",
  async (_, thunkAPI) => {
    try {
      const res = await getStatsAPI();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch stats"
      );
    }
  }
);

export const getDashboardActivity = createAsyncThunk(
  "dashboard/getActivity",
  async (days = 7, thunkAPI) => {
    try {
      const res = await getActivityAPI(days);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch activity"
      );
    }
  }
);

const initialState = {
  stats: null,
  activity: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: (state) => {
      state.stats    = null;
      state.activity = null;
      state.loading  = false;
      state.error    = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending,      (state)         => { state.loading = true;  state.error = null; })
      .addCase(getDashboardStats.fulfilled,    (state, action) => { state.loading = false; state.stats = action.payload; })
      .addCase(getDashboardStats.rejected,     (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(getDashboardActivity.pending,   (state)         => { state.loading = true;  state.error = null; })
      .addCase(getDashboardActivity.fulfilled, (state, action) => { state.loading = false; state.activity = action.payload; })
      .addCase(getDashboardActivity.rejected,  (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;