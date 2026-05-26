// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Settings_menu from "../nav_compo/settings_menu.jsx";
// import { logoutUser } from "../../features/auth/authSlice.js";
// import { useToast } from "../../context/ToastContext.jsx";
// import { IoLogOut } from "react-icons/io5";
// import { TiHome } from "react-icons/ti";
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { BsBookmarkDashFill } from "react-icons/bs";
// import { BsInfoSquareFill } from "react-icons/bs";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { MdAdminPanelSettings } from "react-icons/md";

// function Aside_bar({ toggleSidebar }) {
//   const user = useSelector((state) => state.auth.user);

//   const location = useLocation();
//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       roles: ["user", "admin", "superadmin"],
//       icon: <TiHome />,
//     },
//     {
//       name: "Categories",
//       path: "/categories",
//       roles: ["user", "admin", "superadmin"],
//       icon: <TbLayoutDashboardFilled />,
//     },
//     {
//       name: "Saved Tools",
//       path: "/users_save",
//       roles: ["user", "admin", "superadmin"],
//       icon: <BsBookmarkDashFill />,
//     },
//     {
//       name: "Admin Panel",
//       path: "/admin",
//       roles: ["admin", "superadmin"],
//       icon: <MdOutlineAdminPanelSettings />,
//     },
//     {
//       name: "Super Admin Panel",
//       path: "/super-admin",
//       roles: ["superadmin"],
//       icon: <MdAdminPanelSettings />,
//     },
//      {
//       name: "About",
//       path: "/about",
//       roles: ["user", "admin", "superadmin"],
//       icon: <BsInfoSquareFill />,
//     },
//   ];
//   const dispatch = useDispatch();
//   const { showToast } = useToast();
//   const handleLogout = () => {
//     dispatch(logoutUser())
//       .unwrap()
//       .then(() => {
//         showToast("Logged out successfully 👋", "success");
//       })
//       .catch(() => {
//         showToast("Logout failed ❌", "error");
//       });
//   };
//   const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
//   const roleLabel = {
//     user: "User A/C",
//     admin: "Admin A/C",
//     superadmin: "Super Admin A/C",
//   };
//   return (
//     <div className="bg-[#ffffff] md:bg-transparent w-full h-full border-r border-gray-300 p-5">
//       {/* 🔥 MENU */}
//       <div className="flex flex-col gap-3">
//         {menuItems
//           .filter((item) => item.roles.includes(user?.role))
//           .map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               onClick={toggleSidebar}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
//     ${
//       location.pathname === item.path
//         ? "bg-blue-500 text-white shadow-md"
//         : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
//     }
//   `}
//             >
//               <span
//                 className={`text-lg ${
//                   location.pathname === item.path
//                     ? "text-white"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {item.icon}
//               </span>

//               <span>{item.name}</span>
//             </Link>
//           ))}
//       </div>

//       {/* 🔥 MOBILE SETTINGS */}
//       <div className="md:hidden mt-5 p-4 border-t border-gray-200 dark:border-zinc-700">
//         <p className="text-sm text-gray-500 mb-2">Settings</p>
//         <Settings_menu />
//       </div>
//       <div className="mt-auto pt-5 border-t border-gray-200 dark:border-zinc-700">
//         <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg shadow-sm">
//           {/* Avatar */}
//           <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
//             {firstLetter}
//           </div>

//           {/* User Info */}
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold truncate">
//               {user?.name || "User"}
//             </p>
//             <p className="text-xs text-gray-500">
//               {roleLabel[user?.role] || "User A/C"}
//             </p>
//             <p className="text-xs text-gray-400 truncate">{user?.email}</p>
//           </div>

//           {/* Logout Icon */}
//           <button
//             onClick={handleLogout}
//             className="text-red-500 hover:text-red-700 transition"
//             title="Logout"
//           >
//             {/* SVG logout icon */}
//             <IoLogOut size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Aside_bar;

// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import Settings_menu from "../nav_compo/settings_menu.jsx";
// import { logoutUser } from "../../features/auth/authSlice.js";
// import { useToast } from "../../context/ToastContext.jsx";
// import { IoLogOut } from "react-icons/io5";
// import { TiHome } from "react-icons/ti";
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { BsBookmarkDashFill } from "react-icons/bs";
// import { BsInfoSquareFill } from "react-icons/bs";
// import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { MdAdminPanelSettings } from "react-icons/md";
// import { FaTrashCan } from "react-icons/fa6";

// function Aside_bar({ toggleSidebar }) {
//   const user = useSelector((state) => state.auth.user);

//   const location = useLocation();
//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       roles: ["user", "admin", "superadmin"],
//       icon: <TiHome />,
//     },
//     {
//       name: "Categories",
//       path: "/categories",
//       roles: ["user", "admin", "superadmin"],
//       icon: <TbLayoutDashboardFilled />,
//     },
//     {
//       name: "Saved Tools",
//       path: "/users_save",
//       roles: ["user", "admin", "superadmin"],
//       icon: <BsBookmarkDashFill />,
//     },

//     {
//       name: "Trash",
//       path: "/trash",
//       roles: ["user", "admin", "superadmin"],
//       icon: <FaTrashCan />,
//     },
//     {
//       name: "Admin Panel",
//       path: "/admin",
//       roles: ["admin", "superadmin"],
//       icon: <MdOutlineAdminPanelSettings />,
//     },
//     {
//       name: "Super Admin Panel",
//       path: "/super-admin",
//       roles: ["superadmin"],
//       icon: <MdAdminPanelSettings />,
//     },
//     {
//       name: "About",
//       path: "/about",
//       roles: ["user", "admin", "superadmin"],
//       icon: <BsInfoSquareFill />,
//     },
//   ];

//   const dispatch = useDispatch();
//   const { showToast } = useToast();

//   const handleLogout = () => {
//     // ── clear recent tools history on logout ──
//     localStorage.removeItem("recentTools");
//     window.dispatchEvent(new Event("recentToolsUpdated")); // dock disappears instantly

//     dispatch(logoutUser())
//       .unwrap()
//       .then(() => {
//         showToast("Logged out successfully 👋", "success");
//       })
//       .catch(() => {
//         showToast("Logout failed ❌", "error");
//       });
//   };

//   const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
//   const roleLabel = {
//     user: "User A/C",
//     admin: "Admin A/C",
//     superadmin: "Super Admin A/C",
//   };

//   return (
//     <div className="bg-[#ffffff] min-[1330px]:bg-transparent w-full h-[90vh] border-r border-gray-300 p-5 flex flex-col justify-between ">
//       {/* MENU */}
//       <div className="flex flex-col gap-3">
//         {menuItems
//           .filter((item) => item.roles.includes(user?.role))
//           .map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               onClick={toggleSidebar}
//               className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200
//                 ${
//                   location.pathname === item.path
//                     ? "bg-blue-500 text-white shadow-md"
//                     : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
//                 }
//               `}
//             >
//               <span
//                 className={`text-lg ${
//                   location.pathname === item.path
//                     ? "text-white"
//                     : "text-gray-500"
//                 }`}
//               >
//                 {item.icon}
//               </span>
//               <span>{item.name}</span>
//             </Link>
//           ))}

//         {/* MOBILE SETTINGS */}
//         <div className="min-[1330px]:hidden  p-4 border-t border-gray-200 dark:border-zinc-700">
//           <p className="text-sm text-gray-500 mb-2">Settings</p>
//           <Settings_menu />
//         </div>
//       </div>

//       {/* USER CARD
//       <div className=" pt-5 border-t border-gray-200 dark:border-zinc-700 ">
//         <div className="flex items-center gap-3 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg shadow-sm">
//           <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-lg">
//             {firstLetter}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-semibold truncate">
//               {user?.name || "User"}
//             </p>
//             <p className="text-xs text-gray-500">
//               {roleLabel[user?.role] || "User A/C"}
//             </p>
//             <p className="text-xs text-gray-400 truncate">{user?.email}</p>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="text-red-500 hover:text-red-700 transition"
//             title="Logout"
//           >
//             <IoLogOut size={20} />
//           </button>
//         </div>
//       </div> */}
//       {/* USER CARD */}
//       <div className="w-full  border-t border-gray-100 dark:border-white/[0.06]">
//         <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 dark:border-white/[0.08] bg-white/80 dark:bg-[#12141a]/90 backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-white/[0.12]">
//           {/* Top accent bar using your brand color */}
//           <div className="h-[3px] w-full bg-gradient-to-r from-[#3380FF] via-[#5294ff] to-[#3380FF]/60" />

//           {/* Responsive container: stacks on mobile, horizontal on sm screens */}
//           <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-2">
//             {/* Avatar & Info Wrapper for compact mobile spacing */}
//             <div className="flex items-center gap-3.5 flex-1 min-w-0">
//               {/* Avatar */}
//               <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-[#3380FF] flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-[#12141a]">
//                 {firstLetter}
//                 {/* Online dot */}
//                 <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#12141a] animate-pulse" />
//               </div>

//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <p className="text-[14px] font-bold text-gray-900 dark:text-gray-100 truncate tracking-wide">
//                   {user?.name || "User"}
//                 </p>
//                 <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate mt-0.5 font-medium">
//                   {user?.email}
//                 </p>

//                 {/* Role Badge */}
//                 <span
//                   className={`
//             inline-flex items-center mt-1.5 px-2 py-0.5 text-[9px] font-bold
//             tracking-wider uppercase rounded-md border backdrop-blur-sm
//             ${
//               user?.role === "superadmin"
//                 ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
//                 : user?.role === "admin"
//                   ? "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20"
//                   : "bg-[#3380FF]/10 text-[#3380FF] dark:text-[#5294ff] border-[#3380FF]/20"
//             }
//           `}
//                 >
//                   {roleLabel[user?.role] || "User A/C"}
//                 </span>
//               </div>
//             </div>

//             {/* Logout button - Full width on mobile, naturally sized on desktop */}
//             <button
//               onClick={handleLogout}
//               title="Logout"
//               className="
//           flex-shrink-0 w-full sm:w-9 sm:h-9 h-10 flex items-center justify-center gap-2 sm:gap-0
//           rounded-xl border border-gray-200/60 dark:border-white/[0.08]
//           bg-gray-50 dark:bg-white/[0.02]
//           text-gray-500 dark:text-gray-400 text-sm font-medium sm:text-base
//           hover:bg-red-50 dark:hover:bg-red-500/10
//           hover:text-red-600 dark:hover:text-red-400
//           hover:border-red-200 dark:hover:border-red-500/20
//           focus:outline-none focus:ring-2 focus:ring-[#3380FF]/40
//           active:scale-[0.98] sm:active:scale-95
//           transition-all duration-200 group
//         "
//             >
//               <span className="sm:hidden">Logout</span>
//               <IoLogOut
//                 size={16}
//                 className="transition-transform duration-200 group-hover:translate-x-0.5"
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Aside_bar;

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
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                /* ⚡ FIX 2: Updated selection highlights to match your exact #3981FA brand system */
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
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
