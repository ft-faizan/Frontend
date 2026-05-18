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

// ── Tab definitions ──────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "category", label: "Category" },
  { id: "tool", label: "Tool" },
  { id: "createac", label: "Create A/C" },
];

// ── Tab content components ───────────────────────────────────
// function DashboardContent() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
//       <p className="text-gray-400">Welcome to the dashboard.</p>
//     </div>
//   );
// }

// function DashboardContent() {
//   const dispatch = useDispatch();
//   const { stats, loading } = useSelector((state) => state.tools);
//   const [searchEmail, setSearchEmail] = useState("");

//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   // Trigger search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     dispatch(getAdminStats(searchEmail));
//   };

//   useEffect(() => {
//     dispatch(getAdminStats(""));
//   }, [dispatch]);

//   useEffect(() => {
//     if (!stats || !chartRef.current || !window.Chart) return;
//     const ctx = chartRef.current.getContext('2d');
//     if (chartInstance.current) chartInstance.current.destroy();

//     const labels = stats.toolStats.map(t => t.email.split('@')[0]);
//     const toolCounts = stats.toolStats.map(t => t.count);
//     const categoryCounts = stats.toolStats.map(t => {
//       const c = stats.categoryStats.find(cat => cat.email === t.email);
//       return c ? c.count : 0;
//     });

//     chartInstance.current = new window.Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [
//           { label: 'Tools', data: toolCounts, backgroundColor: '#286FF0', borderRadius: 5 },
//           { label: 'Categories', data: categoryCounts, backgroundColor: '#8b5cf6', borderRadius: 5 }
//         ]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           y: { beginAtZero: true, grid: { color: '#2a2d3a' }, ticks: { color: '#9ca3af' } },
//           x: { ticks: { color: '#9ca3af' } }
//         }
//       }
//     });
//   }, [stats]);

//   const totalTools = stats?.toolStats?.reduce((acc, curr) => acc + curr.count, 0) || 0;
//   const totalCategories = stats?.categoryStats?.reduce((acc, curr) => acc + curr.count, 0) || 0;

//   return (
//     <div className="space-y-6">
//       {/* 🔍 Email Filter */}
//       <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
//         <input
//           type="text"
//           placeholder="Filter by Admin Email..."
//           className="flex-1 bg-[#1c1f26] border border-[#2a2d3a] p-2 rounded-xl text-white outline-none focus:border-blue-500"
//           value={searchEmail}
//           onChange={(e) => setSearchEmail(e.target.value)}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold">Search</button>
//       </form>

//       {/* 📊 Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl">
//           <p className="text-gray-500 text-xs font-bold uppercase">Tools Created</p>
//           <h3 className="text-4xl font-bold text-white mt-2">{totalTools}</h3>
//         </div>
//         <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl">
//           <p className="text-gray-500 text-xs font-bold uppercase">Categories Created</p>
//           <h3 className="text-4xl font-bold text-[#8b5cf6] mt-2">{totalCategories}</h3>
//         </div>
//       </div>

//       {/* 📈 Contribution Graph */}
//       <div className="bg-[#1c1f26] border border-[#2a2d3a] p-6 rounded-2xl">
//         <div className="relative h-[300px] w-full">
//           <canvas ref={chartRef}></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  return (
    <div className="space-y-8">
      {/* 🔍 1. SEARCH BAR */}
      <div className="flex justify-between items-center bg-[#1c1f26] p-4 rounded-2xl border border-[#2a2d3a]">
        <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search Admin Email..."
            className="flex-1 bg-[#13151a] border border-[#2a2d3a] p-2 px-4 rounded-xl text-white outline-none focus:border-blue-500 transition-all"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all"
          >
            Filter Stats
          </button>
        </form>
      </div>

      {/* 📊 2. ACCOUNT COUNT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>

      {/* 📊 PLATFORM CONTENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Tool Count Card */}
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
          {/* Decorative background icon/shape */}
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

        {/* Category Count Card */}
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
          {/* Decorative background icon/shape */}
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
      </div>

      {/* 📉 3. GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
function CategoryContent() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Category</h2>
      <p className="text-gray-400">Manage your categories here.</p>
      <CategoryList mode="superadmin" showCreator={true} />
    </div>
  );
}

function ToolContent() {
  const dispatch = useDispatch();
  // const { tools, loading } = useSelector((state) => state.tools);
  const { tools, loading, totalPages } = useSelector((state) => state.tools);
  const { categories } = useSelector((state) => state.categories);

  // Modal state for editing

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔥 ADD THESE
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    email: "",
  });

  // useEffect(() => {
  //   // Super admin fetches ALL tools (no specific admin filter)
  //   dispatch(getTools({ mode: "superadmin" }));
  // }, [dispatch]);

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

  const handleEdit = (tool) => {
    setEditData(tool);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Super Admin: Are you sure you want to delete this tool from the platform?",
      )
    ) {
      dispatch(deleteTool(id));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ search: "", category: "", email: "" });
    setPage(1);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Tool</h2>
      <p className="text-gray-400">Manage your tools here.</p>
      <div className="mt-5">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Platform Overview: Tools</h2>
          <p className="text-gray-500 text-sm">
            Monitoring all tools created by all users across the system.
          </p>
        </div>

        {/* 🔥 Mode is "superadmin"
         This enables the "By: user@email.com" tag in our ToolCard
      */}
        <ToolFilters
          type="superadmin"
          filters={filters}
          categories={categories}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        />
        <ToolCardList
          tools={tools}
          mode="superadmin"
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded ${
                  page === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Reusable Modal for Editing */}
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
    <div>
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
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">Super Admin Panel</h1>
      <p className="text-gray-500 text-sm mb-7">
        Manage your application from one place.
      </p>

      {/* Tab Bar */}
      <div className="flex gap-1 bg-[] border border-[#2a2d3a] rounded-xl p-1 w-fit mb-7">
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
