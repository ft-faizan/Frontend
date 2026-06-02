

// gimini
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../features/categories/categorySlice";
import { getCategoryPreviewTools } from "../../features/tools/toolSlice";
import { useToast } from "../../context/ToastContext";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../reuseable_compo/ConfirmModal";

// 💡 Added `onEdit` to the props
function CategoryCard({ category, mode, showCreator = true, onEdit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((state) => state.auth.user);
  const preview = useSelector(
    (state) => state.tools.categoryPreview?.[category._id],
  );

  const previewTools = preview?.tools || [];
  const totalTools = preview?.total || 0;
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredToolId, setHoveredToolId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategoryPreviewTools(category._id));
  }, [dispatch, category._id]);

  const createdById =
    typeof category.createdBy === "object"
      ? category.createdBy?._id
      : category.createdBy;
  const isOwner = user?._id?.toString() === createdById?.toString();
  const canEdit = mode === "superadmin" || (mode === "admin" && isOwner);
  const canDelete = mode === "superadmin";

  const marqueeTools = useMemo(() => {
    if (previewTools.length === 0) return [];
    return [...previewTools, ...previewTools, ...previewTools];
  }, [previewTools]);

  

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await dispatch(deleteCategory(category._id)).unwrap();

      showToast("Category deleted successfully", "success");
    } catch (err) {
      showToast(err || "Delete failed", "error");
    } finally {
      setIsDeleting(false);

      setDeleteModalOpen(false);
    }
  };

  const handleImageError = (toolId) => {
    setImageErrors((prev) => ({ ...prev, [toolId]: true }));
  };

  const handleToolClick = (toolId) => {
    if (toolId) navigate(`/tools/${toolId}`);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#fcfcff] bg-gradient-to-br from-[#6190e243] to-[#3165D9]/15 hover:border-[#3365E1]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#3380FF]/10">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3380FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* MARQUEE SECTION */}
      <div className="relative h-48 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.15),transparent_40%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(51,128,255,0.25),transparent_40%)] transition-all duration-500" />

        <div
          className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #3380FF 1px, transparent 1px), linear-gradient(-45deg, #3380FF 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-b from-white via-white/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-16 z-10 pointer-events-none bg-gradient-to-t from-white via-white/50 to-transparent" />

        {previewTools.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#3981FA] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#3981FA] text-sm font-medium">No tools yet</p>
            </div>
          </div>
        )}

        {previewTools.length > 0 && (
          <div className="absolute inset-0 overflow-hidden py-4">
            <div className="marquee-row mb-6">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <button
                    key={`${tool._id}-top-${idx}`}
                    onClick={() => handleToolClick(tool._id)}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id]
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image?.url
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
                      {tool.name}
                    </span>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="marquee-row reverse">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <button
                    key={`${tool._id}-bottom-${idx}`}
                    // onClick={() => handleToolClick(tool._id)}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id]
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image?.url
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap hidden sm:inline font-medium transition-colors duration-300">
                      {tool.name}
                    </span>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap sm:hidden font-medium">
                      {tool.name.slice(0, 2).toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORY NAME & STATS */}
        <div className="absolute left-5 bottom-1 z-20 rounded-2xl border border-white/40 transition-all duration-300">
          <h3 className="text-gray-900 text-xl font-bold capitalize tracking-tight leading-tight">
            {category.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#3380FF] to-[#2770E6] animate-pulse" />
            <p className="text-xs text-gray-600 font-medium">
              {/* {previewTools.length}+ Web Tools */}
              {totalTools}+ Web Tools
            </p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-5 relative z-10">
        {showCreator && (
          <div className="mb-4 p-3 rounded-xl bg-[#3380FF]/5 border border-[#3380FF]/10 transition-all duration-300 group-hover:bg-[#3380FF]/10">
            <p className="text-xs text-gray-600">
              Created by{" "}
              <span className="text-[#3380FF] font-bold">
                {category.createdBy?.email?.split("@")[0] || "Anonymous"}
              </span>
            </p>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() =>
              navigate(`/categories/${category._id}/folders`, {
                state: { name: category.name },
              })
            }
            className="flex-1 min-w-[120px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3380FF] to-[#2770E6] hover:from-[#2770E6] hover:to-[#1860D6] text-white text-sm font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-[#3380FF]/30 relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>View All</span>
              <svg
                className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </button>

          {canEdit && (
            <button
              onClick={() => onEdit(category)} // 💡 Passes the current category details back up to the parent layer
              className="px-4 py-2.5 rounded-xl border-2 border-[#3380FF] hover:border-[#2770E6] text-sm text-[#3380FF] font-bold transition-all duration-300 hover:bg-[#3380FF]/10 active:scale-95 relative overflow-hidden group/edit"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </span>
            </button>
          )}

          {canDelete && (
            <button
              // onClick={handleDelete}
              onClick={() => setDeleteModalOpen(true)}
              disabled={isDeleting}
              className="px-4 py-2.5 rounded-xl bg-red-500/90 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm text-white font-bold transition-all duration-300 active:scale-95 shadow-lg hover:shadow-red-500/30 relative overflow-hidden group/del"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </>
                )}
              </span>
            </button>
          )}
        </div>
      </div>
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${category.name}" category?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <style>{`
        .marquee-row { display: flex; width: max-content; animation: marqueeLeft 32s linear infinite; will-change: transform; }
        .marquee-row.reverse { animation: marqueeRight 32s linear infinite; }
        .marquee-track { display: flex; width: max-content; gap: 1rem; }
        .pill-card { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 999px; background: white; border: 1.5px solid #3981FA; backdrop-filter: blur(10px); cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); min-width: max-content; box-shadow: 0 4px 12px rgba(51, 128, 255, 0.1); }
        .pill-card:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.95); border-color: rgba(51, 128, 255, 0.7); box-shadow: 0 8px 20px rgba(51, 128, 255, 0.25); }
        .pill-card:active { transform: scale(0.96); }
        @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRight { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .group:hover .marquee-row { animation-play-state: paused; }
        .group/btn svg, .group/edit svg, .group/del svg { transition: transform 0.3s ease; }
        @media (max-width: 480px) {
          .pill-card { padding: 8px 14px; gap: 6px; }
          .pill-card span { font-size: 12px; }
          .marquee-row { animation-duration: 26s; }
        }
      `}</style>
    </div>
  );
}

export default CategoryCard;
