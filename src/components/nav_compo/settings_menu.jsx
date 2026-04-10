



import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../dark_light_compo/ThemeToggle.jsx";
import { updateName, logoutUser } from "../../features/auth/authSlice.js";
import { useToast } from "../../context/ToastContext.jsx";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";

export default function Settings_menu() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // handle rename
  const handleUpdateName = () => {
    if (!name.trim()) {
      showToast("Input is empty 😅", "warning");
      return;
    }

    dispatch(updateName({ name }))
      .unwrap()
      .then(() => {
        showToast("Name updated successfully ✅", "success");
        setEditOpen(false);
      })
      .catch(() => {
        showToast("Failed to update name ❌", "error");
      });
  };

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

  return (
    <div className="relative">
      {/* ⚙️ Settings Button - Modern Design */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-zinc-700 dark:hover:to-zinc-600 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 dark:border-zinc-600"
      >
        <IoSettingsSharp 
          size={18} 
          className={`transition-transform duration-300 ${open ? 'rotate-90' : 'group-hover:rotate-45'}`} 
        />
        <span className="font-medium text-gray-700 dark:text-gray-200">Settings</span>
      </button>

      {/* Dropdown - Modern Card Design */}
      {open && (
        <>
          {/* Backdrop for mobile */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
          
          <div className="absolute right-0 mt-3 w-80 md:w-72 bg-white dark:bg-zinc-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 dark:border-zinc-700 p-5 space-y-4 z-50 transform transition-all duration-200 animate-in slide-in-from-top-2">
            
            {/* User Info Section */}
            <div className="pb-3 border-b border-gray-100 dark:border-zinc-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Signed in as</p>
              <p className="font-semibold text-gray-800 dark:text-white truncate">
                {user?.name || "User"}
              </p>
            </div>

            {/* 🌙 Theme Section */}
            <div className="flex justify-between items-center py-2 px-1 hover:bg-gray-50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors">
              <span className="text-gray-700 dark:text-gray-200 font-medium">Theme</span>
              <ThemeToggle />
            </div>

            {/* ✏️ Edit Name Section */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setEditOpen(!editOpen);
                  setName(user?.name || "");
                }}
                className="flex items-center justify-between w-full py-2 px-1 hover:bg-gray-50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors group"
              >
                <span className="text-gray-700 dark:text-gray-200 font-medium">Edit Name</span>
                <MdEditSquare className="text-gray-500 group-hover:text-blue-500 transition-colors" size={18} />
              </button>

              {editOpen && (
                <div className="mt-2 space-y-2 animate-in slide-in-from-top-1 duration-200">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter new name"
                    className="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  <button
                    onClick={handleUpdateName}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm font-medium"
                  >
                    <MdEditSquare size={16} />
                    Update Name
                  </button>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 dark:border-zinc-700"></div>

            {/* 🚪 Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full py-2 px-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
            >
              <span className="text-red-600 dark:text-red-400 font-medium">Logout</span>
              <IoLogOut size={18} className="text-red-500 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}