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

  const handleDeleteForever = (toolId) => {
    const updatedTrash = trashItems.filter((item) => item._id !== toolId);

    localStorage.setItem("trashTools", JSON.stringify(updatedTrash));

    setTrashItems(updatedTrash);

    showToast("Tool deleted permanently", "error");
  };

  return (
    <div className="w-full h-[90vh] overflow-y-scroll p-5 bg-transparent relative scrollbar-premium">
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
         <div className="bg-white border border-dashed border-[#296DE2] rounded-2xl p-20 text-center mt-12">
  <p className="text-[#296DE2]">
    No deleted items found.
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
