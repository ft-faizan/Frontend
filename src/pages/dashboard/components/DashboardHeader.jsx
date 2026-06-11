// pages/dashboard/components/DashboardHeader.jsx
import { GiHand } from "react-icons/gi";
import SearchTriggerButton from "./SearchTriggerButton";

function DashboardHeader({ userName, greeting, onSearchOpen }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="text-[#3380FF] text-[25px] flex items-center gap-2">
          {greeting},
          <span className="text-gray-800 font-semibold">{userName}</span>
          <span className="inline-block animate-wave">
            <GiHand />
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <SearchTriggerButton onClick={onSearchOpen} />
        <div className="flex items-center gap-2 text-xs bg-[#3981FA] rounded-xl px-4 py-2 flex-shrink-0 h-[44px]">
          <span className="text-white">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;