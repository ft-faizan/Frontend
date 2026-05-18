// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getFoldersAPI, createFolderAPI } from "./folderAPI.js";
// import { moveSavedTool } from "../savedTools/savedToolSlice";

// export const getFolders = createAsyncThunk("folders/getFolders", async (params, thunkAPI) => {
//   try {
//     const res = await getFoldersAPI(params);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message);
//   }
// });

// export const createFolder = createAsyncThunk("folders/createFolder", async (name, thunkAPI) => {
//   try {
//     const res = await createFolderAPI(name);
//     return res.data.folder;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message);
//   }
// });

// const folderSlice = createSlice({
//   name: "folders",
//   initialState: { folders: [], loading: false, error: null },
//   reducers: {},
  
//   extraReducers: (builder) => {
//   builder
//     .addCase(getFolders.fulfilled, (state, action) => {
//       state.folders = action.payload.folders;
//     })

//     .addCase(createFolder.fulfilled, (state, action) => {
//       state.folders.unshift(action.payload);
//     })

//     // 🔥 ADD THIS BLOCK
//     .addCase(moveSavedTool.fulfilled, (state, action) => {
//       const updatedTool = action.payload.tool;

//       // Safety check
//       if (!updatedTool) return;

//       // If tool is inside a folder
//       if (updatedTool.folderId && typeof updatedTool.folderId === "object") {
//         const folderExists = state.folders.find(
//           (f) => f._id === updatedTool.folderId._id
//         );

//         // If new folder → add it instantly
//         if (!folderExists) {
//           state.folders.unshift(updatedTool.folderId);

//           // Optional sorting
//           state.folders.sort((a, b) => a.name.localeCompare(b.name));
//         }
//       }
//     });
// },
// });

// export default folderSlice.reducer;


// v2



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getFoldersAPI, 
  createFolderAPI, 
  deleteFolderAPI, // 🔥 Added
  updateFolderAPI  // 🔥 Added
} from "./folderAPI.js";
import { moveSavedTool } from "../savedTools/savedToolSlice";

// 1. Fetch Folders
export const getFolders = createAsyncThunk("folders/getFolders", async (params, thunkAPI) => {
  try {
    const res = await getFoldersAPI(params);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 2. Create Folder
export const createFolder = createAsyncThunk("folders/createFolder", async (name, thunkAPI) => {
  try {
    const res = await createFolderAPI(name);
    return res.data.folder;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 3. Delete Folder 🔥 NEW EXPORT
export const deleteFolder = createAsyncThunk("folders/deleteFolder", async (id, thunkAPI) => {
  try {
    await deleteFolderAPI(id);
    return id; // Return ID to remove from state
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// 4. Update Folder 🔥 NEW EXPORT
export const updateFolder = createAsyncThunk("folders/updateFolder", async ({ id, name }, thunkAPI) => {
  try {
    const res = await updateFolderAPI(id, name);
    return res.data.folder; // Assuming backend returns the updated folder object
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

const folderSlice = createSlice({
  name: "folders",
  initialState: { folders: [], loading: false, error: null },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET FOLDERS
      .addCase(getFolders.fulfilled, (state, action) => {
        state.folders = action.payload.folders;
      })
      // CREATE FOLDER
      .addCase(createFolder.fulfilled, (state, action) => {
        state.folders.unshift(action.payload);
      })
      // DELETE FOLDER 🔥
      .addCase(deleteFolder.fulfilled, (state, action) => {
        state.folders = state.folders.filter((f) => f._id !== action.payload);
      })
      // UPDATE FOLDER 🔥
      .addCase(updateFolder.fulfilled, (state, action) => {
        const index = state.folders.findIndex((f) => f._id === action.payload._id);
        if (index !== -1) {
          state.folders[index] = action.payload;
        }
      })
      // MOVE TOOL SYNC
      .addCase(moveSavedTool.fulfilled, (state, action) => {
        const updatedTool = action.payload.tool;
        if (!updatedTool) return;

        if (updatedTool.folderId && typeof updatedTool.folderId === "object") {
          const folderExists = state.folders.find(
            (f) => f._id === updatedTool.folderId._id
          );

          if (!folderExists) {
            state.folders.unshift(updatedTool.folderId);
            state.folders.sort((a, b) => a.name.localeCompare(b.name));
          }
        }
      });
  },
});

export default folderSlice.reducer;