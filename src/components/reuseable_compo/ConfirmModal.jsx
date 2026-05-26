




// "use client";

// import React from "react";
// import { AlertTriangle, LogOut, Trash2, ShieldAlert } from "lucide-react";

// const ConfirmModal = ({
//   open,
//   onClose,
//   onConfirm,
//   title = "Are you sure?",
//   message = "This action cannot be undone.",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   type = "danger",
// }) => {
//   if (!open) return null;

//   // Modern Design Style Dictionary Map
//   const styles = {
//     danger: {
//       iconBg: "bg-red-500/10 dark:bg-red-500/10 border border-red-500/20",
//       iconColor: "text-red-500",
//       button: "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/10",
//       icon: <Trash2 size={20} />,
//     },
//     logout: {
//   iconBg: "bg-red-500/10 dark:bg-red-500/10 border border-red-500/20",
//   iconColor: "text-red-500",
//   button: "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/10",
//   icon: <LogOut size={20} />,
// },
//     warning: {
//       iconBg: "bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20",
//       iconColor: "text-amber-500",
//       button: "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/10",
//       icon: <AlertTriangle size={20} />,
//     },
//     secure: {
//       iconBg: "bg-[#3981FA]/10 dark:bg-[#3981FA]/10 border border-[#3981FA]/20",
//       iconColor: "text-[#3981FA]",
//       button: "bg-[#3981FA] hover:bg-blue-600 shadow-md shadow-[#3981FA]/10",
//       icon: <ShieldAlert size={20} />,
//     },
//   };

//   const current = styles[type] || styles.danger;

//   return (
//     <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
//       <div 
//         className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-sm rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden select-none animate-modal-in"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Subtle Ambient Background Theme Glow */}
//         <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#3981FA]/5 opacity-100 pointer-events-none blur-2xl" />

//         {/* ICON COMPONENT MATRIX CONTAINER */}
//         <div className="flex flex-col items-center justify-center text-center relative z-10 pt-2">
//           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${current.iconBg} ${current.iconColor}`}>
//             {current.icon}
//           </div>

//           {/* TYPOGRAPHY BLOCKS */}
//           <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//             {title}
//           </h2>
//           <p className="text-sm font-medium text-slate-400 dark:text-gray-500 mt-2 leading-relaxed max-w-[280px]">
//             {message}
//           </p>
//         </div>

//         {/* ACTION CONTROL BUTTON PACKS */}
//         <div className="flex items-center gap-3 relative z-10">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all active:scale-[0.98]"
//           >
//             {cancelText}
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               onConfirm();
//               onClose();
//             }}
//             className={`flex-1 py-3 rounded-xl text-xs font-extrabold text-white transition-all active:scale-[0.97] ${current.button}`}
//           >
//             {confirmText}
//           </button>
//         </div>

//       </div>

//       {/* Embedded Physics Spring Keyframes Sheets */}
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

// export default ConfirmModal;


"use client";

import React from "react";
import { createPortal } from "react-dom"; // 🔥 Imported Portal to break out of CSS constraints
import { AlertTriangle, LogOut, Trash2, ShieldAlert } from "lucide-react";

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger",
}) => {
  // If the open flag isn't active, don't execute or render anything
  if (!open) return null;

  // Modern Design Style Dictionary Map
  const styles = {
    danger: {
      iconBg: "bg-red-500/10 dark:bg-red-500/10 border border-red-500/20",
      iconColor: "text-red-500",
      button: "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/10",
      icon: <Trash2 size={20} />,
    },
    logout: {
      iconBg: "bg-red-500/10 dark:bg-red-500/10 border border-red-500/20",
      iconColor: "text-red-500",
      button: "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/10",
      icon: <LogOut size={20} />,
    },
    warning: {
      iconBg: "bg-amber-500/10 dark:bg-amber-500/10 border border-amber-500/20",
      iconColor: "text-amber-500",
      button: "bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/10",
      icon: <AlertTriangle size={20} />,
    },
    secure: {
      iconBg: "bg-[#3981FA]/10 dark:bg-[#3981FA]/10 border border-[#3981FA]/20",
      iconColor: "text-[#3981FA]",
      button: "bg-[#3981FA] hover:bg-blue-600 shadow-md shadow-[#3981FA]/10",
      icon: <ShieldAlert size={20} />,
    },
  };

  const current = styles[type] || styles.danger;

  // Check if we are executing safely in a client browser window environment
  if (typeof window === "undefined") return null;

  // 🚀 Render directly into document.body to instantly bypass parent card transforms
  return createPortal(
    <div 
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-sm rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl overflow-hidden select-none animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Theme Glow */}
        <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#3981FA]/5 opacity-100 pointer-events-none blur-2xl" />

        {/* ICON COMPONENT MATRIX CONTAINER */}
        <div className="flex flex-col items-center justify-center text-center relative z-10 pt-2">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${current.iconBg} ${current.iconColor}`}>
            {current.icon}
          </div>

          {/* TYPOGRAPHY BLOCKS */}
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm font-medium text-slate-400 dark:text-gray-500 mt-2 leading-relaxed max-w-[280px]">
            {message}
          </p>
        </div>

        {/* ACTION CONTROL BUTTON PACKS */}
        <div className="flex items-center gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-all Adctive:scale-[0.98]"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold text-white transition-all active:scale-[0.97] ${current.button}`}
          >
            {confirmText}
          </button>
        </div>

      </div>

      {/* Embedded Physics Spring Keyframes Sheets */}
      <style>{`
        @keyframes modalInSpring {
          from { opacity: 0; transform: scale(0.98) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>,
    document.body
  );
};

export default ConfirmModal;