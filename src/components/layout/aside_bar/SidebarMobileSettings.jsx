// layout/aside_bar/SidebarMobileSettings.jsx
import Settings_menu from "../../nav_compo/settings_menu";

const SidebarMobileSettings = () => {
  return (
    <div className="min-[1330px]:hidden mt-4 pt-4 border-t border-gray-100 dark:border-[#1c1f2c]">
      <p className="text-[10px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase pl-1 mb-2">
        Settings Panel
      </p>
      <Settings_menu />
    </div>
  );
};

export default SidebarMobileSettings;