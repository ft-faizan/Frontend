


import React, { useState, useMemo } from "react";
import { Pencil, Trash2, ArrowRight } from "lucide-react";
import SlidingButton from "../reuseable_compo/SlidingButton";

const EditIcon = () => (
  <Pencil size={14} color="white" />
);

const TrashIcon = () => (
  <Trash2 size={14} color="white" />
);

const ArrowIcon = () => (
  <ArrowRight size={14} color="white" />
);

const FolderCard = ({ folder, onNavigate, onEdit, onDelete }) => {
  const previewTools = folder.tools || [];
  const totalTools = folder.toolCount || 0;

  const [imageErrors, setImageErrors] = useState({});
  const [hoveredToolId, setHoveredToolId] = useState(null);

  const marqueeTools = useMemo(() => {
    if (previewTools.length === 0) return [];
    return [...previewTools, ...previewTools, ...previewTools];
  }, [previewTools]);

  const handleImageError = (toolId) => {
    setImageErrors((prev) => ({ ...prev, [toolId]: true }));
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-[#fcfcff] bg-gradient-to-br from-[#6190e243] to-[#3165D9]/15 hover:border-[#3365E1]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#3380FF]/10 flex flex-col justify-between">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#3380FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* MARQUEE PANEL */}
      <div className="relative h-48 bg-white overflow-hidden border-b border-[#e9eefc]">
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

        {previewTools.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#3981FA] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#3981FA] text-sm font-medium">No tools yet</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden py-4 flex flex-col justify-center">
            {/* Row 1 — forward */}
            <div className="marquee-row mb-6">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <div
                    key={`${tool._id}-top-${idx}`}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id] || !tool.image
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name || "T")}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap font-medium">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 — reverse */}
            <div className="marquee-row reverse">
              <div className="marquee-track flex gap-4">
                {marqueeTools.map((tool, idx) => (
                  <div
                    key={`${tool._id}-bottom-${idx}`}
                    onMouseEnter={() => setHoveredToolId(tool._id)}
                    onMouseLeave={() => setHoveredToolId(null)}
                    className="pill-card group/pill"
                    title={tool.name}
                  >
                    <div className="relative">
                      <img
                        src={
                          imageErrors[tool._id] || !tool.image
                            ? `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name || "T")}&background=3380FF&color=fff&bold=true&size=24`
                            : tool.image
                        }
                        alt={tool.name}
                        className="w-6 h-6 rounded-full object-cover flex-shrink-0 transition-transform duration-300 group-hover/pill:scale-110"
                        onError={() => handleImageError(tool._id)}
                      />
                      {hoveredToolId === tool._id && (
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[#3380FF]/20 animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-[#3981FA] whitespace-nowrap font-medium">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="p-5 relative z-10">
        {/* Title + Badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-gray-900 text-xl font-bold capitalize tracking-tight leading-tight truncate">
              {folder.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-[#3380FF] to-[#2770E6] animate-pulse" />
              <p className="text-xs text-gray-600 font-medium">
                {totalTools}+ Web Tools
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-2xl bg-[#3380FF]/10 flex items-center justify-center border border-[#3380FF]/15 flex-shrink-0">
            <span className="text-sm font-bold text-[#3380FF]">{totalTools}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-5 pt-4 border-t border-[#e9eefc] flex items-center justify-between gap-3">
          {/* Edit + Delete */}
          <div className="flex gap-2">
            <SlidingButton
              icon={<EditIcon />}
              text="Edit"
              width="w-[105px]"
              height="h-[40px]"
              bgColor="bg-[#3380FF]"
              iconBgColor="bg-[#2770E6]"
              borderColor="border-[#3380FF]/50"
              shadowColor="shadow-[#3380FF]/10"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(folder);
              }}
            />

            <SlidingButton
              icon={<TrashIcon />}
              text="Delete"
              width="w-[125px]"
              height="h-[40px]"
              bgColor="bg-red-500"
              iconBgColor="bg-red-600"
              borderColor="border-red-500/50"
              shadowColor="shadow-red-500/10"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(folder._id);
              }}
            />
          </div>

          {/* View All */}
          <SlidingButton
            icon={<ArrowIcon />}
            text="View"
            width="w-[115px]"
            height="h-[40px]"
            bgColor="bg-gradient-to-r from-[#3380FF] to-[#2770E6]"
            iconBgColor="bg-[#1860D6]"
            borderColor="border-[#3380FF]/50"
            shadowColor="shadow-[#3380FF]/10"
            onClick={() => onNavigate(folder)}
          />
        </div>
      </div>

      <style>{`
        .marquee-row { display: flex; width: max-content; animation: marqueeLeft 32s linear infinite; will-change: transform; }
        .marquee-row.reverse { animation: marqueeRight 32s linear infinite; }
        .marquee-track { display: flex; width: max-content; gap: 1rem; }
        .pill-card { display: flex; align-items: center; gap: 10px; padding: 10px 18px; border-radius: 999px; background: white; border: 1.5px solid #3981FA; backdrop-filter: blur(10px); cursor: pointer; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); min-width: max-content; box-shadow: 0 4px 12px rgba(51, 128, 255, 0.1); }
        .pill-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.95); border-color: rgba(51,128,255,0.7); box-shadow: 0 8px 20px rgba(51,128,255,0.25); }
        .pill-card:active { transform: scale(0.96); }
        @keyframes marqueeLeft { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRight { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
        .group:hover .marquee-row { animation-play-state: paused; }
        @media (max-width: 480px) {
          .pill-card { padding: 8px 14px; gap: 6px; }
          .pill-card span { font-size: 12px; }
          .marquee-row { animation-duration: 26s; }
        }
      `}</style>
    </div>
  );
};

export default FolderCard;