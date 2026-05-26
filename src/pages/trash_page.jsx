// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { saveTool } from "../features/savedTools/savedToolSlice";

// function Trash_page() {
//   const dispatch = useDispatch();
//   const [trashItems, setTrashItems] = useState([]);

//   // LOAD TRASH - Run only once on mount
//   useEffect(() => {
//     const trash = JSON.parse(localStorage.getItem("trashTools")) || [];
//     setTrashItems(trash);
//   }, []);

//   // RECOVER TOOL

//     const handleRecover = async (toolId) => {
//       const recoveredTool = trashItems.find((item) => item._id === toolId);

//       if (!recoveredTool) return;

//       const formData = new FormData();

//       formData.append("type", "custom");

//       formData.append("toolname", recoveredTool.toolname || "");

//       formData.append("toollink", recoveredTool.toollink || "");

//       formData.append("description", recoveredTool.description || "");

//       // IMPORTANT
//       formData.append("imageUrl", recoveredTool.imageUrl || "");

//       try {
//         await dispatch(saveTool(formData)).unwrap();

//         // REMOVE FROM TRASH
//         const updatedTrash = trashItems.filter((item) => item._id !== toolId);

//         localStorage.setItem("trashTools", JSON.stringify(updatedTrash));

//         setTrashItems(updatedTrash);

//         alert("Recovered!");
//       } catch (err) {
//         console.log(err);

//         alert("Recovery failed");
//       }
//     };

//   // DELETE FOREVER
//   const handleDeleteForever = (toolId) => {
//     const updatedTrash = trashItems.filter((item) => item._id !== toolId);
//     localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
//     setTrashItems(updatedTrash);
//   };

//   return (
//     <div className=" h-[90vh] overflow-y-scroll p-5">
//       <div className="flex justify-end items-center mb-10">

//         <p className="text-gray-500 text-sm">{trashItems.length} items found</p>
//       </div>

//       {trashItems.length === 0 ? (
//         <div className="text-center py-20 border-2 border-dashed border-[#2a2d3a] rounded-3xl">
//           <p className="text-gray-400">
//             Trash is empty. No deleted tools to show.
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {trashItems.map((tool) => (
//             <div
//               key={tool._id}
//               className="bg-[#1c1f26] border border-[#2a2d3a] rounded-2xl p-5 flex flex-col justify-between"
//             >
//               <div>
//                 <h2 className="text-white text-xl font-bold truncate capitalize">
//                   {tool.toolname || tool.name}
//                 </h2>
//                 <p className="text-gray-500 text-sm mt-1 truncate">
//                   {tool.toollink || tool.link}
//                 </p>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => handleRecover(tool._id)}
//                   className="flex-1 bg-green-600/10 text-green-500 border border-green-600/20 px-4 py-2 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all"
//                 >
//                   Recover
//                 </button>

//                 <button
//                   onClick={() => handleDeleteForever(tool._id)}
//                   className="bg-red-600/10 text-red-500 border border-red-600/20 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-all"
//                 >
//                   Delete Forever
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Trash_page;

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { saveTool } from "../features/savedTools/savedToolSlice";
// import { useToast } from "../context/ToastContext"; // Using your custom toast system
// import { RotateCcw, Trash2, Inbox, ExternalLink, Sparkles } from "lucide-react";

// function TrashPage() {
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const [trashItems, setTrashItems] = useState([]);
//   const [isProcessing, setIsProcessing] = useState({});

//   // LOAD TRASH - Run only once on mount
//   useEffect(() => {
//     const trash = JSON.parse(localStorage.getItem("trashTools")) || [];
//     setTrashItems(trash);
//   }, []);

//   // RECOVER TOOL
//   const handleRecover = async (toolId) => {
//     if (isProcessing[toolId]) return;

//     const recoveredTool = trashItems.find((item) => item._id === toolId);
//     if (!recoveredTool) return;

//     setIsProcessing((prev) => ({ ...prev, [toolId]: true }));

//     const formData = new FormData();
//     formData.append("type", "custom");
//     formData.append("toolname", recoveredTool.toolname || recoveredTool.name || "");
//     formData.append("toollink", recoveredTool.toollink || recoveredTool.link || "");
//     formData.append("description", recoveredTool.description || "");
//     formData.append("imageUrl", recoveredTool.imageUrl || recoveredTool.image?.url || "");

//     try {
//       await dispatch(saveTool(formData)).unwrap();

//       // REMOVE FROM TRASH
//       const updatedTrash = trashItems.filter((item) => item._id !== toolId);
//       localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
//       setTrashItems(updatedTrash);

//       showToast("Tool restored successfully", "success");
//     } catch (err) {
//       console.error(err);
//       showToast("Failed to restore tool node", "error");
//     } finally {
//       setIsProcessing((prev) => ({ ...prev, [toolId]: false }));
//     }
//   };

//   // DELETE FOREVER
//   const handleDeleteForever = (toolId) => {
//     if (!window.confirm("Are you sure you want to permanently delete this tool? This action cannot be undone.")) return;

//     const updatedTrash = trashItems.filter((item) => item._id !== toolId);
//     localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
//     setTrashItems(updatedTrash);
//     showToast("Permanently purged item", "success");
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#090b0f] text-slate-100 p-4 md:p-8 overflow-y-auto scrollbar-premium relative">

//       {/* Ambient background blur elements */}
//       <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none z-0" />
//       <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none z-0" />

//       {/* HEADER SECTION */}
//       <div className="relative z-10 mb-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
//             Trash Archive
//           </h1>
//           <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
//             Review or permanently purge discarded custom workspace utility items.
//           </p>
//         </div>

//         {trashItems.length > 0 && (
//           <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-[#141722]/40 text-xs font-mono text-slate-400 backdrop-blur-md">
//             <Sparkles size={12} className="text-amber-500/70" />
//             <span>{trashItems.length} discarded items</span>
//           </div>
//         )}
//       </div>

//       {/* CORE WORKSPACE AREA */}
//       <div className="relative z-10 max-w-7xl mx-auto">
//         {trashItems.length === 0 ? (
//           /* EMBEDDED EMPTY STATE DESIGN */
//           <div className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-16 border border-slate-800/80 bg-[#0d0f14]/40 backdrop-blur-xl rounded-3xl max-w-md mx-auto mt-12 shadow-2xl">
//             <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(51,128,255,0.02),transparent_60%)] pointer-events-none" />

//             <div className="relative w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
//               <Inbox size={20} strokeWidth={1.5} />
//             </div>

//             <h4 className="text-white text-sm font-semibold tracking-tight mb-1">
//               Archive Is Clean
//             </h4>
//             <p className="text-slate-500 text-xs leading-relaxed max-w-[260px]">
//               No deleted workspace elements or disconnected custom node layers found.
//             </p>
//           </div>
//         ) : (
//           /* TRANSITION CARD GRID GRID */
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {trashItems.map((tool) => {
//               const currentImageUrl = tool.imageUrl || tool.image?.url;
//               const displayTitle = tool.toolname || tool.name || "Untitled Node";
//               const displayLink = tool.toollink || tool.link || "No dynamic endpoint link";

//               return (
//                 <div
//                   key={tool._id}
//                   className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-5 flex flex-col justify-between min-h-[165px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/[0.01] hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:-translate-y-1 select-none"
//                 >
//                   {/* Next-Gen Ambient Glow Overlay */}
//                   <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

//                   {/* TOP CARD CONTENT CONTAINER */}
//                   <div className="flex items-start gap-4 relative z-10">
//                     {/* DYNAMIC LOGO / IMAGE NODE COMPONENT */}
//                     <div className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex-shrink-0 bg-slate-50 dark:bg-[#141722]/60 flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-300 shadow-inner">
//                       {currentImageUrl ? (
//                         <img
//                           src={currentImageUrl}
//                           alt={displayTitle}
//                           className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayTitle)}&background=1e2235&color=3981FA&bold=true`;
//                           }}
//                         />
//                       ) : (
//                         <Wrench size={18} className="text-slate-400 dark:text-slate-600" />
//                       )}
//                     </div>

//                     {/* TEXT META DATA DECK */}
//                     <div className="space-y-0.5 truncate flex-grow">
//                       <h2 className="text-gray-900 dark:text-white text-base font-bold truncate capitalize tracking-tight transition-colors duration-300 group-hover:text-blue-400">
//                         {displayTitle}
//                       </h2>
//                       <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate flex items-center gap-1">
//                         <ExternalLink size={10} className="opacity-60" />
//                         {displayLink}
//                       </p>
//                     </div>
//                   </div>

//                   {/* ACTION TOOLBAR CONTROLS */}
//                   <div className="flex gap-2.5 mt-6 relative z-10 pt-3 border-t border-slate-100 dark:border-slate-900/60">
//                     {/* RECOVER OPTION */}
//                     <button
//                       type="button"
//                       disabled={isProcessing[tool._id]}
//                       onClick={() => handleRecover(tool._id)}
//                       className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#E6F1FB] dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-xs font-semibold py-2.5 shadow-sm shadow-[#3981FA]/5 transition-all duration-200 disabled:opacity-40 active:scale-[0.98]"
//                     >
//                       <RotateCcw size={13} className={isProcessing[tool._id] ? "animate-spin" : ""} />
//                       <span>{isProcessing[tool._id] ? "Restoring..." : "Recover"}</span>
//                     </button>

//                     {/* PERMANENT PURGE OPTION */}
//                     <button
//                       type="button"
//                       disabled={isProcessing[tool._id]}
//                       onClick={() => handleDeleteForever(tool._id)}
//                       className="flex items-center justify-center gap-1.5 rounded-xl bg-red-500/[0.04] dark:bg-red-500/[0.04] text-red-500 border border-red-500/10 dark:border-red-500/10 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-xs font-semibold px-4 py-2.5 transition-all duration-200 disabled:opacity-40 active:scale-[0.98]"
//                     >
//                       <Trash2 size={13} />
//                       <span className="hidden sm:inline">Delete Forever</span>
//                     </button>
//                   </div>

//                   {/* Kinetic Left Accent Highlight Transform Strip */}
//                   <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* Embedded High-End Scrollbar panel stylesheet anchors */}
//       <style>{`
//         .scrollbar-premium::-webkit-webkit-scrollbar { width: 5px; }
//         .scrollbar-premium::-webkit-webkit-scrollbar-thumb { background: #141722; border-radius: 10px; }
//         @keyframes inlineFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-in { animation: inlineFade 0.2s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// }

// export default TrashPage;

// v3
"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveTool } from "../features/savedTools/savedToolSlice";
import { useToast } from "../context/ToastContext";
import {
  RotateCcw,
  Trash2,
  Inbox,
  ExternalLink,
  Sparkles,
  Wrench,
  Trash,
} from "lucide-react";
import ConfirmModal from "../components/reuseable_compo/ConfirmModal";

function TrashPage() {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  // CORE STATES
  const [trashItems, setTrashItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState({});
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedToolId, setSelectedToolId] = useState(null);

  const [selectedToolName, setSelectedToolName] = useState("");

  // PAGINATION MATH CONFIG
  const itemsPerPage = 9;
  const totalPages = Math.ceil(trashItems.length / itemsPerPage);
  const paginatedItems = trashItems.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // LOAD TRASH - Run only once on mount
  useEffect(() => {
    const trash = JSON.parse(localStorage.getItem("trashTools")) || [];
    setTrashItems(trash);
  }, []);

  // Safeguard pagination boundaries if items are removed
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [trashItems.length, totalPages, page]);

  // RECOVER TOOL
  const handleRecover = async (toolId) => {
    if (isProcessing[toolId]) return;

    const recoveredTool = trashItems.find((item) => item._id === toolId);
    if (!recoveredTool) return;

    setIsProcessing((prev) => ({ ...prev, [toolId]: true }));

    const formData = new FormData();
    formData.append("type", "custom");
    formData.append(
      "toolname",
      recoveredTool.toolname || recoveredTool.name || "",
    );
    formData.append(
      "toollink",
      recoveredTool.toollink || recoveredTool.link || "",
    );
    formData.append("description", recoveredTool.description || "");
    formData.append(
      "imageUrl",
      recoveredTool.imageUrl || recoveredTool.image?.url || "",
    );

    try {
      await dispatch(saveTool(formData)).unwrap();

      // REMOVE FROM TRASH
      const updatedTrash = trashItems.filter((item) => item._id !== toolId);
      localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
      setTrashItems(updatedTrash);

      showToast("Tool restored successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to restore tool node", "error");
    } finally {
      setIsProcessing((prev) => ({ ...prev, [toolId]: false }));
    }
  };

  // // DELETE FOREVER
  // const handleDeleteForever = (toolId) => {
  //   if (!window.confirm("Are you sure you want to permanently delete this tool? This action cannot be undone.")) return;

  //   const updatedTrash = trashItems.filter((item) => item._id !== toolId);
  //   localStorage.setItem("trashTools", JSON.stringify(updatedTrash));
  //   setTrashItems(updatedTrash);
  //   showToast("Permanently purged item", "success");
  // };

  const handleDeleteForever = (toolId) => {
    const updatedTrash = trashItems.filter((item) => item._id !== toolId);

    localStorage.setItem("trashTools", JSON.stringify(updatedTrash));

    setTrashItems(updatedTrash);

    showToast("Tool deleted permanently", "error");
  };

  return (
    <div className="w-full h-[90vh] overflow-y-scroll p-5 bg-transparent relative scrollbar-premium">
      {/* Ambient background blur elements */}
      {/* <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none z-0" /> */}

      {/* HEADER SECTION */}
      {/* <div className="relative z-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4  pb-0">
       
        {trashItems.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800/80 bg-[#141722]/30 text-xs font-mono text-slate-400 backdrop-blur-md">
            <Sparkles size={12} className="text-amber-500/70" />
            <span>{trashItems.length} discarded items</span>
          </div>
        )}
      </div> */}

      <div className="flex justify-end mb-5">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#3981FA] shadow-sm border border-slate-200 w-fit transition-all">
          <div className="w-7 h-7 rounded-xl bg-[#CDDAF5] flex items-center justify-center">
            <Trash size={13} className="text-[#3075E8]" />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-white">
              {trashItems.length}
            </span>

            <span className="text-sm font-medium text-white">
              Grabage items
            </span>
          </div>
        </div>
      </div>

      {/* CORE WORKSPACE AREA */}
      <div className="relative z-10 ">
        {trashItems.length === 0 ? (
          /* EMPTY STATE DESIGN */
          <div className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-16 border border-[#3981FA] bg-white backdrop-blur-xl rounded-3xl mt-12 shadow-2xl">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(51,128,255,0.02),transparent_60%)] pointer-events-none" />

            {/* <div className="relative w-12 h-12 rounded-2xl bg-slate-900/40 border border-slate-800/60 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
              <Inbox size={20} strokeWidth={1.5} />
            </div> */}

            <h4 className="text-[#3981FA] text-sm font-semibold tracking-tight mb-1">
              Archive Is Clean
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed max-w-[260px]">
              No deleted workspace elements or disconnected custom node layers
              found.
            </p>
          </div>
        ) : (
          <>
            {/* TRANSITION CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedItems.map((tool) => {
                const currentImageUrl = tool.imageUrl || tool.image?.url;
                const displayTitle =
                  tool.toolname || tool.name || "Untitled Node";
                const displayLink =
                  tool.toollink || tool.link || "No dynamic endpoint link";

                return (
                  <div
                    key={tool._id}
                    className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-5 flex flex-col justify-between min-h-[165px] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/[0.01] hover:border-blue-500/20 dark:hover:border-blue-500/20 hover:-translate-y-1 select-none"
                  >
                    {/* Next-Gen Ambient Glow Overlay */}
                    <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                    {/* TOP CARD CONTENT CONTAINER */}
                    <div className="flex items-start gap-4 relative z-10">
                      {/* DYNAMIC LOGO / IMAGE NODE COMPONENT */}
                      <div className="w-11 h-11 rounded-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex-shrink-0 bg-slate-50 dark:bg-[#141722]/60 flex items-center justify-center group-hover:border-blue-500/30 transition-colors duration-300 shadow-inner">
                        {currentImageUrl ? (
                          <img
                            src={currentImageUrl}
                            alt={displayTitle}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayTitle)}&background=1e2235&color=3981FA&bold=true`;
                            }}
                          />
                        ) : (
                          <Wrench
                            size={18}
                            className="text-slate-400 dark:text-slate-600"
                          />
                        )}
                      </div>

                      {/* TEXT META DATA DECK */}
                      <div className="space-y-0.5 truncate flex-grow">
                        <h2 className="text-gray-900 dark:text-white text-base font-bold truncate capitalize tracking-tight transition-colors duration-300 group-hover:text-blue-400">
                          {displayTitle}
                        </h2>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate flex items-center gap-1">
                          <ExternalLink size={10} className="opacity-60" />
                          {displayLink}
                        </p>
                      </div>
                    </div>

                    {/* ACTION TOOLBAR CONTROLS */}
                    <div className="flex gap-2.5 mt-6 relative z-10 pt-3 border-t border-slate-100 dark:border-slate-900/60">
                      {/* RECOVER OPTION */}
                      <button
                        type="button"
                        disabled={isProcessing[tool._id]}
                        onClick={() => handleRecover(tool._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#E6F1FB] dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-xs font-semibold py-2.5 shadow-sm shadow-[#3981FA]/5 transition-all duration-200 disabled:opacity-40 active:scale-[0.98]"
                      >
                        <RotateCcw
                          size={13}
                          className={
                            isProcessing[tool._id] ? "animate-spin" : ""
                          }
                        />
                        <span>
                          {isProcessing[tool._id] ? "Restoring..." : "Recover"}
                        </span>
                      </button>

                      {/* PERMANENT PURGE OPTION */}
                      <button
                        type="button"
                        disabled={isProcessing[tool._id]}
                        // onClick={() => handleDeleteForever(tool._id)}
                        onClick={() => {
                          setSelectedToolId(tool._id);

                          setSelectedToolName(
                            tool.toolname || tool.name || "Tool",
                          );

                          setDeleteModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-red-500/[0.04] dark:bg-red-500/[0.04] text-red-500 border border-red-500/10 dark:border-red-500/10 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-xs font-semibold px-4 py-2.5 transition-all duration-200 disabled:opacity-40 active:scale-[0.98]"
                      >
                        <Trash2 size={13} />
                        <span className="hidden sm:inline">Delete Forever</span>
                      </button>
                    </div>

                    {/* Kinetic Left Accent Highlight Transform Strip */}
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
                  </div>
                );
              })}
            </div>

            {/* ─── PREMIUM DATA PAGINATION TRACKER ─── */}
            {totalPages > 1 && (
              // <div className="flex justify-center items-center gap-2.5 pt-12 pb-8 relative z-10">
              //   <button
              //     type="button"
              //     onClick={() => setPage((p) => Math.max(p - 1, 1))}
              //     disabled={page === 1}
              //     className="h-9 px-3 border border-slate-800/80 rounded-xl text-xs font-semibold text-slate-400 bg-[#141722]/20 hover:border-slate-700 hover:text-slate-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              //   >
              //     Prev
              //   </button>

              //   <div className="flex gap-1.5">
              //     {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              //       <button
              //         key={pageNum}
              //         type="button"
              //         onClick={() => setPage(pageNum)}
              //         className={`h-9 min-w-[36px] px-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
              //           page === pageNum
              //             ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15 scale-105"
              //             : "border border-slate-800/60 text-slate-400 bg-[#141722]/10 hover:border-slate-700 hover:text-white"
              //         }`}
              //       >
              //         {pageNum}
              //       </button>
              //     ))}
              //   </div>

              //   <button
              //     type="button"
              //     onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              //     disabled={page === totalPages}
              //     className="h-9 px-3 border border-slate-800/80 rounded-xl text-xs font-semibold text-slate-400 bg-[#141722]/20 hover:border-slate-700 hover:text-slate-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              //   >
              //     Next
              //   </button>
              // </div>
              <div className="flex justify-center items-center gap-4 mt-10 pb-10 relative z-10">
                {/* PREV */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* PAGE NUMBERS */}
                <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setPage(pageNum)}
                        className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all ${
                          page === pageNum
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
                            : "text-slate-400 hover:bg-white hover:text-blue-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}
                </div>

                {/* NEXT */}
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => handleDeleteForever(selectedToolId)}
        title="Delete Permanently"
        message={`Are you sure you want to permanently delete "${selectedToolName}"? This action cannot be undone.`}
        confirmText="Delete Forever"
        cancelText="Cancel"
        type="danger"
      />

      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 5px; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: #141722; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default TrashPage;
