import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected_route({ children, allowedRoles }) {
  const { user, isAuthChecked } = useSelector((state) => state.auth);

  // 🔥 WAIT until auth is checked
  if (!isAuthChecked) {
    return <p>Checking auth...</p>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // ❌ wrong role
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/auth" replace />;
  }

  // ✅ allow access
  return children;
}