
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