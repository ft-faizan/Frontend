// import App_Routes from "./routes/app_routes.jsx";
// // import ThemeToggle from "./components/dark_light_compo/ThemeToggle.jsx";
// function App() {
//   return (
//     <>
//       {/* <div>
//         <ThemeToggle />
//         <h1 className="text-3xl font-bold underline text-red-600 p-10 dark:text-green-300">
//           Frontend
//         </h1>
//       </div> */}
//       <App_Routes />
//     </>
//   );
// }

// export default App;


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "./features/auth/authSlice.js";
import AppRoutes from "./routes/app_routes.jsx";

function App() {
  const dispatch = useDispatch();

 useEffect(() => {
   console.log("🔥 App mounted, calling getMe");
  const timer = setTimeout(() => {
    dispatch(getMe());
  }, 100); // small delay

  return () => clearTimeout(timer);
}, [dispatch]);
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;