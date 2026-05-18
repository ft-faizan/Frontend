import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecentTools } from "../../hooks/useRecentTools.js";
// Make sure you import the correct actions
import {
  saveTool,
  deleteSavedTool,
} from "../../features/savedTools/savedToolSlice.js";
import SaveToFolderModal from "../reuseable_compo/SaveToFolderModal.jsx";
import { addToTrash } from "../../utils/trashStorage";

const ToolCard = ({ tool, mode, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { addRecentTool } = useRecentTools();
  const [modalOpen, setModalOpen] = useState(false);

  // 1. Get saved tools to check status
  const { savedItems } = useSelector((state) => state.savedTools);

  // 🧩 STEP 1 — ADD THIS (TOP OF FILE)
  const isSavedMode = mode === "saved";

  // ✅ Always get correct tool
  const platformTool = isSavedMode ? tool.toolId : tool;

  // ✅ Find saved item
  const savedEntry = isSavedMode
    ? tool
    : savedItems.find(
        (item) => item.toolId?._id === tool._id || item.toolId === tool._id,
      );

  const isSaved = !!savedEntry;

  // ✅ Display data
  const name = isSavedMode ? tool.toolId?.name || tool.toolname : tool.name;

  const link = isSavedMode ? tool.toolId?.link || tool.toollink : tool.link;

  const image = isSavedMode
    ? tool.toolId?.image?.url || tool.image?.url
    : tool.image?.url;

  const isCustom = tool.type === "custom";

  // 🧩 STEP 2 — DO NOT TOUCH THIS (already correct)
  const handleLeftClickAction = () => {
    setModalOpen(true);
  };

  const handleRightClickAction = (e) => {
    e.preventDefault();

    if (isSaved) {
      dispatch(deleteSavedTool(savedEntry._id));
    } else {
      const formData = new FormData();
      formData.append("type", "platform");
      formData.append("toolId", tool._id);
      dispatch(saveTool(formData));
    }
  };

  return (
    <div className="bg-[#1c1f26] border border-[#2a2d3a] rounded-2xl overflow-hidden hover:border-[#3380FF]/50 transition-all group">
      <div className="relative aspect-video bg-[#13151a] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        {mode === "superadmin" && (
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
            By: {tool.addedBy?.email || "Unknown"}
          </span>
        )}

        <h3 className="text-white font-bold text-lg truncate capitalize mt-1">
          {name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mt-1 h-10">
          {tool.description}
        </p>

        <div className="mt-5 flex gap-2">
          {/* 1. ADMIN / SUPERADMIN MODE */}
          {(mode === "admin" || mode === "superadmin") && (
            <>
              <button
                onClick={() => onEdit(tool)}
                className="flex-1 bg-[#2a2d3a] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#3380FF]"
              >
                Edit
              </button>
              {/* 🔥 FIXED: Admin should use onDelete (Platform Delete) */}
              <button
                onClick={() => onDelete(tool._id)}
                className="px-3 bg-red-500/10 text-red-500 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all"
              >
                Delete
              </button>
            </>
          )}

          {/* 2. PUBLIC MODE (Browsing Categories) */}
          {mode === "public" && (
            <>
              {/* <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#3380FF] text-white text-center py-2 rounded-lg text-sm font-bold flex items-center justify-center"
              >
                Go Site
              </a> */}

              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  addRecentTool({
                    _id: tool._id || tool.toolId?._id,
                    name,
                    link,
                    image,
                  })
                }
                className="flex-1 bg-[#3380FF] ..."
              >
                Go Site
              </a>

              <button
                onClick={handleLeftClickAction}
                onContextMenu={handleRightClickAction}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                  isSaved
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-[#2a2d3a] text-white border-transparent"
                }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </>
          )}

          {/* 🧩 STEP 3 — FIX SAVED PAGE BUTTON */}
          {/* {mode === "saved" && (
            <>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#3380FF] text-white text-center py-2 rounded-lg text-sm font-bold"
              >
                Open
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 bg-[#2a2d3a] text-white py-2 rounded-lg text-sm font-semibold"
              >
                Move
              </button>
              
              <button
                onClick={() => dispatch(deleteSavedTool(tool._id))}
                className="px-3 bg-red-500/10 text-red-500 py-2 rounded-lg text-sm"
              >
                Remove
              </button>
            </>
          )} */}
          {mode === "saved" && (
            <>
              {/* OPEN TOOL */}
              {/* <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#3380FF] text-white text-center py-2 rounded-lg text-sm font-bold"
              >
                Open
              </a> */}

              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  addRecentTool({
                    _id: tool._id || tool.toolId?._id,
                    name,
                    link,
                    image,
                  })
                }
                className="flex-1 bg-[#3380FF] ..."
              >
                Open
              </a>

              {/* ✏️ EDIT — ONLY FOR CUSTOM */}
              {tool.type === "custom" && (
                <button
                  onClick={() => onEdit(tool)}
                  className="flex-1 bg-yellow-500/10 text-yellow-400 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 hover:text-white transition-all"
                >
                  Edit
                </button>
              )}

              {/* 📂 MOVE — FOR BOTH */}
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 bg-[#2a2d3a] text-white py-2 rounded-lg text-sm font-semibold"
              >
                Move
              </button>

              {/* ❌ REMOVE */}
              {/* <button
                onClick={() => dispatch(deleteSavedTool(tool._id))}
                className="px-3 bg-red-500/10 text-red-500 py-2 rounded-lg text-sm"
              >
                Delete
              </button> */}
              {/* <button
                onClick={() => dispatch(deleteSavedTool(tool._id))}
                className="px-3 bg-red-500/10 text-red-500 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all"
              >
                {isCustom ? "Delete" : "Remove"}
              </button> */}
              <button
                onClick={() => {
                  // ONLY CUSTOM TOOLS GO TO TRASH
                  // if (isCustom) {
                  //   addToTrash(tool);
                  // }
                  if (isCustom) {
                    const trashPayload = {
                      _id: tool._id,

                      toolname: tool.toolname || name,

                      toollink: tool.toollink || link,

                      description: tool.description || "",

                      type: "custom",

                      // IMPORTANT
                      image: tool.image,

                      imageUrl: tool.image?.url || "",

                      imageType: tool.image?.fileId ? "upload" : "url",
                    };

                    addToTrash(trashPayload);
                  }

                  // REMOVE TOOL
                  dispatch(deleteSavedTool(tool._id));
                }}
                className="px-3 bg-red-500/10 text-red-500 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all"
              >
                {isCustom ? "Delete" : "Remove"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🧩 STEP 4 — FIX MODAL (VERY IMPORTANT) */}
      <SaveToFolderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tool={platformTool}
        savedEntry={savedEntry}
      />
    </div>
  );
};

export default ToolCard;
