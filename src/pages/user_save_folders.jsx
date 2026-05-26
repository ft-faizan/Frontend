// import { useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSavedTools } from "../features/savedTools/savedToolSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";

// function User_save_folders() {
//   const { id } = useParams(); // folderId
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { savedItems, loading } = useSelector((state) => state.savedTools);

//   const folderName = location.state?.name || "Folder";

//   useEffect(() => {
//     // We fetch all tools, then filter them by folderId locally
//     // Or you can update your fetchSavedTools to accept a folderId param
//     dispatch(fetchSavedTools());
//   }, [dispatch, id]);

//   const filteredTools = savedItems.filter(item => item.folderId?._id === id || item.folderId === id);

//   const handleEditClick = (tool) => {
//   console.log("Edit clicked:", tool);
//   setSelectedCustomTool(tool); // ✅ correct setter
//   setIsCustomModalOpen(true);
// };

//   return (
//     <div className="py-5">
//       <div className="mb-10 flex items-center gap-4">
//         <div className="text-4xl">📁</div>
//         <div>
//           <h1 className="text-3xl font-bold capitalize text-white">{folderName}</h1>
//           <p className="text-gray-500">Items saved in this collection</p>
//         </div>
//       </div>

//       <ToolCardList
//         tools={filteredTools}
//         mode="saved"
//         loading={loading}
//          onEdit={handleEditClick}
//       />

//     </div>
//   );
// }

// // export default User_save_folders;

// import { useEffect, useState } from "react"; // ← add useState
// import { useParams, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSavedTools } from "../features/savedTools/savedToolSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";

// function User_save_folders() {
//   const { id } = useParams();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { savedItems, loading } = useSelector((state) => state.savedTools);

//   // ← These were missing entirely
//   const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
//   const [selectedCustomTool, setSelectedCustomTool] = useState(null);
  
//   const folderName = location.state?.name || "Folder";

//   useEffect(() => {
//     dispatch(fetchSavedTools());
//   }, [dispatch, id]);

//   const filteredTools = savedItems.filter(
//     (item) => item.folderId?._id === id || item.folderId === id,
//   );

//   const handleEditClick = (tool) => {
//     setSelectedCustomTool(tool);
//     setIsCustomModalOpen(true);
//   };

//   return (
//     <div className="py-5">
//       <div className="mb-10 flex items-center gap-4">
//         <div className="text-4xl">📁</div>
//         <div>
//           <h1 className="text-3xl font-bold capitalize text-white">
//             {folderName}
//           </h1>
//           <p className="text-gray-500">Items saved in this collection</p>
//         </div>
//         <button
//           onClick={() => {
//             setSelectedCustomTool(null);
//             setIsCustomModalOpen(true);
//           }}
//         >
//           + Add Tool to Folder
//         </button>
//       </div>

//       <ToolCardList
//         tools={filteredTools}
//         mode="saved"
//         loading={loading}
//         onEdit={handleEditClick}
//       />

//       <AddCustomToolModal
//         open={isCustomModalOpen}
//         onClose={() => {
//           setIsCustomModalOpen(false);
//           setSelectedCustomTool(null);
//         }}
//         editData={selectedCustomTool}
//          defaultFolderId={id}
//       />
//     </div>
//   );
// }

// export default User_save_folders;


// v3
import { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedTools, deleteSavedTool } from "../features/savedTools/savedToolSlice";
import ToolCardList from "../components/reuseable_compo/ToolCardList";
import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";
import ToolFilters from "../components/reuseable_compo/ToolFilters";
import SlidingButton from "../components/reuseable_compo/SlidingButton";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

function User_save_folders() {
  const { id } = useParams(); // Current Folder ID
  const location = useLocation();
  const dispatch = useDispatch();
  
  // 1. Redux State
  const { savedItems, loading } = useSelector((state) => state.savedTools);

  // 2. Local UI States
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedCustomTool, setSelectedCustomTool] = useState(null);
  const [toolPage, setToolPage] = useState(1);
  const toolsPerPage = 25;

  // 3. Filter State
  const [filters, setFilters] = useState({
    search: "",
    toolType: "all",
    category: "",
  });

  const folderName = location.state?.name || "Folder";

  useEffect(() => {
    dispatch(fetchSavedTools());
  }, [dispatch, id]);

  // 4. Logic: Get tools belonging ONLY to this folder
  const toolsInThisFolder = useMemo(() => {
    return savedItems.filter(
      (item) => item.folderId?._id === id || item.folderId === id
    );
  }, [savedItems, id]);

  // 5. Logic: Context-Aware Categories (Only categories inside THIS folder)
  const dynamicCategories = useMemo(() => {
    const cats = toolsInThisFolder
      .filter((item) => item.type === "platform" && item.toolId?.category)
      .map((item) => item.toolId.category);

    const uniqueMap = new Map();
    cats.forEach((cat) => {
      const isPopulated = typeof cat === "object" && cat !== null && cat.name;
      const catId = isPopulated ? cat._id : cat;
      const catName = isPopulated ? cat.name : null;

      if (catId && catName && !uniqueMap.has(catId)) {
        uniqueMap.set(catId, { _id: catId, name: catName });
      }
    });

    return Array.from(uniqueMap.values());
  }, [toolsInThisFolder]);

  // 6. Logic: Filtering tools in this folder
  const filteredTools = useMemo(() => {
    return toolsInThisFolder.filter((item) => {
      // Search Filter
      const toolName = item.type === "platform" ? item.toolId?.name : item.toolname;
      const matchesSearch = (toolName || "").toLowerCase().includes((filters.search || "").toLowerCase());

      // Type Filter
      const matchesType = filters.toolType === "all" || item.type === filters.toolType;

      // Category Filter
      const itemCatId = item.toolId?.category?._id || item.toolId?.category;
      const matchesCategory = !filters.category || itemCatId === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [toolsInThisFolder, filters]);

  // 7. Logic: Pagination
  const paginatedTools = useMemo(() => {
    const startIndex = (toolPage - 1) * toolsPerPage;
    return filteredTools.slice(startIndex, startIndex + toolsPerPage);
  }, [filteredTools, toolPage]);

  const totalToolPages = Math.ceil(filteredTools.length / toolsPerPage);

  // 8. Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setToolPage(1);
  };

  const handleEditClick = (tool) => {
    setSelectedCustomTool(tool);
    setIsCustomModalOpen(true);
  };

  const handleRemoveSaved = (toolId) => {
    if (window.confirm("Remove this tool from the folder?")) {
      dispatch(deleteSavedTool(toolId));
    }
  };

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      {/* Header Section */}
      {/* <div className="mb-5 flex flex-wrap justify-end items-center gap-4">
        
         <SlidingButton
              icon={<FaPlus className="text-white text-base" />}
              text="Add Custom Tools"
              onClick={() => {
                setSelectedCustomTool(null);
                setIsCustomModalOpen(true);
              }}
              width="w-[220px]"
            />
      </div> */}
      <div className="flex items-center justify-between gap-3 mb-5">

  {/* BACK BUTTON */}
  <button
    type="button"
    onClick={() => window.history.back()}
    className="
      relative
      group

      w-[200px]
      h-[44px]

      cursor-pointer

      flex
      items-center

      rounded-xl

      border
      border-[#3380FF]/50

      bg-[#3380FF]

      overflow-hidden

      shadow-lg
      shadow-[#3380FF]/10

      active:scale-[0.98]

      transition-all
      duration-300
    "
  >
    {/* ICON */}
    <span
      className="
        absolute
        left-0
        top-0
        bottom-0

        w-[42px]

        bg-[#226ce6]

        flex
        items-center
        justify-center

        transition-all
        duration-300

        group-hover:w-full
      "
    >
      <FaArrowLeft className="text-white" />
    </span>

    {/* TEXT */}
    <span
      className="
        absolute
        right-0

        text-white
        font-semibold
        text-sm
        tracking-wide

        transition-all
        duration-300

        group-hover:text-transparent

        relative
        left-[68px]
      "
    >
      Back to Saved
    </span>
  </button>

  {/* RIGHT BUTTON */}
  <SlidingButton
    icon={<FaPlus className="text-white text-base" />}
    text="Add Custom Tools"
    onClick={() => {
      setSelectedCustomTool(null);
      setIsCustomModalOpen(true);
    }}
    width="w-[220px]"
  />

</div>

      {/* Filter Component */}
      <ToolFilters
        type="user_saved"
        filters={filters}
        categories={dynamicCategories}
        onFilterChange={handleFilterChange}
        onClear={() => setFilters({ search: "", toolType: "all", category: "" })}
      />

      {/* Tool List */}
      <div className="mt-[30px]">
        <ToolCardList
        tools={paginatedTools}
        mode="saved"
        loading={loading}
        onEdit={handleEditClick}
        onDelete={handleRemoveSaved}
      />

      </div>
      
      {/* Pagination UI */}
      {totalToolPages > 1 && (
        // <div className="flex justify-center gap-2 mt-10">
        //   {[...Array(totalToolPages)].map((_, i) => (
        //     <button
        //       key={i}
        //       onClick={() => setToolPage(i + 1)}
        //       className={`w-10 h-10 rounded-lg font-bold transition-all ${
        //         toolPage === i + 1 
        //           ? "bg-[#286FF0] text-white shadow-lg" 
        //           : "bg-[#1c1f26] text-gray-500 hover:text-gray-300"
        //       }`}
        //     >
        //       {i + 1}
        //     </button>
        //   ))}
        // </div>
        <div className="flex justify-center items-center gap-4 mt-10 pb-10">
  
  {/* PREV BUTTON */}
  <button
    type="button"
    onClick={() => setToolPage((p) => Math.max(p - 1, 1))}
    disabled={toolPage === 1}
    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
  >
    Prev
  </button>

  {/* PAGE BUTTONS */}
  <div className="flex gap-1.5">
    {Array.from({ length: totalToolPages }, (_, i) => i + 1).map((p) => (
      <button
        key={p}
        type="button"
        onClick={() => setToolPage(p)}
        className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all ${
          toolPage === p
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
            : "text-slate-400 hover:bg-white hover:text-blue-600"
        }`}
      >
        {p}
      </button>
    ))}
  </div>

  {/* NEXT BUTTON */}
  <button
    type="button"
    onClick={() =>
      setToolPage((p) => Math.min(p + 1, totalToolPages))
    }
    disabled={toolPage === totalToolPages}
    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
      )}

      {/* Modal */}
      <AddCustomToolModal
        open={isCustomModalOpen}
        onClose={() => {
          setIsCustomModalOpen(false);
          setSelectedCustomTool(null);
        }}
        editData={selectedCustomTool}
        defaultFolderId={id}
      />
    </div>
  );
}

export default User_save_folders;