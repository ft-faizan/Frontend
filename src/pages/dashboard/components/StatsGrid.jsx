// // pages/dashboard/components/StatsGrid.jsx
// import { TbBookmark, TbLayoutGrid, TbTool, TbFolder } from "react-icons/tb";
// import StatCard from "./StatCard";

// function StatsGrid({ stats, loading }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pt-[15px]">
//       <StatCard
//         icon={TbBookmark}
//         label="Total saved"
//         value={stats?.total}
//         sub="All tools in library"
//         loading={loading}
//       />
//       <StatCard
//         icon={TbLayoutGrid}
//         label="Platform tools"
//         value={stats?.platform}
//         sub="From official directory"
//         loading={loading}
//       />
//       <StatCard
//         icon={TbTool}
//         label="Custom tools"
//         value={stats?.custom}
//         sub="Created by you"
//         loading={loading}
//       />
//       <StatCard
//         icon={TbFolder}
//         label="Folders"
//         value={stats?.folders}
//         sub="Smart collections"
//         loading={loading}
//       />
//     </div>
//   );
// }

// export default StatsGrid;









// pages/dashboard/components/StatsGrid.jsx
import { TbBookmark, TbLayoutGrid, TbTool, TbFolder } from "react-icons/tb";
import StatCard from "./StatCard";

function StatsGrid({ stats, loading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pt-[15px]">
      <StatCard
        icon={TbBookmark}
        label="Total saved"
        value={stats?.total}
        sub="All tools in library"
        loading={loading}
       color="#3E82F5" // Blue
      />
      <StatCard
        icon={TbLayoutGrid}
        label="Platform tools"
        value={stats?.platform}
        sub="From official directory"
        loading={loading}
         color="#296DE2" // Green
      />
      <StatCard
        icon={TbTool}
        label="Custom tools"
        value={stats?.custom}
        sub="Created by you"
        loading={loading}
        color="#AA59F3" // Orange
      />
      <StatCard
        icon={TbFolder}
        label="Folders"
        value={stats?.folders}
        sub="Smart collections"
        loading={loading}
        color="#15BA84" // Purple
      />
    </div>
  );
}

export default StatsGrid;