// import { useState, useEffect, useRef } from "react";

// function CategoryFilter({ mode = "user", onFilterChange, users = [] }) {
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [email, setEmail] = useState("");

//   // New states for the custom email search
//   const [emailSearch, setEmailSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // ⏱️ DEBOUNCE
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       onFilterChange({ search, type, email });
//     }, 400);
//     return () => clearTimeout(delay);
//   }, [search, type, email]);

//   // Filter users based on small email search bar
//   const filteredUsers = users.filter(u =>
//     u.email.toLowerCase().includes(emailSearch.toLowerCase())
//   );

//   return (
//     <div className="p-4 border border-[#2a2d3a] rounded-lg mb-4 bg-[#1a1c23] relative">
//       {/* 🔍 MAIN SEARCH */}
//       <input
//         type="text"
//         placeholder="Search category name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full p-2 border border-gray-700 rounded mb-3 bg-transparent text-white focus:border-indigo-500 outline-none"
//       />

//       <div className="flex flex-wrap gap-3 items-center">
//         {/* 🛠️ ADMIN TOGGLE */}
//         {mode !== "user" && (
//           <div className="flex gap-2">
//             <button
//               type="button"
//               className={`px-3 py-1 rounded text-sm transition-all ${type === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
//               onClick={() => setType("all")}
//             >
//               All
//             </button>
//             <button
//                type="button"
//                className={`px-3 py-1 rounded text-sm transition-all ${type === 'mine' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'}`}
//                onClick={() => setType("mine")}
//             >
//               Mine
//             </button>
//           </div>
//         )}

//         {/* 📧 CUSTOM SEARCHABLE EMAIL DROPDOWN (Superadmin Only) */}
//         {mode === "superadmin" && (
//           <div className="relative flex-1 min-w-[200px]" ref={dropdownRef}>
//             <div
//               onClick={() => setIsOpen(!isOpen)}
//               className="p-2 border border-gray-700 rounded bg-[#1a1c23] text-white cursor-pointer text-sm flex justify-between items-center"
//             >
//               {email || "Filter by User Email"}
//               <span>{isOpen ? "▲" : "▼"}</span>
//             </div>

//             {isOpen && (
//               <div className="absolute z-50 w-full mt-1 bg-[#1a1c23] border border-gray-700 rounded shadow-xl max-h-60 overflow-hidden flex flex-col">
//                 {/* 🔍 SMALL SEARCH BAR INSIDE DROPDOWN */}
//                 <div className="p-2 border-b border-gray-700">
//                   <input
//                     type="text"
//                     placeholder="Type email..."
//                     autoFocus
//                     value={emailSearch}
//                     onChange={(e) => setEmailSearch(e.target.value)}
//                     className="w-full p-1 text-sm bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-indigo-500"
//                   />
//                 </div>

//                 {/* EMAIL LIST */}
//                 <div className="overflow-y-auto">
//                   <div
//                     onClick={() => { setEmail(""); setIsOpen(false); setEmailSearch(""); }}
//                     className="p-2 text-sm hover:bg-indigo-600 cursor-pointer text-gray-300"
//                   >
//                     All Users
//                   </div>
//                   {filteredUsers.map((u) => (
//                     <div
//                       key={u._id}
//                       onClick={() => {
//                         setEmail(u.email);
//                         setIsOpen(false);
//                         setEmailSearch("");
//                       }}
//                       className={`p-2 text-sm hover:bg-indigo-600 cursor-pointer ${email === u.email ? 'bg-indigo-900 text-white' : 'text-gray-300'}`}
//                     >
//                       {u.email}
//                     </div>
//                   ))}
//                   {filteredUsers.length === 0 && (
//                     <div className="p-2 text-sm text-gray-500 italic">No users found</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* 🧹 CLEAR */}
//       <button
//         type="button"
//         className="mt-3 text-xs text-gray-500 hover:text-white underline block"
//         onClick={() => {
//           setSearch("");
//           setType("all");
//           setEmail("");
//           setEmailSearch("");
//         }}
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// }

// export default CategoryFilter;

// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, X, Search } from "lucide-react";

// function CategoryFilter({ mode = "user", onFilterChange, users = [] }) {
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [email, setEmail] = useState("");
//   const [emailSearch, setEmailSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus input when dropdown opens
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       setTimeout(() => inputRef.current?.focus(), 50);
//     }
//   }, [isOpen]);

//   // ⏱️ DEBOUNCE
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       onFilterChange({ search, type, email });
//     }, 400);
//     return () => clearTimeout(delay);
//   }, [search, type, email, onFilterChange]);

//   // Filter users based on email search
//   const filteredUsers = users.filter(u =>
//     u.email.toLowerCase().includes(emailSearch.toLowerCase())
//   );

//   const selectedUserName = email ? email.split("@")[0] : null;

//   return (
//     <div className="w-full space-y-3 ">
//       {/* 🔍 MAIN SEARCH BAR */}
//       <div className="relative">
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
//           <Search size={18} />
//         </div>
//         <input
//           type="text"
//           placeholder="Search category name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-11 pr-4 py-3 border border-[#3380FF]/30 rounded-xl bg-gradient-to-r from-[#6190e243] to-transparent text-white placeholder-gray-500 focus:border-[#3380FF] focus:outline-none focus:ring-1 focus:ring-[#3380FF]/50 transition-all duration-200 backdrop-blur-sm"
//         />
//         {search && (
//           <button
//             onClick={() => setSearch("")}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//           >
//             <X size={18} />
//           </button>
//         )}
//       </div>

//       {/* 🎛️ FILTERS ROW */}
//       <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
//         {/* 🛠️ TYPE TOGGLE (All/Mine) */}
//         {mode !== "user" && (
//           <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-[#6190e243] to-transparent border border-[#3380FF]/30 rounded-xl backdrop-blur-sm">
//             {/* Toggle Switch */}
//             <button
//               onClick={() => setType("all")}
//               className={`relative flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
//                 type === "all"
//                   ? "bg-[#3380FF] text-white shadow-lg shadow-[#3380FF]/30"
//                   : "bg-transparent text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               <span className="inline-block w-2 h-2 rounded-full bg-current" />
//               All
//             </button>
//             <button
//               onClick={() => setType("mine")}
//               className={`relative flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
//                 type === "mine"
//                   ? "bg-[#3380FF] text-white shadow-lg shadow-[#3380FF]/30"
//                   : "bg-transparent text-gray-400 hover:text-gray-300"
//               }`}
//             >
//               <span className="inline-block w-2 h-2 rounded-full bg-current" />
//               Mine
//             </button>
//           </div>
//         )}

//         {/* 📧 CUSTOM SEARCHABLE EMAIL DROPDOWN (Superadmin Only) */}
//         {mode === "superadmin" && (
//           <div className="relative flex-1 sm:flex-initial sm:min-w-[280px]" ref={dropdownRef}>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2 backdrop-blur-sm ${
//                 isOpen
//                   ? "border-[#3380FF] bg-gradient-to-r from-[#6190e243] to-transparent"
//                   : email
//                   ? "border-[#3380FF]/50 bg-gradient-to-r from-[#3380FF]/10 to-transparent hover:border-[#3380FF]"
//                   : "border-[#3380FF]/30 bg-gradient-to-r from-[#6190e243] to-transparent hover:border-[#3380FF]/50"
//               }`}
//             >
//               <div className="flex items-center gap-2 min-w-0">
//                 <Search size={16} className="text-[#3380FF] flex-shrink-0" />
//                 <span className={`text-sm truncate ${email ? "text-white font-medium" : "text-gray-500"}`}>
//                   {selectedUserName ? `@${selectedUserName}` : "Filter by User"}
//                 </span>
//               </div>
//               <ChevronDown
//                 size={18}
//                 className={`flex-shrink-0 text-[#3380FF] transition-transform duration-300 ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* DROPDOWN MENU */}
//             {isOpen && (
//               <div className="absolute z-50 w-full mt-2 bg-gradient-to-b from-[#1a1c23] to-[#0f1117] border border-[#3380FF]/30 rounded-xl shadow-2xl shadow-[#3380FF]/20 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
//                 {/* 🔍 SEARCH INPUT */}
//                 <div className="p-3 border-b border-[#3380FF]/20 bg-gradient-to-r from-[#6190e243] to-transparent">
//                   <div className="relative">
//                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3380FF]/60" />
//                     <input
//                       ref={inputRef}
//                       type="text"
//                       placeholder="Type email..."
//                       value={emailSearch}
//                       onChange={(e) => setEmailSearch(e.target.value)}
//                       className="w-full pl-9 pr-4 py-2 text-sm bg-[#0f1117] border border-[#3380FF]/30 rounded-lg text-white placeholder-gray-600 focus:border-[#3380FF] focus:outline-none focus:ring-1 focus:ring-[#3380FF]/50 transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* EMAIL LIST */}
//                 <div className="overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-[#3380FF]/20 scrollbar-track-transparent">
//                   {/* All Users Option */}
//                   <button
//                     onClick={() => {
//                       setEmail("");
//                       setIsOpen(false);
//                       setEmailSearch("");
//                     }}
//                     className={`w-full px-4 py-3 text-sm text-left transition-all flex items-center gap-3 border-b border-[#3380FF]/10 ${
//                       !email
//                         ? "bg-gradient-to-r from-[#3380FF]/20 to-transparent text-white font-medium"
//                         : "text-gray-400 hover:bg-[#3380FF]/10 hover:text-white"
//                     }`}
//                   >
//                     <span className="inline-block w-2 h-2 rounded-full bg-current" />
//                     All Users
//                   </button>

//                   {/* User List */}
//                   {filteredUsers.length > 0 ? (
//                     filteredUsers.map((user, idx) => (
//                       <button
//                         key={user._id}
//                         onClick={() => {
//                           setEmail(user.email);
//                           setIsOpen(false);
//                           setEmailSearch("");
//                         }}
//                         className={`w-full px-4 py-3 text-sm text-left transition-all flex items-center gap-3 ${
//                           idx !== filteredUsers.length - 1 ? "border-b border-[#3380FF]/10" : ""
//                         } ${
//                           email === user.email
//                             ? "bg-gradient-to-r from-[#3380FF]/20 to-transparent text-white font-medium"
//                             : "text-gray-400 hover:bg-[#3380FF]/10 hover:text-white"
//                         }`}
//                       >
//                         <span className="inline-block w-2 h-2 rounded-full bg-current" />
//                         <span className="truncate">{user.email}</span>
//                       </button>
//                     ))
//                   ) : (
//                     <div className="p-4 text-center text-sm text-gray-500">
//                       <p>No users found</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* 🧹 CLEAR FILTERS BUTTON */}
//         {(search || type !== "all" || email) && (
//           <button
//             onClick={() => {
//               setSearch("");
//               setType("all");
//               setEmail("");
//               setEmailSearch("");
//             }}
//             className="w-full sm:w-auto px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
//           >
//             <X size={16} />
//             Clear
//           </button>
//         )}
//       </div>

//       {/* 📊 ACTIVE FILTERS DISPLAY (Mobile-friendly) */}
//       {(search || type !== "all" || email) && (
//         <div className="flex flex-wrap gap-2 items-center text-xs">
//           <span className="text-gray-500">Active filters:</span>
//           {search && (
//             <span className="px-3 py-1 bg-[#3380FF]/20 border border-[#3380FF]/30 rounded-full text-[#3380FF] font-medium truncate">
//               Search: "{search}"
//             </span>
//           )}
//           {type !== "all" && (
//             <span className="px-3 py-1 bg-[#3380FF]/20 border border-[#3380FF]/30 rounded-full text-[#3380FF] font-medium">
//               {type === "mine" ? "My Categories" : "All Categories"}
//             </span>
//           )}
//           {email && (
//             <span className="px-3 py-1 bg-[#3380FF]/20 border border-[#3380FF]/30 rounded-full text-[#3380FF] font-medium truncate">
//               User: {selectedUserName}
//             </span>
//           )}
//         </div>
//       )}

//       {/* Global Styles */}
//       <style>{`
//         @keyframes slideInDown {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-in {
//           animation: slideInDown 0.2s ease-out;
//         }

//         /* Custom scrollbar for dropdown */
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: rgba(51, 128, 255, 0.2);
//           border-radius: 3px;
//         }

//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: rgba(51, 128, 255, 0.4);
//         }

//         /* Firefox scrollbar */
//         .scrollbar-thin {
//           scrollbar-width: thin;
//           scrollbar-color: rgba(51, 128, 255, 0.2) transparent;
//         }

//         /* Smooth transitions */
//         * {
//           transition-property: color, background-color, border-color, box-shadow;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CategoryFilter;

// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, X, Search, Filter, Users, UserCheck, Sparkles } from "lucide-react";

// function CategoryFilter({ mode = "user", onFilterChange, users = [] }) {

//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [email, setEmail] = useState("");
//   const [emailSearch, setEmailSearch] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   const dropdownRef = useRef(null);
//   const inputRef = useRef(null);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Auto-focus input
//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       setTimeout(() => inputRef.current?.focus(), 80);
//     }
//   }, [isOpen]);

//   // Debounced filter update
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       onFilterChange({ search, type, email });
//     }, 350);
//     return () => clearTimeout(delay);
//   }, [search, type, email, onFilterChange]);

//   const filteredUsers = users.filter(u =>
//     u.email.toLowerCase().includes(emailSearch.toLowerCase())
//   );

//   const selectedUserName = email ? email.split("@")[0] : null;
//   const activeFiltersCount = (search ? 1 : 0) + (type !== "all" ? 1 : 0) + (email ? 1 : 0);

//   return (
//     <div className="w-full space-y-5">
//       {/* HEADER + SEARCH */}
//       {/* <div className="flex items-center justify-between mb-2">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#3380FF] to-[#2770E6] flex items-center justify-center">
//             <Filter size={20} className="text-white" />
//           </div>
//           <div>
//             <h2 className="text-white text-xl font-semibold tracking-tight">Filters</h2>
//             <p className="text-xs text-gray-500">Refine your categories</p>
//           </div>
//         </div>

//         {activeFiltersCount > 0 && (
//           <div className="flex items-center gap-2 text-xs font-mono text-[#3380FF]">
//             <Sparkles size={14} />
//             <span>{activeFiltersCount} active</span>
//           </div>
//         )}
//       </div> */}

//       {/* MAIN SEARCH - Premium Look */}
//       <div className="relative group">
//         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#3380FF] transition-all duration-300">
//           <Search size={20} />
//         </div>

//         <input
//           type="text"
//           placeholder="Search category name or keyword..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-12 pr-12 py-4 bg-gradient-to-r from-[#6190e243] to-transparent border border-[#3380FF]/30 rounded-2xl text-white placeholder-gray-500 focus:border-[#3380FF] focus:ring-2 focus:ring-[#3380FF]/20 focus:outline-none transition-all duration-300 backdrop-blur-md text-[15px]"
//         />

//         {search && (
//           <button
//             onClick={() => setSearch("")}
//             className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
//           >
//             <X size={18} />
//           </button>
//         )}
//       </div>

//       {/* FILTER CONTROLS */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         {/* Type Toggle */}
//         {mode !== "user" && (
//           <div className="flex p-1 bg-gradient-to-r from-[#6190e243] to-transparent border border-[#3380FF]/30 rounded-2xl backdrop-blur-sm">
//             <button
//               onClick={() => setType("all")}
//               className={`flex-1 px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
//                 type === "all"
//                   ? "bg-[#3380FF] text-white shadow-xl shadow-[#3380FF]/40"
//                   : "text-gray-400 hover:text-gray-200"
//               }`}
//             >
//               <Filter size={16} />
//               All Categories
//             </button>
//             <button
//               onClick={() => setType("mine")}
//               className={`flex-1 px-6 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
//                 type === "mine"
//                   ? "bg-[#3380FF] text-white shadow-xl shadow-[#3380FF]/40"
//                   : "text-gray-400 hover:text-gray-200"
//               }`}
//             >
//               <UserCheck size={16} />
//               My Categories
//             </button>
//           </div>
//         )}

//         {/* User Selector - Superadmin */}
//         {mode === "superadmin" && (
//           <div className="relative flex-1" ref={dropdownRef}>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className={`w-full px-5 py-4 rounded-2xl border flex items-center justify-between transition-all duration-300 backdrop-blur-sm ${
//                 isOpen || email
//                   ? "border-[#3380FF] bg-gradient-to-r from-[#3380FF]/10 to-transparent"
//                   : "border-[#3380FF]/30 bg-gradient-to-r from-[#6190e243] to-transparent hover:border-[#3380FF]/60"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <Users size={18} className="text-[#3380FF]" />
//                 <span className={`text-sm ${email ? "text-white font-medium" : "text-gray-500"}`}>
//                   {selectedUserName ? `@${selectedUserName}` : "Filter by Creator"}
//                 </span>
//               </div>
//               <ChevronDown
//                 size={20}
//                 className={`text-[#3380FF] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
//               />
//             </button>

//             {/* Enhanced Dropdown */}
//             {isOpen && (
//               <div className="absolute z-50 w-full mt-2 bg-[#0f1117] border border-[#3380FF]/40 rounded-3xl shadow-2xl shadow-[#3380FF]/20 overflow-hidden backdrop-blur-2xl">
//                 {/* Search inside dropdown */}
//                 <div className="p-4 border-b border-[#3380FF]/20">
//                   <div className="relative">
//                     <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3380FF]/60" />
//                     <input
//                       ref={inputRef}
//                       type="text"
//                       placeholder="Search by email..."
//                       value={emailSearch}
//                       onChange={(e) => setEmailSearch(e.target.value)}
//                       className="w-full pl-11 py-3 bg-[#16181f] border border-[#3380FF]/30 rounded-2xl text-sm focus:border-[#3380FF] focus:outline-none"
//                     />
//                   </div>
//                 </div>

//                 {/* User List */}
//                 <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3380FF]/30">
//                   <button
//                     onClick={() => {
//                       setEmail("");
//                       setIsOpen(false);
//                       setEmailSearch("");
//                     }}
//                     className={`w-full px-5 py-4 text-left flex items-center gap-3 border-b border-[#3380FF]/10 hover:bg-[#3380FF]/5 transition-colors ${!email ? "bg-[#3380FF]/10" : ""}`}
//                   >
//                     <span className="text-[#3380FF]">🌐</span>
//                     <span>All Users</span>
//                   </button>

//                   {filteredUsers.map((user) => (
//                     <button
//                       key={user._id}
//                       onClick={() => {
//                         setEmail(user.email);
//                         setIsOpen(false);
//                         setEmailSearch("");
//                       }}
//                       className={`w-full px-5 py-4 text-left flex items-center gap-3 border-b border-[#3380FF]/10 hover:bg-[#3380FF]/5 transition-colors ${email === user.email ? "bg-[#3380FF]/10" : ""}`}
//                     >
//                       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3380FF] to-[#60A5FA] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
//                         {user.email[0].toUpperCase()}
//                       </div>
//                       <div className="truncate">
//                         <p className="text-white text-sm">{user.email}</p>
//                       </div>
//                     </button>
//                   ))}

//                   {filteredUsers.length === 0 && (
//                     <div className="p-8 text-center text-gray-500">No matching users</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Clear Button */}
//         {activeFiltersCount > 0 && (
//           <button
//             onClick={() => {
//               setSearch("");
//               setType("all");
//               setEmail("");
//               setEmailSearch("");
//             }}
//             className="px-6 py-4 rounded-2xl border border-red-500/30 hover:border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all flex items-center gap-2 font-medium group"
//           >
//             <X size={18} className="group-hover:rotate-90 transition-transform" />
//             Clear All
//           </button>
//         )}
//       </div>

//       {/* Active Filters Chips */}
//       {activeFiltersCount > 0 && (
//         <div className="flex flex-wrap gap-2 pt-2">
//           <span className="text-xs text-gray-500 self-center mr-1">Active:</span>

//           {search && (
//             <div className="flex items-center gap-2 bg-[#3380FF]/10 border border-[#3380FF]/30 rounded-full pl-3 pr-2 py-1.5 text-sm text-[#3380FF]">
//               <Search size={14} />
//               <span className="max-w-[180px] truncate">"{search}"</span>
//               <button onClick={() => setSearch("")} className="hover:bg-[#3380FF]/20 p-1 rounded-full transition-colors">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {type !== "all" && (
//             <div className="flex items-center gap-2 bg-[#3380FF]/10 border border-[#3380FF]/30 rounded-full pl-3 pr-2 py-1.5 text-sm text-[#3380FF]">
//               {type === "mine" ? <UserCheck size={14} /> : <Filter size={14} />}
//               <span>{type === "mine" ? "My Categories" : "All"}</span>
//               <button onClick={() => setType("all")} className="hover:bg-[#3380FF]/20 p-1 rounded-full transition-colors">
//                 <X size={14} />
//               </button>
//             </div>
//           )}

//           {email && (
//             <div className="flex items-center gap-2 bg-[#3380FF]/10 border border-[#3380FF]/30 rounded-full pl-3 pr-2 py-1.5 text-sm text-[#3380FF]">
//               <Users size={14} />
//               <span>@{selectedUserName}</span>
//               <button onClick={() => setEmail("")} className="hover:bg-[#3380FF]/20 p-1 rounded-full transition-colors">
//                 <X size={14} />
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       <style>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 5px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: rgba(51, 128, 255, 0.3);
//           border-radius: 20px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: rgba(51, 128, 255, 0.5);
//         }

//         @keyframes fadeSlideIn {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-in {
//           animation: fadeSlideIn 0.25s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default CategoryFilter;


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
    //     <div className="w-full
    // bg-gradient-to-br
    // from-white/[0.06]
    // to-white/[0.02]
    // border border-white/[0.08]
    // py-[10px]
    // px-[15px]
    // rounded-2xl
    // flex flex-col md:flex-row
    // items-stretch md:items-center
    // gap-3
    // shadow-[0_8px_32px_rgba(0,0,0,0.35)]
    // backdrop-blur-2xl
    // sticky top-2
    // z-[30]">
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
        {/* {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
          >
            <X size={14} />
          </button>
        )} */}
      </div>

      {/* 2. CREATOR DROPDOWN (Only shows for Superadmin/Admin based on mode) */}
      {mode === "superadmin" && (
        <div className="relative flex-shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-full px-4 py-2.5 rounded-xl  text-xs font-semibold flex items-center justify-between gap-3 min-w-[160px] transition-all bg-white ${
              isOpen || email
                ? " text-slate-400"
                : " text-slate-400 "
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
