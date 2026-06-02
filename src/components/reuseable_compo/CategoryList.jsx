



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