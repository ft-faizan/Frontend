// layout/aside_bar/AsideBar.jsx
"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/auth/authSlice.js";
import { useToast } from "../../../context/ToastContext.jsx";
import ConfirmModal from "../../reuseable_compo/ConfirmModal.jsx";
import SidebarMenu from "./SidebarMenu";
import SidebarMobileSettings from "./SidebarMobileSettings";
import UserCard from "./UserCard";

function AsideBar({ toggleSidebar }) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = () => {
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

  return (
    <div className="bg-white dark:bg-[#0c0e14] min-[1330px]:bg-transparent w-full h-[90vh] border-r border-gray-300 dark:border-[#1c1f2c] p-5 flex flex-col justify-between overflow-y-auto scrollbar-premium">
      {/* MENU SECTION */}
      <div className="flex flex-col gap-2">
        <SidebarMenu toggleSidebar={toggleSidebar} />
        <SidebarMobileSettings />
      </div>

      {/* USER CARD FOOTER */}
      <div className="w-full pt-4 border-t border-gray-100 dark:border-[#1c1f2c]">
        <UserCard onLogoutClick={() => setLogoutModalOpen(true)} />
      </div>

      {/* CONFIRM MODAL */}
      <ConfirmModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout Account"
        message="Are you sure you want to logout from your account?"
        confirmText="Logout"
        cancelText="Stay Here"
        type="logout"
      />
    </div>
  );
}

export default AsideBar;