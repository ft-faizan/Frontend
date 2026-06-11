import { createElement } from 'react';
import { TiHome } from "react-icons/ti";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsBookmarkDashFill } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import {
  MdOutlineAdminPanelSettings,
  MdAdminPanelSettings,
} from "react-icons/md";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    roles: ["user", "admin", "superadmin"],
    icon: createElement(TiHome),
  },
  {
    name: "Categories",
    path: "/categories",
    roles: ["user", "admin", "superadmin"],
    icon: createElement(TbLayoutDashboardFilled),
  },
  {
    name: "Saved Tools",
    path: "/users_save",
    roles: ["user", "admin", "superadmin"],
    icon: createElement(BsBookmarkDashFill),
  },
  {
    name: "Trash",
    path: "/trash",
    roles: ["user", "admin", "superadmin"],
    icon: createElement(FaTrashCan),
  },
  {
    name: "Admin",
    path: "/admin",
    roles: ["admin", "superadmin"],
    icon: createElement(MdOutlineAdminPanelSettings),
  },
  {
    name: "Super Admin",
    path: "/super-admin",
    roles: ["superadmin"],
    icon: createElement(MdAdminPanelSettings),
  },
];
