// pages/dashboard/components/SearchOverlay.jsx
import { useState, useEffect, useRef } from "react";
import { FaAnglesRight, FaArrowLeftLong } from "react-icons/fa6";
import ToolCardList from "../../../components/reuseable_compo/ToolCardList";

function SearchOverlay({
  searchTerm,
  setSearchTerm,
  tools,
  toolsLoading,
  hasSearched,
  onClose,
  onRefreshStats,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center animate-overlay-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" onClick={onClose} />
      <div className="relative z-10 w-full h-screen flex flex-col gap-0 animate-panel-in p-5 items-center pt-[180px]">
        <div className="relative md:w-3/6 w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3380FF]/30 to-purple-500/30 rounded-2xl blur-md" />
          <div className="relative flex items-center bg-[#0d0f18] border border-[#3380FF]/50 rounded-2xl overflow-hidden shadow-2xl shadow-[#3380FF]/10">
            <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
              {toolsLoading ? (
                <svg className="h-5 w-5 animate-spin text-[#3380FF]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Webs.........."
              className="flex-1 bg-transparent py-4 pr-1 text-white placeholder:text-gray-600 outline-none text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mr-1 w-10 h-6 flex items-center justify-center rounded-lg bg-[#EE636D] hover:bg-[#2a2d3a] text-white hover:text-white transition-all text-xs flex-shrink-0"
              >
                clear
              </button>
            )}
            <button
              onClick={onClose}
              className="mr-4 text-[10px] text-white hover:text-gray-300 border border-[#2a2d3a] rounded-lg px-2 py-1 transition-all flex justify-center items-center"
            >
              Back <FaAnglesRight />
            </button>
          </div>
        </div>

        <div className="mt-3 bg-[#0d0f18]/95 border border-[#1e2130] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden md:w-3/6 w-full">
          {(hasSearched || toolsLoading) && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2130]">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-5 rounded-full bg-[#3380FF]" />
                <span className="text-sm text-white font-medium">
                  {toolsLoading ? (
                    "Searching…"
                  ) : (
                    <>
                      Results for <span className="text-[#3380FF] font-semibold">"{searchTerm}"</span>
                    </>
                  )}
                </span>
              </div>
              {!toolsLoading && hasSearched && (
                <span className="text-[11px] font-mono text-white bg-[#3380FF] px-2 py-0.5 rounded-lg pt-[4px]">
                  {tools?.length ?? 0} found
                </span>
              )}
            </div>
          )}

          {toolsLoading && (
            <div className="flex items-center justify-center gap-3 py-14">
              <svg className="h-6 w-6 animate-spin text-[#3380FF]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="text-gray-400 text-sm">Searching tools...</span>
            </div>
          )}

          {!toolsLoading && hasSearched && tools?.length > 0 && (
            <div className="w-full overflow-y-auto overflow-x-hidden p-4 select-none modern-scrollbar" style={{ maxHeight: "55vh" }}>
              <ToolCardList
                tools={tools}
                mode="public"
                loading={false}
                onSaveToggle={onRefreshStats}
              />
            </div>
          )}
          {!toolsLoading && hasSearched && (!tools || tools.length === 0) && (
            <div className="flex flex-col items-center justify-center py-14 gap-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-300">No tools found</p>
                <p className="text-xs text-gray-600 mt-1">Try a different keyword</p>
              </div>
            </div>
          )}

          {!toolsLoading && !hasSearched && !searchTerm && (
            <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-700">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">Start typing to search your library</p>
            </div>
          )}

          <div className="px-5 py-2.5 border-t border-[#1e2130] flex items-center gap-4 text-[11px] text-white">
            <span className="flex justify-center items-center gap-2">
              <kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">↑↓</kbd> Navigate
            </span>
            <span className="flex justify-center items-center gap-2">
              <kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">Esc</kbd> Back
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <FaArrowLeftLong /> Short-Cuts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;