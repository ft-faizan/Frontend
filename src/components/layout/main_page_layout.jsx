
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Nav_bar from "./nav_bar.jsx";
import Aside_bar from "./aside_bar.jsx";

function Main_page_layout() {
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return (
    <div className=" w-full h-screen flex flex-col">
      
      {/* Navbar */}
      <div className=" w-full h-[10vh]">
        <Nav_bar toggleSidebar={() => setIsOpen(!isOpen)} />
      </div>

      {/* Body */}
      <div className=" w-full h-[90vh] flex relative">

        {/* Sidebar */}
        <div
          className={`
            
            h-full
            fixed md:static
            top-[10vh]
            left-0
            w-[70%] md:w-[15%]
            transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            z-50
          `}
        >
        <Aside_bar toggleSidebar={closeSidebar} />
        </div>

        {/* Overlay (mobile only) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Main content */}
        <div className=" w-full md:w-[85%] h-full p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main_page_layout;