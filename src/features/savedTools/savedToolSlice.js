import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSavedToolsAPI,
  saveToolAPI,
  moveSavedToolAPI,
  deleteSavedToolAPI,
} from "./savedToolAPI";
import { updateCustomToolAPI } from "./savedToolAPI";

export const updateCustomTool = createAsyncThunk(
  "savedTools/updateCustomTool",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await updateCustomToolAPI(id, formData);
      return res.data.tool;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed",
      );
    }
  },
);
// ➕ ADDED: Delete Saved Tool Thunk
export const deleteSavedTool = createAsyncThunk(
  "savedTools/deleteSavedTool",
  async (id, thunkAPI) => {
    try {
      await deleteSavedToolAPI(id);
      return id; // Return the ID so we can remove it from state
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const saveTool = createAsyncThunk(
  "savedTools/saveTool",
  async (formData, thunkAPI) => {
    try {
      const res = await saveToolAPI(formData);
      return res.data.savedTool;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);

export const fetchSavedTools = createAsyncThunk(
  "savedTools/fetchSavedTools",
  async (params, thunkAPI) => {
    try {
      const res = await getSavedToolsAPI(params);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  },
);



// In savedToolSlice.js
export const moveSavedTool = createAsyncThunk(
  "savedTools/move",
  async ({ id, folderId, newFolderName }, thunkAPI) => {
    try {
      // Create the object to send to the backend
      const moveData = { folderId, newFolderName };

      // Call the API with the ID and the Data object
      const res = await moveSavedToolAPI(id, moveData);

      return res.data; // This returns the { success, tool } object from your backend
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Move failed",
      );
    }
  },
);

const savedToolSlice = createSlice({
  name: "savedTools",
  initialState: { savedItems: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSavedTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedTools.fulfilled, (state, action) => {
        state.loading = false;
        state.savedItems = action.payload.tools;
      })
      
      .addCase(saveTool.fulfilled, (state, action) => {
        state.savedItems = [action.payload, ...state.savedItems];
        state.loading = false;
      })
      // DELETE (🔥 THIS UPDATES THE UI INSTANTLY)
      .addCase(deleteSavedTool.fulfilled, (state, action) => {
        state.savedItems = state.savedItems.filter(
          (item) => item._id !== action.payload,
        );
      })
      

      .addCase(moveSavedTool.fulfilled, (state, action) => {
        const updated = action.payload.tool;

        const index = state.savedItems.findIndex(
          (item) => item._id === updated._id,
        );

        if (index !== -1) {
          state.savedItems[index] = updated; // 🔥 update UI
        }
      })
      .addCase(updateCustomTool.fulfilled, (state, action) => {
        const updatedTool = action.payload.tool || action.payload;

        const index = state.savedItems.findIndex(
          (item) => item._id === updatedTool._id,
        );

        if (index !== -1) {
          // 🔥 Create NEW array + NEW object
          state.savedItems = state.savedItems.map((item) =>
            item._id === updatedTool._id ? updatedTool : item,
          );
        }

        state.loading = false;
      });
  },
});

export default savedToolSlice.reducer;
