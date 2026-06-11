// layout/aside_bar/SidebarMenuItem.jsx
import { Link } from "react-router-dom";

const SidebarMenuItem = ({ item, isActive, toggleSidebar }) => {
  return (
    <Link
      key={item.path}
      to={item.path}
      onClick={toggleSidebar}
      className="relative group w-full h-[44px] flex items-center rounded-xl overflow-hidden active:scale-[0.98] transition-all duration-300 bg-white  text-white shadow-lg shadow-[#3981FA]/10"
    >
      <span
        className={`
          absolute left-0 top-0 bottom-0 flex items-center justify-center transition-all duration-300 z-10 bg-[#2770E6] text-white
          ${isActive ? "w-full" : "w-[42px] group-hover:w-full"}
        `}
      >
        {item.icon}
      </span>

      <span
        className={`
          absolute left-[54px] font-semibold text-sm tracking-wide transition-all duration-300 z-0 text-[#2D71E2]
          ${isActive ? "text-transparent translate-x-4" : "group-hover:text-transparent group-hover:translate-x-4"}
        `}
      >
        {item.name}
      </span>
    </Link>
  );
};

export default SidebarMenuItem;