// layout/aside_bar/SidebarMenu.jsx
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { menuItems } from "./menuData";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarMenu = ({ toggleSidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  return (
    <div className="flex flex-col gap-2">
      {menuItems
        .filter((item) => item.roles.includes(user?.role))
        .map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : item.path === "/users_save"
                ? location.pathname.startsWith("/users_save") ||
                  location.pathname.startsWith("/saved")
                : location.pathname === item.path ||
                  location.pathname.startsWith(item.path + "/");

          return (
            <SidebarMenuItem
              key={item.path}
              item={item}
              isActive={isActive}
              toggleSidebar={toggleSidebar}
            />
          );
        })}
    </div>
  );
};

export default SidebarMenu;