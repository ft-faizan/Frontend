



import { useState, useEffect, useRef } from "react";

function CategoryFilter({ mode = "user", onFilterChange, users = [] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [email, setEmail] = useState("");
  
  // New states for the custom email search
  const [emailSearch, setEmailSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ⏱️ DEBOUNCE
  useEffect(() => {
    const delay = setTimeout(() => {
      onFilterChange({ search, type, email });
    }, 400);
    return () => clearTimeout(delay);
  }, [search, type, email]);

  // Filter users based on small email search bar
  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(emailSearch.toLowerCase())
  );

  return (
    <div className="p-4 border border-[#2a2d3a] rounded-lg mb-4 bg-[#1a1c23] relative">
      {/* 🔍 MAIN SEARCH */}
      <input
        type="text"
        placeholder="Search category name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border border-gray-700 rounded mb-3 bg-transparent text-white focus:border-indigo-500 outline-none"
      />

      <div className="flex flex-wrap gap-3 items-center">
        {/* 🛠️ ADMIN TOGGLE */}
        {mode !== "user" && (
          <div className="flex gap-2">
            <button 
              type="button"
              className={`px-3 py-1 rounded text-sm transition-all ${type === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
              onClick={() => setType("all")}
            >
              All
            </button>
            <button 
               type="button"
               className={`px-3 py-1 rounded text-sm transition-all ${type === 'mine' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
               onClick={() => setType("mine")}
            >
              Mine
            </button>
          </div>
        )}

        {/* 📧 CUSTOM SEARCHABLE EMAIL DROPDOWN (Superadmin Only) */}
        {mode === "superadmin" && (
          <div className="relative flex-1 min-w-[200px]" ref={dropdownRef}>
            <div 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-gray-700 rounded bg-[#1a1c23] text-white cursor-pointer text-sm flex justify-between items-center"
            >
              {email || "Filter by User Email"}
              <span>{isOpen ? "▲" : "▼"}</span>
            </div>

            {isOpen && (
              <div className="absolute z-50 w-full mt-1 bg-[#1a1c23] border border-gray-700 rounded shadow-xl max-h-60 overflow-hidden flex flex-col">
                {/* 🔍 SMALL SEARCH BAR INSIDE DROPDOWN */}
                <div className="p-2 border-b border-gray-700">
                  <input 
                    type="text"
                    placeholder="Type email..."
                    autoFocus
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="w-full p-1 text-sm bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-indigo-500"
                  />
                </div>
                
                {/* EMAIL LIST */}
                <div className="overflow-y-auto">
                  <div 
                    onClick={() => { setEmail(""); setIsOpen(false); setEmailSearch(""); }}
                    className="p-2 text-sm hover:bg-indigo-600 cursor-pointer text-gray-300"
                  >
                    All Users
                  </div>
                  {filteredUsers.map((u) => (
                    <div 
                      key={u._id}
                      onClick={() => {
                        setEmail(u.email);
                        setIsOpen(false);
                        setEmailSearch("");
                      }}
                      className={`p-2 text-sm hover:bg-indigo-600 cursor-pointer ${email === u.email ? 'bg-indigo-900 text-white' : 'text-gray-300'}`}
                    >
                      {u.email}
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="p-2 text-sm text-gray-500 italic">No users found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 🧹 CLEAR */}
      <button
        type="button"
        className="mt-3 text-xs text-gray-500 hover:text-white underline block"
        onClick={() => {
          setSearch("");
          setType("all");
          setEmail("");
          setEmailSearch("");
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default CategoryFilter;