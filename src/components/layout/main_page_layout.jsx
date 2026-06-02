



import { Outlet } from "react-router-dom";
import { useState } from "react";
import Nav_bar from "./nav_bar.jsx";
import Aside_bar from "./aside_bar.jsx";
import RecentToolsDock from "../reuseable_compo/RecentToolsDock.jsx";

function Main_page_layout() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="w-full h-screen flex flex-col">
      
      {/* Navbar */}
      <div className="w-full h-[10vh]">
        <Nav_bar toggleSidebar={() => setIsOpen(!isOpen)} />
      </div>

      {/* Body */}
      <div className="w-full h-[90vh] flex relative">

        {/* Sidebar */}
        <div
          className={`
            h-full
            fixed min-[1330px]:static
            top-[10vh]
            left-0
            w-[100%] min-[1330px]:w-[15%]
            transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            min-[1330px]:translate-x-0
            z-100
          `}
        >
          <Aside_bar toggleSidebar={closeSidebar} />
        </div>

        {/* Overlay (mobile/tablet only) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 min-[1330px]:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="w-full min-[1330px]:w-[85%] h-full">
          <Outlet />
          <RecentToolsDock />
        </div>

      </div>
    </div>
  );
}

export default Main_page_layout;






