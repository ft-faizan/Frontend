// v5

import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Search, Filter, UserCheck } from "lucide-react";

function CategoryFilter({ mode = "superadmin", onFilterChange, users = [] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all"); // 'all' | 'mine' (styled like the image)
  const [email, setEmail] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus dropdown search input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Debounced filter update
  useEffect(() => {
    const delay = setTimeout(() => {
      onFilterChange?.({ search, type, email });
    }, 350);
    return () => clearTimeout(delay);
  }, [search, type, email, onFilterChange]);

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(emailSearch.toLowerCase()),
  );

  const selectedUserName = email ? email.split("@")[0] : null;
  const activeFiltersCount =
    (search ? 1 : 0) + (type !== "all" ? 1 : 0) + (email ? 1 : 0);

  const handleClearAll = () => {
    setSearch("");
    setType("all");
    setEmail("");
    setEmailSearch("");
  };

  return (
    <div
      className="
relative
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
z-[30]
"
    >
      {/* 1. SEARCH INPUT SECTION */}
      <div className="relative flex-grow flex items-center group">
        <Search
          size={18}
          className="absolute left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200"
        />
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 focus:border-none rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
        />
      </div>

      {/* 2. CREATOR DROPDOWN (Only shows for Superadmin/Admin based on mode) */}
      {mode === "superadmin" && (
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-full px-4 py-2.5 rounded-xl  text-xs font-semibold flex items-center justify-between gap-3 min-w-[160px] transition-all bg-white ${
              isOpen || email ? " text-slate-400" : " text-slate-400 "
            }`}
          >
            <span className="truncate">
              {selectedUserName ? `@${selectedUserName}` : "All Emails"}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-slate-300" : ""}`}
            />
          </button>

          {/* Clean Glassmorphic Dropdown Drawer */}
          {isOpen && (
            <div
              className="absolute right-0 z-50 w-64 mt-5 bg-[#CDDAF6]  rounded-xl shadow-2xl overflow-hidden animate-in shadow-[0_8px_32px_rgba(0,0,0,0.35)]
backdrop-blur-2xl"
            >
              <div className="p-2.5 ">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Filter by email..."
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg text-xs text-text-slate-600 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto scrollbar-premium bg-white">
                <button
                  onClick={() => {
                    setEmail("");
                    setIsOpen(false);
                    setEmailSearch("");
                  }}
                  className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] hover:text-white transition-colors ${!email ? "text-blue-400 bg-blue-500/5 font-medium" : "text-slate-400"}`}
                >
                  <span>All Categories</span>
                </button>

                {filteredUsers.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => {
                      setEmail(user.email);
                      setIsOpen(false);
                      setEmailSearch("");
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] hover:text-white border-t border-slate-200  transition-colors ${email === user.email ? "text-blue-400 bg-blue-500/5 font-medium" : "text-[#3978E3]"}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#CDDAF5] flex items-center justify-center text-[10px] font-bold text-[#3978E3] uppercase">
                      {user.email[0]}
                    </div>
                    <span className="truncate">{user.email}</span>
                  </button>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No creators found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. SEGMENTED TOGGLE PILLS (Matches the "All / Platform / Custom" look) */}
      {mode !== "user" && (
        <div className="flex p-1 bg-white border focus:border-[#2870EE] rounded-xl flex-shrink-0">
          <button
            onClick={() => setType("all")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              type === "all"
                ? "bg-[#3074E6] text-white shadow-lg shadow-blue-600/15"
                : "text-slate-400 hover:text-[#3074E6]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setType("mine")}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
              type === "mine"
                ? "bg-[#3074E6] text-white shadow-lg shadow-blue-600/15"
                : "text-slate-400 hover:text-[#3074E6]"
            }`}
          >
            Created by me
          </button>
        </div>
      )}

      {/* 4. CLEAR FILTERS TEXT ACTION */}
      <div className="flex items-center pl-1">
        <button
          onClick={handleClearAll}
          disabled={activeFiltersCount === 0}
          className={`text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
            activeFiltersCount > 0
              ? "text-slate-500 hover:text-red-400 cursor-pointer"
              : "text-slate-600 cursor-not-allowed opacity-40"
          }`}
        >
          Clear Filters
        </button>
      </div>

      {/* Custom Scroller Injection */}
      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 4px; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: #222533; border-radius: 10px; }
        @keyframes inlineFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: inlineFade 0.15s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default CategoryFilter;
