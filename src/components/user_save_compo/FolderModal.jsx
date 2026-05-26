// import React, { useState, useEffect } from "react";

// const FolderModal = ({ open, onClose, onConfirm, initialData }) => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     setName(initialData?.name || "");
//   }, [initialData, open]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-sm rounded-2xl p-6 shadow-2xl">
//         <h2 className="text-xl font-bold text-white mb-4">
//           {initialData ? "Edit Folder" : "Create New Folder"}
//         </h2>
//         <input
//           autoFocus
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Folder name..."
//           className="w-full bg-[#13151a] border border-[#2a2d3a] p-3 rounded-xl text-white outline-none focus:border-[#286FF0] mb-6"
//         />
//         <div className="flex gap-3">
//           <button onClick={onClose} className="flex-1 px-4 py-2 text-gray-400 hover:text-white transition-colors">
//             Cancel
//           </button>
//           <button 
//             onClick={() => { onConfirm(name); onClose(); }}
//             disabled={!name.trim()}
//             className="flex-1 bg-[#286FF0] text-white px-4 py-2 rounded-xl font-bold disabled:opacity-50"
//           >
//             {initialData ? "Update" : "Create"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FolderModal;






// // v2
// "use client";

// import React, { useState, useEffect } from "react";
// import { X, FolderPlus, Sparkles } from "lucide-react";

// const FolderModal = ({ open, onClose, onConfirm, initialData }) => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     setName(initialData?.name || "");
//   }, [initialData, open]);

//   if (!open) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name.trim()) return;
//     onConfirm(name);
//     onClose();
//   };

//   return (
//     <div 
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
//       onClick={onClose}
//     >
//       <form
//         onSubmit={handleSubmit}
//         onClick={(e) => e.stopPropagation()}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-sm rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden select-none animate-modal-in"
//       >
        
//         {/* ─── HEADER ROW CONTEXT ─── */}
//         <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900 pb-4 relative z-10">
//           <div className="space-y-0.5">
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               {initialData ? "Edit Folder" : "Create New Folder"}
//             </h2>
//             <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
//               {initialData ? "Modify directory indexing variables" : "Set up a new collection container"}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* ─── FIELD DECK INPUTS ─── */}
//         <div className="space-y-1.5 relative z-10">
//           <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
//             Folder Name
//           </label>
//           <div className="relative flex items-center">
//             <FolderPlus size={14} className="absolute left-4 text-slate-400" />
//             <input
//               autoFocus
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Friendly Name (e.g. Production Tools)"
//               maxLength={32}
//               className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all"
//             />
//           </div>
//         </div>

//         {/* ─── ACTION CONTROL MODAL FOOTER ─── */}
//         <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-slate-900 relative z-10">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!name.trim()}
//             className="flex-[1.5] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
//           >
//             <Sparkles size={13} />
//             <span>{initialData ? "Update Properties" : "Create Folder"}</span>
//           </button>
//         </div>

//       </form>

//       {/* Physics Entrance Keyframes Sheet */}
//       <style>{`
//         @keyframes modalInSpring {
//           from { opacity: 0; transform: scale(0.98) translateY(6px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default FolderModal;

// "use client";

// import React, { useState, useEffect } from "react";
// import { X, FolderPlus, Sparkles } from "lucide-react";
// import { useToast } from "../../context/ToastContext";

// const FolderModal = ({ open, onClose, onConfirm, initialData }) => {
//   const [name, setName] = useState("");
//   const { showToast } = useToast();

//   useEffect(() => {
//     setName(initialData?.name || "");
//   }, [initialData, open]);

//   if (!open) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name.trim()) return;
//     onConfirm(name);
//     // ✅ Toast: folder created or updated
//     showToast(
//       initialData
//         ? `Folder "${name}" updated successfully ✅`
//         : `Folder "${name}" created successfully 🚀`,
//       "success"
//     );
//     onClose();
//   };

//   return (
//     <div 
//       className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
//       onClick={onClose}
//     >
//       <form
//         onSubmit={handleSubmit}
//         onClick={(e) => e.stopPropagation()}
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-sm rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden select-none animate-modal-in"
//       >
        
//         {/* ─── HEADER ROW CONTEXT ─── */}
//         <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-900 pb-4 relative z-10">
//           <div className="space-y-0.5">
//             <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               {initialData ? "Edit Folder" : "Create New Folder"}
//             </h2>
//             <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
//               {initialData ? "Modify directory indexing variables" : "Set up a new collection container"}
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* ─── FIELD DECK INPUTS ─── */}
//         <div className="space-y-1.5 relative z-10">
//           <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
//             Folder Name
//           </label>
//           <div className="relative flex items-center">
//             <FolderPlus size={14} className="absolute left-4 text-slate-400" />
//             <input
//               autoFocus
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Friendly Name (e.g. Production Tools)"
//               maxLength={32}
//               className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all"
//             />
//           </div>
//         </div>

//         {/* ─── ACTION CONTROL MODAL FOOTER ─── */}
//         <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-slate-900 relative z-10">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={!name.trim()}
//             className="flex-[1.5] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
//           >
//             <Sparkles size={13} />
//             <span>{initialData ? "Update Properties" : "Create Folder"}</span>
//           </button>
//         </div>

//       </form>

//       {/* Physics Entrance Keyframes Sheet */}
//       <style>{`
//         @keyframes modalInSpring {
//           from { opacity: 0; transform: scale(0.98) translateY(6px); }
//           to { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default FolderModal;






"use client";

import React, { useState, useEffect } from "react";
import { X, FolderPlus, Sparkles } from "lucide-react";

const FolderModal = ({ open, onClose, onConfirm, initialData }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialData?.name || "");
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // Pass the name back to your parent view handler where your backend action runs
    onConfirm(name);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4"
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
              {initialData ? "Edit Folder" : "Create New Folder"}
            </h2>
            <p className="text-[11px] text-slate-400 dark:text-gray-500 font-medium">
              {initialData ? "Modify directory indexing variables" : "Set up a new collection container"}
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

        {/* ─── FIELD DECK INPUTS ─── */}
        <div className="space-y-1.5 relative z-10">
          <label className="block text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-0.5">
            Folder Name
          </label>
          <div className="relative flex items-center">
            <FolderPlus size={14} className="absolute left-4 text-slate-400" />
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Friendly Name (e.g. Production Tools)"
              maxLength={32}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-[#141722]/40 border border-gray-200 dark:border-slate-800/80 rounded-xl text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 text-sm outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 focus:ring-1 focus:ring-[#3981FA]/40 transition-all"
            />
          </div>
        </div>

        {/* ─── ACTION CONTROL MODAL FOOTER ─── */}
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
            disabled={!name.trim()}
            className="flex-[1.5] flex items-center justify-center gap-2 bg-[#3981FA] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl text-xs font-extrabold shadow-lg shadow-[#3981FA]/10 transition-all active:scale-[0.97]"
          >
            <Sparkles size={13} />
            <span>{initialData ? "Update Properties" : "Create Folder"}</span>
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
};

export default FolderModal;