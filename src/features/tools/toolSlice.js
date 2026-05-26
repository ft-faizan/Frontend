import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllToolsAPI,
  getAdminToolsAPI,
  updateToolAPI,
  deleteToolAPI,
  createToolAPI,
  getAdminStatsAPI,
  getCategoryPreviewToolsAPI,
} from "./toolAPI.js";

// export const getAdminStats = createAsyncThunk(
//   "tools/getAdminStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getAdminStatsAPI();
//       return response.data; // This returns { success: true, toolStats, categoryStats }
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch stats");
//     }
//   }
// );

// Create the Thunk for fetching user-specific card stats

export const getCategoryPreviewTools = createAsyncThunk(
  "tools/getCategoryPreviewTools",
  async (categoryId, thunkAPI) => {
    try {
      const res = await getCategoryPreviewToolsAPI(categoryId);

      // return {
      //   categoryId,
      //   tools: res.data.tools,
      // };
      return {
        categoryId,

        tools: res.data.tools,

        total: res.data.total,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const getAdminStats = createAsyncThunk(
  "tools/getAdminStats",
  async (email, { rejectWithValue }) => {
    try {
      const response = await getAdminStatsAPI(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const getTools = createAsyncThunk(
  "tools/getTools",
  async ({ mode, search, category, email, page, limit }, thunkAPI) => {
    try {
      let res;
      const params = {};

      if (search) params.search = search;
      if (category) params.category = category;
      if (mode) params.mode = mode;
      if (email) params.email = email;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      if (mode === "admin") {
        res = await getAdminToolsAPI(params);
      } else {
        res = await getAllToolsAPI(params);
      }

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// updateTool

export const updateTool = createAsyncThunk(
  "tools/updateTool",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateToolAPI(id, data);
      return res.data.tool;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

//  create tool

export const createTool = createAsyncThunk(
  "tools/createTool",
  async (formData, thunkAPI) => {
    try {
      const res = await createToolAPI(formData);
      return res.data.tool;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ===============================
// 🔥 DELETE TOOL
// ===============================
export const deleteTool = createAsyncThunk(
  "tools/deleteTool",
  async (id, thunkAPI) => {
    try {
      await deleteToolAPI(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

// ===============================
// SLICE
// ===============================
const toolSlice = createSlice({
  name: "tools",
  initialState: {
    tools: [],
    pages: 1,
    total: 0,
    stats: null,
    categoryPreview: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      //  CREATE TOOLS
      .addCase(createTool.fulfilled, (state, action) => {
        state.tools.unshift(action.payload); // add new tool on top
      })
      //  GET TOOLS
      .addCase(getTools.pending, (state) => {
        state.loading = true;
      })
      // .addCase(getTools.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.tools = action.payload.tools;
      // })
      // .addCase(getTools.fulfilled, (state, action) => {
      //   state.loading = false;

      //   state.tools = action.payload.tools;

      //   // ✅ ADD THIS
      //   state.pages = action.payload.pages || 1;
      // })
      .addCase(getTools.fulfilled, (state, action) => {
        state.loading = false;

        state.tools = action.payload.tools;

        state.pages = action.payload.pages || 1;

        // 🔥 ADD THIS
        state.total = action.payload.total || 0;
      })
      .addCase(getTools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE TOOLS
      .addCase(updateTool.fulfilled, (state, action) => {
        state.tools = state.tools.map((tool) =>
          tool._id === action.payload._id ? action.payload : tool,
        );
      })

      //  DELETE TOOLS
      .addCase(deleteTool.fulfilled, (state, action) => {
        state.tools = state.tools.filter((tool) => tool._id !== action.payload);
      })

      .addCase(getAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCategoryPreviewTools.fulfilled, (state, action) => {
        // state.categoryPreview[action.payload.categoryId] = {
        //   tools: action.payload.tools,
        //   image: action.payload.tools?.[0]?.image?.url || null,
        // };
        state.categoryPreview[action.payload.categoryId] = {
          tools: action.payload.tools,

          total: action.payload.total,

          image: action.payload.tools?.[0]?.image?.url || null,
        };
      });
  },
});

export default toolSlice.reducer;
