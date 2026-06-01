

// v3
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../features/tools/toolSlice";
import ToolCardList from "../components/reuseable_compo/ToolCardList";
import ToolFilters from "../components/reuseable_compo/ToolFilters";
import { ArrowLeft, Sparkles, Layers } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

function CategoryFoldersPage() {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // PAGINATION
  const [page, setPage] = useState(1);

  // FILTERS
  const [filters, setFilters] = useState({
    search: "",
  });

  // REDUX STATE
  const {
  tools,
  loading,
  pages,
  total
} = useSelector((state) => state.tools);
  const name = location.state?.name;

  // FETCH TOOLS
  useEffect(() => {
    dispatch(
      getTools({
        category: id,
        search: filters.search,
        page,
        limit: 27, // Upgraded from 5 to 9 for better grid balancing
      }),
    );
  }, [dispatch, id, filters.search, page]);

  // FILTER CHANGE
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset page on filter alteration
  };

  // CLEAR FILTERS
  const handleClearFilters = () => {
    setFilters({
      search: "",
    });
    setPage(1);
  };

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      {/* Dynamic Ambient Background Mesh */}
      {/* <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-indigo-500/[0.01] rounded-full blur-[100px] pointer-events-none z-0" /> */}

      {/* 1. NAVIGATION & HEADER BLOCK */}
      {/* <div className="relative z-10 mb-4 max-w-7xl mx-auto flex flex-col gap-4">
        <div>
         
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="relative group w-[200px] h-[44px] cursor-pointer flex items-center rounded-xl border border-[#3380FF]/50 bg-[#3380FF] overflow-hidden shadow-lg shadow-[#3380FF]/10 active:scale-[0.98] transition-all duration-300"
          >
            <span className="absolute left-0 top-0 bottom-0 w-[42px] bg-[#226ce6] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:bg-[#226ce6]">
              <FaArrowLeft className="text-white" />
            </span>
            <span className="absolute right-0 pl- transform translate-x-[-26px] text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:translate-x-0 relative left-[80px]">
              Back to Categorie
            </span>
          </button>
        </div>
      </div> */}
      <div className="flex items-center justify-between gap-3 mb-3">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
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
        left-[55px]
      "
          >
            Back to Category
          </span>
        </button>

        {/* TOOL COUNT */}
        <div
          className="
      h-[44px]

      px-5

      rounded-xl

      

      bg-[#3981FA]

      flex
      items-center
      gap-2

      shadow-lg
    "
        >
          {/* DOT */}
          <div
            className="
        w-2
        h-2

        rounded-full

        bg-[#C4D5F6]

        animate-pulse
      "
          />

          {/* COUNT */}
          <span
            className="
        text-sm
        font-semibold

        text-white
      "
          >
           {total}
          </span>

          {/* LABEL */}
          <span
            className="
        text-xs
        text-white
        font-semibold
      "
          >
            Active Tools
          </span>
        </div>
      </div>

      {/* 2. CORE WORKSPACE WRAPPER */}
      <div className="relative mx-auto space-y-6">
        {/* FILTERS COMPONENT CONTEXT */}
        <div className="sticky top-0 z-[5]">
          <ToolFilters
            type="public"
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />
        </div>

        {/* MAIN DATA FEED LIST CANVAS */}
        <div
          className={`transition-opacity duration-300  ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}
        >
          <ToolCardList tools={tools} mode="public" loading={loading} />
        </div>

        {/* 3. METRIC DATA PAGINATION ACTIONS */}
        {pages > 1 && (
          // <div className="flex justify-center items-center gap-2.5 pt-8 pb-12">
          //   {/* Prev Page Button */}
          //   <button
          //     onClick={() => setPage((p) => Math.max(p - 1, 1))}
          //     disabled={page === 1}
          //     className="h-9 px-3 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900/40 hover:border-slate-700 hover:text-slate-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          //   >
          //     Prev
          //   </button>

          //   {/* Core Numeric Indicators */}
          //   <div className="flex gap-1.5">
          //     {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
          //       <button
          //         key={pageNum}
          //         onClick={() => setPage(pageNum)}
          //         className={`h-9 min-w-[36px] px-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
          //           page === pageNum
          //             ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15 scale-105"
          //             : "border border-slate-900 text-slate-400 bg-slate-900/20 hover:border-slate-800 hover:text-white"
          //         }`}
          //       >
          //         {pageNum}
          //       </button>
          //     ))}
          //   </div>

          //   {/* Next Page Button */}
          //   <button
          //     onClick={() => setPage((p) => Math.min(p + 1, pages))}
          //     disabled={page === pages}
          //     className="h-9 px-3 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900/40 hover:border-slate-700 hover:text-slate-200 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          //   >
          //     Next
          //   </button>
          // </div>
          <div className="flex justify-center items-center gap-4 mt-5 mb-[25px] pb-15">
            {/* PREV */}
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="
      px-3.5
      py-2
      rounded-xl
      text-xs
      font-semibold

      text-[#3075E8]
      bg-white

      hover:text-white
      hover:bg-[#3075E8]

      transition-all

      disabled:opacity-20
      disabled:cursor-not-allowed
    "
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            <div className="flex gap-1.5">
              {Array.from({ length: pages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setPage(pageNum)}
                  className={`
          h-8
          min-w-[32px]
          px-2
          rounded-xl
          text-xs
          font-bold
          transition-all

          ${
            page === pageNum
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
              : "text-slate-400 hover:bg-white hover:text-blue-600"
          }
        `}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* NEXT */}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, pages))}
              disabled={page === pages}
              className="
      px-3.5
      py-2
      rounded-xl
      text-xs
      font-semibold

      text-[#3075E8]
      bg-white

      hover:text-white
      hover:bg-[#3075E8]

      transition-all

      disabled:opacity-20
      disabled:cursor-not-allowed
    "
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Embedded Theme Scroller Architecture styles */}
      <style>{`
        .scrollbar-premium::-webkit-scrollbar { width: 6px; }
        .scrollbar-premium::-webkit-scrollbar-track { background: #090b0f; }
        .scrollbar-premium::-webkit-scrollbar-thumb { background: #141722; border-radius: 10px; }
        .scrollbar-premium::-webkit-scrollbar-thumb:hover { background: #1e2233; }
      `}</style>
    </div>
  );
}

export default CategoryFoldersPage;
