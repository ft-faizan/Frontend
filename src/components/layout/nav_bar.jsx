import Button from "../nav_compo/hamburger.jsx";
import Settings_menu from "../nav_compo/settings_menu.jsx";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

function Nav_bar({ toggleSidebar }) {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/Dashboard":
        return "Dashboard";
      case "/categories":
        return "Categories";
      case "/users_save":
        return "Saved Tools";
      case "/about":
        return "About Us";
      case "/admin":
        return "Admin Panel";
      case "/super-admin":
        return "Super Admin Panel";
      default:
        return "ToolsSaver.com";
    }
  };
  return (
    <div
      className="
    flex
     justify-between
     md:justify-normal
     items-center
     h-full
     w-full
      p-5
      border-b border-gray-300
      "
    >
      <div
        className="
      flex 
      items-center
       gap-2"
      >
        <div>
          <img src={logo} alt="logo" className="w-20 h-20 object-cover" />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#256DEF]">
            ToolsSaver
          </h2>
        </div>
      </div>

      <div>
        <h1 className=" hidden md:block md:text-2xl font-semibold tracking-tight text-gray-800 pl-10  ">
          {getTitle()}
        </h1>
      </div>
       <div className="hidden md:block">
  <Settings_menu />
</div>
      <div className="md:hidden" onClick={toggleSidebar}>
        <Button />
      </div>
    </div>
  );
}

export default Nav_bar;
