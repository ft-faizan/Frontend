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


import React from "react";

const ToolFilters = ({
  filters,
  onFilterChange,
  onClear,
  type,
  categories = [],
}) => {
  return (
    <div className="flex flex-wrap gap-4 bg-[#13151a] border border-[#2a2d3a] p-4 rounded-2xl mb-8 items-center">
      
      {/* 1. Search by Name: Visible on ALL pages (Admin, SuperAdmin, Saved, and Public Category) */}
      <div className="flex-1 min-w-[200px]">
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none focus:border-[#286FF0] transition-all"
          value={filters?.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>

      {/* 2. Category Dropdown: Hidden for 'public' type because the user is already inside a category */}
      {(type === "admin" || type === "superadmin" || type === "user_saved") && (
        <div className="relative min-w-[180px]">
          <select
            className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none appearance-none pr-10 cursor-pointer capitalize"
            value={filters?.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>No categories found</option>
            )}
          </select>
          {/* Custom Arrow Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
            ▼
          </div>
        </div>
      )}

      {/* 3. Super Admin Only: Email Filter */}
      {type === "superadmin" && (
        <div className="min-w-[200px]">
          <input
            type="email"
            placeholder="Filter by user email..."
            className="w-full bg-[#1c1f26] border border-[#2a2d3a] p-2.5 rounded-xl text-white outline-none focus:border-[#286FF0]"
            value={filters?.email || ""}
            onChange={(e) => onFilterChange("email", e.target.value)}
          />
        </div>
      )}

      {/* 4. User Save Page Only: Tool Type Toggle (Platform vs Custom) */}
      {type === "user_saved" && (
        <div className="flex bg-[#1c1f26] p-1 rounded-xl border border-[#2a2d3a]">
          {["all", "platform", "custom"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onFilterChange("toolType", t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                (filters?.toolType || "all") === t
                  ? "bg-[#286FF0] text-white shadow-lg"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* 5. Clear Button */}
      <button
        type="button"
        onClick={onClear}
        className="text-gray-500 hover:text-red-400 text-sm font-medium transition-colors px-2 ml-auto"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ToolFilters;
