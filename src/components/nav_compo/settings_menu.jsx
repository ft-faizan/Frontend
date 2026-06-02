
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../dark_light_compo/ThemeToggle.jsx";
import { updateName, logoutUser } from "../../features/auth/authSlice.js";
import { useToast } from "../../context/ToastContext.jsx";
import { IoSettingsSharp, IoLogOut, IoClose } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import ConfirmModal from "../reuseable_compo/ConfirmModal.jsx";

export default function Settings_menu() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
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
    <div className="relative pt-[7px]">
      

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative group w-[150px] h-[44px] cursor-pointer flex items-center rounded-xl border border-[#3380FF]/50 bg-[#3380FF] overflow-hidden shadow-lg shadow-[#3380FF]/10 active:scale-[0.98] transition-all duration-300"
      >
        {/* Icon container – slides from left to cover the whole button on hover */}
        <span className="absolute left-0 top-0 bottom-0 w-[42px] bg-[#226ce6] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:bg-[#226ce6]">
          <IoSettingsSharp className="text-white text-base" />
        </span>

        {/* Text – positioned on the right, fades away and slides out on hover */}
        <span className="absolute right-0 transform translate-x-[-26px] text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:translate-x-0">
          Settings
        </span>
      </button>

      {/* ── Centered Full-Screen Modal ── */}
      {open && (
        <div className="fixed inset-0 z-5000 flex items-center justify-center p-4">
          {/* Blurred backdrop — click to close */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Modal card */}
          <div
            className="
            relative z-1000 w-full max-w-sm
            bg-white dark:bg-[#141720]
            border border-gray-100 dark:border-white/[0.08]
            rounded-3xl
            shadow-2xl shadow-black/20 dark:shadow-black/60
            overflow-hidden
          "
          >
            {/* ── Header ── */}
            <div className="relative px-5 pt-5 pb-4 border-b border-gray-100 dark:border-white/[0.06]">
              {/* Decorative glow */}
              <div className="pointer-events-none absolute -top-10 -left-10 w-36 h-36 rounded-full bg-blue-500/10 blur-2xl" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#3380FF] shadow-md shadow-blue-500/25">
                    <IoSettingsSharp size={15} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      Settings
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight max-w-[180px] truncate">
                      {user?.name || "User"}
                    </p>
                  </div>
                </div>

                {/* ✕ Close button */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    w-8 h-8 flex items-center justify-center rounded-xl
                    bg-gray-100 dark:bg-white/[0.08]
                    text-gray-500 dark:text-gray-400
                    hover:bg-red-50 dark:hover:bg-red-500/15
                    hover:text-red-500 dark:hover:text-red-400
                    transition-all duration-200
                  "
                >
                  <IoClose size={16} />
                </button>
              </div>
            </div>

            {/* ── Body rows ── */}
            <div className="p-3 space-y-0.5">
              {/* Theme */}
              <div className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Theme
                  </span>
                </div>
                <ThemeToggle />
              </div>

              {/* Edit Name */}
              <div>
                <button
                  onClick={() => {
                    setEditOpen(!editOpen);
                    setName(user?.name || "");
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                      <MdEditSquare size={14} />
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      Edit Name
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${editOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {editOpen && (
                  <div className="mx-2 mb-1 p-3 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06] space-y-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter new name…"
                      autoFocus
                      className="
                        w-full px-3 py-2 text-sm rounded-lg
                        bg-white dark:bg-white/[0.06]
                        border border-gray-200 dark:border-white/[0.1]
                        text-gray-800 dark:text-white
                        placeholder-gray-400 dark:placeholder-gray-600
                        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400
                        transition-all duration-200
                      "
                    />
                    <button
                      onClick={handleUpdateName}
                      className="
                        w-full flex items-center justify-center gap-2
                        bg-gradient-to-r from-blue-500 to-blue-600
                        hover:from-blue-600 hover:to-blue-700
                        text-white text-sm font-medium
                        py-2 rounded-lg
                        shadow-sm shadow-blue-500/25
                        transition-all duration-200
                      "
                    >
                      <MdEditSquare size={14} />
                      Update Name
                    </button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.08] to-transparent mx-2 my-1" />

              {/* Logout */}
              <button
                // onClick={handleLogout}
                onClick={() => setLogoutOpen(true)}
                className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
              >
                <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500">
                  <IoLogOut
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Logout
                </span>
              </button>
            </div>

            {/* ── Footer ── */}
            <div className="px-5 py-3 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-center text-gray-400 dark:text-gray-600">
                Signed in as{" "}
                <span className="font-semibold text-gray-500 dark:text-gray-500">
                  {user?.email}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Logout Session"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Stay Here"
        type="logout"
      />
    </div>
  );
}
