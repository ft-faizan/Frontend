



import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getMe } from "./features/auth/authSlice.js";
import AppRoutes from "./routes/app_routes.jsx";
import { fetchSavedTools } from "./features/savedTools/savedToolSlice.js";
function App() {
 const dispatch = useDispatch();
  

  useEffect(() => {
  const init = async () => {
    await dispatch(getMe());
    dispatch(fetchSavedTools());
  };

  init();
}, [dispatch]);

 
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;



