import { Routes, Route } from "react-router-dom";
import Protected_route from "../components/role_base_routeing/protected_route.jsx";

import Sigin_siginup_page from "../pages/sigin_siginup_page.jsx";
import Super_admin_page from "../pages/super_admin_page.jsx";
import Admin_page from "../pages/admin_page.jsx";
import Dashboard_page from "../pages/dashboard_page.jsx";
import Category_page from "../pages/category_page.jsx";
import Category_folders_page from "../pages/category_folders_page.jsx";
import User_save_page from "../pages/user_save_page.jsx";
import User_save_folders from "../pages/user_save_folders.jsx";
import About_page from "../pages/about_page.jsx";
import Main_page_layout from "../components/layout/main_page_layout.jsx";

function appRoutes() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/auth" element={<Sigin_siginup_page />} />
      <Route path="/about" element={<About_page />} />

      <Route element={<Main_page_layout />}>
        {/* This is the main page layout route. It will be used to wrap all the routes that are accessible to all users. */}

        {/* USER (user + admin + superadmin) */}
        <Route
          path="/dashboard"
          element={
            <Protected_route allowedRoles={["user", "admin", "superadmin"]}>
              <Dashboard_page />
            </Protected_route>
          }
        />

        <Route
          path="/categories"
          element={
            <Protected_route allowedRoles={["user", "admin", "superadmin"]}>
              <Category_page />
            </Protected_route>
          }
        />

        <Route
          path="/categories/:id/folders"
          element={
            <Protected_route allowedRoles={["user", "admin", "superadmin"]}>
              <Category_folders_page />
            </Protected_route>
          }
        />

        <Route
          path="/users_save"
          element={
            <Protected_route allowedRoles={["user", "admin", "superadmin"]}>
              <User_save_page />
            </Protected_route>
          }
        />

        <Route
          path="/users_save/:id/folders"
          element={
            <Protected_route allowedRoles={["user", "admin", "superadmin"]}>
              <User_save_folders />
            </Protected_route>
          }
        />

        {/* ADMIN (admin + superadmin) */}
        <Route
          path="/admin"
          element={
            <Protected_route allowedRoles={["admin", "superadmin"]}>
              <Admin_page />
            </Protected_route>
          }
        />

        {/* SUPER ADMIN ONLY */}
        <Route
          path="/super-admin"
          element={
            <Protected_route allowedRoles={["superadmin"]}>
              <Super_admin_page />
            </Protected_route>
          }
        />
      </Route>
    </Routes>
  );
}

export default appRoutes;
