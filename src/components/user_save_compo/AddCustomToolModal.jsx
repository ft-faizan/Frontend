// // v1
// import React, { useReducer, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   saveTool,
//   updateCustomTool,
// } from "../../features/savedTools/savedToolSlice";
// import { useToast } from "../../context/ToastContext";

// const initialState = {
//   toolname: "",
//   toollink: "",
//   description: "",
//   folderId: "",
//   imageFile: null,
//   imageUrl: "",
//   imageType: "upload", // "upload" | "url"
//   preview: null,
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "SET_IMAGE_TYPE":
//       return { ...state, imageType: action.value };
//     case "SET_FILE":
//       return {
//         ...state,
//         imageFile: action.value,
//         preview: action.preview,
//         imageUrl: "",
//       };
//     case "SET_URL":
//       return {
//         ...state,
//         imageUrl: action.value,
//         preview: action.value,
//         imageFile: null,
//       };
//     case "RESET_FORM":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// const AddCustomToolModal = ({
//   open,
//   onClose,
//   editData = null,
//   defaultFolderId = null,
// }) => {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { folders } = useSelector((state) => state.folders);
//   const [state, formDispatch] = useReducer(formReducer, initialState);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             toolname: editData.toolname || "",
//             toollink: editData.toollink || "",
//             description: editData.description || "",
//             folderId: editData.folderId?._id || "",
//             imageFile: null,
//             preview: editData.image?.url || null,
//             imageType: editData.image?.fileId ? "upload" : "url",
//           },
//         });
//       } else {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             folderId: defaultFolderId || "",
//           },
//         });

//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//     }
//   }, [editData, open]);

//   if (!open) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       formDispatch({
//         type: "SET_FILE",
//         value: file,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("type", "custom");
//     data.append("toolname", state.toolname);
//     data.append("toollink", state.toollink);
//     data.append("description", state.description);

//     // if (!editData && state.folderId) data.append("folderId", state.folderId);
//     if (state.folderId) data.append("folderId", state.folderId);

//     if (state.imageType === "upload" && state.imageFile) {
//       data.append("image", state.imageFile);
//     } else if (state.imageType === "url" && state.imageUrl) {
//       data.append("imageUrl", state.imageUrl);
//     }

//     const action = editData
//       ? updateCustomTool({ id: editData._id, formData: data })
//       : saveTool(data);

//     dispatch(action).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
//         onClose();
//       } else {
//         showToast(res.payload || "Execution failed ❌", "error");
//       }
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-md rounded-3xl p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]"
//       >
//         <div className="flex justify-between items-center border-b border-[#2a2d3a] pb-4">
//           <h2 className="text-2xl font-bold text-white">
//             {editData ? "Edit Tool" : "Add Custom Tool"}
//           </h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="text-gray-500 hover:text-white"
//           >
//             ✕
//           </button>
//         </div>

//         {/* --- Image Type Toggle --- */}
//         <div className="flex bg-[#13151a] p-1 rounded-xl border border-[#2a2d3a]">
//           <button
//             type="button"
//             className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
//               state.imageType === "upload"
//                 ? "bg-[#286FF0] text-white"
//                 : "text-gray-500 hover:text-gray-300"
//             }`}
//             onClick={() =>
//               formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })
//             }
//           >
//             Upload File
//           </button>
//           <button
//             type="button"
//             className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
//               state.imageType === "url"
//                 ? "bg-[#286FF0] text-white"
//                 : "text-gray-500 hover:text-gray-300"
//             }`}
//             onClick={() =>
//               formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })
//             }
//           >
//             Image Link
//           </button>
//         </div>

//         {/* --- Dynamic Image Input --- */}
//         {state.imageType === "upload" ? (
//           <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#2a2d3a] rounded-2xl p-4 bg-[#13151a] hover:border-[#286FF0] transition-colors relative group">
//             {state.preview ? (
//               <img
//                 src={state.preview}
//                 alt="preview"
//                 className="w-20 h-20 object-contain rounded-lg mb-2"
//               />
//             ) : (
//               <div className="text-3xl mb-2">🖼️</div>
//             )}
//             <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">
//               {state.imageFile ? state.imageFile.name : "Select Tool Icon"}
//             </p>
//             <input
//               type="file"
//               ref={fileInputRef}
//               accept="image/*"
//               onChange={handleFileChange}
//               className="absolute inset-0 opacity-0 cursor-pointer"
//             />
//           </div>
//         ) : (
//           <div className="space-y-3">
//             <input
//               type="url"
//               placeholder="Paste Image URL (https://...)"
//               className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white text-sm outline-none focus:border-[#286FF0] transition-all"
//               value={state.imageUrl}
//               onChange={(e) =>
//                 formDispatch({ type: "SET_URL", value: e.target.value })
//               }
//             />
//             {state.preview && (
//               <div className="flex justify-center">
//                 <img
//                   src={state.preview}
//                   alt="URL preview"
//                   className="w-20 h-20 object-contain rounded-lg border border-[#2a2d3a]"
//                   onError={(e) => (e.target.style.display = "none")}
//                 />
//               </div>
//             )}
//           </div>
//         )}

//         {/* --- Other Fields --- */}
//         <div className="space-y-4">
//           <input
//             name="toolname"
//             type="text"
//             placeholder="Friendly Name (e.g. My Portfolio)"
//             required
//             className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0] transition-all"
//             value={state.toolname}
//             onChange={handleInputChange}
//           />

//           <input
//             name="toollink"
//             type="url"
//             placeholder="https://..."
//             required
//             className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0] transition-all"
//             value={state.toollink}
//             onChange={handleInputChange}
//           />

//           <textarea
//             name="description"
//             placeholder="What does this tool do?"
//             required
//             className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none h-28 focus:border-[#286FF0] transition-all resize-none"
//             value={state.description}
//             onChange={handleInputChange}
//           />

//          {!editData && !defaultFolderId && (
//             <div className="space-y-1.5">
//               <label className="text-[10px] text-gray-500 uppercase font-bold pl-1">
//                 Organize in Folder
//               </label>
//               <select
//                 name="folderId"
//                 value={state.folderId}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#13151a] border border-[#2a2d3a] p-3.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
//               >
//                 <option value="">Default / General</option>
//                 {folders
//                   .filter((f) => f.type === "custom")
//                   .map((f) => (
//                     <option key={f._id} value={f._id}>
//                       {f.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}
//         </div>

//         <div className="flex gap-4 pt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3.5 text-gray-400 font-bold hover:text-white transition-colors"
//           >
//             Discard
//           </button>
//           <button
//             type="submit"
//             className="flex-[2] bg-[#286FF0] text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95"
//           >
//             {editData ? "Update Tool" : "Save Collection Tool"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCustomToolModal;




// // // v2
// import React, { useReducer, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveTool, updateCustomTool } from "../../features/savedTools/savedToolSlice";
// import { getFolders } from "../../features/folders/folderSlice";
// import { useToast } from "../../context/ToastContext";
// import { X, Upload, Link as LinkIcon, Folder, Image as ImageIcon, Sparkles, ChevronDown, Search, FolderPlus } from "lucide-react";

// const initialState = {
//   toolname: "",
//   toollink: "",
//   description: "",
//   folderId: "",
//   imageFile: null,
//   imageUrl: "",
//   imageType: "upload", // "upload" | "url"
//   preview: null,
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "SET_IMAGE_TYPE":
//       return { ...state, imageType: action.value };
//     case "SET_FILE":
//       return {
//         ...state,
//         imageFile: action.value,
//         preview: action.preview,
//         imageUrl: "",
//       };
//     case "SET_URL":
//       return {
//         ...state,
//         imageUrl: action.value,
//         preview: action.value,
//         imageFile: null,
//       };
//     case "RESET_FORM":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// const AddCustomToolModal = ({
//   open,
//   onClose,
//   editData = null,
//   defaultFolderId = null,
// }) => {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { folders } = useSelector((state) => state.folders);
//   const [state, formDispatch] = useReducer(formReducer, initialState);

//   // 🎛️ SEARCHABLE DROPDOWN & INLINE CREATION LOCAL STATES
//   const [isFolderOpen, setIsFolderOpen] = useState(false);
//   const [folderSearch, setFolderSearch] = useState("");
//   const [newFolderName, setNewFolderName] = useState("");

//   const folderDropdownRef = useRef(null);
//   const folderInputRef = useRef(null);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             toolname: editData.toolname || "",
//             toollink: editData.toollink || "",
//             description: editData.description || "",
//             folderId: editData.folderId?._id || "",
//             imageFile: null,
//             preview: editData.image?.url || null,
//             imageType: editData.image?.fileId ? "upload" : "url",
//           },
//         });
//       } else {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             folderId: defaultFolderId || "",
//           },
//         });

//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
      
//       // Clean drawer interaction properties upon initialization
//       setFolderSearch("");
//       setNewFolderName("");
//       setIsFolderOpen(false);
//     }
//   }, [editData, open, defaultFolderId]);

//   // Click outside detector hook
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
//         setIsFolderOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle lazy search focus immediately on toggle click tracking
//   useEffect(() => {
//     if (isFolderOpen && folderInputRef.current) {
//       setTimeout(() => folderInputRef.current?.focus(), 80);
//     }
//   }, [isFolderOpen]);

//   if (!open) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       formDispatch({
//         type: "SET_FILE",
//         value: file,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("type", "custom");
//     data.append("toolname", state.toolname);
//     data.append("toollink", state.toollink);
//     data.append("description", state.description);

//     if (state.folderId) data.append("folderId", state.folderId);
//     if (newFolderName.trim()) data.append("newFolderName", newFolderName.trim());

//     if (state.imageType === "upload" && state.imageFile) {
//       data.append("image", state.imageFile);
//     } else if (state.imageType === "url" && state.imageUrl) {
//       data.append("imageUrl", state.imageUrl);
//     }

//     const action = editData
//       ? updateCustomTool({ id: editData._id, formData: data })
//       : saveTool(data);

//     dispatch(action).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
        
//         // Refresh directories if a new folder was generated inline
//         if (newFolderName.trim()) {
//           dispatch(getFolders());
//         }
        
//         onClose();
//       } else {
//         showToast(res.payload || "Execution failed ❌", "error");
//       }
//     });
//   };

//   // Derived filter calculations for user tracking folders
//   const filteredFolders = folders
//     .filter((f) => f.type === "custom")
//     .filter((f) => f.name?.toLowerCase().includes(folderSearch.toLowerCase()));

//   const selectedFolderObj = folders.find((f) => f._id === state.folderId);
  
//   let selectedFolderName = "Default / General";
//   if (newFolderName.trim()) {
//     selectedFolderName = `New Folder: ${newFolderName}`;
//   } else if (selectedFolderObj) {
//     selectedFolderName = selectedFolderObj.name;
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-md rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-premium select-none animate-modal-in pb-24 md:pb-8"
//       >
//         {/* Subtle Ambient Background Mesh Accent Flare */}
//         <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 opacity-100 pointer-events-none blur-2xl" />

//         {/* ─── HEADER ROW CONTEXT ─── */}
//         <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900/80 pb-4 relative z-10">
//           <div className="space-y-0.5">
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               {editData ? "Edit Tool Asset" : "Add Custom Tool"}
//             </h2>
//             <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
//               Configure parameters for your workspace node
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800/60 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* ─── IMAGE MULTI-SOURCE TOGGLE SELECTOR ─── */}
//         <div className="space-y-2 relative z-10">
//           <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//             Icon Asset Source
//           </label>
//           <div className="flex p-1 bg-slate-100 dark:bg-[#141722] rounded-xl border border-gray-200/50 dark:border-slate-800/60">
//             <button
//               type="button"
//               className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                 state.imageType === "upload"
//                   ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/10"
//                   : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//               }`}
//               onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })}
//             >
//               <Upload size={13} />
//               Upload File
//             </button>
//             <button
//               type="button"
//               className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                 state.imageType === "url"
//                   ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/10"
//                   : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//               }`}
//               onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })}
//             >
//               <LinkIcon size={13} />
//               Image URL
//             </button>
//           </div>
//         </div>

//         {/* ─── IMAGE INPUT PANELS DYNAMIC DISPLAY ─── */}
//         <div className="relative z-10">
//           {state.imageType === "upload" ? (
//             <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800/80 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#141722]/30 hover:border-[#3981FA] dark:hover:border-[#3981FA] transition-colors relative group min-h-[120px]">
//               {state.preview ? (
//                 <div className="relative w-16 h-16 mb-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-inner">
//                   <img src={state.preview} alt="preview" className="w-full h-full object-contain rounded-lg" />
//                 </div>
//               ) : (
//                 <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10">
//                   <ImageIcon size={18} />
//                 </div>
//               )}
//               <p className="text-gray-900 dark:text-slate-300 text-xs font-semibold text-center max-w-[240px] truncate px-2">
//                 {state.imageFile ? state.imageFile.name : "Select Tool Icon"}
//               </p>
//               <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
//                 {state.imageFile ? "Click to replace file" : "Supports PNG, JPG, or SVG"}
//               </p>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer z-20"
//               />
//             </div>
//           ) : (
//             <div className="space-y-3">
//               <div className="relative flex items-center group">
//                 <LinkIcon size={14} className="absolute left-4 text-slate-400 group-focus-within:text-[#3981FA] transition-colors duration-200" />
//                 <input
//                   type="url"
//                   placeholder="Paste Image URL (https://...)"
//                   value={state.imageUrl}
//                   onChange={(e) => formDispatch({ type: "SET_URL", value: e.target.value })}
//                   className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//                 />
//               </div>
//               {state.preview && (
//                 <div className="flex justify-center">
//                   <div className="w-16 h-16 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-md">
//                     <img
//                       src={state.preview}
//                       alt="URL preview"
//                       className="w-full h-full object-contain rounded-lg"
//                       onError={(e) => { e.target.style.display = "none"; }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ─── TEXT METADATA VALUE DECK INPUTS ─── */}
//         <div className="space-y-4 relative z-10">
//           <div className="space-y-1.5">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//               Tool Name
//             </label>
//             <input
//               name="toolname"
//               type="text"
//               placeholder="Friendly Name (e.g. My Portfolio)"
//               required
//               value={state.toolname}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//               Redirect Endpoint
//             </label>
//             <input
//               name="toollink"
//               type="url"
//               placeholder="https://..."
//               required
//               value={state.toollink}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//             />
//           </div>

//           <div className="space-y-1.5">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="What does this tool do?"
//               required
//               value={state.description}
//               onChange={handleInputChange}
//               className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none h-24 focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all resize-none scrollbar-premium"
//             />
//           </div>

//           {/* ─── PREMIUM SEARCHABLE REPOSITORY FOLDER DROPDOWN WITH INLINE CREATOR ─── */}
//           {!editData && !defaultFolderId && (
//             <div className="space-y-1.5 relative z-[99]" ref={folderDropdownRef}>
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//                 Organize in Folder
//               </label>
              
//               <button
//                 type="button"
//                 onClick={() => setIsFolderOpen(!isFolderOpen)}
//                 className={`w-full px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-medium transition-all ${
//                   isFolderOpen || state.folderId || newFolderName.trim()
//                     ? "bg-white dark:bg-[#141722]/60 border-[#3981FA] text-gray-900 dark:text-white"
//                     : "bg-slate-50 dark:bg-[#141722]/40 border-gray-200 dark:border-slate-800/80 text-slate-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-slate-700"
//                 }`}
//               >
//                 <div className="flex items-center gap-2.5 truncate">
//                   <Folder size={14} className={state.folderId || newFolderName.trim() ? "text-[#3981FA]" : "text-slate-400"} />
//                   <span className="truncate capitalize font-semibold">{selectedFolderName}</span>
//                 </div>
//                 <ChevronDown
//                   size={14}
//                   className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isFolderOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {isFolderOpen && (
//                 <div className="absolute left-0 right-0 z-[100] bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:mt-2 bg-[#CDDAF6] dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl animate-in">
                  
//                   {/* SEARCH DECK INPUT */}
//                   <div className="p-2 border-b border-slate-300/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/40">
//                     <div className="relative flex items-center">
//                       <Search size={12} className="absolute left-3 text-slate-500 dark:text-slate-400" />
//                       <input
//                         ref={folderInputRef}
//                         type="text"
//                         placeholder="Search folders..."
//                         value={folderSearch}
//                         onChange={(e) => setFolderSearch(e.target.value)}
//                         className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141722] border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
//                       />
//                     </div>
//                   </div>

//                   {/* FOLDERS LIST TRACK */}
//                   <div className="max-h-40 overflow-y-auto scrollbar-premium bg-white dark:bg-[#0c0e14]">
//                     <button
//                       type="button"
//                       onClick={() => {
//                         formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                         setNewFolderName("");
//                         setIsFolderOpen(false);
//                         setFolderSearch("");
//                       }}
//                       className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white transition-colors border-b border-slate-100 dark:border-slate-900/40 ${
//                         !state.folderId && !newFolderName.trim() ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-500 dark:text-slate-400"
//                       }`}
//                     >
//                       <span>🌐</span>
//                       <span>Default / General</span>
//                     </button>

//                     {filteredFolders.map((folder) => {
//                       const isSelected = state.folderId === folder._id && !newFolderName.trim();
//                       return (
//                         <button
//                           key={folder._id}
//                           type="button"
//                           onClick={() => {
//                             formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: folder._id });
//                             setNewFolderName("");
//                             setIsFolderOpen(false);
//                             setFolderSearch("");
//                           }}
//                           className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
//                             isSelected ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-700 dark:text-slate-300"
//                           }`}
//                         >
//                           <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
//                             {folder.name[0]}
//                           </div>
//                           <span className="truncate flex-grow">{folder.name}</span>
//                           {isSelected && (
//                             <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">Active</span>
//                           )}
//                         </button>
//                       );
//                     })}

//                     {filteredFolders.length === 0 && (
//                       <div className="p-4 text-center text-xs text-slate-400 dark:text-gray-600 font-medium italic">
//                         No custom folders found
//                       </div>
//                     )}
//                   </div>

//                   {/* ➕ INLINE NEW FOLDER GENERATOR CREATOR SYSTEM FOOTER */}
//                   <div className="p-2 bg-slate-50 dark:bg-[#13151a]/60 border-t border-slate-200 dark:border-slate-800/80 flex gap-2">
//                     <input
//                       type="text"
//                       placeholder="Or write new folder..."
//                       value={newFolderName}
//                       onChange={(e) => {
//                         setNewFolderName(e.target.value);
//                         formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                       }}
//                       className="flex-grow px-2.5 py-1.5 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#3981FA]"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setIsFolderOpen(false)}
//                       disabled={!newFolderName.trim()}
//                       className="bg-[#3981FA] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold disabled:opacity-40 transition-all flex items-center gap-1 active:scale-[0.96]"
//                     >
//                       <FolderPlus size={12} />
//                       Lock
//                     </button>
//                   </div>

//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* ─── ACTION CONTROL CONTROLS FOOTER ─── */}
//         <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-900 relative z-10 bg-white dark:bg-[#0c0e14]">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
//           >
//             Discard
//           </button>
//           <button
//             type="submit"
//             className="flex-[2] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
//           >
//             <Sparkles size={13} />
//             <span>{editData ? "Update Tool Node" : "Save Collection Tool"}</span>
//           </button>
//         </div>
//       </form>

//       {/* Stylesheet panel rules */}
//       <style>{`
//         .scrollbar-premium::-webkit-scrollbar { width: 4px; height: 4px; }
//         .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.15); border-radius: 10px; }
//         @keyframes modalInSpring {
//           from { opacity: 0; transform: scale(0.97) translateY(8px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-modal-in { animation: modalInSpring 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default AddCustomToolModal;





// // v3
// import React, { useReducer, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveTool, updateCustomTool } from "../../features/savedTools/savedToolSlice";
// import { getFolders } from "../../features/folders/folderSlice";
// import { useToast } from "../../context/ToastContext";
// import { X, Upload, Link as LinkIcon, Folder, Image as ImageIcon, Sparkles, ChevronDown, Search, FolderPlus } from "lucide-react";

// const initialState = {
//   toolname: "",
//   toollink: "",
//   description: "",
//   folderId: "",
//   imageFile: null,
//   imageUrl: "",
//   imageType: "upload",
//   preview: null,
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "SET_IMAGE_TYPE":
//       return { ...state, imageType: action.value };
//     case "SET_FILE":
//       return {
//         ...state,
//         imageFile: action.value,
//         preview: action.preview,
//         imageUrl: "",
//       };
//     case "SET_URL":
//       return {
//         ...state,
//         imageUrl: action.value,
//         preview: action.value,
//         imageFile: null,
//       };
//     case "RESET_FORM":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// const AddCustomToolModal = ({
//   open,
//   onClose,
//   editData = null,
//   defaultFolderId = null,
// }) => {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { folders } = useSelector((state) => state.folders);
//   const [state, formDispatch] = useReducer(formReducer, initialState);

//   const [isFolderOpen, setIsFolderOpen] = useState(false);
//   const [folderSearch, setFolderSearch] = useState("");
//   const [newFolderName, setNewFolderName] = useState("");

//   const folderDropdownRef = useRef(null);
//   const folderInputRef = useRef(null);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             toolname: editData.toolname || "",
//             toollink: editData.toollink || "",
//             description: editData.description || "",
//             folderId: editData.folderId?._id || "",
//             imageFile: null,
//             preview: editData.image?.url || null,
//             imageType: editData.image?.fileId ? "upload" : "url",
//           },
//         });
//       } else {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             folderId: defaultFolderId || "",
//           },
//         });
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//       setFolderSearch("");
//       setNewFolderName("");
//       setIsFolderOpen(false);
//     }
//   }, [editData, open, defaultFolderId]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
//         setIsFolderOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isFolderOpen && folderInputRef.current) {
//       setTimeout(() => folderInputRef.current?.focus(), 80);
//     }
//   }, [isFolderOpen]);

//   if (!open) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       formDispatch({
//         type: "SET_FILE",
//         value: file,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("type", "custom");
//     data.append("toolname", state.toolname);
//     data.append("toollink", state.toollink);
//     data.append("description", state.description);

//     if (state.folderId) data.append("folderId", state.folderId);
//     if (newFolderName.trim()) data.append("newFolderName", newFolderName.trim());

//     if (state.imageType === "upload" && state.imageFile) {
//       data.append("image", state.imageFile);
//     } else if (state.imageType === "url" && state.imageUrl) {
//       data.append("imageUrl", state.imageUrl);
//     }

//     const action = editData
//       ? updateCustomTool({ id: editData._id, formData: data })
//       : saveTool(data);

//     dispatch(action).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
//         if (newFolderName.trim()) {
//           dispatch(getFolders());
//         }
//         onClose();
//       } else {
//         showToast(res.payload || "Execution failed ❌", "error");
//       }
//     });
//   };

//   const filteredFolders = folders
//     .filter((f) => f.type === "custom")
//     .filter((f) => f.name?.toLowerCase().includes(folderSearch.toLowerCase()));

//   const selectedFolderObj = folders.find((f) => f._id === state.folderId);
  
//   let selectedFolderName = "Default / General";
//   if (newFolderName.trim()) {
//     selectedFolderName = `New Folder: ${newFolderName}`;
//   } else if (selectedFolderObj) {
//     selectedFolderName = selectedFolderObj.name;
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-md rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-premium animate-modal-in"
//       >
//         {/* Spacing wrapper for consistent padding */}
//         <div className="p-5 md:p-7 space-y-5">
//           {/* Background flare */}
//           <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 opacity-100 pointer-events-none blur-2xl" />

//           {/* Header */}
//           <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900/80 pb-3 relative z-10">
//             <div className="space-y-0.5">
//               <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//                 {editData ? "Edit Tool Asset" : "Add Custom Tool"}
//               </h2>
//               <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
//                 Configure parameters for your workspace node
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800/60 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
//             >
//               <X size={16} />
//             </button>
//           </div>

//           {/* Image source toggle */}
//           <div className="space-y-2 relative z-10">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//               Icon Asset Source
//             </label>
//             <div className="flex p-1 bg-slate-100 dark:bg-[#141722] rounded-xl border border-gray-200/50 dark:border-slate-800/60">
//               <button
//                 type="button"
//                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "upload"
//                     ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/10"
//                     : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })}
//               >
//                 <Upload size={13} />
//                 Upload File
//               </button>
//               <button
//                 type="button"
//                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "url"
//                     ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/10"
//                     : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })}
//               >
//                 <LinkIcon size={13} />
//                 Image URL
//               </button>
//             </div>
//           </div>

//           {/* Image input panel */}
//           <div className="relative z-10">
//             {state.imageType === "upload" ? (
//               <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-slate-800/80 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#141722]/30 hover:border-[#3981FA] dark:hover:border-[#3981FA] transition-colors relative group min-h-[120px]">
//                 {state.preview ? (
//                   <div className="relative w-16 h-16 mb-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-inner">
//                     <img src={state.preview} alt="preview" className="w-full h-full object-contain rounded-lg" />
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10">
//                     <ImageIcon size={18} />
//                   </div>
//                 )}
//                 <p className="text-gray-900 dark:text-slate-300 text-xs font-semibold text-center max-w-[240px] truncate px-2">
//                   {state.imageFile ? state.imageFile.name : "Select Tool Icon"}
//                 </p>
//                 <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
//                   {state.imageFile ? "Click to replace file" : "Supports PNG, JPG, or SVG"}
//                 </p>
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer z-20"
//                 />
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="relative flex items-center group">
//                   <LinkIcon size={14} className="absolute left-4 text-slate-400 group-focus-within:text-[#3981FA] transition-colors duration-200" />
//                   <input
//                     type="url"
//                     placeholder="Paste Image URL (https://...)"
//                     value={state.imageUrl}
//                     onChange={(e) => formDispatch({ type: "SET_URL", value: e.target.value })}
//                     className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//                   />
//                 </div>
//                 {state.preview && (
//                   <div className="flex justify-center">
//                     <div className="w-16 h-16 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-md">
//                       <img
//                         src={state.preview}
//                         alt="URL preview"
//                         className="w-full h-full object-contain rounded-lg"
//                         onError={(e) => { e.target.style.display = "none"; }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Text fields */}
//           <div className="space-y-4 relative z-10">
//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//                 Tool Name
//               </label>
//               <input
//                 name="toolname"
//                 type="text"
//                 placeholder="Friendly Name (e.g. My Portfolio)"
//                 required
//                 value={state.toolname}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//                 Redirect Endpoint
//               </label>
//               <input
//                 name="toollink"
//                 type="url"
//                 placeholder="https://..."
//                 required
//                 value={state.toollink}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 placeholder="What does this tool do?"
//                 required
//                 value={state.description}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none h-24 focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all resize-none scrollbar-premium"
//               />
//             </div>

//             {/* Folder dropdown - responsive positioning */}
//             {!editData && !defaultFolderId && (
//               <div className="space-y-1.5 relative z-[99]" ref={folderDropdownRef}>
//                 <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1">
//                   Organize in Folder
//                 </label>
                
//                 <button
//                   type="button"
//                   onClick={() => setIsFolderOpen(!isFolderOpen)}
//                   className={`w-full px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-medium transition-all ${
//                     isFolderOpen || state.folderId || newFolderName.trim()
//                       ? "bg-white dark:bg-[#141722]/60 border-[#3981FA] text-gray-900 dark:text-white"
//                       : "bg-slate-50 dark:bg-[#141722]/40 border-gray-200 dark:border-slate-800/80 text-slate-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-slate-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5 truncate">
//                     <Folder size={14} className={state.folderId || newFolderName.trim() ? "text-[#3981FA]" : "text-slate-400"} />
//                     <span className="truncate capitalize font-semibold">{selectedFolderName}</span>
//                   </div>
//                   <ChevronDown
//                     size={14}
//                     className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isFolderOpen ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 {isFolderOpen && (
//                   <div className="absolute left-0 right-0 z-[100] top-full mt-2 bg-[#CDDAF6] dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl animate-in">
//                     {/* Search */}
//                     <div className="p-2 border-b border-slate-300/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/40">
//                       <div className="relative flex items-center">
//                         <Search size={12} className="absolute left-3 text-slate-500 dark:text-slate-400" />
//                         <input
//                           ref={folderInputRef}
//                           type="text"
//                           placeholder="Search folders..."
//                           value={folderSearch}
//                           onChange={(e) => setFolderSearch(e.target.value)}
//                           className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141722] border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
//                         />
//                       </div>
//                     </div>

//                     {/* Folders list */}
//                     <div className="max-h-40 overflow-y-auto scrollbar-premium bg-white dark:bg-[#0c0e14]">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                           setNewFolderName("");
//                           setIsFolderOpen(false);
//                           setFolderSearch("");
//                         }}
//                         className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white transition-colors border-b border-slate-100 dark:border-slate-900/40 ${
//                           !state.folderId && !newFolderName.trim() ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-500 dark:text-slate-400"
//                         }`}
//                       >
//                         <span>🌐</span>
//                         <span>Default / General</span>
//                       </button>

//                       {filteredFolders.map((folder) => {
//                         const isSelected = state.folderId === folder._id && !newFolderName.trim();
//                         return (
//                           <button
//                             key={folder._id}
//                             type="button"
//                             onClick={() => {
//                               formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: folder._id });
//                               setNewFolderName("");
//                               setIsFolderOpen(false);
//                               setFolderSearch("");
//                             }}
//                             className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
//                               isSelected ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-700 dark:text-slate-300"
//                             }`}
//                           >
//                             <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
//                               {folder.name[0]}
//                             </div>
//                             <span className="truncate flex-grow">{folder.name}</span>
//                             {isSelected && (
//                               <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">Active</span>
//                             )}
//                           </button>
//                         );
//                       })}

//                       {filteredFolders.length === 0 && (
//                         <div className="p-4 text-center text-xs text-slate-400 dark:text-gray-600 font-medium italic">
//                           No custom folders found
//                         </div>
//                       )}
//                     </div>

//                     {/* Inline folder creator */}
//                     <div className="p-2 bg-slate-50 dark:bg-[#13151a]/60 border-t border-slate-200 dark:border-slate-800/80 flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Or write new folder..."
//                         value={newFolderName}
//                         onChange={(e) => {
//                           setNewFolderName(e.target.value);
//                           formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                         }}
//                         className="flex-grow px-2.5 py-1.5 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#3981FA]"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setIsFolderOpen(false)}
//                         disabled={!newFolderName.trim()}
//                         className="bg-[#3981FA] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold disabled:opacity-40 transition-all flex items-center gap-1 active:scale-[0.96]"
//                       >
//                         <FolderPlus size={12} />
//                         Lock
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Action buttons */}
//           <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-900 relative z-10 bg-white dark:bg-[#0c0e14]">
//             <button
//               type="button"
//               onClick={onClose}
//               className="w-full sm:w-auto flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
//             >
//               Discard
//             </button>
//             <button
//               type="submit"
//               className="w-full sm:w-auto flex-[2] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
//             >
//               <Sparkles size={13} />
//               <span>{editData ? "Update Tool Node" : "Save Collection Tool"}</span>
//             </button>
//           </div>
//         </div>
//       </form>

//       <style>{`
//         .scrollbar-premium::-webkit-scrollbar { width: 4px; height: 4px; }
//         .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.15); border-radius: 10px; }
//         @keyframes modalInSpring {
//           from { opacity: 0; transform: scale(0.97) translateY(8px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-modal-in { animation: modalInSpring 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default AddCustomToolModal;

// // v4
// import React, { useReducer, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveTool, updateCustomTool } from "../../features/savedTools/savedToolSlice";
// import { getFolders } from "../../features/folders/folderSlice";
// import { useToast } from "../../context/ToastContext";
// import { X, Upload, Link as LinkIcon, Folder, Image as ImageIcon, Sparkles, ChevronDown, Search, FolderPlus } from "lucide-react";

// const initialState = {
//   toolname: "", toollink: "", description: "", folderId: "",
//   imageFile: null, imageUrl: "", imageType: "upload", preview: null,
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD": return { ...state, [action.field]: action.value };
//     case "SET_IMAGE_TYPE": return { ...state, imageType: action.value };
//     case "SET_FILE": return { ...state, imageFile: action.value, preview: action.preview, imageUrl: "" };
//     case "SET_URL": return { ...state, imageUrl: action.value, preview: action.value, imageFile: null };
//     case "RESET_FORM": return { ...initialState, ...action.payload };
//     default: return state;
//   }
// };

// const AddCustomToolModal = ({
//   open,
//   onClose,
//   editData = null,
//   defaultFolderId = null,
// }) => {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { folders } = useSelector((state) => state.folders);
//   const [state, formDispatch] = useReducer(formReducer, initialState);

//   const [isFolderOpen, setIsFolderOpen] = useState(false);
//   const [folderSearch, setFolderSearch] = useState("");
//   const [newFolderName, setNewFolderName] = useState("");

//   const folderDropdownRef = useRef(null);
//   const folderInputRef = useRef(null);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             toolname: editData.toolname || "",
//             toollink: editData.toollink || "",
//             description: editData.description || "",
//             folderId: editData.folderId?._id || "",
//             imageFile: null,
//             preview: editData.image?.url || null,
//             imageType: editData.image?.fileId ? "upload" : "url",
//           },
//         });
//       } else {
//         formDispatch({ type: "RESET_FORM", payload: { folderId: defaultFolderId || "" } });
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//       setFolderSearch("");
//       setNewFolderName("");
//       setIsFolderOpen(false);
//     }
//   }, [editData, open, defaultFolderId]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
//         setIsFolderOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isFolderOpen && folderInputRef.current) {
//       setTimeout(() => folderInputRef.current?.focus(), 80);
//     }
//   }, [isFolderOpen]);

//   if (!open) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       formDispatch({ type: "SET_FILE", value: file, preview: URL.createObjectURL(file) });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("type", "custom");
//     data.append("toolname", state.toolname);
//     data.append("toollink", state.toollink);
//     data.append("description", state.description);
//     if (state.folderId) data.append("folderId", state.folderId);
//     if (newFolderName.trim()) data.append("newFolderName", newFolderName.trim());

//     if (state.imageType === "upload" && state.imageFile) {
//       data.append("image", state.imageFile);
//     } else if (state.imageType === "url" && state.imageUrl) {
//       data.append("imageUrl", state.imageUrl);
//     }

//     const action = editData
//       ? updateCustomTool({ id: editData._id, formData: data })
//       : saveTool(data);

//     dispatch(action).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
//         if (newFolderName.trim()) dispatch(getFolders());
//         onClose();
//       } else {
//         showToast(res.payload || "Execution failed ❌", "error");
//       }
//     });
//   };

//   const filteredFolders = folders
//     .filter((f) => f.type === "custom")
//     .filter((f) => f.name?.toLowerCase().includes(folderSearch.toLowerCase()));

//   const selectedFolderObj = folders.find((f) => f._id === state.folderId);
//   let selectedFolderName = "Default / General";
//   if (newFolderName.trim()) selectedFolderName = `New: ${newFolderName}`;
//   else if (selectedFolderObj) selectedFolderName = selectedFolderObj.name;

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-[420px] rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col animate-modal-in"
//       >
//         {/* Ambient Glow */}
//         <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-[#3981FA]/5 blur-3xl pointer-events-none" />

//         {/* Header */}
//         <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-900 flex justify-between items-center bg-[#0f1117]/80 backdrop-blur-sm">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tighter text-gray-900 dark:text-white">
//               {editData ? "Edit Tool" : "Add Custom Tool"}
//             </h2>
//             <p className="text-xs text-slate-400 dark:text-gray-500">Fill the details below</p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-premium">
//           {/* Image Source Toggle */}
//           <div className="space-y-2">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">ICON SOURCE</label>
//             <div className="flex p-1 bg-slate-100 dark:bg-[#141722] rounded-2xl border border-gray-200/50 dark:border-slate-800/60">
//               <button
//                 type="button"
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })}
//                 className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "upload" ? "bg-[#3981FA] text-white shadow" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//               >
//                 <Upload size={16} /> Upload
//               </button>
//               <button
//                 type="button"
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })}
//                 className={`flex-1 py-3 text-sm font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "url" ? "bg-[#3981FA] text-white shadow" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//               >
//                 <LinkIcon size={16} /> URL
//               </button>
//             </div>
//           </div>

//           {/* Image Preview Area */}
//           <div>
//             {state.imageType === "upload" ? (
//               <div className="border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl p-8 text-center hover:border-[#3981FA] transition-all cursor-pointer relative"
//                    onClick={() => fileInputRef.current?.click()}>
//                 {state.preview ? (
//                   <img src={state.preview} alt="preview" className="mx-auto max-h-28 object-contain rounded-2xl" />
//                 ) : (
//                   <ImageIcon size={48} className="mx-auto text-slate-400" />
//                 )}
//                 <p className="mt-3 text-sm font-medium text-gray-700 dark:text-slate-300">
//                   {state.imageFile ? state.imageFile.name : "Click to upload icon"}
//                 </p>
//                 <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="relative">
//                   <LinkIcon size={18} className="absolute left-4 top-4 text-slate-400" />
//                   <input
//                     type="url"
//                     placeholder="https://example.com/image.png"
//                     value={state.imageUrl}
//                     onChange={(e) => formDispatch({ type: "SET_URL", value: e.target.value })}
//                     className="w-full pl-12 py-4 bg-slate-50 dark:bg-[#141722] border border-gray-200 dark:border-slate-800 rounded-2xl focus:border-[#3981FA] text-sm"
//                   />
//                 </div>
//                 {state.preview && <img src={state.preview} alt="preview" className="mx-auto h-24 rounded-2xl border border-gray-200 dark:border-slate-700" />}
//               </div>
//             )}
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-5">
//             <div>
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase mb-1.5">TOOL NAME</label>
//               <input
//                 name="toolname" required value={state.toolname} onChange={handleInputChange}
//                 className="w-full px-5 py-4 bg-slate-50 dark:bg-[#141722] border border-gray-200 dark:border-slate-800 rounded-2xl focus:border-[#3981FA] text-sm"
//                 placeholder="e.g. My Awesome Tool"
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase mb-1.5">LINK</label>
//               <input
//                 name="toollink" type="url" required value={state.toollink} onChange={handleInputChange}
//                 className="w-full px-5 py-4 bg-slate-50 dark:bg-[#141722] border border-gray-200 dark:border-slate-800 rounded-2xl focus:border-[#3981FA] text-sm"
//                 placeholder="https://"
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase mb-1.5">DESCRIPTION</label>
//               <textarea
//                 name="description" required value={state.description} onChange={handleInputChange}
//                 className="w-full px-5 py-4 bg-slate-50 dark:bg-[#141722] border border-gray-200 dark:border-slate-800 rounded-3xl focus:border-[#3981FA] h-28 resize-y text-sm"
//                 placeholder="What does this tool do?"
//               />
//             </div>

//             {/* Folder Selector - Fixed & Improved */}
//             {!editData && !defaultFolderId && (
//               <div className="relative" ref={folderDropdownRef}>
//                 <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase mb-1.5">ORGANIZE IN FOLDER</label>
                
//                 <button
//                   type="button"
//                   onClick={() => setIsFolderOpen(!isFolderOpen)}
//                   className={`w-full px-5 py-4 flex items-center justify-between rounded-2xl border text-left transition-all ${
//                     isFolderOpen || state.folderId || newFolderName
//                       ? "border-[#3981FA] bg-white dark:bg-[#141722]"
//                       : "border-gray-200 dark:border-slate-800 bg-slate-50 dark:bg-[#141722]"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 truncate">
//                     <Folder size={18} className="text-[#3981FA]" />
//                     <span className="font-medium truncate">{selectedFolderName}</span>
//                   </div>
//                   <ChevronDown size={18} className={`transition-transform ${isFolderOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 {isFolderOpen && (
//                   <div className="absolute z-[100] w-full mt-2 bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
//                     {/* Search */}
//                     <div className="p-3 border-b border-slate-100 dark:border-slate-800">
//                       <div className="relative">
//                         <Search size={16} className="absolute left-4 top-3.5 text-slate-400" />
//                         <input
//                           ref={folderInputRef}
//                           value={folderSearch}
//                           onChange={(e) => setFolderSearch(e.target.value)}
//                           placeholder="Search folders..."
//                           className="w-full pl-11 py-3 bg-slate-50 dark:bg-[#141722] border border-slate-200 dark:border-slate-700 rounded-2xl text-sm"
//                         />
//                       </div>
//                     </div>

//                     {/* Folder List */}
//                     <div className="max-h-56 overflow-y-auto scrollbar-premium">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                           setNewFolderName("");
//                           setIsFolderOpen(false);
//                         }}
//                         className="w-full px-5 py-3.5 text-left flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800"
//                       >
//                         <span className="text-xl">🌐</span>
//                         <span>Default / General</span>
//                       </button>

//                       {filteredFolders.map((folder) => (
//                         <button
//                           key={folder._id}
//                           type="button"
//                           onClick={() => {
//                             formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: folder._id });
//                             setNewFolderName("");
//                             setIsFolderOpen(false);
//                           }}
//                           className="w-full px-5 py-3.5 text-left flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 border-t border-slate-100 dark:border-slate-800"
//                         >
//                           <div className="w-6 h-6 rounded-lg bg-[#3981FA]/10 flex items-center justify-center text-xs font-bold text-[#3981FA]">
//                             {folder.name[0]}
//                           </div>
//                           <span className="truncate">{folder.name}</span>
//                         </button>
//                       ))}
//                     </div>

//                     {/* New Folder Input */}
//                     <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#13151a]">
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           placeholder="Or write new folder..."
//                           value={newFolderName}
//                           onChange={(e) => {
//                             setNewFolderName(e.target.value);
//                             formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                           }}
//                           className="flex-1 px-4 py-3 bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-700 rounded-2xl text-sm"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setIsFolderOpen(false)}
//                           disabled={!newFolderName.trim()}
//                           className="bg-[#3981FA] hover:bg-[#2770E6] disabled:opacity-50 px-5 rounded-2xl text-white text-sm font-medium flex items-center gap-1.5"
//                         >
//                           <FolderPlus size={16} /> Lock
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="p-6 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-[#0c0e14] flex gap-3">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-4 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
//           >
//             Discard
//           </button>
//           <button
//             type="submit"
//             className="flex-1 py-4 bg-[#3981FA] hover:bg-[#2770E6] text-white text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#3981FA]/20 transition-all active:scale-[0.97]"
//           >
//             <Sparkles size={18} />
//             {editData ? "Update Tool" : "Save Collection Tool"}
//           </button>
//         </div>

//         <style>{`
//           .scrollbar-premium::-webkit-scrollbar { width: 5px; }
//           .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.25); border-radius: 10px; }
//           @keyframes modalInSpring {
//             from { opacity: 0; transform: scale(0.96) translateY(20px); }
//             to { opacity: 1; transform: scale(1) translateY(0); }
//           }
//           .animate-modal-in { animation: modalInSpring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
//         `}</style>
//       </form>
//     </div>
//   );
// };

// export default AddCustomToolModal;







// // v5
// "use client";

// import React, { useReducer, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { saveTool, updateCustomTool } from "../../features/savedTools/savedToolSlice";
// import { getFolders } from "../../features/folders/folderSlice";
// import { useToast } from "../../context/ToastContext";
// import { X, Upload, Link as LinkIcon, Folder, Image as ImageIcon, Sparkles, ChevronDown, Search, FolderPlus, HelpCircle } from "lucide-react";

// const initialState = {
//   toolname: "",
//   toollink: "",
//   description: "",
//   folderId: "",
//   imageFile: null,
//   imageUrl: "",
//   imageType: "upload", // "upload" | "url"
//   preview: null,
// };

// const formReducer = (state, action) => {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.field]: action.value };
//     case "SET_IMAGE_TYPE":
//       return { ...state, imageType: action.value };
//     case "SET_FILE":
//       return {
//         ...state,
//         imageFile: action.value,
//         preview: action.preview,
//         imageUrl: "",
//       };
//     case "SET_URL":
//       return {
//         ...state,
//         imageUrl: action.value,
//         preview: action.value,
//         imageFile: null,
//       };
//     case "RESET_FORM":
//       return { ...initialState, ...action.payload };
//     default:
//       return state;
//   }
// };

// const AddCustomToolModal = ({
//   open,
//   onClose,
//   editData = null,
//   defaultFolderId = null,
// }) => {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const fileInputRef = useRef(null);
//   const { folders } = useSelector((state) => state.folders);
//   const [state, formDispatch] = useReducer(formReducer, initialState);

//   // 🎛️ CUSTOM Dropdown State Matrix
//   const [isFolderOpen, setIsFolderOpen] = useState(false);
//   const [folderSearch, setFolderSearch] = useState("");
//   const [newFolderName, setNewFolderName] = useState("");

//   const folderDropdownRef = useRef(null);
//   const folderInputRef = useRef(null);

//   useEffect(() => {
//     if (open) {
//       if (editData) {
//         formDispatch({
//           type: "RESET_FORM",
//           payload: {
//             toolname: editData.toolname || "",
//             toollink: editData.toollink || "",
//             description: editData.description || "",
//             folderId: editData.folderId?._id || "",
//             imageFile: null,
//             preview: editData.image?.url || null,
//             imageType: editData.image?.fileId ? "upload" : "url",
//           },
//         });
//       } else {
//         formDispatch({ type: "RESET_FORM", payload: { folderId: defaultFolderId || "" } });
//         if (fileInputRef.current) fileInputRef.current.value = "";
//       }
//       setFolderSearch("");
//       setNewFolderName("");
//       setIsFolderOpen(false);
//     }
//   }, [editData, open, defaultFolderId]);

//   // Click outside to dismiss selector overlay
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
//         setIsFolderOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Autofocus inside search frame on click events
//   useEffect(() => {
//     if (isFolderOpen && folderInputRef.current) {
//       setTimeout(() => folderInputRef.current?.focus(), 80);
//     }
//   }, [isFolderOpen]);

//   if (!open) return null;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     formDispatch({ type: "UPDATE_FIELD", field: name, value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       formDispatch({ type: "SET_FILE", value: file, preview: URL.createObjectURL(file) });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("type", "custom");
//     data.append("toolname", state.toolname);
//     data.append("toollink", state.toollink);
//     data.append("description", state.description);
    
//     if (state.folderId) data.append("folderId", state.folderId);
//     if (newFolderName.trim()) data.append("newFolderName", newFolderName.trim());

//     if (state.imageType === "upload" && state.imageFile) {
//       data.append("image", state.imageFile);
//     } else if (state.imageType === "url" && state.imageUrl) {
//       data.append("imageUrl", state.imageUrl);
//     }

//     const action = editData
//       ? updateCustomTool({ id: editData._id, formData: data })
//       : saveTool(data);

//     dispatch(action).then((res) => {
//       if (res.meta.requestStatus === "fulfilled") {
//         showToast(editData ? "Tool Updated! ✅" : "Tool Saved! 🚀", "success");
//         if (newFolderName.trim()) dispatch(getFolders());
//         onClose();
//       } else {
//         showToast(res.payload || "Execution failed ❌", "error");
//       }
//     });
//   };

//   const filteredFolders = folders
//     .filter((f) => f.type === "custom")
//     .filter((f) => f.name?.toLowerCase().includes(folderSearch.toLowerCase()));

//   const selectedFolderObj = folders.find((f) => f._id === state.folderId);
//   let selectedFolderName = "Default / General";
//   if (newFolderName.trim()) selectedFolderName = `New: ${newFolderName}`;
//   else if (selectedFolderObj) selectedFolderName = selectedFolderObj.name;

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-all duration-300">
//       <form
//         onSubmit={handleSubmit}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-[440px] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-modal-in select-none"
//       >
//         {/* Radical Ambient Tech Glow */}
//         <div className="absolute -top-12 -left-12 w-44 h-44 rounded-full bg-[#3981FA]/5 blur-3xl pointer-events-none" />

//         {/* ─── HEADER LAYER ─── */}
//         <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-900/80 flex justify-between items-center bg-slate-50/50 dark:bg-[#0f1117]/40 backdrop-blur-md relative z-10">
//           <div>
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               {editData ? "Edit Tool Parameters" : "Add Custom Tool Node"}
//             </h2>
//             <p className="text-[11px] font-medium text-slate-400 dark:text-gray-500">
//               Configure deployment and indexation variables
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* ─── SCROLLABLE CONTENT BODY ─── */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-premium relative z-10">
          
//           {/* Segmented Image Source Switcher */}
//           <div className="space-y-2">
//             <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
//               Icon Asset Source
//             </label>
//             <div className="flex p-1 bg-slate-100 dark:bg-[#141722] rounded-xl border border-gray-200/40 dark:border-slate-800/60">
//               <button
//                 type="button"
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })}
//                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "upload" 
//                     ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/15" 
//                     : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//               >
//                 <Upload size={13} /> Upload File
//               </button>
//               <button
//                 type="button"
//                 onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })}
//                 className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
//                   state.imageType === "url" 
//                     ? "bg-[#3981FA] text-white shadow-md shadow-[#3981FA]/15" 
//                     : "text-slate-400 dark:text-gray-500 hover:text-slate-700 dark:hover:text-slate-300"
//                 }`}
//               >
//                 <LinkIcon size={13} /> Resource URL
//               </button>
//             </div>
//           </div>

//           {/* Contextual Upload Blocks */}
//           <div>
//             {state.imageType === "upload" ? (
//               <div 
//                 onClick={() => fileInputRef.current?.click()}
//                 className="border-2 border-dashed border-gray-200 dark:border-slate-800/80 rounded-2xl p-6 text-center bg-slate-50/30 dark:bg-[#141722]/20 hover:border-[#3981FA] dark:hover:border-[#3981FA] transition-colors relative group cursor-pointer min-h-[130px] flex flex-col items-center justify-center"
//               >
//                 {state.preview ? (
//                   <div className="relative w-16 h-16 mb-2 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-inner">
//                     <img src={state.preview} alt="preview" className="max-w-full max-h-full object-contain rounded-lg" />
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10 group-hover:scale-105 transition-transform duration-200">
//                     <ImageIcon size={18} />
//                   </div>
//                 )}
//                 <p className="text-gray-900 dark:text-slate-200 text-xs font-semibold text-center max-w-[280px] truncate px-2">
//                   {state.imageFile ? state.imageFile.name : "Select Asset Graphics"}
//                 </p>
//                 <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
//                   {state.imageFile ? "Click here to shift asset file" : "Supports raw PNG, JPG or vector SVG files"}
//                 </p>
//                 <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 <div className="relative flex items-center group">
//                   <LinkIcon size={14} className="absolute left-4 text-slate-400 group-focus-within:text-[#3981FA] transition-colors" />
//                   <input
//                     type="url"
//                     placeholder="Paste resource endpoint image URL (https://...)"
//                     value={state.imageUrl}
//                     onChange={(e) => formDispatch({ type: "SET_URL", value: e.target.value })}
//                     className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//                   />
//                 </div>
//                 {state.preview && (
//                   <div className="flex justify-center">
//                     <div className="w-16 h-16 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-md animate-fade-in">
//                       <img
//                         src={state.preview}
//                         alt="URL preview"
//                         className="max-w-full max-h-full object-contain rounded-lg"
//                         onError={(e) => { e.target.style.display = "none"; }}
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Text Parameters Inputs Canvas */}
//           <div className="space-y-4">
//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">TOOL NAME</label>
//               <input
//                 name="toolname" type="text" required value={state.toolname} onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//                 placeholder="e.g. My Framework Hub"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">REDIRECT LINK</label>
//               <input
//                 name="toollink" type="url" required value={state.toollink} onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
//                 placeholder="https://example.com"
//               />
//             </div>

//             <div className="space-y-1.5">
//               <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">DESCRIPTION</label>
//               <textarea
//                 name="description" required value={state.description} onChange={handleInputChange}
//                 className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none h-24 focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all resize-none scrollbar-premium"
//                 placeholder="Brief summary explaining what this workspace asset deployment achieves..."
//               />
//             </div>

//             {/* ─── SEARCHABLE FOLDER REGISTRY SELECTOR (FIXED STACK CONTEXT) ─── */}
//             {!editData && !defaultFolderId && (
//               <div className="space-y-1.5 relative" ref={folderDropdownRef}>
//                 <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
//                   ORGANIZE IN FOLDER
//                 </label>
                
//                 <button
//                   type="button"
//                   onClick={() => setIsFolderOpen(!isFolderOpen)}
//                   className={`w-full px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-semibold transition-all ${
//                     isFolderOpen || state.folderId || newFolderName.trim()
//                       ? "bg-white dark:bg-[#141722]/60 border-[#3981FA] text-gray-900 dark:text-white"
//                       : "bg-slate-50 dark:bg-[#141722]/40 border-gray-200 dark:border-slate-800/80 text-slate-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-slate-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2.5 truncate">
//                     <Folder size={15} className={state.folderId || newFolderName.trim() ? "text-[#3981FA]" : "text-slate-400"} />
//                     <span className="truncate capitalize">{selectedFolderName}</span>
//                   </div>
//                   <ChevronDown
//                     size={14}
//                     className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isFolderOpen ? "rotate-180 text-slate-600 dark:text-slate-300" : ""}`}
//                   />
//                 </button>

//                 {/* Searchable Dropdown Drawer Context Overlay */}
//                 {isFolderOpen && (
//                   <div className="absolute left-0 right-0 z-[999] bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:mt-2 bg-[#CDDAF6] dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl animate-in shadow-black/40 mb-25 ">
                    
//                     {/* Search inside selector track */}
//                     <div className="p-2 border-b border-slate-300/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/40">
//                       <div className="relative flex items-center">
//                         <Search size={12} className="absolute left-3 text-slate-500 dark:text-slate-400" />
//                         <input
//                           ref={folderInputRef}
//                           type="text"
//                           placeholder="Search structural components..."
//                           value={folderSearch}
//                           onChange={(e) => setFolderSearch(e.target.value)}
//                           className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141722] border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
//                         />
//                       </div>
//                     </div>

//                     {/* Array Content Track List */}
//                     <div className="max-h-40 overflow-y-auto scrollbar-premium bg-white dark:bg-[#0c0e14]">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
//                           setNewFolderName("");
//                           setIsFolderOpen(false);
//                           setFolderSearch("");
//                         }}
//                         className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white transition-colors border-b border-slate-100 dark:border-slate-900/40 ${
//                           !state.folderId && !newFolderName.trim() ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-500 dark:text-slate-400"
//                         }`}
//                       >
//                         <span>🌐</span>
//                         <span>Default / General Workspace</span>
//                       </button>

//                       {filteredFolders.map((folder) => {
//                         const isSelected = state.folderId === folder._id && !newFolderName.trim();
//                         return (
//                           <button
//                             key={folder._id}
//                             type="button"
//                             onClick={() => {
//                               formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: folder._id });
//                               setNewFolderName("");
//                               setIsFolderOpen(false);
//                               setFolderSearch("");
//                             }}
//                             className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
//                               isSelected ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-700 dark:text-slate-300"
//                             }`}
//                           >
//                             <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
//                               {folder.name[0]}
//                             </div>
//                             <span className="truncate flex-grow">{folder.name}</span>
//                             {isSelected && (
//                               <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">Active</span>
//                             )}
//                           </button>
//                         );
//                       })}

//                       {filteredFolders.length === 0 && (
//                         <div className="p-5 text-center text-xs text-slate-400 dark:text-gray-600 font-medium italic">
//                           No matching active folders
//                         </div>
//                       )}
//                     </div>

//                     {/* Inline New Creation Input Form Component Anchor Track */}
//                     <div className="p-2 bg-slate-50 dark:bg-[#13151a]/60 border-t border-slate-200 dark:border-slate-800/80 flex gap-2 mb-1">
//                       <input
//                         type="text"
//                         placeholder="Or write new folder..."
//                         value={newFolderName}
//                         onChange={(e) => {
//                           setNewFolderName(e.target.value);
//                           formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" }); // Clear choice
//                         }}
//                         className="flex-grow px-2.5 py-1.5 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setIsFolderOpen(false)}
//                         disabled={!newFolderName.trim()}
//                         className="bg-[#3981FA] hover:bg-[#2770E6] disabled:bg-blue-800/30 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 active:scale-[0.96]"
//                       >
//                         <FolderPlus size={12} /> Lock
//                       </button>
//                     </div>

//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ─── FOOTER ACTIONS BUTTON LAYER ─── */}
//         <div className="p-6 border-t border-gray-100 dark:border-slate-900 bg-white dark:bg-[#0c0e14] flex gap-3 relative z-10">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-2xl transition-all active:scale-[0.98]"
//           >
//             Discard
//           </button>
//           <button
//             type="submit"
//             className="flex-[1.4] py-3.5 bg-[#3981FA] hover:bg-[#2770E6] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
//           >
//             <Sparkles size={15} />
//             <span>{editData ? "Update Asset Changes" : "Save Collection Tool"}</span>
//           </button>
//         </div>

//         <style>{`
//           .scrollbar-premium::-webkit-scrollbar { width: 4px; height: 4px; }
//           .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.15); border-radius: 10px; }
//           .scrollbar-premium::-webkit-scrollbar-thumb:hover { background: rgba(57, 129, 250, 0.3); }
//           @keyframes modalInSpring {
//             from { opacity: 0; transform: scale(0.97) translateY(12px); }
//             to { opacity: 1; transform: scale(1) translateY(0); }
//           }
//           .animate-modal-in { animation: modalInSpring 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//         `}</style>
//       </form>
//     </div>
//   );
// };

// export default AddCustomToolModal;






// v6
"use client";

import React, { useReducer, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTool, updateCustomTool } from "../../features/savedTools/savedToolSlice";
import { getFolders } from "../../features/folders/folderSlice";
import { useToast } from "../../context/ToastContext";
import { X, Upload, Link as LinkIcon, Folder, Image as ImageIcon, Sparkles, ChevronDown, Search, FolderPlus, HelpCircle } from "lucide-react";

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
        formDispatch({ type: "RESET_FORM", payload: { folderId: defaultFolderId || "" } });
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      setFolderSearch("");
      setNewFolderName("");
      setIsFolderOpen(false);
    }
  }, [editData, open, defaultFolderId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target)) {
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
      formDispatch({ type: "SET_FILE", value: file, preview: URL.createObjectURL(file) });
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
    if (newFolderName.trim()) data.append("newFolderName", newFolderName.trim());

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
        showToast(editData ? "Tool updated successfully ✅" : "Tool saved successfully 🚀", "success");
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
                onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "upload" })}
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
                onClick={() => formDispatch({ type: "SET_IMAGE_TYPE", value: "url" })}
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
                    <img src={state.preview} alt="preview" className="max-w-full max-h-full object-contain rounded-lg" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10 group-hover:scale-105 transition-transform duration-200">
                    <ImageIcon size={18} />
                  </div>
                )}
                <p className="text-gray-900 dark:text-slate-200 text-xs font-semibold text-center max-w-[280px] truncate px-2">
                  {state.imageFile ? state.imageFile.name : "Select Asset Graphics"}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
                  {state.imageFile ? "Click here to shift asset file" : "Supports raw PNG, JPG or vector SVG files"}
                </p>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative flex items-center group">
                  <LinkIcon size={14} className="absolute left-4 text-slate-400 group-focus-within:text-[#3981FA] transition-colors" />
                  <input
                    type="url"
                    placeholder="Paste resource endpoint image URL (https://...)"
                    value={state.imageUrl}
                    onChange={(e) => formDispatch({ type: "SET_URL", value: e.target.value })}
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
                        onError={(e) => { e.target.style.display = "none"; }}
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
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">TOOL NAME</label>
              <input
                name="toolname" type="text" required value={state.toolname} onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
                placeholder="e.g. My Framework Hub"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">REDIRECT LINK</label>
              <input
                name="toollink" type="url" required value={state.toollink} onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/60 transition-all"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">DESCRIPTION</label>
              <textarea
                name="description" required value={state.description} onChange={handleInputChange}
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
                    <Folder size={15} className={state.folderId || newFolderName.trim() ? "text-[#3981FA]" : "text-slate-400"} />
                    <span className="truncate capitalize">{selectedFolderName}</span>
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
                        <Search size={12} className="absolute left-3 text-slate-500 dark:text-slate-400" />
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
                          formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
                          setNewFolderName("");
                          setIsFolderOpen(false);
                          setFolderSearch("");
                          // ✅ Toast: folder selected
                          showToast("Saving to Default / General", "success");
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white transition-colors border-b border-slate-100 dark:border-slate-900/40 ${
                          !state.folderId && !newFolderName.trim() ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        <span>🌐</span>
                        <span>Default / General Workspace</span>
                      </button>

                      {filteredFolders.map((folder) => {
                        const isSelected = state.folderId === folder._id && !newFolderName.trim();
                        return (
                          <button
                            key={folder._id}
                            type="button"
                            onClick={() => {
                              formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: folder._id });
                              setNewFolderName("");
                              setIsFolderOpen(false);
                              setFolderSearch("");
                              // ✅ Toast: folder selected
                              showToast(`Folder set to "${folder.name}"`, "success");
                            }}
                            className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
                              isSelected ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
                              {folder.name[0]}
                            </div>
                            <span className="truncate flex-grow">{folder.name}</span>
                            {isSelected && (
                              <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">Active</span>
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
                          formDispatch({ type: "UPDATE_FIELD", field: "folderId", value: "" });
                        }}
                        className="flex-grow px-2.5 py-1.5 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsFolderOpen(false);
                          // ✅ Toast: new folder will be created on submit
                          if (newFolderName.trim()) {
                            showToast(`New folder "${newFolderName}" will be created on save`, "success");
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
            <span>{editData ? "Update Asset Changes" : "Save Collection Tool"}</span>
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