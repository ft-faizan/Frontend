// v2
import { useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRecentTools } from "../../hooks/useRecentTools.js";
import {
  saveTool,
  deleteSavedTool,
} from "../../features/savedTools/savedToolSlice.js";
import SaveToFolderModal from "../reuseable_compo/SaveToFolderModal.jsx";
import { addToTrash } from "../../utils/trashStorage";
import { useToast } from "../../context/ToastContext";
import ConfirmModal from "../reuseable_compo/ConfirmModal.jsx";

const ToolCard = ({ tool, mode, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { addRecentTool } = useRecentTools();
  const [modalOpen, setModalOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { savedItems } = useSelector((state) => state.savedTools);
   // after your useState declarations
const isSaving = useRef(false);
  const isSavedMode = mode === "saved";
  const platformTool = isSavedMode ? tool.toolId : tool;

  const savedEntry = isSavedMode
    ? tool
    : savedItems.find(
        (item) => item.toolId?._id === tool._id || item.toolId === tool._id,
      );

  const isSaved = !!savedEntry;
  const isCustom = tool.type === "custom";

  const name = isSavedMode ? tool.toolId?.name || tool.toolname : tool.name;
  const link = isSavedMode ? tool.toolId?.link || tool.toollink : tool.link;
  const image = isSavedMode
    ? tool.toolId?.image?.url || tool.image?.url
    : tool.image?.url;

  // ── logic handlers — untouched ───────────────────────────────────────────
  const handleLeftClickAction = () => setModalOpen(true);

  // const handleRightClickAction = (e) => {
  //   e.preventDefault();
  //   if (isSaved) {
  //     dispatch(deleteSavedTool(savedEntry._id));
  //     showToast("Tool removed from saved", "success");
  //   } else {
  //     const formData = new FormData();
  //     formData.append("type", "platform");
  //     formData.append("toolId", tool._id);
  //     dispatch(saveTool(formData));
  //     showToast("Tool saved successfully", "success");
  //   }
  // };

  const handleRightClickAction = (e) => {
  e.preventDefault();
  if (isSaved) {
    dispatch(deleteSavedTool(savedEntry._id));
    showToast("Tool removed from saved", "success");
    return;
  }

  // ✅ Block if already saving
  if (isSaving.current) return;
  isSaving.current = true;

  const formData = new FormData();
  formData.append("type", "platform");
  formData.append("toolId", tool._id);

  dispatch(saveTool(formData))
    .finally(() => {
      isSaving.current = false;
    });

  showToast("Tool saved successfully", "success");
};

  const handleTrashAndDelete = () => {
    if (isCustom) {
      const trashPayload = {
        _id: tool._id,
        toolname: tool.toolname || name,
        toollink: tool.toollink || link,
        description: tool.description || "",
        type: "custom",
        image: tool.image,
        imageUrl: tool.image?.url || "",
        imageType: tool.image?.fileId ? "upload" : "url",
      };
      addToTrash(trashPayload);
    }
    dispatch(deleteSavedTool(tool._id));
    showToast("Tool moved to trash", "success");
  };

  // ── toast-wrapped admin/superadmin handlers ──────────────────────────────
  const handleAdminEdit = () => {
    onEdit(tool);
    showToast(`Editing "${name}"`, "success");
  };

  const handleAdminDelete = () => {
    onDelete(tool._id);
    showToast(`"${name}" deleted`, "success");
  };

  const handleSaveToFolder = () => {
    setModalOpen(true);
    showToast("Choose a folder to save to", "success");
  };

  const handleMoveFolder = () => {
    setModalOpen(true);
    showToast("Choose a folder to move to", "success");
  };

  // const handlePublicSave = () => {
  //   handleLeftClickAction();
  //   if (!isSaved) showToast("Select a folder to save this tool", "success");
  // };

  const handlePublicSave = () => {
  if (isSaving.current) return; // ✅ Block double-click on Save button too
  handleLeftClickAction();
  if (!isSaved) showToast("Select a folder to save this tool", "success");
};

  const cardH = mode === "saved" && isCustom ? 155 : 155;

  // ── BUTTON STYLES ────────────────────────────────────────────────────────
  const btnBase = `
    w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg 
    text-[11px] font-semibold tracking-wide 
    transition-all duration-200 ease-out
    active:scale-[0.97] select-none whitespace-nowrap
    cursor-pointer
  `;

  const btnPrimary = `${btnBase}
    bg-[#3380FF] text-white
    hover:bg-[#2770E6] 
    shadow-sm hover:shadow-md
    hover:-translate-y-[1px]
  `;

  const btnSecondary = `${btnBase}
    bg-[#3380FF]/10 text-[#3380FF]
    hover:bg-[#3380FF] hover:text-white
    border border-[#3380FF]/20
    hover:shadow-md
    hover:-translate-y-[1px]
  `;

  const btnDanger = `${btnBase}
    bg-red-50 text-red-600
    hover:bg-red-600 hover:text-white
    border border-red-200
    hover:shadow-md
    hover:-translate-y-[1px]
    dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20
    dark:hover:bg-red-500 dark:hover:text-white
  `;

  const btnSuccess = `${btnBase}
    bg-emerald-50 text-emerald-700
    border border-emerald-200
    cursor-default
    dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20
  `;

  const btnSqBase = `
    flex-1 flex items-center justify-center gap-1 py-1.5 px-1 rounded-lg 
    text-[10px] font-semibold tracking-wide transition-all duration-200 
    active:scale-[0.97] select-none cursor-pointer
  `;

  const btnSqPrimary = `${btnSqBase}
    bg-[#3380FF] text-white
    hover:bg-[#2770E6]
    shadow-sm hover:shadow-md
  `;

  const btnSqSecondary = `${btnSqBase}
    bg-[#3380FF]/10 text-[#3380FF]
    hover:bg-[#3380FF] hover:text-white
    border border-[#3380FF]/20
  `;

  const btnSqDanger = `${btnSqBase}
    bg-red-50 text-red-600
    hover:bg-red-600 hover:text-white
    border border-red-200
    dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20
    dark:hover:bg-red-500 dark:hover:text-white
  `;

  // ── icons ─────────────────────────────────────────────────────────────────
  const IconExternal = () => (
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );

  const IconEdit = () => (
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  const IconFolder = () => (
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
  );

  const IconTrash = () => (
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );

  const IconSave = () => (
    <svg
      className="w-3 h-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3-7 3V5z"
      />
    </svg>
  );

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ height: cardH }}
        className="
          relative w-full max-w-[148px]
          flex flex-col items-center justify-center
          bg-white dark:bg-[#0c0e14]
          border border-gray-200 dark:border-[#1c1f2c]
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-250 ease-out
          hover:-translate-x-1 hover:-translate-y-1
          shadow-sm hover:shadow-xl
          hover:border-[#3380FF] dark:hover:border-[#3380FF]
        "
      >
        {/* Shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, rgba(51,128,255,0.05) 50%, transparent 60%)",
            transform: hovered
              ? "translateX(200%) skewX(-20deg)"
              : "translateX(-100%) skewX(-20deg)",
            transition: hovered ? "transform 0.7s ease-out" : "none",
          }}
        />

        {/* ── DEFAULT: icon + name ── */}
        <div
          className="flex flex-col items-center justify-center p-3 w-full transition-all duration-250"
          style={{
            opacity: hovered ? 0 : 1,
            transform: hovered
              ? "scale(0.8) translateY(-8px)"
              : "scale(1) translateY(0)",
            pointerEvents: hovered ? "none" : "auto",
          }}
        >
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06] shadow-sm">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#3380FF] to-[#2770E6] flex items-center justify-center">
                <span className="text-white font-black text-xl uppercase">
                  {name?.charAt(0) || "?"}
                </span>
              </div>
            )}
            {isSaved && mode !== "saved" && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0c0e14]" />
            )}
            {isCustom && (
              <span className="absolute bottom-1 left-1 w-2 h-2 rounded-full bg-amber-400 border border-white dark:border-[#0c0e14]" />
            )}
          </div>

          <p
            className="mt-2.5 text-center text-[11px] font-bold text-gray-800 dark:text-gray-300 truncate w-full px-2 tracking-wide"
            title={name}
          >
            {name}
          </p>
        </div>

        {/* ── HOVER: action buttons ── */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col justify-between p-2.5 transition-all duration-250"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "scale(1) translateY(0)"
              : "scale(0.95) translateY(8px)",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          {/* Mini tool name header */}
          <p className="text-[9px] font-black tracking-[0.15em] uppercase text-[#3380FF] truncate w-full text-center pb-1.5 border-b border-gray-100 dark:border-white/[0.06]">
            {name}
          </p>

          {/* ── PUBLIC ── */}
          {mode === "public" && (
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  addRecentTool({
                    _id: tool._id || tool.toolId?._id,
                    name,
                    link,
                    image,
                  });
                  showToast(`Opening "${name}"`, "success");
                }}
                className={btnPrimary}
              >
                <IconExternal /> Go to Site
              </a>
              <button
                onClick={handlePublicSave}
                onContextMenu={handleRightClickAction}
                className={isSaved ? btnSuccess : btnSecondary}
              >
                <IconSave /> {isSaved ? "Saved ✓" : "Save"}
              </button>
            </div>
          )}

          {/* ── SAVED — PLATFORM (Open, Move, Remove) ── */}
          {mode === "saved" && !isCustom && (
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  addRecentTool({
                    _id: tool._id || tool.toolId?._id,
                    name,
                    link,
                    image,
                  });
                  showToast(`Opening "${name}"`, "success");
                }}
                className={btnPrimary}
              >
                <IconExternal /> Open
              </a>
              <button onClick={handleMoveFolder} className={btnSecondary}>
                <IconFolder /> Move
              </button>
              {/* <button onClick={handleTrashAndDelete} */}
              <button onClick={() => setRemoveOpen(true)} className={btnDanger}>
                <IconTrash /> Remove
              </button>
            </div>
          )}

          {/* ── SAVED — CUSTOM (Open+Edit row, Move+Delete row) ── */}
          {mode === "saved" && isCustom && (
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              <div className="flex gap-1.5">
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    addRecentTool({
                      _id: tool._id || tool.toolId?._id,
                      name,
                      link,
                      image,
                    });
                    showToast(`Opening "${name}"`, "success");
                  }}
                  className={btnSqPrimary}
                >
                  <IconExternal /> Open
                </a>
                <button
                  onClick={() => {
                    onEdit(tool);
                    showToast(`Editing "${name}"`, "success");
                  }}
                  className={btnSqSecondary}
                >
                  <IconEdit /> Edit
                </button>
              </div>
              <div className="flex gap-1.5">
                <button onClick={handleMoveFolder} className={btnSqSecondary}>
                  <IconFolder /> Move
                </button>
                <button
                  // onClick={handleTrashAndDelete}
                  onClick={() => setRemoveOpen(true)}
                  className={btnSqDanger}
                >
                  <IconTrash /> Del
                </button>
              </div>
            </div>
          )}

          {/* ── ADMIN ── */}
          {mode === "admin" && (
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              <button onClick={handleAdminEdit} className={btnPrimary}>
                <IconEdit /> Edit
              </button>
              <button
                // onClick={handleAdminDelete}
                onClick={() => setDeleteOpen(true)}
                className={btnDanger}
              >
                <IconTrash /> Delete
              </button>
            </div>
          )}

          {/* ── SUPERADMIN ── */}
          {mode === "superadmin" && (
            <div className="flex flex-col gap-1.5 flex-1 justify-center">
              <span className="text-[9px] font-mono text-center text-[#3380FF] bg-[#3380FF]/10 border border-[#3380FF]/20 py-0.5 rounded-lg truncate w-full block">
                {tool.addedBy?.email || "System"}
              </span>
              <button onClick={handleAdminEdit} className={btnPrimary}>
                <IconEdit /> Edit
              </button>
              <button
                // onClick={handleAdminDelete}
                onClick={() => setDeleteOpen(true)}
                className={btnDanger}
              >
                <IconTrash /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <SaveToFolderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tool={platformTool}
        savedEntry={savedEntry}
      />
      <ConfirmModal
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onConfirm={handleTrashAndDelete}
        title="Remove Tool"
        message={`Are you sure you want to remove "${name}"?`}
        confirmText="Remove"
        cancelText="Cancel"
        type="danger"
      />

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleAdminDelete}
        title="Delete Tool"
        message={`Are you sure you want to permanently delete "${name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default ToolCard;







