// import React, { useState } from "react";

// const ToolFilters = ({
//   filters,
//   onFilterChange,
//   onClear,
//   type,
//   categories = [],
// }) => {
//   const [catSearch, setCatSearch] = useState("");

//   // 🔥 SAFE FILTERING: Added checks for c, c.name, and catSearch
//   const filteredCategories = (categories || []).filter((c) => {
//     const categoryName = c?.name || "";
//     const searchString = catSearch || "";
//     return categoryName.toLowerCase().includes(searchString.toLowerCase());
//   });

//   return (
//     <div className="flex flex-wrap gap-4 bg-[#13151a] border border-[#2a2d3a] p-4 rounded-2xl mb-8 items-center">
//       {/* 1. Search by Name */}
//       <div className="flex-1 min-w-[200px]">
//         <input
//           type="text"
//           placeholder="Search by tool name..."
//           className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
//           value={filters?.search || ""}
//           onChange={(e) => onFilterChange("search", e.target.value)}
//         />
//       </div>

//       {/* 2. Category Dropdown (Now supports searching inside) */}
//       {(type === "admin" || type === "superadmin" || type === "user_saved") && (
//         <div className="relative min-w-[180px]">
//           {/* <select
//             className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none appearance-none pr-10 cursor-pointer capitalize"
//             value={filters?.category || ""}
//             onChange={(e) => onFilterChange("category", e.target.value)}
//           >
//             <option value="">All Categories</option>

//             {(categories || []).map((cat) => (
//               <option key={cat?._id || Math.random()} value={cat?._id || ""}>
//                 {cat?.name || "Unnamed Category"}
//               </option>
//             ))}
//           </select> */}

//           <select
//             value={filters.category || ""}
//             onChange={(e) => onFilterChange("category", e.target.value)}
//           >
//             <option value="">All Categories</option>

//             {categories && categories.length > 0 ? (
//               categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No categories found</option>
//             )}
//           </select>
//           <div className="absolute right-3 top-3 pointer-events-none text-gray-500 text-xs">
//             ▼
//           </div>
//         </div>
//       )}

//       {/* 3. Super Admin Only: Email Filter */}
//       {type === "superadmin" && (
//         <input
//           type="email"
//           placeholder="User email..."
//           className="bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
//           value={filters?.email || ""}
//           onChange={(e) => onFilterChange("email", e.target.value)}
//         />
//       )}

//       {/* 4. User Save Page Only: Tool Type Toggle */}
//       {type === "user_saved" && (
//         <div className="flex bg-[#1c1f26] p-1 rounded-xl border border-[#2a2d3a]">
//           {["all", "platform", "custom"].map((t) => (
//             <button
//               key={t}
//               type="button"
//               onClick={() => onFilterChange("toolType", t)}
//               className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
//                 (filters?.toolType || "all") === t
//                   ? "bg-[#286FF0] text-white"
//                   : "text-gray-500"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* 5. Clear Button */}
//       <button
//         type="button"
//         onClick={onClear}
//         className="text-gray-500 hover:text-red-400 text-sm font-medium transition-colors ml-auto"
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// };

// export default ToolFilters;

// import React from "react";
// import { ChevronDown, X, Search, Filter, UserCheck } from "lucide-react";

// const ToolFilters = ({
//   filters,
//   onFilterChange,
//   onClear,
//   type,
//   categories = [],
// }) => {
//   return (
//     <div className="
// relative
// before:absolute before:inset-0
// before:rounded-2xl
// before:bg-white/[0.02]
// before:pointer-events-none

// w-full
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

//       {/* 1. Search by Name: Visible on ALL pages (Admin, SuperAdmin, Saved, and Public Category) */}
//       <div className="flex-1 min-w-[200px]">
//         <input
//           type="text"
//           placeholder="Search tools..."
//           className="w-full bg-white border border-[#2a2d3a] p-2.5 rounded-xl text-slate-600  outline-none focus:border-[#286FF0] transition-all"
//           value={filters?.search || ""}
//           onChange={(e) => onFilterChange("search", e.target.value)}
//         />
//       </div>

//       {/* 2. Category Dropdown: Hidden for 'public' type because the user is already inside a category */}
//       {(type === "admin" || type === "superadmin" || type === "user_saved") && (
//         <div className="relative min-w-[180px]">
//           <select
//             className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none appearance-none pr-10 cursor-pointer capitalize"
//             value={filters?.category || ""}
//             onChange={(e) => onFilterChange("category", e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {categories && categories.length > 0 ? (
//               categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No categories found</option>
//             )}
//           </select>
//           {/* Custom Arrow Icon */}
//           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
//             ▼
//           </div>
//         </div>
//       )}

//       {/* 3. Super Admin Only: Email Filter */}
//       {type === "superadmin" && (
//         <div className="min-w-[200px]">
//           <Search
//           size={18}
//           className="absolute left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200"
//         />
//           <input
//             type="email"
//             placeholder="Filter by user email..."
//             className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
//             value={filters?.email || ""}
//             onChange={(e) => onFilterChange("email", e.target.value)}
//           />
//         </div>
//       )}

//       {/* 4. User Save Page Only: Tool Type Toggle (Platform vs Custom) */}
//       {type === "user_saved" && (
//         <div className="flex bg-[#1c1f26] p-1 rounded-xl border border-[#2a2d3a]">
//           {["all", "platform", "custom"].map((t) => (
//             <button
//               key={t}
//               type="button"
//               onClick={() => onFilterChange("toolType", t)}
//               className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
//                 (filters?.toolType || "all") === t
//                   ? "bg-[#286FF0] text-white shadow-lg"
//                   : "text-gray-500 hover:text-gray-300"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* 5. Clear Button */}
//       <button
//         type="button"
//         onClick={onClear}
//         className="text-gray-500 hover:text-red-400 text-sm font-medium transition-colors px-2 ml-auto"
//       >
//         Clear Filters
//       </button>
//     </div>
//   );
// };

// export default ToolFilters;

// // v2
// import React, { useState, useEffect, useRef } from "react";
// import { ChevronDown, X, Search, Filter, Layers, Mail } from "lucide-react";

// const ToolFilters = ({
//   filters,
//   onFilterChange,
//   onClear,
//   type,
//   categories = [],
// }) => {
//   const [isCatOpen, setIsCatOpen] = useState(false);
//   const [catSearch, setCatSearch] = useState("");

//   const catDropdownRef = useRef(null);
//   const catInputRef = useRef(null);

//   // Close custom dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         catDropdownRef.current &&
//         !catDropdownRef.current.contains(event.target)
//       ) {
//         setIsCatOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Auto-focus category search box when opened
//   useEffect(() => {
//     if (isCatOpen && catInputRef.current) {
//       setTimeout(() => catInputRef.current?.focus(), 80);
//     }
//   }, [isCatOpen]);

//   // Client-side category filtering inside dropdown drawer
//   const filteredCategories = categories.filter((cat) =>
//     cat.name?.toLowerCase().includes(catSearch.toLowerCase()),
//   );

//   const selectedCategoryObj = categories.find(
//     (cat) => cat._id === filters?.category,
//   );
//   const selectedCategoryName = selectedCategoryObj
//     ? selectedCategoryObj.name
//     : null;

//   // Track if any active filters are currently applied
//   const hasActiveFilters =
//     !!filters?.search ||
//     !!filters?.category ||
//     !!filters?.email ||
//     (filters?.toolType && filters?.toolType !== "all");

//   return (
//     <div
//       className="
// before:absolute before:inset-0
// before:rounded-2xl
// before:bg-white/[0.02]
// before:pointer-events-none

// w-full
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
// z-[30]"
//     >
//       {/* 1. TEXT SEARCH INPUT WRAPPER */}
//       <div className="relative flex-grow flex items-center group min-w-[200px]">
//         <Search
//           size={16}
//           className="absolute left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200"
//         />
//         {/* <input
//           type="text"
//           placeholder="Search tools..."
//           value={filters?.search || ""}
//           onChange={(e) => onFilterChange("search", e.target.value)}
//           className="w-full pl-11 pr-10 py-2.5 bg-white border-none focus:border-none  rounded-xl text-slate-600 placeholder-slate-500  text-sm transition-all"
//         /> */}
//         <input
//   type="text"
//   placeholder="Search tools..."
//   value={filters?.search || ""}
//   onChange={(e) => onFilterChange("search", e.target.value)}
//   className="w-full pl-11 pr-10 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 focus:border-none rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
// />
//         {/* {filters?.search && (
//           <button
//             onClick={() => onFilterChange("search", "")}
//             className="absolute right-3 p-1 rounded-md hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition-all"
//           >
//             <X size={14} />
//           </button>
//         )} */}
//       </div>

//       {/* 2. PREMIUM SEARCHABLE CATEGORY DROPDOWN PANEL */}
//       {(type === "admin" || type === "superadmin" || type === "user_saved") && (
//         <div
//           className="relative flex-shrink-0 min-w-[180px]"
//           ref={catDropdownRef}
//         >
//           <button
//             type="button"
//             onClick={() => setIsCatOpen(!isCatOpen)}
//             className={`w-full h-full px-4 py-2.5 rounded-xl  text-xs font-semibold flex items-center justify-between gap-3 transition-all bg-white ${
//               isCatOpen || filters?.category
//                 ? "border-slate-600 text-[#93A4BA] font-bold"
//                 : "border-slate-800/60 text-slate-400 hover:border-slate-700 "
//             }`}
//           >
//             <div className="flex items-center gap-2 truncate">
//               {/* <Layers
//                 size={14}
//                 className={
//                   filters?.category ? "text-blue-500" : "text-slate-500"
//                 }
//               /> */}
//               <span className="truncate capitalize">
//                 {selectedCategoryName ? selectedCategoryName : "All Categories"}
//               </span>
//             </div>
//             <ChevronDown
//               size={14}
//               className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isCatOpen ? "rotate-180 text-slate-300" : ""}`}
//             />
//           </button>

//           {/* Glassmorphic Dropdown Drawer */}
//           {/* {isCatOpen && (
//             <div className="absolute right-0 md:left-0 z-50 w-64 mt-2 bg-[#0d0f14] border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in">
              
//               <div className="p-2.5 border-b border-slate-800/60">
//                 <div className="relative">
//                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
//                   <input
//                     ref={catInputRef}
//                     type="text"
//                     placeholder="Search categories..."
//                     value={catSearch}
//                     onChange={(e) => setCatSearch(e.target.value)}
//                     className="w-full pl-9 pr-3 py-1.5 bg-[#141722] border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:border-slate-700 focus:outline-none"
//                   />
//                 </div>
//               </div>

             
//               <div className="max-h-56 overflow-y-auto scrollbar-premium">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onFilterChange("category", "");
//                     setIsCatOpen(false);
//                     setCatSearch("");
//                   }}
//                   className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-slate-800/50 transition-colors ${!filters?.category ? "text-blue-400 bg-blue-500/5 font-bold" : "text-slate-400"}`}
//                 >
//                   <span>🌐</span>
//                   <span>All Categories</span>
//                 </button>

//                 {filteredCategories.map((cat) => (
//                   <button
//                     key={cat._id}
//                     type="button"
//                     onClick={() => {
//                       onFilterChange("category", cat._id);
//                       setIsCatOpen(false);
//                       setCatSearch("");
//                     }}
//                     className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-slate-800/50 border-t border-slate-900/40 transition-colors capitalize ${filters?.category === cat._id ? "text-blue-400 bg-blue-500/5 font-bold" : "text-slate-300"}`}
//                   >
//                     <div className="w-5 h-5 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400 uppercase flex-shrink-0">
//                       {cat.name[0]}
//                     </div>
//                     <span className="truncate">{cat.name}</span>
//                   </button>
//                 ))}

//                 {filteredCategories.length === 0 && (
//                   <div className="p-6 text-center text-xs text-slate-500">No categories found</div>
//                 )}
//               </div>
//             </div>
//           )} */}
//           {isCatOpen && (
//             <div className="absolute right-0 md:left-0 z-50 w-64 mt-5 bg-[#CDDAF6] rounded-xl overflow-hidden animate-in shadow-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
//               {/* Search Box */}
//               <div className="p-2.5 ">
//                 <div className="relative">
//                   <Search
//                     size={14}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//                   />

//                   <input
//                     ref={catInputRef}
//                     type="text"
//                     placeholder="Search categories..."
//                     value={catSearch}
//                     onChange={(e) => setCatSearch(e.target.value)}
//                     className="w-full pl-9 pr-3 py-1.5 bg-white  rounded-lg text-xs text-slate-700 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Category List */}
//               <div className="max-h-56 overflow-y-auto scrollbar-premium bg-white">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     onFilterChange("category", "");
//                     setIsCatOpen(false);
//                     setCatSearch("");
//                   }}
//                   className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] hover:text-white transition-colors ${
//                     !filters?.category
//                       ? "text-blue-400 bg-blue-500/5 font-medium"
//                       : "text-slate-500"
//                   }`}
//                 >
//                   <span></span>
//                   <span>All Categories</span>
//                 </button>

//                 {filteredCategories.map((cat) => (
//                   <button
//                     key={cat._id}
//                     type="button"
//                     onClick={() => {
//                       onFilterChange("category", cat._id);
//                       setIsCatOpen(false);
//                       setCatSearch("");
//                     }}
//                     className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] hover:text-white border-t border-slate-200 transition-colors capitalize ${
//                       filters?.category === cat._id
//                         ? "text-blue-400 bg-blue-500/5 font-medium"
//                         : "text-[#3978E3]"
//                     }`}
//                   >
//                     <div className="w-5 h-5 rounded-full bg-[#CDDAF5] flex items-center justify-center text-[10px] font-bold text-[#3978E3] uppercase flex-shrink-0">
//                       {cat.name[0]}
//                     </div>

//                     <span className="truncate">{cat.name}</span>
//                   </button>
//                 ))}

//                 {filteredCategories.length === 0 && (
//                   <div className="p-6 text-center text-xs text-slate-500">
//                     No categories found
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* 3. EMAIL FILTERS WRAPPER (Superadmin View Option) */}
//       {type === "superadmin" && (
//         <div className="relative flex-shrink-0 min-w-[200px] flex items-center group">
//           <Mail
//             size={14}
//             className="absolute left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200"
//           />
//           <input
//             type="email"
//             placeholder="Filter by user email..."
//             value={filters?.email || ""}
//             onChange={(e) => onFilterChange("email", e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-white border-slate-800 rounded-lg text-xs text-slate-700 placeholder-slate-500 focus:border-slate-700 focus:outline-none"
//           />
//         </div>
//       )}

//       {/* 4. SEGMENTED TOGGLE PILLS (User Saved Tabs View) */}
//       {type === "user_saved" && (
//         <div className="flex p-1 bg-white border border-slate-800/60 rounded-xl flex-shrink-0">
//           {["all", "platform", "custom"].map((t) => (
//             <button
//               key={t}
//               type="button"
//               onClick={() => onFilterChange("toolType", t)}
//               className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide capitalize transition-all duration-200 ${
//                 (filters?.toolType || "all") === t
//                   ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
//                   : "text-slate-400 hover:text-[#2762F6] cursor-pointer"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* 5. MINIMALIST RESET LINK TRIGGER */}
//       <div className="flex items-center pl-1 ml-auto">
//         <button
//           type="button"
//           onClick={onClear}
//           disabled={!hasActiveFilters}
//           className={`text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
//             hasActiveFilters
//               ? "text-slate-400 hover:text-red-400 cursor-pointer"
//               : "text-slate-600 cursor-not-allowed opacity-40"
//           }`}
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Embedded Stylesheets Injector Panel */}
//       <style>{`
//         .scrollbar-premium::-webkit-scrollbar { width: 4px; }
//         .scrollbar-premium::-webkit-scrollbar-thumb { background: #1e2233; border-radius: 10px; }
//         @keyframes inlineFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-in { animation: inlineFade 0.15s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// };

// export default ToolFilters;



// v3
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Search, Filter, Layers, Mail } from "lucide-react";

const ToolFilters = ({
  filters,
  onFilterChange,
  onClear,
  type,
  categories = [],
  users = [], // ➕ Added users prop to drive the superadmin email list dropdown
}) => {
  // 🟢 SEPARATE DROPDOWN STATES
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [catSearch, setCatSearch] = useState("");

  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [emailSearch, setEmailSearch] = useState("");

  // 🟢 SEPARATE DOM REFS
  const catDropdownRef = useRef(null);
  const catInputRef = useRef(null);
  const emailDropdownRef = useRef(null);
  const emailInputRef = useRef(null);

  // Close both dropdowns on outside clicks gracefully
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catDropdownRef.current && !catDropdownRef.current.contains(event.target)) {
        setIsCatOpen(false);
      }
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target)) {
        setIsEmailOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus inputs immediately upon opening drawers
  useEffect(() => {
    if (isCatOpen && catInputRef.current) {
      setTimeout(() => catInputRef.current?.focus(), 80);
    }
  }, [isCatOpen]);

  useEffect(() => {
    if (isEmailOpen && emailInputRef.current) {
      setTimeout(() => emailInputRef.current?.focus(), 80);
    }
  }, [isEmailOpen]);

  // 🟢 CLIENT-SIDE FILTERING MATH
  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(catSearch.toLowerCase())
  );

  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(emailSearch.toLowerCase())
  );

  const selectedCategoryObj = categories.find((cat) => cat._id === filters?.category);
  const selectedCategoryName = selectedCategoryObj ? selectedCategoryObj.name : null;

  const selectedUserName = filters?.email ? filters.email.split("@")[0] : null;

  const hasActiveFilters =
    !!filters?.search ||
    !!filters?.category ||
    !!filters?.email ||
    (filters?.toolType && filters?.toolType !== "all");

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
      {/* 1. TEXT SEARCH INPUT */}
      <div className="relative flex-grow flex items-center group min-w-[200px]">
        <Search
          size={16}
          className="absolute left-4 text-slate-500 group-focus-within:text-blue-500 transition-colors duration-200"
        />
        <input
          type="text"
          placeholder="Search tools..."
          value={filters?.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="w-full pl-11 pr-10 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
        />
        {filters?.search && (
          <button
            type="button"
            onClick={() => onFilterChange("search", "")}
            className="absolute right-3 p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* 2. PREMIUM CATEGORY DROPDOWN */}
      {(type === "admin" || type === "superadmin" || type === "user_saved") && (
        <div className="relative flex-shrink-0 min-w-[180px]" ref={catDropdownRef}>
          <button
            type="button"
            onClick={() => setIsCatOpen(!isCatOpen)}
            className={`w-full h-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 transition-all bg-white ${
              isCatOpen || filters?.category
                ? "text-slate-700 font-bold"
                : "text-slate-400"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="truncate capitalize">
                {selectedCategoryName ? selectedCategoryName : "All Categories"}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isCatOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Glassmorphic Category Dropdown Drawer */}
          {isCatOpen && (
            <div className="absolute right-0 md:left-0 z-50 w-64 mt-3 bg-[#CDDAF6] rounded-xl overflow-hidden animate-in shadow-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="p-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    ref={catInputRef}
                    type="text"
                    placeholder="Search categories..."
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg text-xs text-slate-700 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto scrollbar-premium bg-white">
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange("category", "");
                    setIsCatOpen(false);
                    setCatSearch("");
                  }}
                  className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] hover:text-white transition-colors ${
                    !filters?.category ? "text-blue-500 bg-blue-500/5 font-bold" : "text-slate-500"
                  }`}
                >
                  <span>All Categories</span>
                </button>

                {filteredCategories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => {
                      onFilterChange("category", cat._id);
                      setIsCatOpen(false);
                      setCatSearch("");
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] hover:text-white border-t border-slate-200 transition-colors capitalize ${
                      filters?.category === cat._id ? "text-blue-500 bg-blue-500/5 font-bold" : "text-[#3978E3]"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#CDDAF5] flex items-center justify-center text-[10px] font-bold text-[#3978E3] uppercase flex-shrink-0">
                      {cat.name[0]}
                    </div>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}

                {filteredCategories.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-400 bg-white">No categories found</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. NEW PREMIUM SEARCHABLE EMAIL DROPDOWN (Superadmin Only) */}
      {type === "superadmin" && (
        <div className="relative flex-shrink-0 min-w-[180px]" ref={emailDropdownRef}>
          <button
            type="button"
            onClick={() => setIsEmailOpen(!isEmailOpen)}
            className={`w-full h-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 transition-all bg-white ${
              isEmailOpen || filters?.email
                ? "text-slate-700 font-bold"
                : "text-slate-400"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="truncate">
                {selectedUserName ? `@${selectedUserName}` : "All Emails"}
              </span>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform duration-200 flex-shrink-0 ${isEmailOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Glassmorphic Email Dropdown Drawer */}
          {isEmailOpen && (
            <div className="absolute right-0 z-50 w-64 mt-3 bg-[#CDDAF6] rounded-xl overflow-hidden animate-in shadow-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
              <div className="p-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    ref={emailInputRef}
                    type="text"
                    placeholder="Filter by email..."
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg text-xs text-slate-700 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="max-h-56 overflow-y-auto scrollbar-premium bg-white">
                <button
                  type="button"
                  onClick={() => {
                    onFilterChange("email", "");
                    setIsEmailOpen(false);
                    setEmailSearch("");
                  }}
                  className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2 hover:bg-[#3477E7] hover:text-white transition-colors ${
                    !filters?.email ? "text-blue-500 bg-blue-500/5 font-bold" : "text-slate-500"
                  }`}
                >
                  <span>All Users</span>
                </button>

                {filteredUsers.map((u) => (
                  <button
                    // key={u._id}
                    key={u.email}
                    type="button"
                    onClick={() => {
                      onFilterChange("email", u.email);
                      setIsEmailOpen(false);
                      setEmailSearch("");
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs flex items-center gap-2.5 hover:bg-[#3477E7] hover:text-white border-t border-slate-200 transition-colors ${
                      filters?.email === u.email ? "text-blue-500 bg-blue-500/5 font-bold" : "text-[#3978E3]"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#CDDAF5] flex items-center justify-center text-[10px] font-bold text-[#3978E3] uppercase flex-shrink-0">
                      {u.email[0]}
                    </div>
                    <span className="truncate">{u.email}</span>
                  </button>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="p-6 text-center text-xs text-slate-400 bg-white">No users found</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SEGMENTED TOGGLE PILLS */}
      {type === "user_saved" && (
        <div className="flex p-1 bg-white rounded-xl flex-shrink-0">
          {["all", "platform", "custom"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onFilterChange("toolType", t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide capitalize transition-all duration-200 ${
                (filters?.toolType || "all") === t
                  ? "bg-[#3E82F5] text-white shadow-lg shadow-blue-600/15"
                  : "text-slate-400 hover:text-[#2762F6] cursor-pointer"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* 5. CLEAR FILTERS TRIGGER */}
      <div className="flex items-center pl-1 ml-auto">
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveFilters}
          className={`text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
            hasActiveFilters
              ? "text-slate-500 hover:text-red-400 cursor-pointer"
              : "text-slate-600 cursor-not-allowed opacity-40"
          }`}
        >
          Clear Filters
        </button>
      </div>

      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 4px; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: #222533; border-radius: 10px; }
        @keyframes inlineFade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-in { animation: inlineFade 0.15s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ToolFilters;