import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Settings_menu from "../nav_compo/settings_menu.jsx";
import { logoutUser } from "../../features/auth/authSlice.js";
import { useToast } from "../../context/ToastContext.jsx";
import { IoLogOut } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsBookmarkDashFill } from "react-icons/bs";
import { BsInfoSquareFill } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";

function Aside_bar({ toggleSidebar }) {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["user", "admin", "superadmin"],
      icon: <TiHome />,
    },
    {
      name: "Categories",
      path: "/categories",
      roles: ["user", "admin", "superadmin"],
      icon: <TbLayoutDashboardFilled />,
    },
    {
      name: "Saved Tools",
      path: "/users_save",
      roles: ["user", "admin", "superadmin"],
      icon: <BsBookmarkDashFill />,
    },
    {
      name: "Admin Panel",
      path: "/admin",
      roles: ["admin", "superadmin"],
      icon: <MdOutlineAdminPanelSettings />,
    },
    {
      name: "Super Admin Panel",
      path: "/super-admin",
      roles: ["superadmin"],
      icon: <MdAdminPanelSettings />,
    },
     {
      name: "About",
      path: "/about",
      roles: ["user", "admin", "superadmin"],
      icon: <BsInfoSquareFill />,
    },
  ];
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        showToast("Logged out successfully 👋", "success");
      })
      .catch(() => {
        showToast("Logout failed ❌", "error");
      });
  };
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const roleLabel = {
    user: "User A/C",
    admin: "Admin A/C",
    superadmin: "Super Admin A/C",
  };
  return (
    <div className="bg-[#ffffff] md:bg-transparent w-full h-full border-r border-gray-300 p-5">
      {/* 🔥 MENU */}
      <div className="flex flex-col gap-3">
        {menuItems
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleSidebar}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
    ${
      location.pathname === item.path
        ? "bg-blue-500 text-white shadow-md"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
    }
  `}
            >
              <span
                className={`text-lg ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>

              <span>{item.name}</span>
            </Link>
          ))}
      </div>

      {/* 🔥 MOBILE SETTINGS */}
      <div className="md:hidden mt-5 p-4 border-t border-gray-200 dark:border-zinc-700">
        <p className="text-sm text-gray-500 mb-2">Settings</p>
        <Settings_menu />
      </div>
      <div className="mt-auto pt-5 border-t border-gray-200 dark:border-zinc-700">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg shadow-sm">
          {/* Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
            {firstLetter}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {roleLabel[user?.role] || "User A/C"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>

          {/* Logout Icon */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition"
            title="Logout"
          >
            {/* SVG logout icon */}
            <IoLogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aside_bar;
