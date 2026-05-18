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

// ── Tab definitions ──────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "category", label: "Category" },
  { id: "tool", label: "Tool" },
];

// // ── Tab content components ───────────────────────────────────
// function DashboardContent() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
//       <p className="text-gray-400">Welcome to the dashboard.</p>
//     </div>
//   );
// }

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
            {/* <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Total Platform Tools
            </p> */}
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {isMyStats ? "Tools Created by Me" : `Tools by ${searchEmail}`}
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
            {/* <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Total Categories
            </p> */}
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              {isMyStats
                ? "Categories Created by Me"
                : `Categories by ${searchEmail}`}
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
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Category</h2>

      {/* CREATE BUTTON */}
      <button
        onClick={() => {
          setEditData(null);
          setOpen(true);
        }}
        className="bg-[#3380FF] text-white px-4 py-2 rounded-lg"
      >
        + Create Category
      </button>

      <CategoryList mode="admin" showCreator={true} />

      {/* MODAL */}
      <CreateAndEditCategoryModal
        open={open}
        onClose={() => setOpen(false)}
        editData={editData}
      />
    </div>
  );
}

function ToolContent() {
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

  const { tools, loading, totalPages } = useSelector((state) => state.tools);
  const { categories } = useSelector((state) => state.categories);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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
        search: filters.search,
        category: filters.category,
      }),
    );
  }, [dispatch, page, filters]);

  const handleEdit = (tool) => {
    setEditData(tool);
    setOpen(true);
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
    // <div>
    //   <h2 className="text-xl font-semibold mb-2">Tool</h2>
    //   <p className="text-gray-400">Manage your tools here.</p>
    //   <div>
    //   <div className="flex justify-between items-center mb-6">
    //     <h2 className="text-xl font-semibold">Manage Tools</h2>
    //     <button
    //       onClick={() => {
    //         setEditData(null);
    //         setOpen(true);
    //       }}
    //       className="bg-[#3380FF] text-white px-4 py-2 rounded-lg font-medium"
    //     >
    //       + Create Tool
    //     </button>
    //   </div>

    //   {/* TOOL LIST TABLE */}
    //   <div className="bg-[#1c1f26] border border-[#2a2d3a] rounded-xl overflow-hidden">
    //     <table className="w-full text-left">
    //       <thead className="bg-[#252833] text-gray-400 text-sm">
    //         <tr>
    //           <th className="p-4">Tool</th>
    //           <th className="p-4">Category</th>
    //           <th className="p-4 text-right">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody className="divide-y divide-[#2a2d3a]">
    //         {tools.map((tool) => (
    //           <tr key={tool._id} className="hover:bg-[#252833]/50 transition-colors">
    //             <td className="p-4 flex items-center gap-3">
    //               <img src={tool.image?.url} className="w-10 h-10 rounded-md object-cover" />
    //               <span className="font-medium text-white">{tool.name}</span>
    //             </td>
    //             <td className="p-4 text-gray-400">{tool.category?.name || "N/A"}</td>
    //             <td className="p-4 text-right space-x-3">
    //               <button onClick={() => handleEdit(tool)} className="text-blue-400 hover:underline">Edit</button>
    //               <button onClick={() => handleDelete(tool._id)} className="text-red-400 hover:underline">Delete</button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     {tools.length === 0 && !loading && <p className="p-10 text-center text-gray-500">No tools found.</p>}
    //   </div>

    //   <CreateAndEditToolModal
    //     open={open}
    //     onClose={() => setOpen(false)}
    //     editData={editData}
    //   />
    // </div>
    // </div>
    <div className="mt-5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-semibold">My Tools</h2>
          <p className="text-gray-500 text-sm">
            Tools you have added to the platform.
          </p>
        </div>
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-[#3380FF] text-white px-6 py-2 rounded-xl font-bold"
        >
          + Create Tool
        </button>
      </div>
      <ToolFilters
        type="admin"
        filters={filters}
        categories={categories}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />
      {/* 🔥 USE OUR NEW REUSABLE LIST HERE */}
      <ToolCardList
        tools={tools}
        mode="admin"
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
      <CreateAndEditToolModal
        open={open}
        onClose={() => setOpen(false)}
        editData={editData}
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────
function Admin_page() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, isAuthChecked } = useSelector((state) => state.auth);

  const content = {
    dashboard: <DashboardContent />,
    category: <CategoryContent />,
    tool: <ToolContent />,
  };

  return (
    <div className=" ">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-1">Admin Panel</h1>
      <p className="text-gray-500 text-sm mb-7">
        Manage your application from one place.
      </p>

      {/* Tab Bar */}
      <div className="flex gap-1  border border-[#2a2d3a] rounded-xl p-1 w-fit mb-7">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-[#3380FF] text-white font-bold"
                  : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {/* <div>{content[activeTab]}</div> */}
      <div>
        {!isAuthChecked || !user ? <p>Checking auth...</p> : content[activeTab]}
      </div>
    </div>
  );
}

export default Admin_page;
