// // v3
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCategories,
//   getUsers,
// } from "../../features/categories/categorySlice.js";
// import CategoryCard from "../category_compo/CategoryCard.jsx";
// import CategoryFilter from "./CategoryFilter";

// function CategoryList({ mode = "user", showCreator = true }) {
//   const dispatch = useDispatch();

//   // 🟢 SEPARATE STATES (Prevents infinite loops)
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("all");
//   const [email, setEmail] = useState("");
//   const [page, setPage] = useState(1);

//   const {
//     categories,
//     loading,
//     error,
//     pages = 1,
//   } = useSelector((state) => state.categories);
//   const { user } = useSelector((state) => state.auth);
//   const users = useSelector((state) => state.categories.users);

//   // 🟢 FETCH CATEGORIES
//   useEffect(() => {
//     if (!user) return;

//     const params = {
//       page,
//       limit: 9,
//       search: search.trim(),
//     };

//     if (type === "mine") params.mode = "admin";
//     if (email) params.email = email;

//     dispatch(getCategories(params));
//   }, [dispatch, user, page, search, type, email]);

//   // 🟢 FETCH USERS (For Superadmin list)
//   useEffect(() => {
//     if (mode === "superadmin" && users.length === 0) {
//       dispatch(getUsers());
//     }
//   }, [dispatch, mode, users.length]);

//   // 🟢 RENDER
//   return (
//     <div className="w-full">
//       {/* 1. FILTER: Stays on screen even when loading */}
//       <div className=" sticky top-0 z-[30]">
//         <CategoryFilter
//           mode={mode}
//           users={users}
//           // v1
//           // onFilterChange={(data) => {
//           //   setSearch(data.search);
//           //   setType(data.type);
//           //   setEmail(data.email);
//           //   setPage(1);
//           // }}
//           // v2
//           onFilterChange={(data) => {
//             // RESET ONLY IF FILTER CHANGED
//             if (
//               data.search !== search ||
//               data.type !== type ||
//               data.email !== email
//             ) {
//               setPage(1);
//             }

//             setSearch(data.search);
//             setType(data.type);
//             setEmail(data.email);
//           }}
//         />
//       </div>

//       {/* 🔥 STATUS AREA */}
//       <div className="w-full flex justify-center items-center min-h-[40px] ">
//         {/* LOADING */}
//         {loading && (
//           <div
//             className="
//       relative overflow-hidden
//       flex items-center gap-3
//       px-5 py-2.5
//       rounded-2xl

//       bg-gradient-to-br
//       from-[#2E72E3]/15
//       to-cyan-400/10

//       border border-[#2E72E3]/20

//       backdrop-blur-2xl

//       shadow-[0_0_25px_rgba(46,114,227,0.15)]

//       animate-pulse
//       m-5
//     "
//           >
//             {/* Glow */}
//             <div
//               className="
//         absolute inset-0
//         bg-gradient-to-r
//         from-transparent
//         via-white/5
//         to-transparent
//         animate-[shimmer_2s_linear_infinite]
//       "
//             />

//             {/* Spinner */}
//             <div
//               className="
//         w-4 h-4
//         rounded-full
//         border-2
//         border-[#2E72E3]/30
//         border-t-[#2E72E3]
//         animate-spin
//         relative z-10
//       "
//             />

//             <span
//               className="
//         relative z-10
//         text-[#7EB3FF]
//         text-sm
//         font-medium
//         tracking-wide
//       "
//             >
//               Updating results...
//             </span>
//           </div>
//         )}

//         {/* ERROR */}
//         {!loading && error && (
//           <div
//             className="
//       flex items-center gap-3
//       px-5 py-2.5
//       rounded-2xl

//       bg-gradient-to-br
//       from-red-500/15
//       to-rose-500/10

//       border border-red-500/20

//       backdrop-blur-2xl

//       shadow-[0_0_25px_rgba(239,68,68,0.12)]
//     "
//           >
//             <div
//               className="
//         w-4 h-4
//         rounded-full
//         bg-red-400
//         animate-pulse
//       "
//             />

//             <span
//               className="
//         text-red-300
//         text-sm
//         font-medium
//       "
//             >
//               {error}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* 4. CONTENT AREA */}
//       {!categories.length && !loading ? (
//         <div className="text-center py-10">
//           <p className="text-gray-500">No categories match your search.</p>
//         </div>
//       ) : (
//         <>
//           {/* Grid dims slightly when loading to give feedback without flickering */}
//           <div
//             className={`grid md:grid-cols-3 gap-4 mt-2 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}
//           >
//             {categories.map((cat) => (
//               <CategoryCard
//                 key={cat._id}
//                 category={cat}
//                 mode={mode}
//                 showCreator={showCreator}
//               />
//             ))}
//           </div>

//           {/* 5. PAGINATION */}
//           {pages > 1 && (
//             <div className="flex justify-center items-center gap-4 mt-8 mb-[70px] pb-10">
//               <button
//                 type="button"
//                 onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                 disabled={page === 1}
//                 className="px-4 py-2 border border-[#2a2d3a] rounded text-sm text-gray-300 disabled:opacity-30 hover:border-indigo-500 transition-all cursor-pointer"
//               >
//                 Prev
//               </button>

//               <div className="flex gap-2">
//                 {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
//                   <button
//                     key={p}
//                     type="button"
//                     onClick={() => setPage(p)}
//                     className={`px-3 py-1 rounded text-sm transition-all cursor-pointer ${
//                       page === p
//                         ? "bg-indigo-600 text-white font-bold"
//                         : "text-gray-400 hover:text-white"
//                     }`}
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setPage((p) => Math.min(p + 1, pages))}
//                 disabled={page === pages}
//                 className="px-4 py-2 border border-[#2a2d3a] rounded text-sm text-gray-300 disabled:opacity-30 hover:border-indigo-500 transition-all cursor-pointer"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//       <style>
//         {`
//     @keyframes shimmer {
//       0% {
//         transform: translateX(-100%);
//       }

//       100% {
//         transform: translateX(100%);
//       }
//     }
//   `}
//       </style>
//     </div>
//   );
// }

// export default CategoryList;





import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getUsers } from "../../features/categories/categorySlice.js";
import CategoryCard from "../category_compo/CategoryCard.jsx";
import CategoryFilter from "./CategoryFilter";
import CreateAndEditCategoryModal from "../admin/CreateAndEditCategoryModal"; // ➕ Imported single instance modal
import { Plus } from "lucide-react"; // Smooth icon accent

function CategoryList({ mode = "user", showCreator = true }) {
  const dispatch = useDispatch();

  // 🟢 FILTER & PAGINATION STATES
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);

  // 🎛️ CENTRALIZED MODAL STATES (Single Instance Architecture)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categories, loading, error, pages = 1 } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.categories.users);

  // 🟢 FETCH CATEGORIES
  useEffect(() => {
    if (!user) return;

    const params = {
      page,
      limit: 9,
      search: search.trim(),
    };

    if (type === "mine") params.mode = "admin";
    if (email) params.email = email;

    dispatch(getCategories(params));
  }, [dispatch, user, page, search, type, email]);

  // 🟢 FETCH USERS (For Superadmin list)
  useEffect(() => {
    if (mode === "superadmin" && users.length === 0) {
      dispatch(getUsers());
    }
  }, [dispatch, mode, users.length]);

  // 🛠️ MODAL CONTROL HANDLERS
  const handleOpenCreateModal = () => {
    setSelectedCategory(null); // Setting null forces the modal into blank "Create" mode
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setSelectedCategory(category); // Passing data context sets modal to "Edit" mode
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const isAdminOrSuper = mode === "admin" || mode === "superadmin";

  return (
    <div className="w-full min-h-screen  text-slate-100 p-1">
      
      {/* 1. TOP HEADER ACCENT & CREATE ACTION */}
      {/* {isAdminOrSuper && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 pt-2 px-1">
         
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-semibold shadow-lg shadow-blue-600/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            <Plus size={14} strokeWidth={2.5} />
            Create Category
          </button>
        </div>
      )} */}

      {/* 2. FILTER LAYER */}
      <div className="sticky top-0 z-[30]  px-5">
        <CategoryFilter
          mode={mode}
          users={users}
          onFilterChange={(data) => {
            if (data.search !== search || data.type !== type || data.email !== email) {
              setPage(1);
            }
            setSearch(data.search);
            setType(data.type);
            setEmail(data.email);
          }}
        />
      </div>

      {/* 3. ASYNC FEEDBACK TRACKS */}
      <div className="w-full flex justify-center items-center min-h-[50px]">
        {loading && (
          <div className="relative overflow-hidden flex items-center gap-3 px-5 mt-5 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-md shadow-inner animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_linear_infinite]" />
            <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin relative z-10" />
            <span className="relative z-10 text-blue-400 text-xs font-medium tracking-wide">
              Updating interface queries...
            </span>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-red-500/5 border border-red-500/10 backdrop-blur-md shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-medium">{error}</span>
          </div>
        )}
      </div>

      {/* 4. CONTENT GRID AREA */}
      {!categories.length && !loading ? (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/10 max-w-md mx-auto mt-6">
          <p className="text-sm text-slate-500 font-medium">No system categories match your exact query.</p>
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2 mb-[60px] transition-opacity duration-300 ${loading ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                mode={mode}
                showCreator={showCreator}
                onEdit={handleOpenEditModal} // 💡 Intercepts the click handler context cleanly
              />
            ))}
          </div>

          {/* 5. METRIC PAGINATION SYSTEM */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-4 mb-[25px] pb-15">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
               className="px-3.5 py-2  rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:border-slate-700 hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-slate-800"
              >
                Prev
              </button>

              <div className="flex gap-1.5">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all ${
                      page === p
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
                        : "text-slate-400 hover:bg-white hover:text-blue-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, pages))}
                disabled={page === pages}
                  className="px-3.5 py-2  rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:border-slate-700 hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-slate-800"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* 🚀 THE SINGULAR GLOBAL MODAL (Serves all cards dynamically) */}
      <CreateAndEditCategoryModal
        open={isModalOpen}
        onClose={handleCloseModal}
        editData={selectedCategory}
      />

      {/* Embedded Shimmer Track */}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}

export default CategoryList;