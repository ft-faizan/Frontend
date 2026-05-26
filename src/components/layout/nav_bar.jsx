// import Button from "../nav_compo/hamburger.jsx";
// import Settings_menu from "../nav_compo/settings_menu.jsx";
// import logo from "../../assets/logo.png";
// import { useLocation } from "react-router-dom";

// function Nav_bar({ toggleSidebar }) {
//   const location = useLocation();

//   const getTitle = () => {
//     switch (location.pathname) {
//       case "/dashboard":
//         return "Dashboard";
//       case "/categories":
//         return "Categories";
//       case "/users_save":
//         return "Saved Tools";
//       case "/about":
//         return "About Us";
//       case "/admin":
//         return "Admin Panel";
//       case "/super-admin":
//         return "Super Admin Panel";
//         case "/trash":
//         return "Trash";
//       default:
//         return "ToolsSaver.com";
//     }
//   };
//   return (
//     <div
//       className="
//     flex
//      justify-between
//      md:justify-normal
//      items-center
//      h-full
//      w-full
//       p-5
//       border-b border-gray-300
//       "
//     >
//       <div
//         className="
//       flex 
//       items-center
//        gap-2"
//       >
//         <div>
//           <img src={logo} alt="logo" className="w-20 h-20 object-cover" />
//         </div>

//         <div>
//           <h2 className="text-3xl font-bold tracking-tight text-[#256DEF]">
//             ToolsSaver
//           </h2>
//         </div>
//       </div>

//       <div>
//         <h1 className=" hidden md:block md:text-2xl font-semibold tracking-tight text-gray-800 pl-10  ">
//           {getTitle()}
//         </h1>
//       </div>
//        <div className="hidden md:block">
//   <Settings_menu />
// </div>
//       <div className="md:hidden" onClick={toggleSidebar}>
//         <Button />
//       </div>
//     </div>
//   );
// }

// export default Nav_bar;





import Button from "../nav_compo/hamburger.jsx";
import Settings_menu from "../nav_compo/settings_menu.jsx";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

function Nav_bar({ toggleSidebar }) {
  const location = useLocation();

  // const getTitle = () => {
  //   switch (location.pathname) {
  //     case "/dashboard":
  //       return "Dashboard";

  //     case "/categories":
  //       return "Categories";

  //     case "/users_save":
  //       return "Saved Tools";

  //     case "/about":
  //       return "About Us";

  //     case "/admin":
  //       return "Admin Panel";

  //     case "/super-admin":
  //       return "Super Admin Panel";

  //     case "/trash":
  //       return "Trash";

  //     default:

  // // CATEGORY PAGE TITLE
  // if (
  //   location.pathname.includes("/categories")
  // ) {

  //   return (
  //     location.state?.name ||
  //     "Category"
  //   );
  // }

  // return "ToolsSaver.com";
  //   }
  // };



  // v2
  const getTitle = () => {

  // DYNAMIC SAVED FOLDER PAGE
  if (location.pathname.includes("/saved/folder/")) {
    return location.state?.name || "Folder";
  }

  // DYNAMIC CATEGORY PAGE
  if (location.pathname.includes("/categories/")) {
    return location.state?.name || "Category";
  }

  switch (location.pathname) {
    case "/":
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

    case "/trash":
      return "Trash";

    default:
      return "ToolsSaver.com";
  }
};
  return (
    <div
      className="
        flex
        justify-between
        min-[1330px]:justify-normal
        items-center
        h-full
        w-full
        p-5
        border-b border-gray-300
      "
    >
      {/* LEFT */}
      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#256DEF]">
            ToolsSaver
          </h2>
        </div>
      </div>

      {/* PAGE TITLE */}
      <div>
        <h1
          className="
            hidden
            min-[1330px]:block
            min-[1330px]:text-2xl
            font-semibold
            tracking-tight
            text-gray-800
            pl-12
          "
        >
          {getTitle()}
        </h1>
      </div>

      {/* SETTINGS */}
      <div className="hidden min-[1330px]:block ml-auto">
        <Settings_menu />
      </div>

      {/* HAMBURGER */}
      <div
        className="min-[1330px]:hidden"
        onClick={toggleSidebar}
      >
        <Button />
      </div>
    </div>
  );
}

export default Nav_bar;