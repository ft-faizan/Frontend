// pages/dashboard/DashboardPage.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../../features/tools/toolSlice";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";
import DashboardHeader from "./components/DashboardHeader";
import StatsGrid from "./components/StatsGrid";
import AnalyticsCard from "./components/AnalyticsCard";
import SearchOverlay from "./components/SearchOverlay";
import "./dashboard.css";

function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { tools, loading: toolsLoading } = useSelector((s) => s.tools);
  const { stats, loading: statsLoading } = useSelector((s) => s.dashboard);

  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  const refreshStats = () => dispatch(getDashboardStats());

  useEffect(() => {
    dispatch(getDashboardStats());
    const h = new Date().getHours();
    setGreeting(
      h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
    );
  }, [dispatch]);

  // Command + K or Control + K Shortcut Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setHasSearched(false);
      return;
    }
    const t = setTimeout(() => {
      dispatch(getTools({ search: searchTerm, page: 1 }));
      setHasSearched(true);
    }, 400);
    return () => clearTimeout(t);
  }, [searchTerm, dispatch]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
    setHasSearched(false);
    refreshStats();
  };

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      <div className="mx-auto space-y-8">
        <DashboardHeader
          userName={user?.name}
          greeting={greeting}
          onSearchOpen={() => setSearchOpen(true)}
        />

        <StatsGrid stats={stats} loading={statsLoading} />

        <AnalyticsCard stats={stats} loading={statsLoading} />
      </div>

      {searchOpen && (
        <SearchOverlay
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tools={tools}
          toolsLoading={toolsLoading}
          hasSearched={hasSearched}
          onClose={closeSearch}
          onRefreshStats={refreshStats}
        />
      )}
    </div>
  );
}

export default DashboardPage;