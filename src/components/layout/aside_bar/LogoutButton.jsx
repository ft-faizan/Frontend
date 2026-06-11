// layout/aside_bar/LogoutButton.jsx
import { IoLogOut } from "react-icons/io5";

const LogoutButton = ({ onLogoutClick }) => {
  return (
    <button
      type="button"
      onClick={onLogoutClick}
      title="Logout Node Session"
      className="flex-shrink-0 w-full sm:w-8 sm:h-8 h-9 flex items-center justify-center gap-2 sm:gap-0 rounded-lg border border-gray-200/60 dark:border-slate-800 bg-white dark:bg-[#0c0e14] text-slate-400 hover:bg-red-500/5 dark:hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 outline-none transition-all active:scale-[0.96] group"
    >
      <span className="sm:hidden text-xs font-bold">Logout Session</span>
      <IoLogOut
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
};

export default LogoutButton;