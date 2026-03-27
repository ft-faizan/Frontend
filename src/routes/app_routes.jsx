import { Routes, Route } from "react-router-dom";
import Sigin_siginup_page from "../pages/sigin_siginup_page.jsx";
import Super_Admin_Page from "../pages/super_admin_page.jsx";

function appRoutes() {
    return (
       <>
        <Routes>
            <Route path="/auth" element={<Sigin_siginup_page/>} />
            <Route path="/super-admin" element={<Super_Admin_Page/>} />
        </Routes>
       </>
    )
}

export default appRoutes;