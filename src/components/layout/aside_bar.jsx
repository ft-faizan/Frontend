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
import { FaTrashCan } from "react-icons/fa6";
import ConfirmModal from "../reuseable_compo/ConfirmModal.jsx";

function Aside_bar({ toggleSidebar }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
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
      name: "Trash",
      path: "/trash",
      roles: ["user", "admin", "superadmin"],
      icon: <FaTrashCan />,
    },
    {
      name: "Admin ",
      path: "/admin",
      roles: ["admin", "superadmin"],
      icon: <MdOutlineAdminPanelSettings />,
    },
    {
      name: "Super Admin ",
      path: "/super-admin",
      roles: ["superadmin"],
      icon: <MdAdminPanelSettings />,
    },
    // {
    //   name: "About",
    //   path: "/about",
    //   roles: ["user", "admin", "superadmin"],
    //   icon: <BsInfoSquareFill />,
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("recentTools");
    window.dispatchEvent(new Event("recentToolsUpdated"));

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
    <div className="bg-white dark:bg-[#0c0e14] min-[1330px]:bg-transparent w-full h-[90vh] border-r border-gray-100 dark:border-[#1c1f2c] p-5 flex flex-col justify-between overflow-y-auto scrollbar-premium">
      {/* ─── MENU SECTION ─── */}
      <div className="flex flex-col gap-2">
        {menuItems
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => {
            // const isActive =
            //   item.path === "/"
            //     ? location.pathname === "/"
            //     : location.pathname === item.path ||
            //       location.pathname.startsWith(item.path + "/");

            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : item.path === "/users_save"
                  ? location.pathname.startsWith("/users_save") ||
                    location.pathname.startsWith("/saved")
                  : location.pathname === item.path ||
                    location.pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                /* ⚡ FIX 2: Updated selection highlights to match your exact #3981FA brand system */
                className={`flex items-center gap-3 px-[15px] py-[14px] rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#3981FA] text-white shadow-lg shadow-[#3981FA]/15"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#141722]/60 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <span
                  className={`text-lg ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}

        {/* MOBILE SETTINGS */}
        <div className="min-[1330px]:hidden mt-4 pt-4 border-t border-gray-100 dark:border-[#1c1f2c]">
          <p className="text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1 mb-2">
            Settings Panel
          </p>
          <Settings_menu />
        </div>
      </div>

      {/* ─── USER INTERFACE CARD FOOTER ─── */}
      <div className="w-full pt-4 border-t border-gray-100 dark:border-[#1c1f2c]">
        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1c1f2c] bg-slate-50/50 dark:bg-[#141722]/30 backdrop-blur-md shadow-sm">
          {/* Brand Identity Accent Header Line */}
          <div className="h-[2px] w-full bg-gradient-to-r from-[#3981FA] via-blue-400 to-[#3981FA]/40" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3">
            {/* User Meta Summary Elements */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Avatar Box Wrapper Container */}
              <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#3981FA] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#3981FA]/10">
                {firstLetter}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0e14]" />
              </div>

              {/* Informational Text Blocks */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-[11px] font-medium text-slate-400 dark:text-gray-500 truncate">
                  {user?.email}
                </p>

                {/* Role Allocation Badge Frame */}
                <div className="pt-0.5">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 text-[8px] font-extrabold tracking-wider uppercase rounded-md border ${
                      user?.role === "superadmin"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        : user?.role === "admin"
                          ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
                          : "bg-blue-500/10 text-[#3981FA] dark:text-blue-400 border-blue-500/20"
                    }`}
                  >
                    {roleLabel[user?.role] || "User A/C"}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Trigger Component Option */}
            <button
              type="button"
              onClick={handleLogout}
              title="Logout Node Session"
              className="flex-shrink-0 w-full sm:w-8 sm:h-8 h-9 flex items-center justify-center gap-2 sm:gap-0 rounded-lg border border-gray-200/60 dark:border-slate-800 bg-white dark:bg-[#0c0e14] text-slate-400 hover:bg-red-500/5 dark:hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 outline-none transition-all active:scale-[0.96] group"
            >
              <span className="sm:hidden text-xs font-bold">
                Logout Session
              </span>
              <IoLogOut
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aside_bar;
