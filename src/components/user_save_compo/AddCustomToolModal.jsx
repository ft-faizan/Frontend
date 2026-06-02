// v6
"use client";

import React, { useReducer, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveTool,
  updateCustomTool,
} from "../../features/savedTools/savedToolSlice";
import { getFolders } from "../../features/folders/folderSlice";
import { useToast } from "../../context/ToastContext";
import {
  X,
  Upload,
  Link as LinkIcon,
  Folder,
  Image as ImageIcon,
  Sparkles,
  ChevronDown,
  Search,
  FolderPlus,
  HelpCircle,
} from "lucide-react";

const initialState = {
  toolname: "",
  toollink: "",
  description: "",
  folderId: "",
  imageFile: null,
  imageUrl: "",
  imageType: "upload",
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

  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [folderSearch, setFolderSearch] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  const folderDropdownRef = useRef(null);
  const folderInputRef = useRef(null);

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
          payload: { folderId: defaultFolderId || "" },
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      setFolderSearch("");
      setNewFolderName("");
      setIsFolderOpen(false);
    }
  }, [editData, open, defaultFolderId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        folderDropdownRef.current &&
        !folderDropdownRef.current.contains(event.target)
      ) {
        setIsFolderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isFolderOpen && folderInputRef.current) {
      setTimeout(() => folderInputRef.current?.focus(), 80);
    }
  }, [isFolderOpen]);

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
      // ✅ Toast: file selected
      showToast(`Image selected: ${file.name}`, "success");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("type", "custom");
    data.append("toolname", state.toolname);
    data.append("toollink", state.toollink);
    data.append("description", state.description);

    if (state.folderId) data.append("folderId", state.folderId);
    if (newFolderName.trim())
      data.append("newFolderName", newFolderName.trim());

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
        // ✅ Toast: success
        showToast(
          editData
            ? "Tool updated successfully ✅"
            : "Tool saved successfully 🚀",
          "success",
        );
        if (newFolderName.trim()) dispatch(getFolders());
        onClose();
      } else {
        // ✅ Toast: error
        showToast(res.payload || "Something went wrong ❌", "error");
      }
    });
  };

  const filteredFolders = folders
    .filter((f) => f.type === "custom")
    .filter((f) => f.name?.toLowerCase().includes(folderSearch.toLowerCase()));

  const selectedFolderObj = folders.find((f) => f._id === state.folderId);
  let selectedFolderName = "Default / General";
  if (newFolderName.trim()) selectedFolderName = `New: ${newFolderName}`;
  else if (selectedFolderObj) selectedFolderName = selectedFolderObj.name;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-all duration-300">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-modal-in select-none"
      >
        {/* Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-[#3981FA]/5 blur-3xl pointer-events-none" />

        {/* ─── HEADER ─── */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-900/80 flex justify-between items-center bg-slate-50/50 dark:bg-[#0f1117]/40 backdrop-blur-md relative z-10">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {editData ? "Edit Tool Parameters" : "Add Custom Tool Node"}
            </h2>
            <p className="text-[11px] font-medium text-slate-400 dark:text-gray-500">
              Configure deployment and indexation variables
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ─── BODY ─── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-premium relative z-10">
          {/* Image Source Toggle */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
              Icon Asset Source
            </label>
            <div className="flex p-1 bg-slate-100 dark:bg-[#141722] rounded-xl border border-gray-200/40 dark:border-slate-800/60">
              <button
                type="button"
                onClick={() =>
                  formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })
                }
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  state.imageType === "upload"
                    ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/15"
                    : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <Upload size={13} /> Upload File
              </button>
              <button
                type="button"
                onClick={() =>
                  formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })
                }
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  state.imageType === "url"
                    ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/15"
                    : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <LinkIcon size={13} /> Resource URL
              </button>
            </div>
          </div>

          {/* Upload / URL Block */}
          <div>
            {state.imageType === "upload" ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 dark:border-slate-800/80 rounded-2xl p-6 text-center bg-slate-50/30 dark:bg-[#141722]/20 hover:border-[#3981FA] dark:hover:border-[#3981FA] transition-colors relative group cursor-pointer min-h-[130px] flex flex-col items-center justify-center"
              >
                {state.preview ? (
                  <div className="relative w-16 h-16 mb-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-inner">
                    <img
                      src={state.preview}
                      alt="preview"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10 group-hover:scale-105 transition-transform duration-200">
                    <ImageIcon size={18} />
                  </div>
                )}
                <p className="text-gray-900 dark:text-slate-200 text-xs font-semibold text-center max-w-[280px] truncate px-2">
                  {state.imageFile
                    ? state.imageFile.name
                    : "Select Asset Graphics"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
                  {state.imageFile
                    ? "Click here to shift asset file"
                    : "Supports raw PNG, JPG or vector SVG files"}
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative flex items-center group">
                  <LinkIcon
                    size={14}
                    className="absolute left-4 text-slate-400 group-focus-within:text-[#3981FA] transition-colors"
                  />
                  <input
                    type="url"
                    placeholder="Paste resource endpoint image URL (https://...)"
                    value={state.imageUrl}
                    onChange={(e) =>
                      formDispatch({ type: "SET_URL", value: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
                  />
                </div>
                {state.preview && (
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-md">
                      <img
                        src={state.preview}
                        alt="URL preview"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Text Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
                TOOL NAME
              </label>
              <input
                name="toolname"
                type="text"
                required
                value={state.toolname}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
                placeholder="e.g. My Framework Hub"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
                REDIRECT LINK
              </label>
              <input
                name="toollink"
                type="url"
                required
                value={state.toollink}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                required
                value={state.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none h-24 focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all resize-none scrollbar-premium"
                placeholder="Brief summary explaining what this workspace asset deployment achieves..."
              />
            </div>

            {/* Folder Selector */}
            {!editData && !defaultFolderId && (
              <div className="space-y-1.5 relative" ref={folderDropdownRef}>
                <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
                  ORGANIZE IN FOLDER
                </label>

                <button
                  type="button"
                  onClick={() => setIsFolderOpen(!isFolderOpen)}
                  className={`w-full px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-semibold transition-all ${
                    isFolderOpen || state.folderId || newFolderName.trim()
                      ? "bg-white dark:bg-[#141722]/60 border-[#3981FA] text-gray-900 dark:text-white"
                      : "bg-slate-50 dark:bg-[#141722]/40 border-gray-200 dark:border-slate-800/80 text-slate-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Folder
                      size={15}
                      className={
                        state.folderId || newFolderName.trim()
                          ? "text-[#3981FA]"
                          : "text-slate-400"
                      }
                    />
                    <span className="truncate capitalize">
                      {selectedFolderName}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isFolderOpen ? "rotate-180 text-slate-600 dark:text-slate-300" : ""}`}
                  />
                </button>

                {isFolderOpen && (
                  <div className="absolute left-0 right-0 z-[999] bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:mt-2 bg-[#CDDAF6] dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl animate-in shadow-black/40">
                    <div className="p-2 border-b border-slate-300/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/40">
                      <div className="relative flex items-center">
                        <Search
                          size={12}
                          className="absolute left-3 text-slate-500 dark:text-slate-400"
                        />
                        <input
                          ref={folderInputRef}
                          type="text"
                          placeholder="Search structural components..."
                          value={folderSearch}
                          onChange={(e) => setFolderSearch(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141722] border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="max-h-40 overflow-y-auto scrollbar-premium bg-white dark:bg-[#0c0e14]">
                      <button
                        type="button"
                        onClick={() => {
                          formDispatch({
                            type: "UPDATE_FIELD",
                            field: "folderId",
                            value: "",
                          });
                          setNewFolderName("");
                          setIsFolderOpen(false);
                          setFolderSearch("");
                          // ✅ Toast: folder selected
                          showToast("Saving to Default / General", "success");
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white transition-colors border-b border-slate-100 dark:border-slate-900/40 ${
                          !state.folderId && !newFolderName.trim()
                            ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold"
                            : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <span>🌐</span>
                        <span>Default / General Workspace</span>
                      </button>

                      {filteredFolders.map((folder) => {
                        const isSelected =
                          state.folderId === folder._id &&
                          !newFolderName.trim();
                        return (
                          <button
                            key={folder._id}
                            type="button"
                            onClick={() => {
                              formDispatch({
                                type: "UPDATE_FIELD",
                                field: "folderId",
                                value: folder._id,
                              });
                              setNewFolderName("");
                              setIsFolderOpen(false);
                              setFolderSearch("");
                              // ✅ Toast: folder selected
                              showToast(
                                `Folder set to "${folder.name}"`,
                                "success",
                              );
                            }}
                            className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
                              isSelected
                                ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
                              {folder.name[0]}
                            </div>
                            <span className="truncate flex-grow">
                              {folder.name}
                            </span>
                            {isSelected && (
                              <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">
                                Active
                              </span>
                            )}
                          </button>
                        );
                      })}

                      {filteredFolders.length === 0 && (
                        <div className="p-5 text-center text-xs text-slate-400 dark:text-gray-600 font-medium italic">
                          No matching active folders
                        </div>
                      )}
                    </div>

                    <div className="p-2 bg-slate-50 dark:bg-[#13151a]/60 border-t border-slate-200 dark:border-slate-800/80 flex gap-2 mb-1">
                      <input
                        type="text"
                        placeholder="Or write new folder..."
                        value={newFolderName}
                        onChange={(e) => {
                          setNewFolderName(e.target.value);
                          formDispatch({
                            type: "UPDATE_FIELD",
                            field: "folderId",
                            value: "",
                          });
                        }}
                        className="flex-grow px-2.5 py-1.5 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsFolderOpen(false);
                          // ✅ Toast: new folder will be created on submit
                          if (newFolderName.trim()) {
                            showToast(
                              `New folder "${newFolderName}" will be created on save`,
                              "success",
                            );
                          }
                        }}
                        disabled={!newFolderName.trim()}
                        className="bg-[#3981FA] hover:bg-[#2770E6] disabled:bg-blue-800/30 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 active:scale-[0.96]"
                      >
                        <FolderPlus size={12} /> Lock
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-[#0c0e14] flex gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl transition-all active:scale-[0.98]"
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-[1.4] py-3.5 bg-[#3981FA] hover:bg-[#2770E6] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
          >
            <Sparkles size={15} />
            <span>
              {editData ? "Update Asset Changes" : "Save Collection Tool"}
            </span>
          </button>
        </div>

        <style>{`
          .scrollbar-premium::-webkit-scrollbar { width: 4px; height: 4px; }
          .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.15); border-radius: 10px; }
          .scrollbar-premium::-webkit-scrollbar-thumb:hover { background: rgba(57, 129, 250, 0.3); }
          @keyframes modalInSpring {
            from { opacity: 0; transform: scale(0.97) translateY(12px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-modal-in { animation: modalInSpring 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}</style>
      </form>
    </div>
  );
};

export default AddCustomToolModal;
