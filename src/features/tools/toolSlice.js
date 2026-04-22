import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllToolsAPI,
  getAdminToolsAPI,
  updateToolAPI,
  deleteToolAPI,
  createToolAPI,
} from "./toolAPI.js";

// ===============================
// 🔥 GET TOOLS
// ===============================
// export const getTools = createAsyncThunk(
//     "tools/getTools",
//     async ({ mode, search, category }, thunkAPI) => {
//         try {
//             let res;

//             const params = {};

//             if (search) params.search = search;
//             if (category) params.category = category;
//             if (mode) params.mode = mode;
//             if (email) params.email = email;

//             // 🔴 admin route
//             if (mode) {
//                 res = await getAdminToolsAPI(params);
//             } else {
//                 // 🟢 user route
//                 res = await getAllToolsAPI(params);
//             }

//             return res.data;
//         } catch (err) {
//             return thunkAPI.rejectWithValue(err.response?.data?.message);
//         }
//     }
// );

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
      .addCase(getTools.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload.tools;
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
      });
  },
});

export default toolSlice.reducer;
