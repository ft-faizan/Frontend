import { useSelector } from "react-redux";

function Dashboard_page() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome, {user?.name} 👋</h2>

      <p>Your role: {user?.role}</p>
    </div>
  );
}

export default Dashboard_page;