



import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../features/folders/folderSlice";
import { saveTool, moveSavedTool } from "../../features/savedTools/savedToolSlice";
import { useToast } from "../../context/ToastContext"; 
import { Search, Folder, FolderPlus, FolderCheck, X, Plus, MoveRight } from "lucide-react";

const SaveToFolderModal = ({ open, onClose, tool, savedEntry }) => {
  const dispatch = useDispatch();
  const { folders } = useSelector((state) => state.folders);
  const isMoving = !!savedEntry;
  const hasDefaultFolder = folders.some((f) => f.type === "default");
  const [searchTerm, setSearchTerm] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const { showToast } = useToast();

  // Load folders when modal opens
  useEffect(() => {
    if (open) {
      dispatch(getFolders());
      setSearchTerm("");
      setNewFolderName("");
    }
  }, [open, dispatch]);

  if (!open) return null;

  // Filter folders based on user search and sort with default first
  const filteredFolders = folders
    .filter((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a.type === "default" && b.type !== "default") return -1;
      if (a.type !== "default" && b.type === "default") return 1;
      return a.name.localeCompare(b.name);
    });

  const handleAction = (folderId = null, newName = null) => {
    if (savedEntry) {
      dispatch(
        moveSavedTool({
          id: savedEntry._id,
          folderId,
          newFolderName: newName,
        })
      ).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          const message = action.payload?.message || "Tool moved successfully ✅";
          // ✅ Toast: move success
          showToast(message, "success");
          if (newName) {
            dispatch(getFolders());
          }
          setTimeout(() => {
            onClose();
          }, 100);
        } else {
          const errorMsg = action.payload || "Something went wrong ❌";
          // ✅ Toast: move error
          showToast(errorMsg, "error");
        }
      });
    } else {
      const formData = new FormData();
      formData.append("type", "platform");
      formData.append("toolId", tool._id);

      if (folderId) formData.append("folderId", folderId);
      if (newName) formData.append("newFolderName", newName);

      dispatch(saveTool(formData)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // ✅ Toast: save success
          if (newName) {
            showToast(`Tool saved to new folder "${newName}" 🚀`, "success");
            dispatch(getFolders());
          } else if (folderId) {
            const folderName = folders.find((f) => f._id === folderId)?.name || "folder";
            showToast(`Tool saved to "${folderName}" ✅`, "success");
          } else {
            showToast("Tool saved successfully ✅", "success");
          }
          onClose();
        } else {
          // ✅ Toast: save error
          showToast(action.payload || "Failed to save tool ❌", "error");
        }
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] w-full max-w-[290px] rounded-2xl shadow-2xl overflow-hidden select-none animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background micro glow */}
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[#3981FA]/5 pointer-events-none blur-xl" />

        {/* HEADER INDICATOR */}
        <div className="bg-[#3981FA]/5 py-3 px-4 border-b border-gray-100 dark:border-slate-900/60 relative z-10 flex items-center justify-between">
          <p className="text-[#3981FA] text-[10px] font-extrabold uppercase tracking-widest text-center flex-grow">
            {isMoving ? "Move Directory Node" : "Save to Collection"}
          </p>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-red-400 transition-colors absolute right-3"
          >
            <X size={12} />
          </button>
        </div>

        {/* TOP SECTION: Quick Save / Default Save */}
        {!hasDefaultFolder && (
          <div className="p-3 border-b border-gray-100 dark:border-slate-900/60 relative z-10">
            <button 
              onClick={() => handleAction(null)}
              className="w-full bg-[#3981FA] hover:bg-blue-600 text-white py-2 rounded-xl font-bold text-xs shadow-md shadow-[#3981FA]/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isMoving ? <MoveRight size={13} /> : <Plus size={13} strokeWidth={3} />} 
              <span>{isMoving ? "Move to Saved Tools" : "Normal Save"}</span>
            </button>
          </div>
        )}

        {/* MIDDLE SECTION: Search & Folders Scroll Track */}
        <div className="p-3 border-b border-gray-100 dark:border-slate-900/60 bg-slate-50/50 dark:bg-[#141722]/20 relative z-10">
          
          {/* Enhanced Search Input */}
          <div className="relative flex items-center group mb-2.5">
            <Search size={12} className="absolute left-3 text-slate-400 group-focus-within:text-[#3981FA] transition-colors" />
            <input
              type="text"
              placeholder="Search folders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-[#141722]/60 border border-gray-200/60 dark:border-slate-800/80 pl-8 pr-4 py-1.5 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
            />
          </div>

          {/* Folder Listing Container */}
          <div className="max-h-40 overflow-y-auto pr-1 space-y-0.5 scrollbar-premium">
            {filteredFolders.map((folder) => {
              const isCurrentFolder = savedEntry?.folderId?._id === folder._id || savedEntry?.folderId === folder._id;
              
              return (
                <button
                  key={folder._id}
                  onClick={() => handleAction(folder._id)}
                  disabled={isCurrentFolder}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1c1f2c] text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-all text-xs capitalize flex items-center justify-between group disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2 truncate">
                    {isCurrentFolder ? (
                      <FolderCheck size={13} className="text-[#3981FA]" />
                    ) : (
                      <Folder size={13} className="text-slate-400 dark:text-gray-500 group-hover:text-[#3981FA] transition-colors" />
                    )}
                    <span className="truncate font-medium">{folder.name}</span>
                  </div>
                  {isCurrentFolder && (
                    <span className="text-[8px] font-bold bg-[#3981FA]/10 text-[#3981FA] px-1.5 py-0.5 rounded uppercase tracking-wide">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
            
            {filteredFolders.length === 0 && searchTerm && (
              <p className="text-center py-4 text-slate-400 dark:text-gray-600 text-[11px] font-medium italic">
                No folders found
              </p>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: Create/Inline Input Footer */}
        <div className="p-3 bg-slate-50 dark:bg-[#13151a]/40 relative z-10">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-1 bg-white dark:bg-[#0c0e14] border border-gray-200 dark:border-slate-800/80 px-2.5 py-1.5 rounded-lg text-xs text-gray-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-[#3981FA] dark:focus:border-[#3981FA]/60 transition-all"
            />
            <button
              onClick={() => handleAction(null, newFolderName)}
              disabled={!newFolderName.trim()}
              className="bg-[#3981FA] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-[#3981FA]/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.96]"
            >
              {isMoving ? "Move" : "Create"}
            </button>
          </div>
        </div>
      </div>

      {/* Stylesheet injector for custom sub-scroll tracks */}
      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 3px; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: rgba(57, 129, 250, 0.2); border-radius: 10px; }
        @keyframes modalInSpring {
          from { opacity: 0; transform: scale(0.96) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modalInSpring 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default SaveToFolderModal;