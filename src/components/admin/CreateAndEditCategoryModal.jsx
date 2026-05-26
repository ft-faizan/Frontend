// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   createCategory,
//   updateCategory,
// } from "../../features/categories/categorySlice.js";
// import { useToast } from "../../context/ToastContext.jsx";

// function CreateAndEditCategoryModal({ open, onClose, editData }) {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();

//   const [name, setName] = useState("");

//   useEffect(() => {
//     if (editData) {
//       setName(editData.name);
//     } else {
//       setName("");
//     }
//   }, [editData]);
    

//   useEffect(() => {

//   if (open) {
//     document.body.style.overflow = "hidden";
//   }

//   return () => {
//     document.body.style.overflow = "auto";
//   };

// }, [open]);
//   if (!open) return null;

//   const handleSubmit = async () => {
//     if (!name.trim()) return;

//     try {
//       if (editData) {
//         // ✏️ UPDATE
//         await dispatch(
//           updateCategory({ id: editData._id, data: { name } })
//         ).unwrap();

//         showToast("Category updated successfully", "success");
//       } else {
//         // ➕ CREATE
//         await dispatch(createCategory({ name })).unwrap();

//         showToast("Category created successfully", "success");
//       }

//       onClose();
//       setName("");
//     } catch (err) {
//       // ❌ ERROR HANDLING
//       if (err?.toLowerCase().includes("exist")) {
//         showToast("Category already exists", "error");
//       } else {
//         showToast(err || "Something went wrong", "error");
//       }
//     }
//   };

//   return (
//     <div  className="
//     fixed
//     inset-0
//     z-[9999]
//     bg-black/60
//     backdrop-blur-sm
//     flex
//     justify-center
//     items-center
//     p-4
//   "
//   onClick={onClose}>
//      <div
//   onClick={(e) => e.stopPropagation()}
//   className="
//     bg-white
//     p-6
//     rounded-2xl
//     w-[400px]
//     shadow-2xl
//     animate-modal-in
//   "
// >

//         <h2 className="text-lg font-bold mb-4">
//           {editData ? "Edit Category" : "Create Category"}
//         </h2>

//         <input
//           type="text"
//           placeholder="Enter category name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full border p-2 rounded mb-4"
//         />

//         <div className="flex justify-end gap-2">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="bg-[#3380FF] text-white px-4 py-2 rounded"
//           >
//             {editData ? "Update" : "Create"}
//           </button>
//         </div>
//       </div>
//       <style>{`
//   @keyframes modalIn {

//     from {
//       opacity: 0;
//       transform: scale(0.95) translateY(10px);
//     }

//     to {
//       opacity: 1;
//       transform: scale(1) translateY(0);
//     }
//   }

//   .animate-modal-in {
//     animation: modalIn 0.2s ease-out;
//   }
// `}</style>
//     </div>
    
//   );
// }

// export default CreateAndEditCategoryModal;

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { createCategory, updateCategory } from "../../features/categories/categorySlice.js";
// import { useToast } from "../../context/ToastContext.jsx";
// import { X, Loader2, FolderPlus, Edit3 } from "lucide-react";

// function CreateAndEditCategoryModal({ open, onClose, editData }) {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();

//   const [name, setName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Sync edit data
//   useEffect(() => {
//     if (editData) {
//       setName(editData.name);
//     } else {
//       setName("");
//     }
//   }, [editData, open]);

//   // Handle Body Scroll Lock
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   if (!open) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents accidental page reloads
//     if (!name.trim() || isSubmitting) return;

//     setIsSubmitting(true);
//     try {
//       if (editData) {
//         // ✏️ UPDATE
//         await dispatch(
//           updateCategory({ id: editData._id, data: { name: name.trim() } })
//         ).unwrap();
//         showToast("Category updated successfully", "success");
//       } else {
//         // ➕ CREATE
//         await dispatch(createCategory({ name: name.trim() })).unwrap();
//         showToast("Category created successfully", "success");
//       }

//       setName("");
//       onClose();
//     } catch (err) {
//       // ❌ SAFE ERROR HANDLING: Prevents app crash if err is an object
//       const errorMessage = typeof err === "string" ? err : err?.message || "Something went wrong";
      
//       if (errorMessage.toLowerCase().includes("exist")) {
//         showToast("Category already exists", "error");
//       } else {
//         showToast(errorMessage, "error");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div 
//       className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-4 transition-all duration-300"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative bg-[#0d0f14] border border-slate-800 p-6 rounded-2xl w-full max-w-[420px] shadow-2xl shadow-blue-500/5 overflow-hidden animate-modal-in"
//       >
//         {/* Decorative subtle background glow top left */}
//         <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

//         {/* HEADER SECTION */}
//         <div className="flex items-center justify-between mb-5 relative">
//           <div className="flex items-center gap-2.5">
//             <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
//               {editData ? <Edit3 size={16} /> : <FolderPlus size={16} />}
//             </div>
//             <h2 className="text-white text-lg font-bold tracking-tight">
//               {editData ? "Edit Category" : "Create Category"}
//             </h2>
//           </div>
          
//           <button 
//             onClick={onClose}
//             className="p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* INPUT & FORM */}
//         <form onSubmit={handleSubmit} className="space-y-5 relative">
//           <div>
//             <label className="block text-xs font-semibold text-slate-400 mb-2 tracking-wide uppercase">
//               Category Name
//             </label>
//             <input
//               type="text"
//               placeholder="e.g., Development Tools"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               disabled={isSubmitting}
//               className="w-full bg-[#141722]/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500/60 focus:outline-none focus:ring-1 focus:ring-blue-500/60 transition-all duration-200 disabled:opacity-50"
//               maxLength={40}
//               autoFocus
//             />
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-900">
//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isSubmitting}
//               className="px-4 py-2.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-xl text-xs font-semibold text-slate-300 transition-all active:scale-[0.98] disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={!name.trim() || isSubmitting}
//               className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/40 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/10 transition-all active:scale-[0.98]"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 size={14} className="animate-spin" />
//                   <span>Processing...</span>
//                 </>
//               ) : (
//                 <span>{editData ? "Save Changes" : "Create Category"}</span>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Premium CSS Keyframes Injection */}
//       <style>{`
//         @keyframes modalIn {
//           from {
//             opacity: 0;
//             transform: scale(0.96) translateY(6px);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1) translateY(0);
//           }
//         }
//         .animate-modal-in {
//           animation: modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CreateAndEditCategoryModal;




// v3
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCategory, updateCategory } from "../../features/categories/categorySlice.js";
import { useToast } from "../../context/ToastContext.jsx";
import { X, Loader2, Sparkles, FolderPlus } from "lucide-react";

function CreateAndEditCategoryModal({ open, onClose, editData }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync edit data
  useEffect(() => {
    if (editData) {
      setName(editData.name);
    } else {
      setName("");
    }
  }, [editData, open]);

  // Handle Body Scroll Lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents accidental page reloads
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editData) {
        // ✏️ UPDATE
        await dispatch(
          updateCategory({ id: editData._id, data: { name: name.trim() } })
        ).unwrap();
        showToast("Category updated successfully", "success");
      } else {
        // ➕ CREATE
        await dispatch(createCategory({ name: name.trim() })).unwrap();
        showToast("Category created successfully", "success");
      }

      setName("");
      onClose();
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Something went wrong";
      
      if (errorMessage.toLowerCase().includes("exist")) {
        showToast("Category already exists", "error");
      } else {
        showToast(errorMessage, "error");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-sm rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden select-none animate-modal-in"
      >
        
        {/* ─── HEADER ROW CONTEXT ─── */}
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900 pb-4 relative z-10">
          <div className="space-y-0.5">
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {editData ? "Edit Category" : "Create Category"}
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
              {editData ? "Modify global directory category fields" : "Configure a new platform indexing group"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* ─── FIELD DECK INPUTS ─── */}
        <div className="space-y-1.5 relative z-10">
          <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
            Category Name
          </label>
          <div className="relative flex items-center">
            <FolderPlus size={14} className="absolute left-4 text-slate-400" />
            <input
              autoFocus
              type="text"
              placeholder="e.g. Development Tools"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              maxLength={40}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200/80 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* ─── ACTION CONTROL MODAL FOOTER ─── */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-slate-900 relative z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98] disabled:opacity-40"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={!name.trim() || isSubmitting}
            className="flex-[1.5] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Sparkles size={13} />
                <span>{editData ? "Save Changes" : "Create Category"}</span>
              </>
            )}
          </button>
        </div>

      </form>

      {/* Physics Entrance Keyframes Sheet */}
      <style>{`
        @keyframes modalInSpring {
          from { opacity: 0; transform: scale(0.98) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}

export default CreateAndEditCategoryModal;