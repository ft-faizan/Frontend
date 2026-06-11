// layout/aside_bar/UserCard.jsx
import { useSelector } from "react-redux";
import RoleBadge from "./RoleBadge";
import LogoutButton from "./LogoutButton";

const UserCard = ({ onLogoutClick }) => {
  const user = useSelector((state) => state.auth.user);
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 dark:border-[#1c1f2c] bg-slate-50/50 dark:bg-[#141722]/30 backdrop-blur-md shadow-sm">
      <div className="h-[2px] w-full bg-gradient-to-r from-[#3981FA] via-blue-400 to-[#3981FA]/40" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-[#3981FA] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#3981FA]/10">
            {firstLetter}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0e14]" />
          </div>

          <div className="flex-1 min-w-0 space-y-0.5">
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
              {user?.name || "User"}
            </p>
            <p className="text-[11px] font-medium text-slate-400 dark:text-gray-500 truncate">
              {user?.email}
            </p>

            <div className="pt-1">
              <RoleBadge role={user?.role} />
            </div>
          </div>
        </div>

        <LogoutButton onLogoutClick={onLogoutClick} />
      </div>
    </div>
  );
};

export default UserCard;