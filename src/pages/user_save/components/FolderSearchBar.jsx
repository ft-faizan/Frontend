// pages/user_save/components/FolderSearchBar.jsx
import { Search } from "lucide-react";

function FolderSearchBar({ searchQuery, onSearchChange }) {
  return (
    <div
      className="relative
        before:absolute before:inset-0
        before:rounded-2xl
        before:bg-white/[0.02]
        before:pointer-events-none
        w-full
        bg-gradient-to-br
        from-white/[0.06]
        to-white/[0.02]
        border border-white/[0.08]
        py-[10px]
        px-[15px]
        rounded-2xl
        flex flex-col md:flex-row
        items-stretch md:items-center
        gap-3
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
        backdrop-blur-2xl
        sticky top-2
        z-[30]"
    >
      <Search className="absolute left-8 z-[10] top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
      <div className="relative flex-grow flex items-center group min-w-[200px]">
        <input
          type="text"
          placeholder="Search folders..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-10 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
        />
      </div>
    </div>
  );
}

export default FolderSearchBar;