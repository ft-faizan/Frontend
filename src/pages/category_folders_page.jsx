// // v5

// import { useEffect } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";

// function Category_folders_page() {
//   const location = useLocation();
//   const { id } = useParams(); // Assuming your route is /category/:id
//   const dispatch = useDispatch();
  
//   const { tools, loading } = useSelector((state) => state.tools);
//   const name = location.state?.name;

//   useEffect(() => {
//     // Fetch tools specifically for this category
//     // Mode is empty/public to get platform-wide tools
//     dispatch(getTools({ category: id })); 
//   }, [dispatch, id]);

//   return (
//     <div className="py-5">
//       {/* Header */}
//       <div className="mb-10">
//         <h1 className="text-3xl font-bold capitalize text-white">
//           {name || "Explore Tools"}
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Discover the best {name} tools curated for your workflow.
//         </p>
//       </div>

//       {/* Tool List in Public Mode */}
//       <ToolCardList 
//         tools={tools} 
//         mode="public" 
//         loading={loading}
//       />
//     </div>
//   );
// }

// export default Category_folders_page;




import { useEffect, useState, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../features/tools/toolSlice";
import ToolCardList from "../components/reuseable_compo/ToolCardList";
import ToolFilters from "../components/reuseable_compo/ToolFilters";

function Category_folders_page() {
  const location = useLocation();
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  // 1. Local States for Search and Pagination
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ search: "" });

  // 2. Redux State
  const { tools, loading, totalPages } = useSelector((state) => state.tools);
  const name = location.state?.name;

  // 3. Fetch tools based on Category ID, Search, and Page
  useEffect(() => {
    dispatch(getTools({ 
      category: id, 
      search: filters.search, 
      page: page 
    })); 
  }, [dispatch, id, filters.search, page]);

  // 4. Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to page 1 when searching
  };

  const handleClearFilters = () => {
    setFilters({ search: "" });
    setPage(1);
  };

  return (
    <div className="py-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-white">
          {name || "Explore Tools"}
        </h1>
        <p className="text-gray-500 mt-2">
          Discover the best {name} tools curated for your workflow.
        </p>
      </div>

      {/* 5. Tool Filter (Search Only Mode) */}
      <ToolFilters
        type="public" // We can add a "public" case to our ToolFilters for just search
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {/* Tool List in Public Mode */}
      <ToolCardList 
        tools={tools} 
        mode="public" 
        loading={loading}
      />

      {/* 6. Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                page === i + 1 
                  ? "bg-[#286FF0] text-white shadow-lg" 
                  : "bg-[#1c1f26] text-gray-500 hover:text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category_folders_page;