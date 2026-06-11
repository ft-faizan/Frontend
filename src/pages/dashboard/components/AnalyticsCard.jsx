// pages/dashboard/components/AnalyticsCard.jsx
import { TbGraphFilled } from "react-icons/tb";
import DonutChart from "./DonutChart";
import SegmentProgress from "./SegmentProgress";

function AnalyticsCard({ stats, loading }) {
  const segments = [
    { label: "Platform Tools", key: "platform", value: stats?.platform ?? 0 },
    { label: "Custom Tools", key: "custom", value: stats?.custom ?? 0 },
    { label: "Folders", key: "folders", value: stats?.folders ?? 0 },
  ];
  const total = segments.reduce((s, d) => s + d.value, 0);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/20 dark:hover:border-[#3981FA]/20 select-none mb-[70px]">
      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-transparent rounded-l-2xl" />

      <div className="flex items-start justify-between mb-8 flex-wrap gap-4 relative z-10">
        <div className="space-y-0.5">
          <h2 className="text-lg font-black tracking-tight text-[#6A7280] dark:text-white flex items-center gap-2.5">
            <span className="text-2xl text-[#3380FF] drop-shadow-[0_0_6px_rgba(51,128,255,0.5)] hover:drop-shadow-[0_0_14px_rgba(51,128,255,0.9)] hover:scale-110 transition-all duration-300 inline-flex items-center justify-center">
              <TbGraphFilled />
            </span>
            OverAll - Analytics
          </h2>
          <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
            Breakdown of your saved ecosystem
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#121520] border border-gray-100 dark:border-[#1e2235] px-3.5 py-1.5 rounded-full shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#3981FA] animate-pulse shadow-[0_0_8px_#3981FA]" />
          <span className="uppercase font-mono">LIVE SYNC</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
        <div className="flex-shrink-0 relative transition-transform duration-500 hover:scale-[1.02]">
          <DonutChart stats={stats} loading={loading} />
        </div>
        <div className="flex-1 w-full space-y-6">
          <SegmentProgress stats={stats} loading={loading} />
          <div className="pt-6 border-t border-gray-100 dark:border-[#1c1f2c] flex justify-between items-center flex-wrap gap-2">
            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#3981FA] to-purple-500 shadow-[0_0_6px_#3981FA]" />
              Total Tracked Inventory Lifecycle
            </span>
            <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-baseline gap-1 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
              {loading ? "—" : total.toLocaleString()}
              <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold tracking-wide ml-0.5 uppercase bg-clip-text text-gray-400">
                items
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;