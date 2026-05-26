import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Signin_signup_form from "../components/auth_compo/sigin_siginup_form.jsx";
import CategoryList from "../components/reuseable_compo/CategoryList.jsx";
import ToolCardList from "../components/reuseable_compo/ToolCardList.jsx";
import CreateAndEditToolModal from "../components/admin/CreateAndEditToolModal.jsx";
import {
  getTools,
  deleteTool,
  getAdminStats,
} from "../features/tools/toolSlice.js";
import ToolFilters from "../components/reuseable_compo/ToolFilters";
import { Users, UserCheck, Shield } from "lucide-react";
import { Wrench, LayoutGrid } from "lucide-react";
import { BarChart3, PieChart } from "lucide-react";
// ── Tab definitions ──────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "category", label: "Category" },
  { id: "tool", label: "Tool" },
  { id: "createac", label: "Create A/C" },
];

function DashboardContent() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.tools);
  const [searchEmail, setSearchEmail] = useState("");

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barInstance = useRef(null);
  const pieInstance = useRef(null);

  useEffect(() => {
    dispatch(getAdminStats(""));
  }, [dispatch]);

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

  const statsConfig = [
    {
      id: "total-users",
      role: "user",
      label: "Total Users",
      sub: "Platform scale accounts",
      Icon: Users,
    },
    {
      id: "total-admins",
      role: "admin",
      label: "Total Admins",
      sub: "Directory managers node",
      Icon: UserCheck,
    },
    {
      id: "super-admins",
      role: "superadmin",
      label: "Super Admins",
      sub: "Root system authorities",
      Icon: Shield,
    },
  ];
     // ─── 1. CALCULATE CORE METRICS ───
  const totalToolsCount = stats?.toolStats?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0;
  const formattedTools = totalToolsCount < 10 && totalToolsCount > 0 ? `0${totalToolsCount}` : totalToolsCount;

  const totalCategoriesCount = stats?.categoryStats?.reduce((acc, curr) => acc + (curr.count || 0), 0) || 0;
  const formattedCategories = totalCategoriesCount < 10 && totalCategoriesCount > 0 ? `0${totalCategoriesCount}` : totalCategoriesCount;

 
  return (
    <div className="space-y-5">

      <div className=" sticky top-0 px-5 z-[25]">

      {/* 🔍 1. SEARCH BAR */}
      <div  className="relative
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
">
        <form onSubmit={handleSearch} className="flex gap-2 w-full ">
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
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl text-center">
          <p className="text-gray-500 text-xs font-bold uppercase">
            Total Users
          </p>
          <h3 className="text-4xl font-bold text-blue-500 mt-2">
            {getRoleCount("user")}
          </h3>
        </div>
        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl text-center">
          <p className="text-gray-500 text-xs font-bold uppercase">
            Total Admins
          </p>
          <h3 className="text-4xl font-bold text-yellow-500 mt-2">
            {getRoleCount("admin")}
          </h3>
        </div>
        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl text-center">
          <p className="text-gray-500 text-xs font-bold uppercase">
            Super Admins
          </p>
          <h3 className="text-4xl font-bold text-red-500 mt-2">
            {getRoleCount("superadmin")}
          </h3>
        </div>
      </div> */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full p-1">
      {statsConfig.map(({ id, role, label, sub, Icon }) => {
        const rawValue = getRoleCount?.(role) || 0;
        // Text padding logic: appends a clean leading zero for single-digit tech counts
        const formattedValue = rawValue < 10 && rawValue > 0 ? `0${rawValue}` : rawValue;

        return (
          <div
            key={id}
            className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none"
          >
            {/* 1. Next-Gen Ambient Glow: Spreads outward on hover */}
            <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

            {/* 2. Abstract Background Giant Icon Layer */}
            <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
              <Icon strokeWidth={1} />
            </div>

            {/* Top Header Row (Icon + Label side by side) */}
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex flex-col gap-0.5">
                <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
                  {label}
                </p>
                <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
                  {sub}
                </p>
              </div>

              {/* Floating Neon Icon Frame */}
              <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
                <Icon
                  size={16}
                  className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
                />
              </div>
            </div>

            {/* Bottom Main Value Row */}
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
      {/* 📊 PLATFORM CONTENT CARDS */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Total Platform Tools
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-4xl font-bold text-white">
                {stats?.toolStats?.reduce(
                  (acc, curr) => acc + (curr.count || 0),
                  0,
                ) || 0}
              </h3>
              <span className="text-blue-500 text-sm font-medium italic">
                Active Tools
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-blue-500/10 scale-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a2 2 0 0 1 2.82 0l.3.3a2 2 0 0 1 0 2.82l-3.77 3.77a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0"></path>
            </svg>
          </div>
        </div>

        <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Total Categories
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-4xl font-bold text-[#8b5cf6]">
                {stats?.categoryStats?.reduce(
                  (acc, curr) => acc + (curr.count || 0),
                  0,
                ) || 0}
              </h3>
              <span className="text-purple-500 text-sm font-medium italic">
                Global Types
              </span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 text-purple-500/10 scale-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1"></rect>
              <rect width="7" height="7" x="14" y="3" rx="1"></rect>
              <rect width="7" height="7" x="14" y="14" rx="1"></rect>
              <rect width="7" height="7" x="3" y="14" rx="1"></rect>
            </svg>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5  w-full p-1">
      
      {/* ─── CARD 1: TOTAL PLATFORM TOOLS ─── */}
      <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none">
        {/* Next-Gen Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

        {/* Abstract Background Giant Rotating Icon Layer */}
        <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
          <Wrench strokeWidth={1} />
        </div>

        {/* Top Header Label Row */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
              Total Platform Tools
            </p>
            <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
              Active tools in directory
            </p>
          </div>

          {/* Floating Neon Icon Frame */}
          <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
            <Wrench size={18} className="text-[#3981FA] transition-colors duration-300 group-hover:text-white" />
          </div>
        </div>

        {/* Bottom Main Gradient Core Value Row */}
        <div className="mt-5 relative z-10 flex items-baseline gap-2">
          {loading ? (
            <div className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-[#1a1d2a] animate-pulse" />
          ) : (
            <>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
                {formattedTools}
              </h3>
              <span className="text-slate-400 dark:text-slate-600 text-[10px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Active Tools
              </span>
            </>
          )}
        </div>

        {/* Sleek Left Accent Kinetic Transform Line */}
        <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
      </div>

      {/* ─── CARD 2: TOTAL PLATFORM CATEGORIES ─── */}
      <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none">
        {/* Next-Gen Ambient Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

        {/* Abstract Background Giant Rotating Icon Layer */}
        <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
          <LayoutGrid strokeWidth={1} />
        </div>

        {/* Top Header Label Row */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
              Total Categories
            </p>
            <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
              Global types structure
            </p>
          </div>

          {/* Floating Neon Icon Frame */}
          <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
            <LayoutGrid size={18} className="text-[#3981FA] transition-colors duration-300 group-hover:text-white" />
          </div>
        </div>

        {/* Bottom Main Gradient Core Value Row */}
        <div className="mt-5 relative z-10 flex items-baseline gap-2">
          {loading ? (
            <div className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-[#1a1d2a] animate-pulse" />
          ) : (
            <>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
                {formattedCategories}
              </h3>
              <span className="text-slate-400 dark:text-slate-600 text-[10px] font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Global Types
              </span>
            </>
          )}
        </div>

        {/* Sleek Left Accent Kinetic Transform Line */}
        <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
      </div>

    </div>

      {/* 📉 3. GRAPHS SECTION */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full p-1 mb-16">
      
      {/* ─── CONTAINER 1: BAR CHART (ADMIN CONTRIBUTIONS) ─── */}
      <div className="group relative lg:col-span-2 overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-0.5 select-none">
        {/* Next-Gen Ambient Glow */}
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
            <BarChart3 size={15} className="text-[#3981FA] transition-colors duration-300 group-hover:text-white" />
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
            <PieChart size={15} className="text-[#3981FA] transition-colors duration-300 group-hover:text-white" />
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
  return (
    <div>
      
      <CategoryList mode="superadmin" showCreator={true} />
    </div>
  );
}

// function ToolContent() {
//   const dispatch = useDispatch();
//   // const { tools, loading } = useSelector((state) => state.tools);
//   // const { tools, loading, totalPages } = useSelector((state) => state.tools);
//   const { tools, loading, totalPages, stats } = useSelector(
//     (state) => state.tools,
//   );
//   const userse = stats?.toolStats || [];
//   const { categories } = useSelector((state) => state.categories);
//   const { users } = useSelector((state) => state.auth);
//   console.log(users);
//   const authState =
//   useSelector((state) => state.auth);

// console.log(authState);

//   // Modal state for editing

//   const [open, setOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // 🔥 ADD THESE
//   const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({
//     search: "",
//     category: "",
//     email: "",
//   });

//   // useEffect(() => {
//   //   // Super admin fetches ALL tools (no specific admin filter)
//   //   dispatch(getTools({ mode: "superadmin" }));
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(
//       getTools({
//         mode: "superadmin",
//         page,
//         search: filters.search,
//         category: filters.category,
//         email: filters.email,
//       }),
//     );
//   }, [dispatch, page, filters]);

//   const handleEdit = (tool) => {
//     setEditData(tool);
//     setOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (
//       window.confirm(
//         "Super Admin: Are you sure you want to delete this tool from the platform?",
//       )
//     ) {
//       dispatch(deleteTool(id));
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setPage(1);
//   };

//   const handleClearFilters = () => {
//     setFilters({ search: "", category: "", email: "" });
//     setPage(1);
//   };
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Tool</h2>
//       <p className="text-gray-400">Manage your tools here.</p>
//       <div className="mt-5">
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold">Platform Overview: Tools</h2>
//           <p className="text-gray-500 text-sm">
//             Monitoring all tools created by all users across the system.
//           </p>
//         </div>

//         {/* 🔥 Mode is "superadmin"
//          This enables the "By: user@email.com" tag in our ToolCard
//       */}
//         {/* <ToolFilters
//           type="superadmin"
//           filters={filters}
//           categories={categories}
//           onFilterChange={handleFilterChange}
//           onClear={handleClearFilters}
//         /> */}
//         <ToolFilters
//           type="superadmin"
//           filters={filters}
//           categories={categories}
//           users={users}
//           onFilterChange={handleFilterChange}
//           onClear={handleClearFilters}
//         />
//         <ToolCardList
//           tools={tools}
//           mode="superadmin"
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           loading={loading}
//         />

//         {totalPages > 1 && (
//           <div className="flex justify-center gap-2 mt-10">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-3 py-2 rounded ${
//                   page === i + 1
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Reusable Modal for Editing */}
//         <CreateAndEditToolModal
//           open={open}
//           onClose={() => setOpen(false)}
//           editData={editData}
//         />
//       </div>
//     </div>
//   );
// }
//  v2
function ToolContent() {
  const dispatch = useDispatch();

  // 🔥 TOOLS STATE
  const { tools, loading, totalPages, stats } = useSelector(
    (state) => state.tools,
  );

  // 🔥 CATEGORIES
  const { categories } = useSelector((state) => state.categories);

  // 🔥 EMAIL USERS LIST
  // We reuse admin stats emails
  const users = stats?.toolStats || [];

  // 🔥 DEBUG
  console.log(users);

  // MODAL STATE
  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  // 🔥 PAGINATION
  const [page, setPage] = useState(1);

  // 🔥 FILTERS
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    email: "",
  });

  // 🔥 FETCH TOOLS
  useEffect(() => {
    dispatch(
      getTools({
        mode: "superadmin",

        page,

        search: filters.search,

        category: filters.category,

        email: filters.email,
      }),
    );
  }, [dispatch, page, filters]);

  // ✏️ EDIT TOOL
  const handleEdit = (tool) => {
    setEditData(tool);

    setOpen(true);
  };

  // 🗑 DELETE TOOL
  const handleDelete = (id) => {
    // if (
    //   window.confirm(
    //     "Super Admin: Are you sure you want to delete this tool from the platform?",
    //   )
    // ) {
      dispatch(deleteTool(id));
    // }
  };

  // 🔍 FILTER CHANGE
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    // RESET PAGE
    setPage(1);
  };

  // 🧹 CLEAR FILTERS
  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "",
      email: "",
    });

    setPage(1);
  };

  return (
    <div>
      
     
      <div className="mt-5">
        {/* OVERVIEW */}
       
        <div className="px-5">
           {/* 🔥 FILTERS */}
        <ToolFilters
          type="superadmin"
          filters={filters}
          categories={categories}
          users={users}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />

        </div>
        
        <div className="mt-5">
           {/* 🔥 TOOL LIST */}
        <ToolCardList
          tools={tools}
          mode="superadmin"
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
        </div>
       

        {/* 🔥 PAGINATION */}
        {/* {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`
                    px-3
                    py-2
                    rounded

                    ${
                      page === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300"
                    }
                  `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )} */}
        {totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-10 pb-10">

    {/* PREV */}
    <button
      type="button"
      onClick={() =>
        setPage((p) => Math.max(p - 1, 1))
      }
      disabled={page === 1}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    {/* PAGE NUMBERS */}
    <div className="flex gap-1.5">
      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((p) => (
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
      onClick={() =>
        setPage((p) =>
          Math.min(p + 1, totalPages)
        )
      }
      disabled={page === totalPages}
      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
    >
      Next
    </button>

  </div>
)}

        {/* 🔥 EDIT MODAL */}
        <CreateAndEditToolModal
          open={open}
          onClose={() => setOpen(false)}
          editData={editData}
        />
      </div>
    </div>
  );
}
function CreateAccountContent() {
  return (
    <div className="mb-15">
      <Signin_signup_form showRole={true} />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
function Super_admin_page() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const content = {
    dashboard: <DashboardContent />,
    category: <CategoryContent />,
    tool: <ToolContent />,
    createac: <CreateAccountContent />,
  };

  return (
    <div className=" h-[90vh] overflow-y-scroll p-5">
      

      {/* Tab Bar */}
      <div className="flex gap-1 bg-white rounded-xl p-1 w-fit mb-7">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-[#2D64E6] text-white font-bold"
                  : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{content[activeTab]}</div>
    </div>
  );
}

export default Super_admin_page;
