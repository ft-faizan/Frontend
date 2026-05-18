




// v3
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getUsers } from "../../features/categories/categorySlice.js";
import CategoryCard from "../category_compo/CategoryCard.jsx";
import CategoryFilter from "./CategoryFilter";

function CategoryList({ mode = "user", showCreator = true }) {
  const dispatch = useDispatch();

  // 🟢 SEPARATE STATES (Prevents infinite loops)
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);

  const { categories, loading, error, pages = 1 } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);
  const users = useSelector((state) => state.categories.users);

  // 🟢 FETCH CATEGORIES
  useEffect(() => {
    if (!user) return;

    const params = {
      page,
      limit: 10,
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

  // 🟢 RENDER
  return (
    <div className="w-full">
      {/* 1. FILTER: Stays on screen even when loading */}
      <CategoryFilter
        mode={mode}
        users={users}
        onFilterChange={(data) => {
          setSearch(data.search);
          setType(data.type);
          setEmail(data.email);
          setPage(1); 
        }}
      />

      {/* 2. LOADING INDICATOR: Small and non-disruptive */}
      <div className="h-6 flex items-center">
        {loading && (
           <span className="text-indigo-500 text-xs font-medium animate-pulse">
             🔄 Updating results...
           </span>
        )}
      </div>

      {/* 3. ERROR HANDLING */}
      {error && <p className="text-red-500 my-2 text-sm font-medium">⚠️ {error}</p>}

      {/* 4. CONTENT AREA */}
      {!categories.length && !loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No categories match your search.</p>
        </div>
      ) : (
        <>
          {/* Grid dims slightly when loading to give feedback without flickering */}
          <div className={`grid md:grid-cols-3 gap-4 mt-2 transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                mode={mode}
                showCreator={showCreator}
              />
            ))}
          </div>

          {/* 5. PAGINATION */}
          {pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pb-10">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-[#2a2d3a] rounded text-sm text-gray-300 disabled:opacity-30 hover:border-indigo-500 transition-all cursor-pointer"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded text-sm transition-all cursor-pointer ${
                      page === p ? "bg-indigo-600 text-white font-bold" : "text-gray-400 hover:text-white"
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
                className="px-4 py-2 border border-[#2a2d3a] rounded text-sm text-gray-300 disabled:opacity-30 hover:border-indigo-500 transition-all cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CategoryList;