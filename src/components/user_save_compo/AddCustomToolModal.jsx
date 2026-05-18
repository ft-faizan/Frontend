import React, { useReducer, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveTool,
  updateCustomTool,
} from "../../features/savedTools/savedToolSlice";
import { useToast } from "../../context/ToastContext";

const initialState = {
  toolname: "",
  toollink: "",
  description: "",
  folderId: "",
  imageFile: null,
  imageUrl: "",
  imageType: "upload", // "upload" | "url"
  preview: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_IMAGE_TYPE":
      return { ...state, imageType: action.value };
    case "SET_FILE":
      return {
        ...state,
        imageFile: action.value,
        preview: action.preview,
        imageUrl: "",
      };
    case "SET_URL":
      return {
        ...state,
        imageUrl: action.value,
        preview: action.value,
        imageFile: null,
      };
    case "RESET_FORM":
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
};

const AddCustomToolModal = ({
  open,
  onClose,
  editData = null,
  defaultFolderId = null,
}) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const { folders } = useSelector((state) => state.folders);
  const [state, formDispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    if (open) {
      if (editData) {
        formDispatch({
          type: "RESET_FORM",
          payload: {
            toolname: editData.toolname || "",
            toollink: editData.toollink || "",
            description: editData.description || "",
            folderId: editData.folderId?._id || "",
            imageFile: null,
            preview: editData.image?.url || null,
            imageType: editData.image?.fileId ? "upload" : "url",
          },
        });
      } else {
        formDispatch({
          type: "RESET_FORM",
          payload: {
            folderId: defaultFolderId || "",
          },
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  }, [editData, open]);

  if (!open) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formDispatch({ type: "UPDATE_FIELD", field: name, value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formDispatch({
        type: "SET_FILE",
        value: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("type", "custom");
    data.append("toolname", state.toolname);
    data.append("toollink", state.toollink);
    data.append("description", state.description);

    // if (!editData && state.folderId) data.append("folderId", state.folderId);
    if (state.folderId) data.append("folderId", state.folderId);

    if (state.imageType === "upload" && state.imageFile) {
      data.append("image", state.imageFile);
    } else if (state.imageType === "url" && state.imageUrl) {
      data.append("imageUrl", state.imageUrl);
    }

    const action = editData
      ? updateCustomTool({ id: editData._id, formData: data })
      : saveTool(data);

    dispatch(action).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
        onClose();
      } else {
        showToast(res.payload || "Execution failed ❌", "error");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-md rounded-3xl p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center border-b border-[#2a2d3a] pb-4">
          <h2 className="text-2xl font-bold text-white">
            {editData ? "Edit Tool" : "Add Custom Tool"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* --- Image Type Toggle --- */}
        <div className="flex bg-[#13151a] p-1 rounded-xl border border-[#2a2d3a]">
          <button
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              state.imageType === "upload"
                ? "bg-[#286FF0] text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() =>
              formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })
            }
          >
            Upload File
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              state.imageType === "url"
                ? "bg-[#286FF0] text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
            onClick={() =>
              formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })
            }
          >
            Image Link
          </button>
        </div>

        {/* --- Dynamic Image Input --- */}
        {state.imageType === "upload" ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#2a2d3a] rounded-2xl p-4 bg-[#13151a] hover:border-[#286FF0] transition-colors relative group">
            {state.preview ? (
              <img
                src={state.preview}
                alt="preview"
                className="w-20 h-20 object-contain rounded-lg mb-2"
              />
            ) : (
              <div className="text-3xl mb-2">🖼️</div>
            )}
            <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">
              {state.imageFile ? state.imageFile.name : "Select Tool Icon"}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="url"
              placeholder="Paste Image URL (https://...)"
              className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white text-sm outline-none focus:border-[#286FF0] transition-all"
              value={state.imageUrl}
              onChange={(e) =>
                formDispatch({ type: "SET_URL", value: e.target.value })
              }
            />
            {state.preview && (
              <div className="flex justify-center">
                <img
                  src={state.preview}
                  alt="URL preview"
                  className="w-20 h-20 object-contain rounded-lg border border-[#2a2d3a]"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>
        )}

        {/* --- Other Fields --- */}
        <div className="space-y-4">
          <input
            name="toolname"
            type="text"
            placeholder="Friendly Name (e.g. My Portfolio)"
            required
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0] transition-all"
            value={state.toolname}
            onChange={handleInputChange}
          />

          <input
            name="toollink"
            type="url"
            placeholder="https://..."
            required
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0] transition-all"
            value={state.toollink}
            onChange={handleInputChange}
          />

          <textarea
            name="description"
            placeholder="What does this tool do?"
            required
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none h-28 focus:border-[#286FF0] transition-all resize-none"
            value={state.description}
            onChange={handleInputChange}
          />

         {!editData && !defaultFolderId && (
            <div className="space-y-1.5">
              <label className="text-[10px] text-gray-500 uppercase font-bold pl-1">
                Organize in Folder
              </label>
              <select
                name="folderId"
                value={state.folderId}
                onChange={handleInputChange}
                className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
              >
                <option value="">Default / General</option>
                {folders
                  .filter((f) => f.type === "custom")
                  .map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 text-gray-400 font-bold hover:text-white transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-[2] bg-[#286FF0] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95"
          >
            {editData ? "Update Tool" : "Save Collection Tool"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomToolModal;
