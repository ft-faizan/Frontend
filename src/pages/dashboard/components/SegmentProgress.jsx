// // pages/dashboard/components/SegmentProgress.jsx
// import { SEGMENTS_META } from "../constants/segmentsMeta";

// function SegmentProgress({ stats, loading }) {
//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] ?? 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   return (
//     <div className="space-y-6">
//       {segments.map((seg) => {
//         const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
//         return (
//           <div key={seg.label} className="group/segment block">
//             <div className="flex justify-between items-center mb-2.5">
//               <div className="flex items-center gap-3">
//                 <div
//                   className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-sm transition-all duration-300 group-hover/segment:scale-110 text-[#121A29]"
//                   style={{
//                     background: `${seg.color}15`,
//                     border: `1px solid ${seg.color}30`,
//                     boxShadow: `0 4px 12px ${seg.color}05`,
//                   }}
//                 >
//                   {seg.icon}
//                 </div>
//                 <span className="text-gray-700 dark:text-gray-300 font-bold text-sm">
//                   {seg.label}
//                 </span>
//               </div>
//               <div className="text-right flex items-baseline gap-1.5">
//                 <span className="text-gray-900 dark:text-white font-black text-xl transition-colors">
//                   {loading ? "—" : seg.value.toLocaleString()}
//                 </span>
//                 <span className="text-gray-400 dark:text-gray-500 text-xs font-bold font-mono bg-gray-50 dark:bg-[#121520] border border-gray-100 dark:border-[#1c1f2c] px-1.5 py-0.5 rounded-md">
//                   {loading ? "" : `${pct}%`}
//                 </span>
//               </div>
//             </div>
//             <div className="h-2.5 rounded-full bg-gray-50 dark:bg-[#080a10] border border-gray-100 dark:border-[#171924] overflow-hidden p-[2px]">
//               {loading ? (
//                 <div className="h-full w-1/3 bg-gray-200 dark:bg-[#1c1f2c] animate-pulse rounded-full" />
//               ) : (
//                 <div
//                   className="h-full rounded-full transition-all duration-1000 ease-out"
//                   style={{
//                     width: `${pct}%`,
//                     background: `linear-gradient(90deg, ${seg.color}99, ${seg.color})`,
//                     boxShadow: `0 0 12px ${seg.color}80`,
//                   }}
//                 />
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default SegmentProgress;






// pages/dashboard/components/SegmentProgress.jsx
import { SEGMENTS_META } from "../constants/segmentsMeta";

function SegmentProgress({ stats, loading }) {
  const segments = SEGMENTS_META.map((m) => ({
    ...m,
    value: stats?.[m.key] ?? 0,
  }));
  const total = segments.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {segments.map((seg) => {
        const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
        return (
          <div key={seg.label} className="group/segment block">
            <div className="flex justify-between items-center mb-2.5">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-sm transition-all duration-300 group-hover/segment:scale-110 text-[#121A29]"
                  style={{
                    background: `${seg.color}15`,
                    border: `1px solid ${seg.color}30`,
                    // ✅ Light theme: removed dark shadow tint
                    boxShadow: `0 2px 8px ${seg.color}10`,
                  }}
                >
                  {seg.icon}
                </div>
                {/* ✅ Light theme: solid dark label, no dark: variant needed */}
                <span className="text-slate-700 font-semibold text-sm">
                  {seg.label}
                </span>
              </div>
              <div className="text-right flex items-baseline gap-1.5">
                {/* ✅ Light theme: dark number */}
                <span className="text-slate-800 font-black text-xl transition-colors">
                  {loading ? "—" : seg.value.toLocaleString()}
                </span>
                {/* ✅ Light theme: light grey pill */}
                <span className="text-slate-400 text-xs font-bold font-mono bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded-md">
                  {loading ? "" : `${pct}%`}
                </span>
              </div>
            </div>
            {/* ✅ Light theme: white track with light border */}
            <div className="h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden p-[2px]">
              {loading ? (
                // ✅ Light theme: light skeleton
                <div className="h-full w-1/3 bg-slate-200 animate-pulse rounded-full" />
              ) : (
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${seg.color}99, ${seg.color})`,
                    // ✅ Light theme: softer glow
                    boxShadow: `0 0 8px ${seg.color}50`,
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SegmentProgress;