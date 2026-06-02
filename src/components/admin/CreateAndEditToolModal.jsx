







"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTool, updateTool } from "../../features/tools/toolSlice.js";
import { getCategories } from "../../features/categories/categorySlice.js";
import { X, ChevronDown, Search, ImageIcon, Sparkles } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const CreateAndEditToolModal = ({ open, onClose, editData }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { categories } = useSelector((state) => state.categories);
  const fileInputRef = useRef(null);
  
  // CORE STATES
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    category: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 🎛️ CUSTOM SEARCHABLE DROPDOWN STATES & REFS
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");
  const catDropdownRef = useRef(null);
  const catInputRef = useRef(null);

  // Sync modal with editData when opening
  useEffect(() => {
    if (open) {
      if (editData) {
        setFormData({
          name: editData.name || "",
          link: editData.link || "",
          category: editData.category?._id || editData.category || "",
          description: editData.description || "",
        });
        setPreview(editData.image?.url || "");
      } else {
        setFormData({ name: "", link: "", category: "", description: "" });
        setPreview("");
        setImage(null);
      }
      
      setCatSearch("");
      setIsCatOpen(false);
      dispatch(getCategories({ limit: 100 }));
    }
  }, [editData, open, dispatch]);

  // Close dropdown on outside clicks safely
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catDropdownRef.current && !catDropdownRef.current.contains(event.target)) {
        setIsCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus category search input upon open events
  useEffect(() => {
    if (isCatOpen && catInputRef.current) {
      setTimeout(() => catInputRef.current?.focus(), 80);
    }
  }, [isCatOpen]);

  if (!open) return null;

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const data = new FormData();

    data.append("name", formData.name);
    data.append("link", formData.link);
    data.append("category", formData.category);
    data.append("description", formData.description);

    if (image) {
      data.append("image", image);
    }

    // 🔥 UPDATE TOOL
    if (editData) {

      await dispatch(
        updateTool({
          id: editData._id,
          data,
        })
      ).unwrap();

      showToast(
        "Tool updated successfully",
        "success"
      );

    } else {

      // 🔥 CREATE TOOL
      await dispatch(
        createTool(data)
      ).unwrap();

      showToast(
        "Tool created successfully",
        "success"
      );
    }

    onClose();

  } catch (err) {

    showToast(
      err || "Something went wrong",
      "error"
    );
  }
};

  // Client-side query search calculation filter logic
  const filteredCategories = (categories || []).filter((cat) =>
    cat.name?.toLowerCase().includes(catSearch.toLowerCase())
  );

  const selectedCategoryObj = categories?.find((cat) => cat._id === formData.category);
  const selectedCategoryName = selectedCategoryObj ? selectedCategoryObj.name : "Select Category";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-md rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-premium select-none animate-modal-in"
      >
        
        {/* Subtle Ambient Background Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 opacity-100 pointer-events-none blur-2xl" />

        {/* ─── HEADER ROW CONTEXT ─── */}
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900 pb-4 relative z-10">
          <div className="space-y-0.5">
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {editData ? "Edit Platform Tool" : "Add New Tool"}
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
              Configure properties for the official database registry
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* ─── IMAGE LOADER GRAPHICS VIEW SLOT ─── */}
        <div className="space-y-1.5 relative z-10">
          <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
            Tool Graphic Preview
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 dark:border-slate-800/80 rounded-2xl p-5 bg-slate-50/50 dark:bg-[#141722]/30 hover:border-[#3981FA] dark:hover:border-[#3981FA] transition-colors relative min-h-[120px] flex flex-col items-center justify-center cursor-pointer"
          >
            {preview ? (
              <div className="relative w-16 h-16 mb-1.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-inner">
                <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#3981FA]/5 flex items-center justify-center text-slate-400 dark:text-[#3981FA]/60 mb-2 border border-transparent dark:border-[#3981FA]/10">
                <ImageIcon size={18} />
              </div>
            )}
            <p className="text-gray-900 dark:text-slate-300 text-xs font-semibold text-center max-w-[240px] truncate px-2">
              {image ? image.name : "Upload Platform Icon"}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-gray-500 mt-0.5">
              {image ? "Click to replace file asset" : "Supports raw PNG, JPG, or SVG vectors"}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* ─── DATA INPUT TEXT FORM PANELS ─── */}
        {/* 🔥 FIX: Removed 'relative z-10' from this div to break the sibling stacking ceiling trap */}
        <div className="space-y-4">
          <div className="space-y-1.5 relative z-10">
            <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
              Tool Name
            </label>
            <input
              type="text"
              placeholder="Friendly Name (e.g. Chat GPT)"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all"
            />
          </div>

          <div className="space-y-1.5 relative z-10">
            <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
              Redirect Link
            </label>
            <input
              type="url"
              placeholder="Website Link (https://...)"
              required
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all"
            />
          </div>

          {/* ─── SEARCHABLE DROPDOWN (PROPER OVERLAY FLOATING) ─── */}
          {/* 🔥 FIX: Given high clear relative z-[100] ordering priority */}
          <div className="space-y-1.5 relative z-[100]" ref={catDropdownRef}>
            <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
              Category Group
            </label>
            
            <button
              type="button"
              onClick={() => setIsCatOpen(!isCatOpen)}
              className={`w-full px-4 py-3 flex items-center justify-between rounded-xl border text-sm font-semibold transition-all ${
                isCatOpen || formData.category
                  ? "bg-white dark:bg-[#141722]/60 border-[#3981FA] text-gray-900 dark:text-white"
                  : "bg-slate-50 dark:bg-[#141722]/40 border-gray-200 dark:border-slate-800/80 text-slate-400 dark:text-gray-500 hover:border-gray-300 dark:hover:border-slate-700"
              }`}
            >
              <span className="truncate capitalize font-semibold">{selectedCategoryName}</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isCatOpen ? "rotate-180 text-slate-600 dark:text-slate-200" : ""}`}
              />
            </button>

            {isCatOpen && (
              /* 🔥 FIX: Changed z-index depth to z-[200] to sit cleanly on top of descriptions & footers */
              <div className="absolute left-0 right-0 z-[200] mt-2 bg-[#CDDAF6] dark:bg-[#0c0e14] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xl backdrop-blur-2xl animate-in shadow-black/10">
                
                {/* Search Header Input Field */}
                <div className="p-2 border-b border-slate-300/40 dark:border-slate-800/60 bg-white/20 dark:bg-slate-900/40">
                  <div className="relative flex items-center">
                    <Search size={12} className="absolute left-3 text-slate-500 dark:text-slate-400" />
                    <input
                      ref={catInputRef}
                      type="text"
                      placeholder="Search explicit category nodes..."
                      value={catSearch}
                      onChange={(e) => setCatSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#141722] border border-transparent dark:border-slate-800 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
                    />
                  </div>
                </div>

                {/* Categories Options Loop Track */}
                <div className="max-h-44 overflow-y-auto scrollbar-premium bg-white dark:bg-[#0c0e14]">
                  {filteredCategories.map((cat) => {
                    const isSelected = formData.category === cat._id;
                    return (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, category: cat._id });
                          setIsCatOpen(false);
                          setCatSearch("");
                        }}
                        className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] dark:hover:bg-[#3981FA] hover:text-white border-b border-slate-100 dark:border-slate-900/20 last:border-none transition-colors capitalize ${
                          isSelected ? "text-[#3477E7] dark:text-[#3981FA] bg-blue-500/5 font-bold" : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-md bg-[#CDDAF5] dark:bg-[#3981FA]/10 flex items-center justify-center text-[10px] font-bold text-[#3477E7] dark:text-[#3981FA] uppercase flex-shrink-0">
                          {cat.name[0]}
                        </div>
                        <span className="truncate flex-grow font-medium">{cat.name}</span>
                        {isSelected && (
                          <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded tracking-wide uppercase">Active</span>
                        )}
                      </button>
                    );
                  })}

                  {filteredCategories.length === 0 && (
                    <div className="p-5 text-center text-xs text-slate-400 dark:text-gray-600 font-medium italic">
                      No categories matched your search
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          <div className="space-y-1.5 relative z-10">
            <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
              Description
            </label>
            <textarea
              placeholder="What does this tool do?"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none h-24 focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all resize-none scrollbar-premium"
            />
          </div>
        </div>

        {/* ─── ACTION TRIGGER MODAL FOOTER CONTROLS ─── */}
        {/* 🔥 FIX: Set lower stack layer priority relative z-10 to allow drawers above it to render on top */}
        <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-slate-900 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[1.5] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
          >
            <Sparkles size={13} />
            <span>{editData ? "Update Tool" : "Create Tool"}</span>
          </button>
        </div>

      </form>

      {/* Stylesheet panel rules */}
      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 4px; height: 4px; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.15); border-radius: 10px; }
        @keyframes modalInSpring {
          from { opacity: 0; transform: scale(0.98) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default CreateAndEditToolModal;