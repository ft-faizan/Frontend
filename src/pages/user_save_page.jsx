// // v1

// import { useState, useEffect, useMemo } from "react";

// import { useDispatch, useSelector } from "react-redux";

// import {

//   fetchSavedTools,

//   deleteSavedTool,

// } from "../features/savedTools/savedToolSlice";

// import {

//   getFolders,

//   deleteFolder,

//   updateFolder,

// } from "../features/folders/folderSlice"; // Ensure these

// import ToolCardList from "../components/reuseable_compo/ToolCardList";

// import FolderCard from "../components/user_save_compo/FolderCard";

// import { createFolder } from "../features/folders/folderSlice";

// import FolderModal from "../components/user_save_compo/FolderModal";

// import { useNavigate } from "react-router-dom";

// import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";

// function User_save_page() {

//   const [activeTab, setActiveTab] = useState("saved_tools");

//   const [searchQuery, setSearchQuery] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 8;

//   const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

//   const [selectedFolder, setSelectedFolder] = useState(null);

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const { savedItems, loading } = useSelector((state) => state.savedTools);

//   const { folders } = useSelector((state) => state.folders);

//   const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

//   const [selectedCustomTool, setSelectedCustomTool] = useState(null);

//   useEffect(() => {

//     dispatch(fetchSavedTools());

//     dispatch(getFolders());

//   }, [dispatch]);

//   // Actions

//   const handleRemoveSaved = (id) => {

//     if (window.confirm("Remove this tool?")) dispatch(deleteSavedTool(id));

//   };

//   const handleDeleteFolder = (id) => {

//     if (

//       window.confirm("Delete folder? Tools inside will be moved to default.")

//     ) {

//       dispatch(deleteFolder(id));

//     }

//   };

//   // const handleEditFolder = (folder) => {

//   //   const newName = prompt("Enter new folder name:", folder.name);

//   //   if (newName && newName !== folder.name) {

//   //     dispatch(updateFolder({ id: folder._id, name: newName }));

//   //   }

//   // };

//   const handleFolderConfirm = (name) => {

//     if (selectedFolder) {

//       dispatch(updateFolder({ id: selectedFolder._id, name }));

//     } else {

//       dispatch(createFolder(name));

//     }

//   };

//   // Logic for Searching & Paginating Folders

//   const filteredFolders = useMemo(() => {

//     return folders

//       .filter((f) => f.type === "custom")

//       .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   }, [folders, searchQuery]);

//   const paginatedFolders = useMemo(() => {

//     const startIndex = (currentPage - 1) * itemsPerPage;

//     return filteredFolders.slice(startIndex, startIndex + itemsPerPage);

//   }, [filteredFolders, currentPage]);

//   // const handleEditClick = (tool) => {

//   //   console.log("Edit clicked:", tool);

//   //   setSelectedCustomTool(tool); // ✅ correct setter

//   //   setIsCustomModalOpen(true);

//   // };

// const defaultFolder = folders.find(f => f.name === "default");

// const defaultFolderId = defaultFolder?._id;

// const displayTools = useMemo(() => {

//   return savedItems.filter((item) => {

//     if (!item.folderId) return true;

//     const folderIdValue = typeof item.folderId === "string"

//       ? item.folderId

//       : item.folderId?._id;

//     return folderIdValue === defaultFolderId;

//   });

// }, [savedItems, defaultFolderId]);

//   const handleEditClick = (tool) => {

//   setSelectedCustomTool(tool); // ✅ EDIT MODE

//   setIsCustomModalOpen(true);

// };

//   const totalPages = Math.ceil(filteredFolders.length / itemsPerPage);

//   // const content = useMemo(() => {

//   // return {

//   // saved_tools: (

//   //   <>

//   //     <button

//   //       onClick={() => {

//   //         console.log("Button clicked"); // ✅ debug

//   //         setSelectedCustomTool(null);

//   //         setIsCustomModalOpen(true); // 🔥 MUST BE TRUE

//   //       }}

//   //     >

//   //       + Add Custom Tool

//   //     </button>

//   //     <ToolCardList

//   //       tools={savedItems.filter(

//   //         (item) =>

//   //           !item.folderId ||

//   //           item.folderId?.type === "default" ||

//   //           item.folderId?.name === "default",

//   //       )}

//   //       mode="saved"

//   //       loading={loading}

//   //       onDelete={handleRemoveSaved}

//   //        onEdit={handleEditClick}

//   //     />

//   //   </>

//   // ),

//   const content = {

//     saved_tools: (

//       <>

//         <button

//           onClick={() => {

//             setSelectedCustomTool(null);

//             setIsCustomModalOpen(true);

//           }}

//         >

//           + Add Custom Tool

//         </button>

//         <ToolCardList

//           // tools={savedItems.filter(

//           //   (item) =>

//           //     !item.folderId ||

//           //     item.folderId?.type === "default" ||

//           //     item.folderId?.name === "default",

//           // )}

//           tools={displayTools}

//           mode="saved"

//           loading={loading}

//           onDelete={handleRemoveSaved}

//           onEdit={handleEditClick}

//         />

//       </>

//     ),

//     saved_tools_folders: (

//       <div className="space-y-6">

//         {/* Search Bar */}

//         {/* <div className="flex justify-between items-center bg-[#13151a] border border-[#2a2d3a] p-2 rounded-xl">

//             <input

//               type="text"

//               placeholder="Search folders..."

//               value={searchQuery}

//               onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}

//               className="bg-transparent border-none outline-none text-white text-sm px-3 w-full"

//             />

//           </div> */}

//         <div className="flex gap-3 items-center">

//           {/* Search */}

//           <div className="flex-1 flex items-center bg-[#13151a] border border-[#2a2d3a] p-2 rounded-xl">

//             <input

//               type="text"

//               placeholder="Search folders..."

//               value={searchQuery}

//               onChange={(e) => {

//                 setSearchQuery(e.target.value);

//                 setCurrentPage(1);

//               }}

//               className="bg-transparent border-none outline-none text-white text-sm px-3 w-full"

//             />

//           </div>

//           {/* 🔥 NEW BUTTON */}

//           <button

//             onClick={() => {

//               setSelectedFolder(null); // create mode

//               setIsFolderModalOpen(true);

//             }}

//             className="bg-[#286FF0] text-white px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"

//           >

//             + New Folder

//           </button>

//         </div>

//         {/* Folder Grid */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

//           {paginatedFolders.map((folder) => (

//             <FolderCard

//               key={folder._id}

//               folder={folder}

//               onNavigate={(f) =>

//                 navigate(`/saved/folder/${f._id}`, {

//                   state: { name: f.name },

//                 })

//               }

//               // onEdit={handleEditFolder}

//               onEdit={(f) => {

//                 setSelectedFolder(f);

//                 setIsFolderModalOpen(true);

//               }}

//               onDelete={handleDeleteFolder}

//             />

//           ))}

//         </div>

//         {/* Pagination Controls */}

//         {totalPages > 1 && (

//           <div className="flex justify-center gap-2 mt-8">

//             {[...Array(totalPages)].map((_, i) => (

//               <button

//                 key={i}

//                 onClick={() => setCurrentPage(i + 1)}

//                 className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? "bg-[#286FF0] text-white" : "bg-[#1c1f26] text-gray-500"}`}

//               >

//                 {i + 1}

//               </button>

//             ))}

//           </div>

//         )}

//       </div>

//     ),

//   };

//   // }, [

//   //  savedItems,   // 🔥 MUST

//   // paginatedFolders,

//   // savedItems,

//   // loading,

//   // searchQuery,

//   // currentPage,

//   // totalPages,

//   //  activeTab     // 💡 important

//   // savedItems,      // 🔥 Required: re-calculates when tools are updated

//   // loading,         // 🔥 Required: re-calculates when loading state changes

//   // paginatedFolders,

//   // searchQuery,

//   // currentPage,

//   // totalPages,

//   // activeTab        // 💡 Good practice to include the tab itself

//   // ]);

//   return (

//     <div className="p-2">

//       <h1 className="text-3xl font-bold mb-1">Saved</h1>

//       <p className="text-gray-500 text-sm mb-7">

//         Manage your quick-saves and organized collections.

//       </p>

//       {/* Tab Bar */}

//       <div className="flex gap-1 bg-[#13151a] border border-[#2a2d3a] rounded-xl p-1 w-fit mb-7">

//         {tabs.map((tab) => (

//           <button

//             key={tab.id}

//             onClick={() => setActiveTab(tab.id)}

//             className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-[#286FF0] text-white font-bold shadow-lg" : "text-gray-500 hover:text-gray-300"}`}

//           >

//             {tab.label}

//           </button>

//         ))}

//       </div>

//       <div className="min-h-[400px]">{content[activeTab]}</div>

//       <FolderModal

//         open={isFolderModalOpen}

//         onClose={() => setIsFolderModalOpen(false)}

//         initialData={selectedFolder}

//         onConfirm={handleFolderConfirm}

//       />

//       <AddCustomToolModal

//         open={isCustomModalOpen}

//         // onClose={() => setIsCustomModalOpen(false)}

//         onClose={() => {

//           setIsCustomModalOpen(false);

//           setSelectedCustomTool(null); // 🔥 important

//         }}

//         editData={selectedCustomTool}

//       />

//     </div>

//   );

// }

// const tabs = [

//   { id: "saved_tools", label: "Saved Tools" },

//   { id: "saved_tools_folders", label: "Saved Tools Folders" },

// ];

// export default User_save_page;

// import { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchSavedTools,
//   deleteSavedTool,
// } from "../features/savedTools/savedToolSlice";
// import {
//   getFolders,
//   deleteFolder,
//   updateFolder,
//   createFolder,
// } from "../features/folders/folderSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import FolderCard from "../components/user_save_compo/FolderCard";
// import FolderModal from "../components/user_save_compo/FolderModal";
// import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";
// import ToolFilters from "../components/reuseable_compo/ToolFilters";
// import { useNavigate } from "react-router-dom";

// function User_save_page() {
//   const [activeTab, setActiveTab] = useState("saved_tools");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [toolPage, setToolPage] = useState(1);
//   const toolsPerPage = 12;
//   const { savedItems, loading } = useSelector((state) => state.savedTools);
//   const { folders } = useSelector((state) => state.folders);
//   const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
//   const [selectedCustomTool, setSelectedCustomTool] = useState(null);

//   const [filters, setFilters] = useState({
//     search: "",
//     toolType: "all",
//     category: "",
//   });

//   useEffect(() => {
//     dispatch(fetchSavedTools());
//     dispatch(getFolders());
//   }, [dispatch]);
//   // 🔥 PASTE HERE
//   // const dynamicCategories = useMemo(() => {
//   //   if (!savedItems) return [];

//   //   const cats = savedItems
//   //     .filter((item) => item.type === "platform" && item.toolId?.category)
//   //     .map((item) => item.toolId.category);

//   //   const uniqueCats = Array.from(new Set(cats.map((c) => c._id)))
//   //     .map((id) => cats.find((c) => c._id === id))
//   //     .filter((c) => c && c.name);

//   //   return uniqueCats;
//   // }, [savedItems]);

//   //   const dynamicCategories = useMemo(() => {
//   //   if (!savedItems || savedItems.length === 0) return [];

//   //   const cats = savedItems
//   //     .filter((item) => item.type === "platform" && item.toolId?.category)
//   //     .map((item) => item.toolId.category);

//   //   const uniqueMap = new Map();

//   //   cats.forEach((cat) => {
//   //     const id = typeof cat === "string" ? cat : cat._id;
//   //     const name = typeof cat === "object" ? cat.name : null;

//   //     if (id && name && !uniqueMap.has(id)) {
//   //       uniqueMap.set(id, { _id: id, name: name });
//   //     }
//   //   });

//   //   return Array.from(uniqueMap.values());
//   // }, [savedItems]);

//   const dynamicCategories = useMemo(() => {
//     // 1. Filter tools that belong to the current active view (Default Folder)
//     const toolsInView = savedItems.filter((item) => {
//       const folderIdValue =
//         typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
//       return !item.folderId || folderIdValue === defaultFolderId;
//     });

//     // 2. Extract categories from those tools
//     const cats = toolsInView
//       .filter((item) => item.type === "platform" && item.toolId?.category)
//       .map((item) => item.toolId.category);

//     // 3. Unique Map to prevent duplicates
//     const uniqueMap = new Map();
//     cats.forEach((cat) => {
//       const id = typeof cat === "string" ? cat : cat._id;
//       const name = typeof cat === "object" ? cat.name : null;
//       if (id && name && !uniqueMap.has(id)) {
//         uniqueMap.set(id, { _id: id, name: name });
//       }
//     });

//     return Array.from(uniqueMap.values());
//   }, [savedItems, defaultFolderId]);

//   const handleRemoveSaved = (id) => {
//     if (window.confirm("Remove this tool?")) dispatch(deleteSavedTool(id));
//   };

//   const handleDeleteFolder = (id) => {
//     if (
//       window.confirm("Delete folder? Tools inside will be moved to default.")
//     ) {
//       dispatch(deleteFolder(id));
//     }
//   };

//   const handleFolderConfirm = (name) => {
//     if (selectedFolder) {
//       dispatch(updateFolder({ id: selectedFolder._id, name }));
//     } else {
//       dispatch(createFolder(name));
//     }
//   };

//   // const handleFilterChange = (key, value) => {
//   //   setFilters((prev) => ({ ...prev, [key]: value }));
//   //   setCurrentPage(1);
//   // };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setCurrentPage(1);
//   };

//   const defaultFolder = folders.find((f) => f.name === "default");
//   const defaultFolderId = defaultFolder?._id;

//   // 2. FIXED: Robust filtering logic
//   const displayTools = useMemo(() => {
//     return savedItems.filter((item) => {
//       // A. Folder Logic
//       const folderIdValue =
//         typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
//       const isInDefault = !item.folderId || folderIdValue === defaultFolderId;
//       if (!isInDefault) return false;

//       // B. Search Filter
//       // const toolName = item.type === "platform" ? item.toolId?.name : item.toolname;
//       // const matchesSearch = (toolName || "").toLowerCase().includes((filters.search || "").toLowerCase());

//       const toolName =
//         item.type === "platform" ? item.toolId?.name : item.toolname;

//       const matchesSearch = (toolName || "")
//         .toLowerCase()
//         .includes((filters.search || "").toLowerCase());

//       // C. Tool Type Filter
//       const matchesType =
//         filters.toolType === "all" || item.type === filters.toolType;

//       // D. Category Filter
//       const catId = item.toolId?.category?._id || item.toolId?.category;
//       const matchesCategory = !filters.category || catId === filters.category;

//       return matchesSearch && matchesType && matchesCategory;
//     });
//   }, [savedItems, defaultFolderId, filters]);

//   const paginatedTools = useMemo(() => {
//   const startIndex = (toolPage - 1) * toolsPerPage;
//   return displayTools.slice(startIndex, startIndex + toolsPerPage);
// }, [displayTools, toolPage]);

// const totalToolPages = Math.ceil(displayTools.length / toolsPerPage);

//   const handleEditClick = (tool) => {
//     setSelectedCustomTool(tool);
//     setIsCustomModalOpen(true);
//   };

//   // Folder Pagination logic
//   const filteredFolders = useMemo(() => {
//     return folders
//       .filter((f) => f.type === "custom")
//       .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
//   }, [folders, searchQuery]);

//   const paginatedFolders = useMemo(() => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     return filteredFolders.slice(startIndex, startIndex + itemsPerPage);
//   }, [filteredFolders, currentPage]);

//   const totalPages = Math.ceil(filteredFolders.length / itemsPerPage);

//   const content = {
//     saved_tools: (
//       <>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold text-white">My Tools</h2>
//           <button
//             onClick={() => {
//               setSelectedCustomTool(null);
//               setIsCustomModalOpen(true);
//             }}
//             className="bg-[#286FF0] text-white px-4 py-2 rounded-xl font-bold text-sm"
//           >
//             + Add Custom Tool
//           </button>
//         </div>

//         <ToolFilters
//           type="user_saved"
//           filters={filters}
//           categories={dynamicCategories}
//           onFilterChange={handleFilterChange}
//           onClear={() =>
//             setFilters({ search: "", toolType: "all", category: "" })
//           }
//         />

//         <ToolCardList
//           tools={displayTools}
//           mode="saved"
//           loading={loading}
//           onDelete={handleRemoveSaved}
//           onEdit={handleEditClick}
//         />
//         {/* 🔥 Tool Pagination UI */}
//       {totalToolPages > 1 && (
//         <div className="flex justify-center gap-2 mt-10">
//           {[...Array(totalToolPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setToolPage(i + 1)}
//               className={`w-10 h-10 rounded-lg font-bold transition-all ${
//                 toolPage === i + 1
//                   ? "bg-[#286FF0] text-white shadow-lg shadow-blue-500/20"
//                   : "bg-[#1c1f26] text-gray-500 hover:text-gray-300"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//       </>
//     ),
//     saved_tools_folders: (
//       <div className="space-y-6">
//         <div className="flex gap-3 items-center">
//           <div className="flex-1 flex items-center bg-[#13151a] border border-[#2a2d3a] p-2 rounded-xl">
//             <input
//               type="text"
//               placeholder="Search folders..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="bg-transparent border-none outline-none text-white text-sm px-3 w-full"
//             />
//           </div>
//           <button
//             onClick={() => {
//               setSelectedFolder(null);
//               setIsFolderModalOpen(true);
//             }}
//             className="bg-[#286FF0] text-white px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap"
//           >
//             + New Folder
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {paginatedFolders.map((folder) => (
//             <FolderCard
//               key={folder._id}
//               folder={folder}
//               onNavigate={(f) =>
//                 navigate(`/saved/folder/${f._id}`, { state: { name: f.name } })
//               }
//               onEdit={(f) => {
//                 setSelectedFolder(f);
//                 setIsFolderModalOpen(true);
//               }}
//               onDelete={handleDeleteFolder}
//             />
//           ))}
//         </div>

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-8">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? "bg-[#286FF0] text-white" : "bg-[#1c1f26] text-gray-500"}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     ),
//   };

//   return (
//     <div className="p-2">
//       <h1 className="text-3xl font-bold mb-1">Saved</h1>
//       <p className="text-gray-500 text-sm mb-7">
//         Manage collections and custom links.
//       </p>

//       <div className="flex gap-1 bg-[#13151a] border border-[#2a2d3a] rounded-xl p-1 w-fit mb-7">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-[#286FF0] text-white font-bold" : "text-gray-500 hover:text-gray-300"}`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div className="min-h-[400px]">{content[activeTab]}</div>

//       <FolderModal
//         open={isFolderModalOpen}
//         onClose={() => setIsFolderModalOpen(false)}
//         initialData={selectedFolder}
//         onConfirm={handleFolderConfirm}
//       />
//       <AddCustomToolModal
//         open={isCustomModalOpen}
//         onClose={() => {
//           setIsCustomModalOpen(false);
//           setSelectedCustomTool(null);
//         }}
//         editData={selectedCustomTool}
//       />
//     </div>
//   );
// }

// const tabs = [
//   { id: "saved_tools", label: "Saved Tools" },
//   { id: "saved_tools_folders", label: "Saved Tools Folders" },
// ];

// export default User_save_page;

// v3

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSavedTools,
  deleteSavedTool,
} from "../features/savedTools/savedToolSlice";
import {
  getFolders,
  deleteFolder,
  updateFolder,
  createFolder,
} from "../features/folders/folderSlice";
import ToolCardList from "../components/reuseable_compo/ToolCardList";
import FolderCard from "../components/user_save_compo/FolderCard";
import FolderModal from "../components/user_save_compo/FolderModal";
import AddCustomToolModal from "../components/user_save_compo/AddCustomToolModal";
import ToolFilters from "../components/reuseable_compo/ToolFilters";
import { useNavigate } from "react-router-dom";
import SlidingButton from "../components/reuseable_compo/SlidingButton";
import { FaPlus } from "react-icons/fa";
import { ChevronDown, X, Search, Filter, Layers, Mail } from "lucide-react";
import { useToast } from "../context/ToastContext";

function User_save_page() {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. All States
  const [activeTab, setActiveTab] = useState("saved_tools");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Folder Pagination
  const [toolPage, setToolPage] = useState(1); // Tool Pagination
  const [filters, setFilters] = useState({
    search: "",
    toolType: "all",
    category: "",
  });
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [selectedCustomTool, setSelectedCustomTool] = useState(null);

  // 2. Constants
  const itemsPerPage = 16; // Folders per page
  const toolsPerPage = 25; // Tools per page

  // 3. Redux Selectors
  const { savedItems, loading } = useSelector((state) => state.savedTools);
  const { folders } = useSelector((state) => state.folders);

  // 4. Initial Fetch
  useEffect(() => {
    dispatch(fetchSavedTools());
    dispatch(getFolders());
  }, [dispatch]);

  // 5. Critical ID Variables (Must be defined before useMemo)
  const defaultFolder = folders.find((f) => f.name === "default");
  const defaultFolderId = defaultFolder?._id;

  // 6. Logic: Category Extraction (Context-Aware)
  const dynamicCategories = useMemo(() => {
    if (!savedItems || savedItems.length === 0) return [];

    const toolsInView = savedItems.filter((item) => {
      const folderIdValue =
        typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
      return !item.folderId || folderIdValue === defaultFolderId;
    });

    const cats = toolsInView
      .filter((item) => item.type === "platform" && item.toolId?.category)
      .map((item) => item.toolId.category);

    const uniqueMap = new Map();
    cats.forEach((cat) => {
      const id = typeof cat === "string" ? cat : cat._id;
      const name = typeof cat === "object" ? cat.name : null;
      if (id && name && !uniqueMap.has(id)) {
        uniqueMap.set(id, { _id: id, name: name });
      }
    });

    return Array.from(uniqueMap.values());
  }, [savedItems, defaultFolderId]);

  // 7. Logic: Filtering Tools
  const displayTools = useMemo(() => {
    return savedItems.filter((item) => {
      const folderIdValue =
        typeof item.folderId === "string" ? item.folderId : item.folderId?._id;
      const isInDefault = !item.folderId || folderIdValue === defaultFolderId;
      if (!isInDefault) return false;

      const toolName =
        item.type === "platform" ? item.toolId?.name : item.toolname;
      const matchesSearch = (toolName || "")
        .toLowerCase()
        .includes((filters.search || "").toLowerCase());
      const matchesType =
        filters.toolType === "all" || item.type === filters.toolType;
      const catId = item.toolId?.category?._id || item.toolId?.category;
      const matchesCategory = !filters.category || catId === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [savedItems, defaultFolderId, filters]);

  // 8. Logic: Tool Pagination
  const paginatedTools = useMemo(() => {
    const startIndex = (toolPage - 1) * toolsPerPage;
    return displayTools.slice(startIndex, startIndex + toolsPerPage);
  }, [displayTools, toolPage]);

  const totalToolPages = Math.ceil(displayTools.length / toolsPerPage);

  // 9. Logic: Folder Filtering & Pagination
  const filteredFolders = useMemo(() => {
    return folders
      .filter((f) => f.type === "custom")
      .filter((f) =>
        (f.name || "").toLowerCase().includes(searchQuery.toLowerCase()),
      );
  }, [folders, searchQuery]);

  const paginatedFolders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFolders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredFolders, currentPage]);

  const totalFolderPages = Math.ceil(filteredFolders.length / itemsPerPage);

  // 10. Handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setToolPage(1); // Reset tools to page 1 on filter
  };

  const handleRemoveSaved = (id) => {
    if (window.confirm("Remove this tool?")) dispatch(deleteSavedTool(id));
  };

  // const handleDeleteFolder = (id) => {
  //   if (
  //     window.confirm("Delete folder? Tools inside will be moved to default.")
  //   ) {
  //     dispatch(deleteFolder(id));
  //   }
  // };

  const handleDeleteFolder = async (id) => {
  if (
    window.confirm(
      "Delete folder? Tools inside will be moved to default."
    )
  ) {
    try {
      await dispatch(deleteFolder(id)).unwrap();

      showToast(
        "Folder deleted successfully",
        "error"
      );
    } catch (err) {
      showToast(err || "Failed to delete folder", "error");
    }
  }
};

  // const handleFolderConfirm = (name) => {
  //   if (selectedFolder) {
  //     dispatch(updateFolder({ id: selectedFolder._id, name }));
  //   } else {
  //     dispatch(createFolder(name));
  //   }
  // };

  const handleFolderConfirm = async (name) => {
  try {

    if (selectedFolder) {

      // UPDATE
      await dispatch(
        updateFolder({
          id: selectedFolder._id,
          name,
        })
      ).unwrap();

      showToast(
        "Folder renamed successfully"
      );

    } else {

      // CREATE
      await dispatch(
        createFolder(name)
      ).unwrap();

      showToast(
        "Folder created successfully"
      );
    }

    setIsFolderModalOpen(false);

  } catch (err) {

    showToast(
      err || "Something went wrong",
      "error"
    );
  }
};

  const handleEditClick = (tool) => {
    setSelectedCustomTool(tool);
    setIsCustomModalOpen(true);
  };

  // 11. Content Tabs
  const content = {
    saved_tools: (
      <>
        {/* <div className="flex justify-between items-center mb-6">
          
          <button
            onClick={() => {
              setSelectedCustomTool(null);
              setIsCustomModalOpen(true);
            }}
            className="bg-[#286FF0] text-white px-4 py-2 rounded-xl font-bold text-sm"
          >
            + Add Custom Tool
          </button>
        </div> */}

        <ToolFilters
          type="user_saved"
          filters={filters}
          categories={dynamicCategories}
          onFilterChange={handleFilterChange}
          onClear={() =>
            setFilters({ search: "", toolType: "all", category: "" })
          }
        />
        <div className="mt-[30px]">
          <ToolCardList
            tools={paginatedTools} // 🔥 Use the paginated variable here
            mode="saved"
            loading={loading}
            onDelete={handleRemoveSaved}
            onEdit={handleEditClick}
          />
        </div>

        {/* {totalToolPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalToolPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setToolPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  toolPage === i + 1
                    ? "bg-[#286FF0] text-white shadow-lg shadow-blue-500/20"
                    : "bg-[#1c1f26] text-gray-500 hover:text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )} */}
        {totalToolPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-10 pb-10">

    {/* PREV */}
    <button
      type="button"
      onClick={() =>
        setToolPage((p) => Math.max(p - 1, 1))
      }
      disabled={toolPage === 1}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    {/* PAGE NUMBERS */}
    <div className="flex gap-1.5">
      {Array.from(
        { length: totalToolPages },
        (_, i) => i + 1
      ).map((p) => (
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

    {/* NEXT */}
    <button
      type="button"
      onClick={() =>
        setToolPage((p) =>
          Math.min(p + 1, totalToolPages)
        )
      }
      disabled={toolPage === totalToolPages}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Next
    </button>

  </div>
)}
      </>
    ),
    saved_tools_folders: (
      <div className="space-y-6">
        {/* <div className="z-50 w-[100%] mt-3 bg-[#CDDAF6] rounded-xl overflow-hidden    animate-in shadow-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <div className="p-3.5">
            <input
              type="text"
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-5 py-3.5 bg-white rounded-lg text-xs text-slate-700 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div> */}
        <div className="        relative
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
        z-[30]">
          <Search className="absolute left-8 z-[10] top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          <div class="relative flex-grow flex items-center group min-w-[200px]">
            <input
              type="text"
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              class="w-full pl-11 pr-10 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedFolders.map((folder) => (
            <FolderCard
              key={folder._id}
              folder={folder}
              onNavigate={(f) =>
                navigate(`/saved/folder/${f._id}`, { state: { name: f.name } })
              }
              onEdit={(f) => {
                setSelectedFolder(f);
                setIsFolderModalOpen(true);
              }}
              onDelete={handleDeleteFolder}
            />
          ))}
        </div>

        {/* {totalFolderPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalFolderPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${currentPage === i + 1 ? "bg-[#286FF0] text-white" : "bg-[#1c1f26] text-gray-500"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )} */}
        {totalFolderPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-8 pb-10">

    {/* PREV */}
    <button
      type="button"
      onClick={() =>
        setCurrentPage((p) => Math.max(p - 1, 1))
      }
      disabled={currentPage === 1}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    {/* PAGE NUMBERS */}
    <div className="flex gap-1.5">
      {Array.from(
        { length: totalFolderPages },
        (_, i) => i + 1
      ).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setCurrentPage(p)}
          className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all ${
            currentPage === p
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
              : "text-slate-400 hover:bg-white hover:text-blue-600"
          }`}
        >
          {p}
        </button>
      ))}
    </div>

    {/* NEXT */}
    <button
      type="button"
      onClick={() =>
        setCurrentPage((p) =>
          Math.min(p + 1, totalFolderPages)
        )
      }
      disabled={currentPage === totalFolderPages}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Next
    </button>

  </div>
)}
      </div>
    ),
  };

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      <div className=" flex justify-between">
        <div className="flex gap-1 bg-white  rounded-xl p-1 w-fit mb-7">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-[#286FF0] text-white font-bold" : "text-gray-500 hover:text-[#2F70EB]"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* <div className="flex justify-between items-center mb-6">
          
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
        <div className="flex justify-between items-center mb-6">
          {activeTab === "saved_tools" ? (
            <SlidingButton
              icon={<FaPlus className="text-white text-base" />}
              text="Add Custom Tools"
              onClick={() => {
                setSelectedCustomTool(null);
                setIsCustomModalOpen(true);
              }}
              width="w-[220px]"
            />
          ) : (
            <SlidingButton
              icon={<FaPlus className="text-white text-base " />}
              text="Add New Folder"
              onClick={() => {
                setSelectedFolder(null);
                setIsFolderModalOpen(true);
              }}
              width="w-[200px]"
            />
          )}
        </div>
      </div>

      <div className="-h-[100%]">{content[activeTab]}</div>

      <FolderModal
        open={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        initialData={selectedFolder}
        onConfirm={handleFolderConfirm}
      />
      <AddCustomToolModal
        open={isCustomModalOpen}
        onClose={() => {
          setIsCustomModalOpen(false);
          setSelectedCustomTool(null);
        }}
        editData={selectedCustomTool}
      />
    </div>
  );
}

const tabs = [
  { id: "saved_tools", label: "Saved Tools" },
  { id: "saved_tools_folders", label: "Saved Tools Folders" },
];

export default User_save_page;
