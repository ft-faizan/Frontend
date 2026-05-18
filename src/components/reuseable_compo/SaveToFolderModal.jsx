
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../features/folders/folderSlice";
import { saveTool, moveSavedTool } from "../../features/savedTools/savedToolSlice";
import { useToast } from "../../context/ToastContext"; 

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
      // Reset inputs when modal opens
      setSearchTerm("");
      setNewFolderName("");
    }
  }, [open, dispatch]);

  if (!open) return null;

  // Filter folders based on user search
//   const filteredFolders = folders.filter((f) =>
//     f.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  const filteredFolders = folders
  .filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    // Default folder first
    if (a.type === "default" && b.type !== "default") return -1;
    if (a.type !== "default" && b.type === "default") return 1;

    // Then alphabetical
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
    )
    // V1
//     .then((action) => {
//       if (action.meta.requestStatus === "fulfilled") {
        
//         // 🔥 Only refresh if new folder
//         if (newName) {
//           dispatch(getFolders());
//         }

//         // ✅ CLOSE AFTER EVERYTHING DONE
//         onClose();
//       }
//     }
// );

// V2
.then((action) => {
  if (action.meta.requestStatus === "fulfilled") {

    const message = action.payload?.message || "Action successful ✅";

    showToast(message, "success");

    if (newName) {
      dispatch(getFolders());
    }

    // onClose();
    setTimeout(() => {
  onClose();
}, 100);
  } 
  else {
    // ❌ ERROR TOAST FROM BACKEND
    const errorMsg = action.payload || "Something went wrong ❌";

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

        if (newName) {
          dispatch(getFolders());
        }

        onClose(); // ✅ move here
      }
    });
  }
};
return (
    <div 
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#1c1f26] border border-[#2a2d3a] w-full max-w-[280px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER INDICATOR */}
        <div className="bg-[#3380FF]/10 py-2 px-4 border-b border-[#2a2d3a]">
           <p className="text-[#3380FF] text-[10px] font-bold uppercase tracking-widest text-center">
             {isMoving ? "Move to different folder" : "Save to folder"}
           </p>
        </div>

        {/* TOP SECTION: Quick Save / Default Save */}
        {/* <div className="p-3 border-b border-[#2a2d3a]">
          <button 
            onClick={() => handleAction(null)}
            className="w-full bg-[#3380FF] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <span>{isMoving ? "📦" : "+"}</span> 
            {isMoving ? "Move to Saved Tools" : "Normal Save"}
          </button>
        </div> */}
        {!hasDefaultFolder && (
  <div className="p-3 border-b border-[#2a2d3a]">
    <button 
      onClick={() => handleAction(null)}
      className="w-full bg-[#3380FF] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
    >
      <span>{isMoving ? "📦" : "+"}</span> 
      {isMoving ? "Move to Saved Tools" : "Normal Save"}
    </button>
  </div>
)}

        {/* MIDDLE SECTION: Search & Folders */}
        <div className="p-3 border-b border-[#2a2d3a] bg-[#13151a]/50">
          <input
            type="text"
            placeholder="Search folders..."
            className="w-full bg-[#13151a] border border-[#2a2d3a] p-2 rounded-lg text-xs text-white focus:border-[#3380FF] outline-none mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="max-h-40 overflow-y-auto custom-scrollbar space-y-1 pr-1">
            {filteredFolders.map((folder) => {
              // Check if the tool is already in this folder
              const isCurrentFolder = savedEntry?.folderId?._id === folder._id || savedEntry?.folderId === folder._id;
              
              return (
                <button
                  key={folder._id}
                  onClick={() => handleAction(folder._id)}
                  disabled={isCurrentFolder}
                  className="w-full text-left p-2 rounded-lg hover:bg-[#2a2d3a] text-gray-400 hover:text-white transition-all text-xs capitalize flex items-center justify-between group disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-2">
                    <span>📁</span>
                    <span className="truncate">{folder.name}</span>
                  </div>
                  {isCurrentFolder && <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-blue-400 uppercase">Current</span>}
                </button>
              );
            })}
            {filteredFolders.length === 0 && searchTerm && (
              <p className="text-center py-2 text-gray-500 text-[10px] italic">No folder found</p>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: Create New */}
        <div className="p-3 bg-[#13151a]">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="New folder..."
              className="flex-1 bg-[#1c1f26] border border-[#2a2d3a] p-2 rounded-lg text-[10px] text-white outline-none focus:border-gray-500"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button
              onClick={() => handleAction(null, newFolderName)}
              disabled={!newFolderName.trim()}
              className="bg-white text-black px-3 py-2 rounded-lg text-[10px] font-bold disabled:opacity-50"
            >
              {isMoving ? "Move" : "Create"}
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="w-full mt-3 text-gray-500 text-[10px] hover:text-red-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveToFolderModal;