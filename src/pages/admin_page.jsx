import { useState, useEffect, useRef } from "react";
import CreateAndEditCategoryModal from "../components/admin/CreateAndEditCategoryModal.jsx";
import CreateAndEditToolModal from "../components/admin/CreateAndEditToolModal.jsx";
import CategoryList from "../components/reuseable_compo/CategoryList.jsx";
import ToolCardList from "../components/reuseable_compo/ToolCardList.jsx";
import ToolFilters from "../components/reuseable_compo/ToolFilters";
import { useDispatch, useSelector } from "react-redux";
import {
  getTools,
  deleteTool,
  getAdminStats,
} from "../features/tools/toolSlice.js";
import SlidingButton from "../components/reuseable_compo/SlidingButton.jsx";
import { FaPlus } from "react-icons/fa";
import { Users, UserCheck, Shield } from "lucide-react";
import { Wrench, LayoutGrid } from "lucide-react";
import { BarChart3, PieChart } from "lucide-react";

// ── Tab definitions ──────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "category", label: "Category" },
  { id: "tool", label: "Tool" },
];

function DashboardContent() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.tools);
  // const [searchEmail, setSearchEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState(user?.email || "");

  const isMyStats = searchEmail.toLowerCase() === user?.email?.toLowerCase();
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barInstance = useRef(null);
  const pieInstance = useRef(null);

  // useEffect(() => {
  //   dispatch(getAdminStats(""));
  // }, [dispatch]);

  useEffect(() => {
    if (user?.email) {
      dispatch(getAdminStats(user.email));
    }
  }, [dispatch, user?.email]);

  useEffect(() => {
    if (!stats || !window.Chart) return;

    // --- BAR CHART (Admin Contributions) ---
    if (barChartRef.current) {
      if (barInstance.current) barInstance.current.destroy();
      barInstance.current = new window.Chart(
        barChartRef.current.getContext("2d"),
        {
          type: "bar",
          data: {
            labels: stats.toolStats.map((t) => t.email.split("@")[0]),
            datasets: [
              {
                label: "Tools",
                data: stats.toolStats.map((t) => t.count),
                backgroundColor: "#286FF0",
                borderRadius: 5,
              },
              {
                label: "Categories",
                data: stats.toolStats.map((t) => {
                  const c = stats.categoryStats.find(
                    (cat) => cat.email === t.email,
                  );
                  return c ? c.count : 0;
                }),
                backgroundColor: "#8b5cf6",
                borderRadius: 5,
              },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false },
        },
      );
    }

    // --- PIE CHART (User Roles) ---
    if (pieChartRef.current) {
      if (pieInstance.current) pieInstance.current.destroy();
      pieInstance.current = new window.Chart(
        pieChartRef.current.getContext("2d"),
        {
          type: "pie",
          data: {
            labels: stats.userRoleStats.map((r) => r._id || "Unknown"),
            datasets: [
              {
                data: stats.userRoleStats.map((r) => r.count),
                backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444"],
                borderWidth: 0,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: "bottom", labels: { color: "#9ca3af" } },
            },
          },
        },
      );
    }
  }, [stats]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAdminStats(searchEmail));
  };

  const getRoleCount = (role) =>
    stats?.userRoleStats?.find((r) => r._id === role)?.count || 0;

  const statCardsConfig = [
    {
      id: "users",
      role: "user",
      label: "Total Users",
      sub: "All tools in library",
      Icon: Users,
    },
    {
      id: "admins",
      role: "admin",
      label: "Total Admins",
      sub: "From official directory",
      Icon: UserCheck,
    },
    {
      id: "superadmins",
      role: "superadmin",
      label: "Super Admins",
      sub: "Smart collections",
      Icon: Shield,
    },
  ];
  const totalToolsCount =
    stats?.toolStats?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0;
  const formattedTools =
    totalToolsCount < 10 && totalToolsCount > 0
      ? `0${totalToolsCount}`
      : totalToolsCount;

  const totalCategoriesCount =
    stats?.categoryStats?.reduce((acc, curr) => acc + (curr.count || 0), 0) ||
    0;
  const formattedCategories =
    totalCategoriesCount < 10 && totalCategoriesCount > 0
      ? `0${totalCategoriesCount}`
      : totalCategoriesCount;
  return (
    <div className="space-y-5">
      <div className="px-5 sticky top-0 z-[20]">
        {/* 🔍 1. SEARCH BAR */}
        <div
          className="relative
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
          <form onSubmit={handleSearch} className="flex gap-2 w-full  ">
            <input
              type="text"
              placeholder="Search Admin Email..."
              className="w-full pl-6 pr-0 py-2.5 bg-white border-none outline-none focus:outline-none focus:ring-0 focus:border-none rounded-xl text-slate-600 placeholder-slate-500 text-sm transition-all"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-0 rounded-xl text-sm font-semibold   transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 📊 2. ACCOUNT COUNT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  w-full p-1">
        {statCardsConfig.map(({ id, role, label, sub, Icon }) => {
          const rawValue = getRoleCount?.(role) || 0;
          // Tech layout padding: prepends a sharp leading zero for single digits
          const formattedValue =
            rawValue < 10 && rawValue > 0 ? `0${rawValue}` : rawValue;

          return (
            <div
              key={id}
              className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none"
            >
              {/* 1. Next-Gen Ambient Glow Overlay */}
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

              {/* 2. Abstract Background Giant Rotating Icon Layer */}
              <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
                <Icon strokeWidth={1} />
              </div>

              {/* Top Header Information Meta Row */}
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
                    {label}
                  </p>
                  <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
                    {sub}
                  </p>
                </div>

                {/* Floating Neon Icon Box Frame */}
                <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
                  <Icon
                    size={16}
                    className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
                  />
                </div>
              </div>

              {/* Bottom Main Gradient Core Value Row */}
              <div className="mt-5 relative z-10">
                {loading ? (
                  <div className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-[#1a1d2a] animate-pulse" />
                ) : (
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
                      {formattedValue}
                    </h3>
                  </div>
                )}
              </div>

              {/* 3. Sleek Left Accent Kinetic Transform Line */}
              <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
            </div>
          );
        })}
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5  w-full p-1">
        {/* ─── CARD 1: TOOLS STATS ─── */}
        <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none">
          {/* Next-Gen Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

          {/* Abstract Background Giant Icon Layer */}
          <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
            <Wrench strokeWidth={1} />
          </div>

          {/* Top Header Row (Icon + Label) */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase truncate max-w-[240px]">
                {isMyStats ? "Tools Created by Me" : `Tools by ${searchEmail}`}
              </p>
              <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
                Active items inside workspace
              </p>
            </div>

            {/* Floating Neon Icon Frame */}
            <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
              <Wrench
                size={18}
                className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
              />
            </div>
          </div>

          {/* Bottom Main Value Row */}
          <div className="mt-5 relative z-10 flex items-baseline gap-2">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
              {formattedTools}
            </h3>
            <span className="text-slate-400 dark:text-slate-600 text-[10px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Active Tools
            </span>
          </div>

          {/* Sleek Left Accent Kinetic Line */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
        </div>

        {/* ─── CARD 2: CATEGORY STATS ─── */}
        <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none">
          {/* Next-Gen Ambient Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

          {/* Abstract Background Giant Icon Layer */}
          <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
            <LayoutGrid strokeWidth={1} />
          </div>

          {/* Top Header Row (Icon + Label) */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase truncate max-w-[240px]">
                {isMyStats
                  ? "Categories Created by Me"
                  : `Categories by ${searchEmail}`}
              </p>
              <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
                Global directories structure
              </p>
            </div>

            {/* Floating Neon Icon Frame */}
            <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
              <LayoutGrid
                size={18}
                className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
              />
            </div>
          </div>

          {/* Bottom Main Value Row */}
          <div className="mt-5 relative z-10 flex items-baseline gap-2">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
              {formattedCategories}
            </h3>
            <span className="text-slate-400 dark:text-slate-600 text-[10px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Global Types
            </span>
          </div>

          {/* Sleek Left Accent Kinetic Line */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
        </div>
      </div>

      {/* 📉 3. GRAPHS SECTION */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        <div className="lg:col-span-2 bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl">
          <h3 className="text-white font-bold mb-4">
            Admin Contributions (Tools & Categories)
          </h3>
          <div className="h-[300px]">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl">
          <h3 className="text-white font-bold mb-4">Role Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <canvas ref={pieChartRef}></canvas>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16  w-full p-1">
        {/* ─── CONTAINER 1: BAR CHART (ADMIN CONTRIBUTIONS) ─── */}
        <div className="group relative lg:col-span-2 overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-0.5 select-none">
          {/* Next-Gen Ambient Glow: Spreads outward on chart container hover */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

          {/* Top Header Label Row */}
          <div className="flex items-center justify-between gap-3 relative z-10 mb-6">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
                Metrics Terminal
              </p>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                Admin Contributions (Tools & Categories)
              </h3>
            </div>

            {/* Floating Neon Icon Frame Accent */}
            <div className="w-8 h-8 rounded-lg bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/5">
              <BarChart3
                size={15}
                className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
              />
            </div>
          </div>

          {/* Chart Interactive Canvas Node */}
          <div className="h-[300px] relative z-10 w-full">
            <canvas ref={barChartRef}></canvas>
          </div>

          {/* Sleek Left Accent Kinetic Transform Line */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
        </div>

        {/* ─── CONTAINER 2: PIE CHART (ROLE DISTRIBUTION) ─── */}
        <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-0.5 select-none">
          {/* Next-Gen Ambient Glow Overlay */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

          {/* Top Header Label Row */}
          <div className="flex items-center justify-between gap-3 relative z-10 mb-6">
            <div className="flex flex-col gap-0.5">
              <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
                Segment Mapping
              </p>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">
                Role Distribution
              </h3>
            </div>

            {/* Floating Neon Icon Frame Accent */}
            <div className="w-8 h-8 rounded-lg bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/5">
              <PieChart
                size={15}
                className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
              />
            </div>
          </div>

          {/* Chart Interactive Canvas Node */}
          <div className="h-[300px] flex items-center justify-center relative z-10 w-full">
            <canvas ref={pieChartRef}></canvas>
          </div>

          {/* Sleek Left Accent Kinetic Transform Line */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
        </div>
      </div>
    </div>
  );
}
function CategoryContent() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div>
      {/* CREATE BUTTON */}
      {/* <button
        onClick={() => {
          setEditData(null);
          setOpen(true);
        }}
        className="bg-[#3380FF] text-white px-4 py-2 rounded-lg"
      >
        + Create Category
      </button> */}

      <CategoryList mode="admin" showCreator={true} />

      {/* MODAL */}
      {/* <CreateAndEditCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        editData={editData}
      /> */}
    </div>
  );
}

// function ToolContent() {
function ToolContent({ setToolOpen, setToolEditData }) {
  // const [open, setOpen] = useState(false);
  // const [editData, setEditData] = useState(null);
  // const dispatch = useDispatch();
  // const { tools, loading } = useSelector((state) => state.tools);

  // useEffect(() => {
  //   dispatch(getTools({ mode: "admin" }));
  // }, [dispatch]);

  // const handleEdit = (tool) => {
  //   setEditData(tool);
  //   setOpen(true);
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this tool?")) {
  //     dispatch(deleteTool(id));
  //   }
  // };

  // const [open, setOpen] = useState(false);
  // const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  // const { tools, loading } = useSelector((state) => state.tools);

  // const { tools, loading, pages } = useSelector((state) => state.tools);
  const { tools, loading, pages } = useSelector((state) => state.tools);
  const { categories } = useSelector((state) => state.categories);

  // const [open, setOpen] = useState(false);
  // const [editData, setEditData] = useState(null);

  // 🔥 NEW
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
  });

  // useEffect(() => {
  //   dispatch(getTools({ mode: "admin" }));
  // }, [dispatch]);

  useEffect(() => {
    dispatch(
      getTools({
        mode: "admin",
        page,
        limit:27,
        search: filters.search,
        category: filters.category,
      }),
    );
  }, [dispatch, page, filters]);

  // const handleEdit = (tool) => {
  //   setEditData(tool);
  //   setOpen(true);
  // };

  const handleEdit = (tool) => {
    setToolEditData(tool);
    setToolOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this tool?")) {
      dispatch(deleteTool(id));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ search: "", category: "" });
    setPage(1);
  };
  return (

    <div className="mt-0">
      <div className="px-5 sticky top-0 z-[40]">
        <ToolFilters
          type="admin"
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />
      </div>
      <div className="mt-5">
        {/* 🔥 USE OUR NEW REUSABLE LIST HERE */}
        <ToolCardList
          tools={tools}
          mode="admin"
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>

      
      {pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10 pb-10">
          {/* PREV */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {/* PAGE NUMBERS */}
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

          {/* NEXT */}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
            disabled={page === pages}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
      {/* <CreateAndEditToolModal
        open={open}
        onClose={() => setOpen(false)}
        editData={editData}
      /> */}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
function Admin_page() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState(false);

  const [categoryEditData, setCategoryEditData] = useState(null);
  const [toolEditData, setToolEditData] = useState(null);

  const content = {
    dashboard: <DashboardContent />,
    category: <CategoryContent />,
    // tool: <ToolContent />,
    tool: (
      <ToolContent
        setToolOpen={setToolOpen}
        setToolEditData={setToolEditData}
      />
    ),
  };

  return (
    <div className=" h-[90vh] overflow-y-scroll p-5 ">
      {/* Header */}

      {/* Tab Bar */}
      {/* <div className="flex gap-1  bg-white rounded-xl p-1 w-fit mb-7">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-[#3380FF] text-white font-bold"
                  : "text-gray-500 hover:text-[#3380FF]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div> */}
      <div className="flex justify-between items-center mb-5">
        {/* LEFT SIDE TABS */}
        <div className="flex gap-1 bg-white rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#3380FF] text-white font-bold"
                  : "text-gray-500 hover:text-[#3380FF]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT SIDE BUTTON */}
        <div>
          {activeTab === "category" ? (
            // <button
            //   onClick={() => setCategoryOpen(true)}
            //   className="bg-[#3380FF] text-white px-6 py-2 rounded-xl font-bold"
            // >
            //   + Create Category
            // </button>
            <SlidingButton
              icon={<FaPlus className="text-white text-base" />}
              text="Create Category"
              onClick={() => setCategoryOpen(true)}
              width="w-[205px]"
            />
          ) : activeTab === "tool" ? (
            // <button
            //   onClick={() => setToolOpen(true)}
            //   className="bg-[#3380FF] text-white px-6 py-2 rounded-xl font-bold"
            // >
            //   + Create Tool
            // </button>
            <SlidingButton
              icon={<FaPlus className="text-white text-base" />}
              text="Create Tool"
              onClick={() => setToolOpen(true)}
              width="w-[165px]"
            />
          ) : null}
        </div>
      </div>

      {/* Tab Content */}
      {/* <div>{content[activeTab]}</div> */}
      <div>
        {!isAuthChecked || !user ? <p>Checking auth...</p> : content[activeTab]}
      </div>

      <CreateAndEditCategoryModal
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
      />
      {/* 
      <CreateAndEditToolModal
        open={toolOpen}
        onClose={() => setToolOpen(false)}
      /> */}
      <CreateAndEditToolModal
        open={toolOpen}
        onClose={() => {
          setToolOpen(false);
          setToolEditData(null);
        }}
        editData={toolEditData}
      />
    </div>
  );
}

export default Admin_page;
