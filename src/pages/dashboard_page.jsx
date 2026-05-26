// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";

// function Dashboard_page() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { tools, loading } = useSelector((state) => state.tools);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   // 👇 Debounce: wait 400ms after user stops typing, then search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setHasSearched(false); // hide results if input is cleared
//       return;
//     }

//     const timer = setTimeout(() => {
//       dispatch(getTools({ search: searchTerm, page: 1 }));
//       setHasSearched(true);
//     }, 400);

//     return () => clearTimeout(timer); // cancel previous timer on each keystroke
//   }, [searchTerm, dispatch]);

//   return (
//     <div className="p-2">
//       {/* 1. Header Section */}
//       <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
//       <p className="text-gray-500 text-sm mb-7">
//         Welcome back, <span className="text-white font-medium">{user?.name}</span> 👋
//       </p>

//       {/* 2. Global Search Bar — form submit no longer needed */}
//       <div className="mb-12">
//         <div className="relative max-w-2xl">
//           <input
//             type="text"
//             placeholder="Search for tools (e.g., Gemini, ChatGPT, Cursor)..."
//             className="w-full bg-[#13151a] border border-[#2a2d3a] p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#3380FF] transition-all"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           {/* Search / Loading Icon */}
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//             {loading ? (
//               // Spinner while fetching
//               <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             )}
//           </div>

//           {/* Clear button — shown when there's text */}
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       </div>

//       {/* 3. Results */}
//       {hasSearched && (
//         <div className="min-h-[400px]">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-bold text-white">
//               Results for "{searchTerm}"
//             </h3>
//           </div>
//           <ToolCardList tools={tools} mode="public" loading={loading} />
//         </div>
//       )}

//       {/* Empty state */}
//       {!hasSearched && (
//         <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//           <p className="text-sm">Search for a tool to get started</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard_page;

// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import { getDashboardStats } from "../features/dashboard/dashboardSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";

// // ── Stat Card ────────────────────────────────────────────────────────────────
// function StatCard({ icon, label, value, sub, loading, color }) {
//   return (
//     <div className="bg-[#13151a] border border-[#2a2d3a] rounded-xl p-4 flex flex-col gap-1">
//       <p className="text-xs text-gray-500 flex items-center gap-1.5">
//         <span style={{ color }}>{icon}</span>
//         {label}
//       </p>
//       {loading ? (
//         <div className="h-8 w-16 rounded bg-[#1e2130] animate-pulse mt-1" />
//       ) : (
//         <p className="text-3xl font-semibold text-white leading-none mt-0.5">
//           {value ?? 0}
//         </p>
//       )}
//       <p className="text-[11px] text-gray-600 mt-0.5">{sub}</p>
//     </div>
//   );
// }

// // ── Donut Chart (pure canvas, no lib needed beyond CDN) ───────────────────────
// function DonutChart({ stats, loading }) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current || !stats || loading) return;

//     const canvas = canvasRef.current;
//     const ctx    = canvas.getContext("2d");
//     const dpr    = window.devicePixelRatio || 1;
//     const SIZE   = 220;

//     canvas.width  = SIZE * dpr;
//     canvas.height = SIZE * dpr;
//     canvas.style.width  = SIZE + "px";
//     canvas.style.height = SIZE + "px";
//     ctx.scale(dpr, dpr);

//     const cx = SIZE / 2;
//     const cy = SIZE / 2;
//     const outerR = 88;
//     const innerR = 54;

//     const segments = [
//       { label: "Platform",  value: stats.platform || 0, color: "#3266ad" },
//       { label: "Custom",    value: stats.custom   || 0, color: "#7F77DD" },
//       { label: "Folders",   value: stats.folders  || 0, color: "#10b981" },
//     ];

//     const total = segments.reduce((s, d) => s + d.value, 0);

//     ctx.clearRect(0, 0, SIZE, SIZE);

//     if (total === 0) {
//       // empty ring
//       ctx.beginPath();
//       ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
//       ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
//       ctx.fillStyle = "#1e2130";
//       ctx.fill();

//       ctx.fillStyle = "#4b5563";
//       ctx.font = "13px 'Plus Jakarta Sans', sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("No data yet", cx, cy);
//       return;
//     }

//     const GAP   = 0.03; // radians gap between segments
//     let startAngle = -Math.PI / 2;

//     // draw segments
//     segments.forEach((seg) => {
//       if (seg.value === 0) return;
//       const slice = (seg.value / total) * (Math.PI * 2) - GAP;

//       // shadow / glow
//       ctx.shadowColor = seg.color;
//       ctx.shadowBlur  = 12;

//       ctx.beginPath();
//       ctx.moveTo(
//         cx + outerR * Math.cos(startAngle + GAP / 2),
//         cy + outerR * Math.sin(startAngle + GAP / 2)
//       );
//       ctx.arc(cx, cy, outerR, startAngle + GAP / 2, startAngle + slice + GAP / 2);
//       ctx.arc(cx, cy, innerR, startAngle + slice + GAP / 2, startAngle + GAP / 2, true);
//       ctx.closePath();
//       ctx.fillStyle = seg.color;
//       ctx.fill();

//       ctx.shadowBlur = 0;
//       startAngle += slice + GAP;
//     });

//     // centre text
//     ctx.shadowBlur = 0;
//     ctx.fillStyle  = "#ffffff";
//     ctx.font       = `bold 28px 'Plus Jakarta Sans', sans-serif`;
//     ctx.textAlign  = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(total, cx, cy - 10);

//     ctx.fillStyle = "#6b7280";
//     ctx.font      = `12px 'Plus Jakarta Sans', sans-serif`;
//     ctx.fillText("total items", cx, cy + 14);

//   }, [stats, loading]);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       {loading ? (
//         <div className="w-[220px] h-[220px] rounded-full bg-[#1e2130] animate-pulse" />
//       ) : (
//         <canvas ref={canvasRef} />
//       )}
//     </div>
//   );
// }

// // ── Dashboard Page ───────────────────────────────────────────────────────────
// function Dashboard_page() {
//   const dispatch = useDispatch();

//   const { user }                                   = useSelector((state) => state.auth);
//   const { tools, loading: toolsLoading }           = useSelector((state) => state.tools);
//   const { stats, loading: statsLoading }           = useSelector((state) => state.dashboard);

//   const [searchTerm,  setSearchTerm]  = useState("");
//   const [hasSearched, setHasSearched] = useState(false);

//   useEffect(() => {
//     dispatch(getDashboardStats());
//   }, [dispatch]);

//   // debounced search
//   useEffect(() => {
//     if (!searchTerm.trim()) { setHasSearched(false); return; }
//     const t = setTimeout(() => {
//       dispatch(getTools({ search: searchTerm, page: 1 }));
//       setHasSearched(true);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [searchTerm, dispatch]);

//   const segments = [
//     { label: "Platform Tools", value: stats?.platform ?? 0, color: "#3266ad", icon: "🧩" },
//     { label: "Custom Tools",   value: stats?.custom   ?? 0, color: "#7F77DD", icon: "🔗" },
//     { label: "Folders",        value: stats?.folders  ?? 0, color: "#10b981", icon: "📁" },
//   ];

//   const total = segments.reduce((s, d) => s + d.value, 0);

//   return (
//     <div className="p-2">

//       {/* ── Header ── */}
//       <h1 className="text-3xl font-bold mb-1 text-white">Dashboard</h1>
//       <p className="text-gray-500 text-sm mb-7">
//         Welcome back, <span className="text-white font-medium">{user?.name}</span> 👋
//       </p>

//       {/* ── Stat Cards ── */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
//         <StatCard icon="🔖" label="total saved"    value={stats?.total}    sub="all tools"      loading={statsLoading} color="#f59e0b" />
//         <StatCard icon="🧩" label="platform tools" value={stats?.platform} sub="from directory" loading={statsLoading} color="#3266ad" />
//         <StatCard icon="🔗" label="custom tools"   value={stats?.custom}   sub="added by you"   loading={statsLoading} color="#7F77DD" />
//         <StatCard icon="📁" label="folders"        value={stats?.folders}  sub="collections"    loading={statsLoading} color="#10b981" />
//       </div>

//       {/* ── Pie / Donut Chart ── */}
//       <div className="bg-[#13151a] border border-[#2a2d3a] rounded-xl p-6 mb-10">
//         <p className="text-sm font-medium text-white mb-6">your library breakdown</p>

//         <div className="flex flex-col sm:flex-row items-center gap-8">

//           {/* donut */}
//           <DonutChart stats={stats} loading={statsLoading} />

//           {/* legend */}
//           <div className="flex flex-col gap-4 flex-1 w-full">
//             {segments.map((seg) => {
//               const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
//               return (
//                 <div key={seg.label}>
//                   <div className="flex justify-between items-center mb-1.5">
//                     <span className="flex items-center gap-2 text-sm text-gray-300">
//                       <span
//                         className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
//                         style={{ background: seg.color, boxShadow: `0 0 6px ${seg.color}` }}
//                       />
//                       {seg.icon} {seg.label}
//                     </span>
//                     <span className="text-sm font-semibold text-white">
//                       {statsLoading ? "—" : seg.value}
//                       <span className="text-xs text-gray-500 font-normal ml-1">
//                         {statsLoading ? "" : `(${pct}%)`}
//                       </span>
//                     </span>
//                   </div>
//                   {/* progress bar */}
//                   <div className="w-full h-1.5 rounded-full bg-[#1e2130] overflow-hidden">
//                     {!statsLoading && (
//                       <div
//                         className="h-full rounded-full transition-all duration-700"
//                         style={{
//                           width: `${pct}%`,
//                           background: seg.color,
//                           boxShadow: `0 0 8px ${seg.color}`,
//                         }}
//                       />
//                     )}
//                     {statsLoading && (
//                       <div className="h-full w-1/2 rounded-full bg-[#2a2d3a] animate-pulse" />
//                     )}
//                   </div>
//                 </div>
//               );
//             })}

//             {/* total footer */}
//             <div className="mt-2 pt-4 border-t border-[#2a2d3a] flex justify-between text-xs text-gray-500">
//               <span>total items tracked</span>
//               <span className="text-white font-semibold">
//                 {statsLoading ? "—" : total}
//               </span>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ── Search Bar ── */}
//       <div className="mb-12">
//         <div className="relative max-w-2xl">
//           <input
//             type="text"
//             placeholder="Search for tools (e.g., Gemini, ChatGPT, Cursor)..."
//             className="w-full bg-[#13151a] border border-[#2a2d3a] p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#3380FF] transition-all"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//             {toolsLoading ? (
//               <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             )}
//           </div>
//           {searchTerm && (
//             <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">✕</button>
//           )}
//         </div>
//       </div>

//       {/* ── Search Results ── */}
//       {hasSearched && (
//         <div className="min-h-[400px]">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-xl font-bold text-white">Results for "{searchTerm}"</h3>
//           </div>
//           <ToolCardList tools={tools} mode="public" loading={toolsLoading} />
//         </div>
//       )}

//       {!hasSearched && (
//         <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//           <p className="text-sm">Search for a tool to get started</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard_page;

// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import { getDashboardStats } from "../features/dashboard/dashboardSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import { GiHand } from "react-icons/gi";

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// function StatCard({ icon, label, value, sub, loading, color }) {
//   return (
//     <div
//       className="group relative overflow-hidden bg-[#0f1117] border border-[#1e2130] rounded-2xl p-5 flex flex-col gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2a2d3a]"
//       style={{ boxShadow: `inset 0 0 30px ${color}08` }}
//     >
//       {/* top-right glow orb */}
//       <div
//         className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
//         style={{ background: color }}
//       />
//       <p className="text-[11px] text-gray-500 flex items-center gap-2 uppercase tracking-widest font-medium">
//         <span
//           className="text-base"
//           style={{ color, filter: `drop-shadow(0 0 4px ${color})` }}
//         >
//           {icon}
//         </span>
//         {label}
//       </p>

//       {loading ? (
//         <div className="h-10 w-24 rounded-lg bg-[#1a1d2a] animate-pulse mt-1" />
//       ) : (
//         <p className="text-4xl font-bold text-white tracking-tight leading-none mt-1">
//           {(value ?? 0).toLocaleString()}
//         </p>
//       )}

//       <p className="text-[11px] text-gray-600 mt-0.5 font-medium">{sub}</p>

//       {/* bottom accent line */}
//       <div
//         className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
//         style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
//       />
//     </div>
//   );
// }

// // ── Donut Chart ───────────────────────────────────────────────────────────────
// const SEGMENTS_META = [
//   { label: "Platform Tools", key: "platform", color: "#3b82f6", icon: "🧩" },
//   { label: "Custom Tools", key: "custom", color: "#a855f7", icon: "🔗" },
//   { label: "Folders", key: "folders", color: "#10b981", icon: "📁" },
// ];

// function DonutChart({ stats, loading }) {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const progressRef = useRef(0);
//   const [tooltip, setTooltip] = useState(null); // { label, value, pct, color, icon, x, y }

//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] || 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   // draw function (pure — no state reads)
//   const draw = (progress) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const dpr = window.devicePixelRatio || 1;
//     const SIZE = 240;
//     canvas.width = SIZE * dpr;
//     canvas.height = SIZE * dpr;
//     canvas.style.width = SIZE + "px";
//     canvas.style.height = SIZE + "px";
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     const cx = SIZE / 2,
//       cy = SIZE / 2;
//     const OR = 94,
//       IR = 58,
//       GAP = 0.032;

//     ctx.clearRect(0, 0, SIZE, SIZE);

//     if (total === 0) {
//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, 0, Math.PI * 2);
//       ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
//       ctx.fillStyle = "#1a1d2a";
//       ctx.fill();
//       ctx.fillStyle = "#4b5563";
//       ctx.font = "13px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("No data yet", cx, cy);
//       return;
//     }

//     let angle = -Math.PI / 2;
//     segments.forEach((seg) => {
//       if (seg.value === 0) return;
//       const full = (seg.value / total) * Math.PI * 2;
//       const slice = Math.max(0, full * progress - GAP);
//       if (slice <= 0) return;

//       const g = ctx.createLinearGradient(cx - OR, cy - OR, cx + OR, cy + OR);
//       g.addColorStop(0, seg.color + "cc");
//       g.addColorStop(1, seg.color);

//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, angle + GAP / 2, angle + slice + GAP / 2);
//       ctx.arc(cx, cy, IR, angle + slice + GAP / 2, angle + GAP / 2, true);
//       ctx.closePath();
//       ctx.shadowColor = seg.color;
//       ctx.shadowBlur = 14;
//       ctx.fillStyle = g;
//       ctx.fill();
//       ctx.shadowBlur = 0;

//       angle += full;
//     });

//     // decorative rings
//     [OR + 7, IR - 8].forEach((r) => {
//       ctx.beginPath();
//       ctx.arc(cx, cy, r, 0, Math.PI * 2);
//       ctx.strokeStyle = "#1e2130";
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     });

//     // inner fill
//     ctx.beginPath();
//     ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
//     ctx.fillStyle = "#0a0c12";
//     ctx.fill();

//     // center text
//     const displayed = Math.floor(total * progress);
//     ctx.fillStyle = "#ffffff";
//     ctx.font = "bold 30px Inter, sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
//     ctx.fillStyle = "#6b7280";
//     ctx.font = "500 11px Inter, sans-serif";
//     ctx.fillText("Total Items", cx, cy + 13);
//   };

//   // animate on stats change
//   useEffect(() => {
//     if (loading) return;
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     progressRef.current = 0;
//     const start = performance.now();
//     const duration = 1100;
//     const tick = (now) => {
//       const t = Math.min(1, (now - start) / duration);
//       // ease out cubic
//       const p = 1 - Math.pow(1 - t, 3);
//       progressRef.current = p;
//       draw(p);
//       if (t < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//   }, [stats?.platform, stats?.custom, stats?.folders, loading]);

//   // hit-test helper
//   const getHoveredSegment = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas || progressRef.current < 0.98) return null;
//     const rect = canvas.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;
//     const SIZE = 240;
//     const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
//     const my = ((e.clientY - rect.top) / rect.height) * SIZE;
//     const cx = SIZE / 2,
//       cy = SIZE / 2;
//     const dx = mx - cx,
//       dy = my - cy;
//     const dist = Math.sqrt(dx * dx + dy * dy);
//     if (dist > 100 || dist < 52) return null;

//     let ang = Math.atan2(dy, dx);
//     if (ang < -Math.PI / 2) ang += Math.PI * 2;

//     let start = -Math.PI / 2;
//     for (const seg of segments) {
//       if (seg.value === 0) continue;
//       const slice = (seg.value / total) * Math.PI * 2;
//       if (ang >= start && ang < start + slice) return seg;
//       start += slice;
//     }
//     return null;
//   };

//   const handleMouseMove = (e) => {
//     const seg = getHoveredSegment(e);
//     if (seg) {
//       const pct = Math.round((seg.value / total) * 100);
//       setTooltip({ ...seg, pct });
//     } else {
//       setTooltip(null);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       {loading ? (
//         <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1a1d2a] to-[#0f1117] animate-pulse" />
//       ) : (
//         <canvas
//           ref={canvasRef}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => setTooltip(null)}
//           className="cursor-crosshair"
//           style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))" }}
//         />
//       )}

//       {/* tooltip */}
//       {tooltip && (
//         <div
//           className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none
//                      bg-[#12141c]/95 backdrop-blur-md border border-[#2a2d3a] rounded-2xl
//                      px-4 py-2 text-sm font-semibold text-white shadow-2xl whitespace-nowrap
//                      animate-tooltip-in"
//           style={{ boxShadow: `0 0 20px ${tooltip.color}40` }}
//         >
//           <span className="mr-1.5">{tooltip.icon}</span>
//           {tooltip.label}
//           <span className="ml-2 font-bold" style={{ color: tooltip.color }}>
//             {tooltip.value}
//           </span>
//           <span className="ml-1 text-gray-400 font-normal text-xs">
//             ({tooltip.pct}%)
//           </span>
//         </div>
//       )}

//       <p className="text-[11px] text-gray-600 mt-4 tracking-wide">
//         hover segments for details
//       </p>
//     </div>
//   );
// }

// // ── Dashboard Page ────────────────────────────────────────────────────────────
// function Dashboard_page() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((s) => s.auth);
//   const { tools, loading: toolsLoading } = useSelector((s) => s.tools);
//   const { stats, loading: statsLoading } = useSelector((s) => s.dashboard);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [greeting, setGreeting] = useState("");

//   useEffect(() => {
//     dispatch(getDashboardStats());
//     const h = new Date().getHours();
//     setGreeting(
//       h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening",
//     );
//   }, [dispatch]);

//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setHasSearched(false);
//       return;
//     }
//     const t = setTimeout(() => {
//       dispatch(getTools({ search: searchTerm, page: 1 }));
//       setHasSearched(true);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [searchTerm, dispatch]);

//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] ?? 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   return (
//     <div className=" h-[90vh] overflow-y-scroll p-5">
//       <div className=" mx-auto space-y-8">
//         {/* ── Header ── */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent tracking-tight">
//               Dashboard
//             </h1> */}
//             <p className="text-gray-500 text-sm mt-1.5 flex items-center gap-2">
//               {greeting},
//               <span className="text-white font-semibold">{user?.name}</span>
//               <span className="inline-block animate-wave">
//                 <GiHand />
//               </span>
//             </p>
//           </div>
//             {/* ── Search ── */}
//         <div>
//           <div className="relative max-w-3xl">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
//             <input
//               type="text"
//               placeholder="Search for tools (e.g., Gemini, ChatGPT, Cursor)..."
//               className="relative w-full bg-[#0f1117] border border-[#1e2130] py-4 pl-12 pr-12 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
//               {toolsLoading ? (
//                 <svg
//                   className="h-5 w-5 animate-spin"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   />
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8z"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-5 w-5"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               )}
//             </div>
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white bg-[#1a1d2a] hover:bg-[#2a2d3a] rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>
//          {/* ── Results ── */}
//         {hasSearched && (
//           <div className="min-h-[400px] animate-fade-in">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
//               <h3 className="text-xl font-bold text-white">
//                 Results for{" "}
//                 <span className="text-blue-400">"{searchTerm}"</span>
//               </h3>
//             </div>
//             <ToolCardList tools={tools} mode="public" loading={toolsLoading} />
//           </div>
//         )}

//         {!hasSearched && (
//           <div className="flex flex-col items-center justify-center py-16 text-gray-600 animate-fade-in">
//             <div className="bg-[#0f1117] border border-[#1e2130] rounded-2xl p-6 mb-4">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-10 w-10 text-gray-600"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <p className="text-sm font-medium text-gray-400">
//               Discover tools from your library
//             </p>
//             <p className="text-xs text-gray-600 mt-1">
//               start typing to search across platform & custom tools
//             </p>
//           </div>
//         )}
//           <div className="flex items-center gap-2 text-xs bg-[#0f1117] border border-[#1e2130] rounded-full px-4 py-2 self-start sm:self-auto">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-gray-300 font-medium">Live</span>
//             <span className="text-[#2a2d3a]">|</span>
//             <span className="text-gray-500">
//               {new Date().toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </span>
//           </div>
//         </div>

//         {/* ── Stat Cards ── */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//           <StatCard
//             icon="🎯"
//             label="total saved"
//             value={stats?.total}
//             sub="all tools in library"
//             loading={statsLoading}
//             color="#f59e0b"
//           />
//           <StatCard
//             icon="🧩"
//             label="platform tools"
//             value={stats?.platform}
//             sub="from official directory"
//             loading={statsLoading}
//             color="#3b82f6"
//           />
//           <StatCard
//             icon="⚡"
//             label="custom tools"
//             value={stats?.custom}
//             sub="created by you"
//             loading={statsLoading}
//             color="#a855f7"
//           />
//           <StatCard
//             icon="📂"
//             label="folders"
//             value={stats?.folders}
//             sub="smart collections"
//             loading={statsLoading}
//             color="#10b981"
//           />
//         </div>

//         {/* ── Analytics Card ── */}
//         <div className="bg-[#0f1117] border border-[#1e2130] rounded-2xl p-6 md:p-8">
//           {/* card header */}
//           <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
//             <div>
//               <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                 <span>📊</span> Library Analytics
//               </h2>
//               <p className="text-gray-600 text-xs mt-1">
//                 breakdown of your saved ecosystem
//               </p>
//             </div>
//             <div className="flex items-center gap-1.5 text-[11px] bg-[#0a0c12] border border-[#1e2130] px-3 py-1.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//               <span className="text-gray-400 font-medium">live sync</span>
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
//             {/* donut */}
//             <DonutChart stats={stats} loading={statsLoading} />

//             {/* legend */}
//             <div className="flex-1 w-full space-y-5">
//               {segments.map((seg) => {
//                 const pct =
//                   total > 0 ? Math.round((seg.value / total) * 100) : 0;
//                 return (
//                   <div key={seg.label} className="group">
//                     <div className="flex justify-between items-center mb-2">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-lg transition-transform duration-200 group-hover:scale-110"
//                           style={{
//                             background: `${seg.color}18`,
//                             border: `1px solid ${seg.color}40`,
//                           }}
//                         >
//                           {seg.icon}
//                         </div>
//                         <span className="text-gray-300 font-medium text-sm">
//                           {seg.label}
//                         </span>
//                       </div>
//                       <div className="text-right flex items-baseline gap-1">
//                         <span className="text-white font-bold text-xl">
//                           {statsLoading ? "—" : seg.value.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 text-xs font-mono">
//                           {statsLoading ? "" : `(${pct}%)`}
//                         </span>
//                       </div>
//                     </div>

//                     {/* progress bar */}
//                     <div className="h-2 rounded-full bg-[#0a0c12] border border-[#1e2130] overflow-hidden">
//                       {statsLoading ? (
//                         <div className="h-full w-1/3 bg-[#1e2130] animate-pulse rounded-full" />
//                       ) : (
//                         <div
//                           className="h-full rounded-full transition-[width] duration-1000 ease-out"
//                           style={{
//                             width: `${pct}%`,
//                             background: `linear-gradient(90deg, ${seg.color}88, ${seg.color})`,
//                             boxShadow: `0 0 10px ${seg.color}60`,
//                           }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* footer total */}
//               <div className="pt-5 border-t border-[#1e2130] flex justify-between items-center">
//                 <span className="text-xs text-gray-500 flex items-center gap-2">
//                   <span
//                     className="inline-block w-2 h-2 rounded-full"
//                     style={{
//                       background: "linear-gradient(135deg, #3b82f6, #a855f7)",
//                     }}
//                   />
//                   total tracked inventory
//                 </span>
//                 <span className="text-2xl font-bold text-white">
//                   {statsLoading ? "—" : total.toLocaleString()}
//                   <span className="text-gray-500 text-sm font-normal ml-1.5">
//                     items
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes wave {
//           0%,100% { transform: rotate(0deg); }
//           25%     { transform: rotate(15deg); }
//           75%     { transform: rotate(-10deg); }
//         }
//         @keyframes tooltip-in {
//           from { opacity: 0; transform: translate(-50%, 4px); }
//           to   { opacity: 1; transform: translate(-50%, 0); }
//         }
//         .animate-fade-in       { animation: fade-in 0.4s ease-out forwards; }
//         .animate-wave          { display: inline-block; animation: wave 1.4s ease-in-out infinite; transform-origin: 70% 70%; }
//         .animate-tooltip-in    { animation: tooltip-in 0.15s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// }

// export default Dashboard_page;

// v3

// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import { getDashboardStats } from "../features/dashboard/dashboardSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import { GiHand } from "react-icons/gi";

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// function StatCard({ icon, label, value, sub, loading, color }) {
//   return (
//     <div
//       className="group relative overflow-hidden bg-[#0f1117] border border-[#1e2130] rounded-2xl p-5 flex flex-col gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2a2d3a]"
//       style={{ boxShadow: `inset 0 0 30px ${color}08` }}
//     >
//       {/* top-right glow orb */}
//       <div
//         className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
//         style={{ background: color }}
//       />
//       <p className="text-[11px] text-gray-500 flex items-center gap-2 uppercase tracking-widest font-medium">
//         <span
//           className="text-base"
//           style={{ color, filter: `drop-shadow(0 0 4px ${color})` }}
//         >
//           {icon}
//         </span>
//         {label}
//       </p>

//       {loading ? (
//         <div className="h-10 w-24 rounded-lg bg-[#1a1d2a] animate-pulse mt-1" />
//       ) : (
//         <p className="text-4xl font-bold text-white tracking-tight leading-none mt-1">
//           {(value ?? 0).toLocaleString()}
//         </p>
//       )}

//       <p className="text-[11px] text-gray-600 mt-0.5 font-medium">{sub}</p>

//       {/* bottom accent line */}
//       <div
//         className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
//         style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
//       />
//     </div>
//   );
// }

// // ── Donut Chart ───────────────────────────────────────────────────────────────
// const SEGMENTS_META = [
//   { label: "Platform Tools", key: "platform", color: "#3b82f6", icon: "🧩" },
//   { label: "Custom Tools", key: "custom", color: "#a855f7", icon: "🔗" },
//   { label: "Folders", key: "folders", color: "#10b981", icon: "📁" },
// ];

// function DonutChart({ stats, loading }) {
//   const canvasRef = useRef(null);
//   const rafRef = useRef(null);
//   const progressRef = useRef(0);
//   const [tooltip, setTooltip] = useState(null);

//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] || 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   const draw = (progress) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     const dpr = window.devicePixelRatio || 1;
//     const SIZE = 240;
//     canvas.width = SIZE * dpr;
//     canvas.height = SIZE * dpr;
//     canvas.style.width = SIZE + "px";
//     canvas.style.height = SIZE + "px";
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     const cx = SIZE / 2, cy = SIZE / 2;
//     const OR = 94, IR = 58, GAP = 0.032;

//     ctx.clearRect(0, 0, SIZE, SIZE);

//     if (total === 0) {
//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, 0, Math.PI * 2);
//       ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
//       ctx.fillStyle = "#1a1d2a";
//       ctx.fill();
//       ctx.fillStyle = "#4b5563";
//       ctx.font = "13px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("No data yet", cx, cy);
//       return;
//     }

//     let angle = -Math.PI / 2;
//     segments.forEach((seg) => {
//       if (seg.value === 0) return;
//       const full = (seg.value / total) * Math.PI * 2;
//       const slice = Math.max(0, full * progress - GAP);
//       if (slice <= 0) return;

//       const g = ctx.createLinearGradient(cx - OR, cy - OR, cx + OR, cy + OR);
//       g.addColorStop(0, seg.color + "cc");
//       g.addColorStop(1, seg.color);

//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, angle + GAP / 2, angle + slice + GAP / 2);
//       ctx.arc(cx, cy, IR, angle + slice + GAP / 2, angle + GAP / 2, true);
//       ctx.closePath();
//       ctx.shadowColor = seg.color;
//       ctx.shadowBlur = 14;
//       ctx.fillStyle = g;
//       ctx.fill();
//       ctx.shadowBlur = 0;

//       angle += full;
//     });

//     [OR + 7, IR - 8].forEach((r) => {
//       ctx.beginPath();
//       ctx.arc(cx, cy, r, 0, Math.PI * 2);
//       ctx.strokeStyle = "#1e2130";
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     });

//     ctx.beginPath();
//     ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
//     ctx.fillStyle = "#0a0c12";
//     ctx.fill();

//     const displayed = Math.floor(total * progress);
//     ctx.fillStyle = "#ffffff";
//     ctx.font = "bold 30px Inter, sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
//     ctx.fillStyle = "#6b7280";
//     ctx.font = "500 11px Inter, sans-serif";
//     ctx.fillText("Total Items", cx, cy + 13);
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     progressRef.current = 0;
//     const start = performance.now();
//     const duration = 1100;
//     const tick = (now) => {
//       const t = Math.min(1, (now - start) / duration);
//       const p = 1 - Math.pow(1 - t, 3);
//       progressRef.current = p;
//       draw(p);
//       if (t < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
//   }, [stats?.platform, stats?.custom, stats?.folders, loading]);

//   const getHoveredSegment = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas || progressRef.current < 0.98) return null;
//     const rect = canvas.getBoundingClientRect();
//     const SIZE = 240;
//     const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
//     const my = ((e.clientY - rect.top) / rect.height) * SIZE;
//     const cx = SIZE / 2, cy = SIZE / 2;
//     const dx = mx - cx, dy = my - cy;
//     const dist = Math.sqrt(dx * dx + dy * dy);
//     if (dist > 100 || dist < 52) return null;

//     let ang = Math.atan2(dy, dx);
//     if (ang < -Math.PI / 2) ang += Math.PI * 2;

//     let start = -Math.PI / 2;
//     for (const seg of segments) {
//       if (seg.value === 0) continue;
//       const slice = (seg.value / total) * Math.PI * 2;
//       if (ang >= start && ang < start + slice) return seg;
//       start += slice;
//     }
//     return null;
//   };

//   const handleMouseMove = (e) => {
//     const seg = getHoveredSegment(e);
//     if (seg) {
//       const pct = Math.round((seg.value / total) * 100);
//       setTooltip({ ...seg, pct });
//     } else {
//       setTooltip(null);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       {loading ? (
//         <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1a1d2a] to-[#0f1117] animate-pulse" />
//       ) : (
//         <canvas
//           ref={canvasRef}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => setTooltip(null)}
//           className="cursor-crosshair"
//           style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))" }}
//         />
//       )}

//       {tooltip && (
//         <div
//           className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none
//                      bg-[#12141c]/95 backdrop-blur-md border border-[#2a2d3a] rounded-2xl
//                      px-4 py-2 text-sm font-semibold text-white shadow-2xl whitespace-nowrap
//                      animate-tooltip-in"
//           style={{ boxShadow: `0 0 20px ${tooltip.color}40` }}
//         >
//           <span className="mr-1.5">{tooltip.icon}</span>
//           {tooltip.label}
//           <span className="ml-2 font-bold" style={{ color: tooltip.color }}>
//             {tooltip.value}
//           </span>
//           <span className="ml-1 text-gray-400 font-normal text-xs">
//             ({tooltip.pct}%)
//           </span>
//         </div>
//       )}

//       <p className="text-[11px] text-gray-600 mt-4 tracking-wide">
//         hover segments for details
//       </p>
//     </div>
//   );
// }

// // ── Dashboard Page ────────────────────────────────────────────────────────────
// function Dashboard_page() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((s) => s.auth);
//   const { tools, loading: toolsLoading } = useSelector((s) => s.tools);
//   const { stats, loading: statsLoading } = useSelector((s) => s.dashboard);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [hasSearched, setHasSearched] = useState(false);
//   const [greeting, setGreeting] = useState("");

//   // ref for click-outside to close dropdown
//   const searchRef = useRef(null);

//   useEffect(() => {
//     dispatch(getDashboardStats());
//     const h = new Date().getHours();
//     setGreeting(
//       h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"
//     );
//   }, [dispatch]);

//   // debounced search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setHasSearched(false);
//       return;
//     }
//     const t = setTimeout(() => {
//       dispatch(getTools({ search: searchTerm, page: 1 }));
//       setHasSearched(true);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [searchTerm, dispatch]);

//   // close dropdown on outside click
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setSearchTerm("");
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const segments = SEGMENTS_META.map((m) => ({
//     ...m,
//     value: stats?.[m.key] ?? 0,
//   }));
//   const total = segments.reduce((s, d) => s + d.value, 0);

//   return (
//     <div className="h-[90vh] overflow-y-scroll p-5">
//       <div className="mx-auto space-y-8">

//         {/* ── Header ── */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <p className="text-gray-500 text-sm mt-1.5 flex items-center gap-2">
//               {greeting},
//               <span className="text-white font-semibold">{user?.name}</span>
//               <span className="inline-block animate-wave">
//                 <GiHand />
//               </span>
//             </p>
//           </div>

//           {/* ── Search with Google-style dropdown ── */}
//           <div ref={searchRef} className="relative w-full sm:max-w-4xl">

//             {/* Glow ring on focus */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 focus-within:opacity-100 transition-opacity duration-300" />

//             {/* Input */}
//             <input
//               type="text"
//               placeholder="Search for tools (e.g., Gemini, ChatGPT, Cursor)..."
//               className="relative w-full bg-[#0f1117] border border-[#1e2130] py-4 pl-12 pr-12 rounded-2xl text-white placeholder:text-gray-600 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all duration-300"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* Left icon */}
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">
//               {toolsLoading ? (
//                 <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               )}
//             </div>

//             {/* Clear button */}
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white bg-[#1a1d2a] hover:bg-[#2a2d3a] rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all z-10"
//               >
//                   clear
//               </button>

//             )}

//             {/* ── Google-style Dropdown Panel ── */}
//             {searchTerm && (
//               <div className="absolute top-full left-0 right-0 mt-2 z-50
//                 bg-[#0f1117] border border-[#1e2130] rounded-2xl
//                 shadow-2xl shadow-black/70
//                 overflow-hidden animate-dropdown-in">

//                 {/* Dropdown header */}
//                 <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2130]">
//                   <div className="flex items-center gap-2">
//                     <div className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
//                     <p className="text-xs text-gray-400 font-medium">
//                       Results for{" "}
//                       <span className="text-blue-400 font-semibold">"{searchTerm}"</span>
//                     </p>
//                   </div>
//                   {!toolsLoading && hasSearched && (
//                     <span className="text-[10px] text-gray-600 font-mono">
//                       {tools?.length ?? 0} found
//                     </span>
//                   )}
//                 </div>

//                 {/* Loading state */}
//                 {toolsLoading && (
//                   <div className="flex items-center justify-center gap-3 py-10 text-gray-500">
//                     <svg className="h-5 w-5 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                     </svg>
//                     <span className="text-sm text-gray-400">Searching tools...</span>
//                   </div>
//                 )}

//                 {/* Results */}
//                 {!toolsLoading && hasSearched && tools?.length > 0 && (
//                   <div className="max-h-[800px] overflow-y-auto p-3
//                     [&::-webkit-scrollbar]:w-1.5
//                     [&::-webkit-scrollbar-track]:bg-transparent
//                     [&::-webkit-scrollbar-thumb]:bg-[#2a2d3a]
//                     [&::-webkit-scrollbar-thumb]:rounded-full">
//                     <ToolCardList tools={tools} mode="public" loading={false} />
//                   </div>
//                 )}

//                 {/* Empty state */}
//                 {!toolsLoading && hasSearched && (!tools || tools.length === 0) && (
//                   <div className="flex flex-col items-center justify-center py-10 px-4 gap-3">
//                     <div className="w-15 h-15 rounded-2xl bg-[#1a1d2a] border border-[#2a2d3a] flex items-center justify-center text-2xl">
//                       🔍
//                     </div>
//                     <div className="text-center">
//                       <p className="text-sm font-medium text-gray-300">No tools found</p>
//                       <p className="text-xs text-gray-600 mt-1">
//                         Try a different keyword
//                       </p>
//                     </div>
//                   </div>
//                 )}

//               </div>
//             )}
//           </div>

//           {/* Live badge */}
//           <div className="flex items-center gap-2 text-xs bg-[#0f1117] border border-[#1e2130] rounded-full px-4 py-2 self-start sm:self-auto flex-shrink-0">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-gray-300 font-medium">Live</span>
//             <span className="text-[#2a2d3a]">|</span>
//             <span className="text-gray-500">
//               {new Date().toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </span>
//           </div>
//         </div>

//         {/* ── Stat Cards ── */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//           <StatCard icon="🎯" label="total saved" value={stats?.total} sub="all tools in library" loading={statsLoading} color="#f59e0b" />
//           <StatCard icon="🧩" label="platform tools" value={stats?.platform} sub="from official directory" loading={statsLoading} color="#3b82f6" />
//           <StatCard icon="⚡" label="custom tools" value={stats?.custom} sub="created by you" loading={statsLoading} color="#a855f7" />
//           <StatCard icon="📂" label="folders" value={stats?.folders} sub="smart collections" loading={statsLoading} color="#10b981" />
//         </div>

//         {/* ── Analytics Card ── */}
//         <div className="bg-[#0f1117] border border-[#1e2130] rounded-2xl p-6 md:p-8">
//           <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
//             <div>
//               <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                 <span>📊</span> Library Analytics
//               </h2>
//               <p className="text-gray-600 text-xs mt-1">breakdown of your saved ecosystem</p>
//             </div>
//             <div className="flex items-center gap-1.5 text-[11px] bg-[#0a0c12] border border-[#1e2130] px-3 py-1.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//               <span className="text-gray-400 font-medium">live sync</span>
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
//             <DonutChart stats={stats} loading={statsLoading} />

//             <div className="flex-1 w-full space-y-5">
//               {segments.map((seg) => {
//                 const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
//                 return (
//                   <div key={seg.label} className="group">
//                     <div className="flex justify-between items-center mb-2">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-lg transition-transform duration-200 group-hover:scale-110"
//                           style={{ background: `${seg.color}18`, border: `1px solid ${seg.color}40` }}
//                         >
//                           {seg.icon}
//                         </div>
//                         <span className="text-gray-300 font-medium text-sm">{seg.label}</span>
//                       </div>
//                       <div className="text-right flex items-baseline gap-1">
//                         <span className="text-white font-bold text-xl">
//                           {statsLoading ? "—" : seg.value.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 text-xs font-mono">
//                           {statsLoading ? "" : `(${pct}%)`}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="h-2 rounded-full bg-[#0a0c12] border border-[#1e2130] overflow-hidden">
//                       {statsLoading ? (
//                         <div className="h-full w-1/3 bg-[#1e2130] animate-pulse rounded-full" />
//                       ) : (
//                         <div
//                           className="h-full rounded-full transition-[width] duration-1000 ease-out"
//                           style={{
//                             width: `${pct}%`,
//                             background: `linear-gradient(90deg, ${seg.color}88, ${seg.color})`,
//                             boxShadow: `0 0 10px ${seg.color}60`,
//                           }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="pt-5 border-t border-[#1e2130] flex justify-between items-center">
//                 <span className="text-xs text-gray-500 flex items-center gap-2">
//                   <span className="inline-block w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }} />
//                   total tracked inventory
//                 </span>
//                 <span className="text-2xl font-bold text-white">
//                   {statsLoading ? "—" : total.toLocaleString()}
//                   <span className="text-gray-500 text-sm font-normal ml-1.5">items</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>

//       <style>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes wave {
//           0%,100% { transform: rotate(0deg); }
//           25%     { transform: rotate(15deg); }
//           75%     { transform: rotate(-10deg); }
//         }
//         @keyframes tooltip-in {
//           from { opacity: 0; transform: translate(-50%, 4px); }
//           to   { opacity: 1; transform: translate(-50%, 0); }
//         }
//         @keyframes dropdown-in {
//           from { opacity: 0; transform: translateY(-8px) scaleY(0.97); }
//           to   { opacity: 1; transform: translateY(0) scaleY(1); }
//         }
//         .animate-fade-in       { animation: fade-in 0.4s ease-out forwards; }
//         .animate-wave          { display: inline-block; animation: wave 1.4s ease-in-out infinite; transform-origin: 70% 70%; }
//         .animate-tooltip-in    { animation: tooltip-in 0.15s ease-out forwards; }
//         .animate-dropdown-in   { animation: dropdown-in 0.18s ease-out forwards; transform-origin: top center; }
//       `}</style>
//     </div>
//   );
// }

// export default Dashboard_page;

// // v4
// import { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getTools } from "../features/tools/toolSlice";
// import { getDashboardStats } from "../features/dashboard/dashboardSlice";
// import ToolCardList from "../components/reuseable_compo/ToolCardList";
// import { GiHand } from "react-icons/gi";
// // import RecentToolsDock from "../components/reuseable_compo/RecentToolsDock";

// // ── Stat Card ─────────────────────────────────────────────────────────────────
// function StatCard({ icon, label, value, sub, loading, color }) {
//   return (
//     <div
//       className="group relative overflow-hidden bg-[#0f1117] border border-[#1e2130] rounded-2xl p-5 flex flex-col gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#2a2d3a]"
//       style={{ boxShadow: `inset 0 0 30px ${color}08` }}
//     >
//       <div
//         className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
//         style={{ background: color }}
//       />
//       <p className="text-[11px] text-gray-500 flex items-center gap-2 uppercase tracking-widest font-medium">
//         <span className="text-base" style={{ color, filter: `drop-shadow(0 0 4px ${color})` }}>
//           {icon}
//         </span>
//         {label}
//       </p>
//       {loading ? (
//         <div className="h-10 w-24 rounded-lg bg-[#1a1d2a] animate-pulse mt-1" />
//       ) : (
//         <p className="text-4xl font-bold text-white tracking-tight leading-none mt-1">
//           {(value ?? 0).toLocaleString()}
//         </p>
//       )}
//       <p className="text-[11px] text-gray-600 mt-0.5 font-medium">{sub}</p>
//       <div
//         className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
//         style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
//       />
//     </div>
//   );
// }

// // ── Donut Chart ───────────────────────────────────────────────────────────────
// const SEGMENTS_META = [
//   { label: "Platform Tools", key: "platform", color: "#3b82f6", icon: "🧩" },
//   { label: "Custom Tools",   key: "custom",   color: "#a855f7", icon: "🔗" },
//   { label: "Folders",        key: "folders",  color: "#10b981", icon: "📁" },
// ];

// function DonutChart({ stats, loading }) {
//   const canvasRef   = useRef(null);
//   const rafRef      = useRef(null);
//   const progressRef = useRef(0);
//   const [tooltip, setTooltip] = useState(null);

//   const segments = SEGMENTS_META.map((m) => ({ ...m, value: stats?.[m.key] || 0 }));
//   const total    = segments.reduce((s, d) => s + d.value, 0);

//   const draw = (progress) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx  = canvas.getContext("2d");
//     const dpr  = window.devicePixelRatio || 1;
//     const SIZE = 240;
//     canvas.width        = SIZE * dpr;
//     canvas.height       = SIZE * dpr;
//     canvas.style.width  = SIZE + "px";
//     canvas.style.height = SIZE + "px";
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     const cx = SIZE / 2, cy = SIZE / 2;
//     const OR = 94, IR = 58, GAP = 0.032;
//     ctx.clearRect(0, 0, SIZE, SIZE);

//     if (total === 0) {
//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, 0, Math.PI * 2);
//       ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
//       ctx.fillStyle = "#1a1d2a";
//       ctx.fill();
//       ctx.fillStyle = "#4b5563";
//       ctx.font = "13px Inter, sans-serif";
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";
//       ctx.fillText("No data yet", cx, cy);
//       return;
//     }

//     let angle = -Math.PI / 2;
//     segments.forEach((seg) => {
//       if (seg.value === 0) return;
//       const full  = (seg.value / total) * Math.PI * 2;
//       const slice = Math.max(0, full * progress - GAP);
//       if (slice <= 0) return;
//       const g = ctx.createLinearGradient(cx - OR, cy - OR, cx + OR, cy + OR);
//       g.addColorStop(0, seg.color + "cc");
//       g.addColorStop(1, seg.color);
//       ctx.beginPath();
//       ctx.arc(cx, cy, OR, angle + GAP / 2, angle + slice + GAP / 2);
//       ctx.arc(cx, cy, IR, angle + slice + GAP / 2, angle + GAP / 2, true);
//       ctx.closePath();
//       ctx.shadowColor = seg.color;
//       ctx.shadowBlur  = 14;
//       ctx.fillStyle   = g;
//       ctx.fill();
//       ctx.shadowBlur  = 0;
//       angle += full;
//     });

//     [OR + 7, IR - 8].forEach((r) => {
//       ctx.beginPath();
//       ctx.arc(cx, cy, r, 0, Math.PI * 2);
//       ctx.strokeStyle = "#1e2130";
//       ctx.lineWidth   = 1;
//       ctx.stroke();
//     });

//     ctx.beginPath();
//     ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
//     ctx.fillStyle = "#0a0c12";
//     ctx.fill();

//     const displayed = Math.floor(total * progress);
//     ctx.fillStyle = "#ffffff";
//     ctx.font      = "bold 30px Inter, sans-serif";
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
//     ctx.fillStyle = "#6b7280";
//     ctx.font      = "500 11px Inter, sans-serif";
//     ctx.fillText("Total Items", cx, cy + 13);
//   };

//   useEffect(() => {
//     if (loading) return;
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     progressRef.current = 0;
//     const start    = performance.now();
//     const duration = 1100;
//     const tick = (now) => {
//       const t = Math.min(1, (now - start) / duration);
//       const p = 1 - Math.pow(1 - t, 3);
//       progressRef.current = p;
//       draw(p);
//       if (t < 1) rafRef.current = requestAnimationFrame(tick);
//     };
//     rafRef.current = requestAnimationFrame(tick);
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
//   }, [stats?.platform, stats?.custom, stats?.folders, loading]);

//   const getHoveredSegment = (e) => {
//     const canvas = canvasRef.current;
//     if (!canvas || progressRef.current < 0.98) return null;
//     const rect = canvas.getBoundingClientRect();
//     const SIZE = 240;
//     const mx   = ((e.clientX - rect.left) / rect.width)  * SIZE;
//     const my   = ((e.clientY - rect.top)  / rect.height) * SIZE;
//     const cx   = SIZE / 2, cy = SIZE / 2;
//     const dx   = mx - cx,  dy = my - cy;
//     const dist = Math.sqrt(dx * dx + dy * dy);
//     if (dist > 100 || dist < 52) return null;
//     let ang = Math.atan2(dy, dx);
//     if (ang < -Math.PI / 2) ang += Math.PI * 2;
//     let start = -Math.PI / 2;
//     for (const seg of segments) {
//       if (seg.value === 0) continue;
//       const slice = (seg.value / total) * Math.PI * 2;
//       if (ang >= start && ang < start + slice) return seg;
//       start += slice;
//     }
//     return null;
//   };

//   const handleMouseMove = (e) => {
//     const seg = getHoveredSegment(e);
//     if (seg) setTooltip({ ...seg, pct: Math.round((seg.value / total) * 100) });
//     else     setTooltip(null);
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       {loading ? (
//         <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1a1d2a] to-[#0f1117] animate-pulse" />
//       ) : (
//         <canvas
//           ref={canvasRef}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => setTooltip(null)}
//           className="cursor-crosshair"
//           style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))" }}
//         />
//       )}
//       {tooltip && (
//         <div
//           className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none
//                      bg-[#12141c]/95 backdrop-blur-md border border-[#2a2d3a] rounded-2xl
//                      px-4 py-2 text-sm font-semibold text-white shadow-2xl whitespace-nowrap animate-tooltip-in"
//           style={{ boxShadow: `0 0 20px ${tooltip.color}40` }}
//         >
//           <span className="mr-1.5">{tooltip.icon}</span>
//           {tooltip.label}
//           <span className="ml-2 font-bold" style={{ color: tooltip.color }}>{tooltip.value}</span>
//           <span className="ml-1 text-gray-400 font-normal text-xs">({tooltip.pct}%)</span>
//         </div>
//       )}
//       <p className="text-[11px] text-gray-600 mt-4 tracking-wide">hover segments for details</p>
//     </div>
//   );
// }

// // ── Full-screen Search Overlay ────────────────────────────────────────────────
// function SearchOverlay({ searchTerm, setSearchTerm, tools, toolsLoading, hasSearched, onClose, onRefreshStats }) {
//   const inputRef = useRef(null);

//   // auto-focus input when overlay opens
//   useEffect(() => {
//     setTimeout(() => inputRef.current?.focus(), 80);
//   }, []);

//   // close on Escape
//   useEffect(() => {
//     const handler = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", handler);
//     return () => window.removeEventListener("keydown", handler);
//   }, [onClose]);

//   return (
//     <div className="fixed inset-0 z-[100] flex flex-col items-center animate-overlay-in">

//       {/* Blurred backdrop */}
//       <div
//         className="absolute inset-0 bg-black/70 backdrop-blur-xl"
//         onClick={onClose}
//       />

//       {/* Panel */}
//       <div className="relative z-10 w-full max-w-3xl mx-auto mt-[8vh] px-4 flex flex-col gap-0 animate-panel-in">

//         {/* Search input row */}
//         <div className="relative">
//           {/* glow ring */}
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-md" />

//           <div className="relative flex items-center bg-[#0d0f18] border border-blue-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10">
//             {/* search icon / spinner */}
//             <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
//               {toolsLoading ? (
//                 <svg className="h-5 w-5 animate-spin text-blue-400" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//                 </svg>
//               ) : (
//                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               )}
//             </div>

//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search tools — Gemini, ChatGPT, Cursor..."
//               className="flex-1 bg-transparent py-4 pr-4 text-white placeholder:text-gray-600 outline-none text-base"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             {/* clear */}
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="mr-3 w-7 h-7 flex items-center justify-center rounded-full bg-[#1a1d2a] hover:bg-[#2a2d3a] text-gray-400 hover:text-white transition-all text-xs flex-shrink-0"
//               >
//                 ✕
//               </button>
//             )}

//             {/* close overlay */}
//             <button
//               onClick={onClose}
//               className="mr-4 text-[10px] text-gray-600 hover:text-gray-300 border border-[#2a2d3a] rounded-lg px-2 py-1 transition-all flex-shrink-0 hidden sm:block"
//             >
//               ESC
//             </button>
//           </div>
//         </div>

//         {/* Results box — like an alert/modal panel */}
//         <div className="mt-3 bg-[#0d0f18]/95 border border-[#1e2130] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden">

//           {/* Results header */}
//           {(hasSearched || toolsLoading) && (
//             <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2130]">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
//                 <span className="text-sm text-gray-400 font-medium">
//                   {toolsLoading
//                     ? "Searching…"
//                     : <>Results for <span className="text-blue-400 font-semibold">"{searchTerm}"</span></>
//                   }
//                 </span>
//               </div>
//               {!toolsLoading && hasSearched && (
//                 <span className="text-[11px] font-mono text-gray-600 bg-[#1a1d2a] px-2 py-0.5 rounded-full">
//                   {tools?.length ?? 0} found
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Loading */}
//           {toolsLoading && (
//             <div className="flex items-center justify-center gap-3 py-14">
//               <svg className="h-6 w-6 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
//               </svg>
//               <span className="text-gray-400 text-sm">Searching tools...</span>
//             </div>
//           )}

//           {/* Results list */}
//           {!toolsLoading && hasSearched && tools?.length > 0 && (
//             <div
//               className="overflow-y-auto p-4"
//               style={{ maxHeight: "55vh" }}
//             >
//               {/* pass onRefreshStats so ToolCardList can trigger a refresh after save/remove */}
//               <ToolCardList
//                 tools={tools}
//                 mode="public"
//                 loading={false}
//                 onSaveToggle={onRefreshStats}
//               />
//             </div>
//           )}

//           {/* Empty state */}
//           {!toolsLoading && hasSearched && (!tools || tools.length === 0) && (
//             <div className="flex flex-col items-center justify-center py-14 gap-4">
//               <div className="w-14 h-14 rounded-2xl bg-[#1a1d2a] border border-[#2a2d3a] flex items-center justify-center text-3xl">
//                 🔍
//               </div>
//               <div className="text-center">
//                 <p className="text-sm font-semibold text-gray-300">No tools found</p>
//                 <p className="text-xs text-gray-600 mt-1">Try a different keyword</p>
//               </div>
//             </div>
//           )}

//           {/* Idle state — nothing typed yet */}
//           {!toolsLoading && !hasSearched && !searchTerm && (
//             <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-700">
//               <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <p className="text-sm text-gray-500 font-medium">Start typing to search your library</p>
//             </div>
//           )}

//           {/* footer hint */}
//           <div className="px-5 py-2.5 border-t border-[#1e2130] flex items-center gap-4 text-[11px] text-gray-700">
//             <span><kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">↑↓</kbd> navigate</span>
//             <span><kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">Esc</kbd> close</span>
//             <span className="ml-auto flex items-center gap-1.5">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               live search
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Dashboard Page ────────────────────────────────────────────────────────────
// function Dashboard_page() {
//   const dispatch = useDispatch();
//   const { user }                            = useSelector((s) => s.auth);
//   const { tools, loading: toolsLoading }    = useSelector((s) => s.tools);
//   const { stats, loading: statsLoading }    = useSelector((s) => s.dashboard);

//   const [searchTerm,   setSearchTerm]   = useState("");
//   const [hasSearched,  setHasSearched]  = useState(false);
//   const [searchOpen,   setSearchOpen]   = useState(false);
//   const [greeting,     setGreeting]     = useState("");

//   // ── fix: refresh stats whenever tools change (save / remove) ──────────────
//   const refreshStats = () => dispatch(getDashboardStats());

//   useEffect(() => {
//     dispatch(getDashboardStats());
//     const h = new Date().getHours();
//     setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
//   }, [dispatch]);

//   // debounced search
//   useEffect(() => {
//     if (!searchTerm.trim()) { setHasSearched(false); return; }
//     const t = setTimeout(() => {
//       dispatch(getTools({ search: searchTerm, page: 1 }));
//       setHasSearched(true);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [searchTerm, dispatch]);

//   // open overlay when user starts typing in the trigger bar
//   const handleTriggerChange = (e) => {
//     setSearchTerm(e.target.value);
//     if (e.target.value) setSearchOpen(true);
//   };

//   const closeSearch = () => {
//     setSearchOpen(false);
//     setSearchTerm("");
//     setHasSearched(false);
//     refreshStats(); // re-fetch stats when closing in case something was saved/removed
//   };

//   const segments = SEGMENTS_META.map((m) => ({ ...m, value: stats?.[m.key] ?? 0 }));
//   const total    = segments.reduce((s, d) => s + d.value, 0);

//   return (
//     <div className="h-[90vh] overflow-y-scroll p-5">
//       <div className="mx-auto space-y-8">

//         {/* ── Header ── */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <p className="text-gray-500 text-sm mt-1.5 flex items-center gap-2">
//               {greeting},
//               <span className="text-white font-semibold">{user?.name}</span>
//               <span className="inline-block animate-wave"><GiHand /></span>
//             </p>
//           </div>

//           {/* ── Search trigger bar (not the overlay) ── */}
//           <div
//             className="relative w-full sm:max-w-xl cursor-text"
//             onClick={() => setSearchOpen(true)}
//           >
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
//             <div className="relative flex items-center bg-[#0f1117] border border-[#1e2130] hover:border-blue-500/40 rounded-2xl transition-all duration-200 px-4 py-3.5 gap-3">
//               <svg className="h-5 w-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//               <span className="text-gray-600 text-sm select-none">
//                 {searchTerm || "Search for tools (e.g., Gemini, ChatGPT, Cursor)..."}
//               </span>
//               <span className="ml-auto hidden sm:flex items-center gap-1 text-[11px] text-gray-700 bg-[#1a1d2a] border border-[#2a2d3a] rounded-lg px-2 py-0.5 flex-shrink-0">
//                 ⌘K
//               </span>
//             </div>
//           </div>

//           {/* Live badge */}
//           <div className="flex items-center gap-2 text-xs bg-[#0f1117] border border-[#1e2130] rounded-full px-4 py-2 self-start sm:self-auto flex-shrink-0">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             <span className="text-gray-300 font-medium">Live</span>
//             <span className="text-[#2a2d3a]">|</span>
//             <span className="text-gray-500">
//               {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
//             </span>
//           </div>
//         </div>

//         {/* ── Stat Cards ── */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
//           <StatCard icon="🎯" label="total saved"    value={stats?.total}    sub="all tools in library"     loading={statsLoading} color="#f59e0b" />
//           <StatCard icon="🧩" label="platform tools" value={stats?.platform} sub="from official directory"  loading={statsLoading} color="#3b82f6" />
//           <StatCard icon="⚡" label="custom tools"   value={stats?.custom}   sub="created by you"           loading={statsLoading} color="#a855f7" />
//           <StatCard icon="📂" label="folders"        value={stats?.folders}  sub="smart collections"        loading={statsLoading} color="#10b981" />
//         </div>

//         {/* ── Analytics Card ── */}
//         <div className="bg-[#0f1117] border border-[#1e2130] rounded-2xl p-6 md:p-8">
//           <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
//             <div>
//               <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                 <span>📊</span> Library Analytics
//               </h2>
//               <p className="text-gray-600 text-xs mt-1">breakdown of your saved ecosystem</p>
//             </div>
//             <div className="flex items-center gap-1.5 text-[11px] bg-[#0a0c12] border border-[#1e2130] px-3 py-1.5 rounded-full">
//               <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//               <span className="text-gray-400 font-medium">live sync</span>
//             </div>
//           </div>

//           <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
//             <DonutChart stats={stats} loading={statsLoading} />

//             <div className="flex-1 w-full space-y-5">
//               {segments.map((seg) => {
//                 const pct = total > 0 ? Math.round((seg.value / total) * 100) : 0;
//                 return (
//                   <div key={seg.label} className="group">
//                     <div className="flex justify-between items-center mb-2">
//                       <div className="flex items-center gap-3">
//                         <div
//                           className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-lg transition-transform duration-200 group-hover:scale-110"
//                           style={{ background: `${seg.color}18`, border: `1px solid ${seg.color}40` }}
//                         >
//                           {seg.icon}
//                         </div>
//                         <span className="text-gray-300 font-medium text-sm">{seg.label}</span>
//                       </div>
//                       <div className="text-right flex items-baseline gap-1">
//                         <span className="text-white font-bold text-xl">
//                           {statsLoading ? "—" : seg.value.toLocaleString()}
//                         </span>
//                         <span className="text-gray-500 text-xs font-mono">
//                           {statsLoading ? "" : `(${pct}%)`}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="h-2 rounded-full bg-[#0a0c12] border border-[#1e2130] overflow-hidden">
//                       {statsLoading ? (
//                         <div className="h-full w-1/3 bg-[#1e2130] animate-pulse rounded-full" />
//                       ) : (
//                         <div
//                           className="h-full rounded-full transition-[width] duration-1000 ease-out"
//                           style={{
//                             width: `${pct}%`,
//                             background: `linear-gradient(90deg, ${seg.color}88, ${seg.color})`,
//                             boxShadow: `0 0 10px ${seg.color}60`,
//                           }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}

//               <div className="pt-5 border-t border-[#1e2130] flex justify-between items-center">
//                 <span className="text-xs text-gray-500 flex items-center gap-2">
//                   <span className="inline-block w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #3b82f6, #a855f7)" }} />
//                   total tracked inventory
//                 </span>
//                 <span className="text-2xl font-bold text-white">
//                   {statsLoading ? "—" : total.toLocaleString()}
//                   <span className="text-gray-500 text-sm font-normal ml-1.5">items</span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//               {/* <RecentToolsDock /> */}
//       </div>

//       {/* ── Full-screen search overlay ── */}
//       {searchOpen && (
//         <SearchOverlay
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           tools={tools}
//           toolsLoading={toolsLoading}
//           hasSearched={hasSearched}
//           onClose={closeSearch}
//           onRefreshStats={refreshStats}
//         />
//       )}

//       <style>{`
//         @keyframes wave {
//           0%,100% { transform: rotate(0deg); }
//           25%      { transform: rotate(15deg); }
//           75%      { transform: rotate(-10deg); }
//         }
//         @keyframes tooltip-in {
//           from { opacity: 0; transform: translate(-50%, 4px); }
//           to   { opacity: 1; transform: translate(-50%, 0); }
//         }
//         @keyframes overlay-in {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes panel-in {
//           from { opacity: 0; transform: translateY(-16px) scale(0.98); }
//           to   { opacity: 1; transform: translateY(0)     scale(1); }
//         }
//         .animate-wave        { display: inline-block; animation: wave 1.4s ease-in-out infinite; transform-origin: 70% 70%; }
//         .animate-tooltip-in  { animation: tooltip-in  0.15s ease-out forwards; }
//         .animate-overlay-in  { animation: overlay-in  0.2s  ease-out forwards; }
//         .animate-panel-in    { animation: panel-in    0.22s ease-out forwards; }
//       `}</style>
//     </div>
//   );
// }

// export default Dashboard_page;

// // v5
import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../features/tools/toolSlice";
import { getDashboardStats } from "../features/dashboard/dashboardSlice";
import ToolCardList from "../components/reuseable_compo/ToolCardList";
import { GiHand } from "react-icons/gi";
import { FaAnglesRight } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { TbBookmark, TbLayoutGrid, TbTool, TbFolder } from "react-icons/tb";
import { TbGraphFilled } from "react-icons/tb";

// ── Stat Card ─────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sub, loading }) {
  // A helper to safely stringify values for counting animations or text
  const formattedValue = useMemo(() => {
    return (value ?? 0).toLocaleString();
  }, [value]);

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/30 dark:hover:border-[#3981FA]/30 hover:-translate-y-1 select-none">
      {/* 1. Next-Gen Ambient Glow: Spreads outward from the icon row on hover */}
      <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

      {/* 2. Abstract Background Giant Icon Layer (The Unique Design element) */}
      <div className="absolute -right-4 -bottom-6 text-gray-100 dark:text-[#171a26] pointer-events-none transform scale-[2.2] origin-bottom-right opacity-35 dark:opacity-40 transition-all duration-500 group-hover:scale-[2.4] group-hover:text-[#3981FA]/10 group-hover:-rotate-12">
        <Icon strokeWidth={1} />
      </div>

      {/* Top Header Row (Icon + Label side by side) */}
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
            {label}
          </p>
          <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
            {sub}
          </p>
        </div>

        {/* Floating Neon Icon Frame */}
        <div className="w-10 h-10 rounded-xl bg-[#E6F1FB] dark:bg-[#3981FA]/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-[#3981FA] group-hover:text-white dark:group-hover:bg-[#3981FA] shadow-sm shadow-[#3981FA]/10">
          <Icon
            size={20}
            className="text-[#3981FA] transition-colors duration-300 group-hover:text-white"
          />
        </div>
      </div>

      {/* Bottom Main Value Row */}
      <div className="mt-5 relative z-10">
        {loading ? (
          <div className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-[#1a1d2a] animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white bg-gradient-to-br from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent group-hover:from-[#3981FA] group-hover:to-[#3981FA]/70 group-hover:text-[#296DE2] transition-all duration-300">
              {formattedValue}
            </h3>
            {/* Tiny accent decorator dot */}
            {/* <span className="w-1.5 h-1.5 rounded-full bg-[#3981FA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
          </div>
        )}
      </div>

      {/* 3. Sleek Left Accent Line instead of basic full horizontal bottom bar */}
      <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 transform scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 rounded-l-2xl" />
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
// const SEGMENTS_META = [
//   { label: "Platform Tools", key: "platform", color: "#3b82f6", icon: "" },
//   { label: "Custom Tools", key: "custom", color: "#a855f7", icon: " " },
//   { label: "Folders", key: "folders", color: "#10b981", icon: "" },
// ];

const SEGMENTS_META = [
  {
    label: "Platform Tools",
    key: "platform",
    color: "#3b82f6",
    icon: <TbLayoutGrid />,
  },

  {
    label: "Custom Tools",
    key: "custom",
    color: "#a855f7",
    icon: <TbTool />,
  },

  {
    label: "Folders",
    key: "folders",
    color: "#10b981",
    icon: <TbFolder />,
  },
];

function DonutChart({ stats, loading }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(0);
  // const [tooltip, setTooltip] = useState(null);
  const [hovered, setHovered] = useState(null);

  const segments = SEGMENTS_META.map((m) => ({
    ...m,
    value: stats?.[m.key] || 0,
  }));
  const total = segments.reduce((s, d) => s + d.value, 0);

  // const draw = (progress) => {

  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d");
  //   const dpr = window.devicePixelRatio || 1;
  //   const SIZE = 240;
  //   canvas.width = SIZE * dpr;
  //   canvas.height = SIZE * dpr;
  //   canvas.style.width = SIZE + "px";
  //   canvas.style.height = SIZE + "px";
  //   ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  //   const cx = SIZE / 2,
  //     cy = SIZE / 2;
  //   const OR = 94,
  //     IR = 58,
  //     GAP = 0.032;
  //   ctx.clearRect(0, 0, SIZE, SIZE);

  //   if (total === 0) {
  //     ctx.beginPath();
  //     ctx.arc(cx, cy, OR, 0, Math.PI * 2);
  //     ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);
  //     ctx.fillStyle = "#1a1d2a";
  //     ctx.fill();
  //     ctx.fillStyle = "#4b5563";
  //     ctx.font = "13px Inter, sans-serif";
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     ctx.fillText("No data yet", cx, cy);
  //     return;
  //   }

  //   let angle = -Math.PI / 2;
  //   segments.forEach((seg) => {
  //     if (seg.value === 0) return;
  //     const full = (seg.value / total) * Math.PI * 2;
  //     const slice = Math.max(0, full * progress - GAP);
  //     if (slice <= 0) return;
  //     const g = ctx.createLinearGradient(cx - OR, cy - OR, cx + OR, cy + OR);
  //     g.addColorStop(0, seg.color + "cc");
  //     g.addColorStop(1, seg.color);
  //     ctx.beginPath();
  //     ctx.arc(cx, cy, OR, angle + GAP / 2, angle + slice + GAP / 2);
  //     ctx.arc(cx, cy, IR, angle + slice + GAP / 2, angle + GAP / 2, true);
  //     ctx.closePath();
  //     ctx.shadowColor = seg.color;
  //     ctx.shadowBlur = 14;
  //     ctx.fillStyle = g;
  //     ctx.fill();
  //     ctx.shadowBlur = 0;
  //     angle += full;
  //   });

  //   [OR + 7, IR - 8].forEach((r) => {
  //     ctx.beginPath();
  //     ctx.arc(cx, cy, r, 0, Math.PI * 2);
  //     ctx.strokeStyle = "#1e2130";
  //     ctx.lineWidth = 1;
  //     ctx.stroke();
  //   });

  //   ctx.beginPath();
  //   ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);
  //   ctx.fillStyle = "#0a0c12";
  //   ctx.fill();

  //   const displayed = Math.floor(total * progress);
  //   ctx.fillStyle = "#ffffff";
  //   ctx.font = "bold 30px Inter, sans-serif";
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.fillText(displayed.toLocaleString(), cx, cy - 9);
  //   ctx.fillStyle = "#6b7280";
  //   ctx.font = "500 11px Inter, sans-serif";
  //   ctx.fillText("Total Items", cx, cy + 13);
  // };

  const draw = (progress, hoveredSeg = null) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    const SIZE = 240;

    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;

    canvas.style.width = SIZE + "px";
    canvas.style.height = SIZE + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = SIZE / 2;
    const cy = SIZE / 2;

    const OR = 94;
    const IR = 58;
    const GAP = 0.032;

    ctx.clearRect(0, 0, SIZE, SIZE);

    // EMPTY STATE
    if (total === 0) {
      ctx.beginPath();

      ctx.arc(cx, cy, OR, 0, Math.PI * 2);

      ctx.arc(cx, cy, IR, 0, Math.PI * 2, true);

      ctx.fillStyle = "#1a1d2a";

      ctx.fill();

      ctx.fillStyle = "#4b5563";

      ctx.font = "13px Inter, sans-serif";

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      ctx.fillText("No data yet", cx, cy);

      return;
    }

    // DRAW SEGMENTS
    let angle = -Math.PI / 2;

    segments.forEach((seg) => {
      if (seg.value === 0) return;

      const full = (seg.value / total) * Math.PI * 2;

      const slice = Math.max(0, full * progress - GAP);

      if (slice <= 0) return;

      // HOVER EFFECT
      const isHov = hoveredSeg?.label === seg.label;

      const outerR = isHov ? OR + 7 : OR;

      const innerR = isHov ? IR - 3 : IR;

      const g = ctx.createLinearGradient(
        cx - outerR,
        cy - outerR,
        cx + outerR,
        cy + outerR,
      );

      g.addColorStop(0, seg.color + "cc");

      g.addColorStop(1, seg.color);

      ctx.beginPath();

      ctx.arc(cx, cy, outerR, angle + GAP / 2, angle + slice + GAP / 2);

      ctx.arc(cx, cy, innerR, angle + slice + GAP / 2, angle + GAP / 2, true);

      ctx.closePath();

      ctx.shadowColor = seg.color;

      ctx.shadowBlur = isHov ? 22 : 14;

      ctx.fillStyle = g;

      ctx.fill();

      ctx.shadowBlur = 0;

      angle += full;
    });

    // OUTER RINGS
    [OR + 7, IR - 8].forEach((r) => {
      ctx.beginPath();

      ctx.arc(cx, cy, r, 0, Math.PI * 2);

      ctx.strokeStyle = "#1e2130";

      ctx.lineWidth = 1;

      ctx.stroke();
    });

    // CENTER CIRCLE
    ctx.beginPath();

    ctx.arc(cx, cy, IR - 1, 0, Math.PI * 2);

    ctx.fillStyle = "#0a0c12";

    ctx.fill();

    // HOVER CONTENT
    if (hoveredSeg) {
      ctx.fillStyle = hoveredSeg.color;

      ctx.font = "bold 26px Inter, sans-serif";

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      ctx.fillText(hoveredSeg.value.toLocaleString(), cx, cy - 10);

      ctx.fillStyle = "#9ca3af";

      ctx.font = "500 10px Inter, sans-serif";

      ctx.fillText(hoveredSeg.pct + "%", cx, cy + 8);

      ctx.fillStyle = "#6b7280";

      ctx.font = "500 9px Inter, sans-serif";

      const label =
        hoveredSeg.label.length > 12
          ? hoveredSeg.label.slice(0, 11) + "…"
          : hoveredSeg.label;

      ctx.fillText(label, cx, cy + 22);
    } else {
      // DEFAULT CENTER
      const displayed = Math.floor(total * progress);

      ctx.fillStyle = "#ffffff";

      ctx.font = "bold 30px Inter, sans-serif";

      ctx.textAlign = "center";

      ctx.textBaseline = "middle";

      ctx.fillText(displayed.toLocaleString(), cx, cy - 9);

      ctx.fillStyle = "#6b7280";

      ctx.font = "500 11px Inter, sans-serif";

      ctx.fillText("Total Items", cx, cy + 13);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    progressRef.current = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - Math.pow(1 - t, 3);
      progressRef.current = p;
      draw(p);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stats?.platform, stats?.custom, stats?.folders, loading]);

  const getHoveredSegment = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || progressRef.current < 0.98) return null;
    const rect = canvas.getBoundingClientRect();
    const SIZE = 240;
    const mx = ((e.clientX - rect.left) / rect.width) * SIZE;
    const my = ((e.clientY - rect.top) / rect.height) * SIZE;
    const cx = SIZE / 2,
      cy = SIZE / 2;
    const dx = mx - cx,
      dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 100 || dist < 52) return null;
    let ang = Math.atan2(dy, dx);
    if (ang < -Math.PI / 2) ang += Math.PI * 2;
    let start = -Math.PI / 2;
    for (const seg of segments) {
      if (seg.value === 0) continue;
      const slice = (seg.value / total) * Math.PI * 2;
      if (ang >= start && ang < start + slice) return seg;
      start += slice;
    }
    return null;
  };

  // const handleMouseMove = (e) => {
  //   const seg = getHoveredSegment(e);
  //   if (seg) setTooltip({ ...seg, pct: Math.round((seg.value / total) * 100) });
  //   else setTooltip(null);
  // };
  const handleMouseMove = (e) => {
    const seg = getHoveredSegment(e);

    if (seg) {
      const pct = Math.round((seg.value / total) * 100);

      const next = {
        ...seg,
        pct,
      };

      setHovered(next);

      draw(progressRef.current, next);
    } else {
      setHovered(null);

      draw(progressRef.current, null);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {loading ? (
        <div className="w-[240px] h-[240px] rounded-full bg-gradient-to-br from-[#1a1d2a] to-[#0f1117] animate-pulse" />
      ) : (
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          // onMouseLeave={() => setTooltip(null)}
          onMouseLeave={() => {
            setHovered(null);
            draw(progressRef.current, null);
          }}
          className="cursor-crosshair"
          style={{ filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.5))" }}
        />
      )}
      {/* {tooltip && (
        <div
          className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none
                     bg-[#12141c]/95 backdrop-blur-md border border-[#2a2d3a] rounded-2xl
                     px-4 py-2 text-sm font-semibold text-white shadow-2xl whitespace-nowrap animate-tooltip-in"
          style={{ boxShadow: `0 0 20px ${tooltip.color}40` }}
        >
          <span className="mr-1.5">{tooltip.icon}</span>
          {tooltip.label}
          <span className="ml-2 font-bold" style={{ color: tooltip.color }}>
            {tooltip.value}
          </span>
          <span className="ml-1 text-gray-400 font-normal text-xs">
            ({tooltip.pct}%)
          </span>
        </div>
      )} */}
      <p className="text-[11px] text-gray-600 mt-4 tracking-wide">
        hover to explore segments
      </p>
    </div>
  );
}

// ── Full-screen Search Overlay ────────────────────────────────────────────────
function SearchOverlay({
  searchTerm,
  setSearchTerm,
  tools,
  toolsLoading,
  hasSearched,
  onClose,
  onRefreshStats,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center animate-overlay-in">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />
      <div className="relative z-10 w-full h-screen    flex flex-col gap-0 animate-panel-in p-5 items-center pt-[180px]">
        <div className="relative md:w-3/6 w-full ">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3380FF]/30 to-purple-500/30 rounded-2xl blur-md" />
          <div className="relative flex items-center bg-[#0d0f18] border border-[#3380FF]/50 rounded-2xl overflow-hidden shadow-2xl shadow-[#3380FF]/10">
            <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
              {toolsLoading ? (
                <svg
                  className="h-5 w-5 animate-spin text-[#3380FF]"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Webs.........."
              className="flex-1 bg-transparent py-4 pr-1 text-white placeholder:text-gray-600 outline-none text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mr-1 w-10 h-6 flex items-center justify-center rounded-lg bg-[#EE636D] hover:bg-[#2a2d3a] text-white hover:text-white transition-all text-xs flex-shrink-0"
              >
                clear
              </button>
            )}
            <button
              onClick={onClose}
              className="mr-4 text-[10px] text-white hover:text-gray-300 border border-[#2a2d3a] rounded-lg px-2 py-1 transition-all flex justify-center items-center"
            >
              Back <FaAnglesRight />
            </button>
          </div>
        </div>

        <div className="mt-3 bg-[#0d0f18]/95 border border-[#1e2130] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden  md:w-3/6 w-full">
          {(hasSearched || toolsLoading) && (
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2130]">
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-5 rounded-full bg-[#3380FF]" />
                <span className="text-sm text-white font-medium">
                  {toolsLoading ? (
                    "Searching…"
                  ) : (
                    <>
                      Results for{" "}
                      <span className="text-[#3380FF] font-semibold">
                        "{searchTerm}"
                      </span>
                    </>
                  )}
                </span>
              </div>
              {!toolsLoading && hasSearched && (
                <span className="text-[11px] font-mono text-white bg-[#3380FF] px-2 py-0.5 rounded-lg pt-[4px]">
                  {tools?.length ?? 0} found
                </span>
              )}
            </div>
          )}

          {toolsLoading && (
            <div className="flex items-center justify-center gap-3 py-14">
              <svg
                className="h-6 w-6 animate-spin text-[#3380FF]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              <span className="text-gray-400 text-sm">Searching tools...</span>
            </div>
          )}

          {/* {!toolsLoading && hasSearched && tools?.length > 0 && (
            <div className="overflow-y-auto p-4 overflow-hidden" style={{ maxHeight: "55vh" }}>
              <ToolCardList tools={tools} mode="public" loading={false} onSaveToggle={onRefreshStats} />
            </div>
            
               
          )} */}

          {!toolsLoading && hasSearched && tools?.length > 0 && (
            <div
              className="w-full overflow-y-auto overflow-x-hidden p-4 select-none modern-scrollbar "
              style={{ maxHeight: "55vh" }}
            >
              <ToolCardList
                tools={tools}
                mode="public"
                loading={false}
                onSaveToggle={onRefreshStats}
              />
            </div>
          )}
          {!toolsLoading && hasSearched && (!tools || tools.length === 0) && (
            <div className="flex flex-col items-center justify-center py-14 gap-4">
              {/* <div className="w-14 h-14 rounded-2xl bg-[#1a1d2a] border border-[#2a2d3a] flex items-center justify-center text-3xl">
                🔍
              </div> */}
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-300">
                  No tools found
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Try a different keyword
                </p>
              </div>
            </div>
          )}

          {!toolsLoading && !hasSearched && !searchTerm && (
            <div className="flex flex-col items-center justify-center py-14 gap-3 text-gray-700">
              <svg
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-sm text-gray-500 font-medium">
                Start typing to search your library
              </p>
            </div>
          )}

          <div className="px-5 py-2.5 border-t border-[#1e2130] flex items-center gap-4 text-[11px] text-white">
            <span className="flex justify-center items-center gap-2">
              <kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex justify-center items-center gap-2">
              <kbd className="bg-[#1a1d2a] px-1.5 py-0.5 rounded text-gray-500">
                Esc
              </kbd>{" "}
              Back
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> */}
              <FaArrowLeftLong />
              Short-Cuts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
function Dashboard_page() {
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
      h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening",
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

  const segments = SEGMENTS_META.map((m) => ({
    ...m,
    value: stats?.[m.key] ?? 0,
  }));
  const total = segments.reduce((s, d) => s + d.value, 0);

  return (
    <div className="h-[90vh] overflow-y-scroll p-5">
      <div className="mx-auto space-y-8">
        {/* Header Layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[#3380FF] text-[25px] flex items-center gap-2">
              {greeting},
              <span className="text-gray-800 font-semibold">{user?.name}</span>
              <span className="inline-block animate-wave">
                <GiHand />
              </span>
            </p>
          </div>

          {/* Elegant Interactive Search Trigger Button */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="relative group w-[150px] h-[44px] cursor-pointer flex items-center rounded-xl border border-[#3380FF]/50 bg-[#3380FF] overflow-hidden shadow-lg shadow-[#3380FF]/10 active:scale-[0.98] transition-all duration-300"
            >
              <span className="absolute left-0 transform translate-x-[26px] text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:translate-x-0">
                Search
              </span>
              <span className="absolute right-0 top-0 bottom-0 w-[42px] bg-[#226ce6] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:bg-[#226ce6]">
                
                <FaSearch className="text-white" />
              </span>
            </button>

            {/* Live Badge */}
            <div className="flex items-center gap-2 text-xs bg-[#3981FA]  rounded-xl px-4 py-2 flex-shrink-0 h-[44px]">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-300 font-medium">Live</span> */}
              {/* <span className="text-[#2a2d3a]">|</span> */}
              <span className="text-white">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            icon="🎯"
            label="total saved"
            value={stats?.total}
            sub="all tools in library"
            loading={statsLoading}
            color="#f59e0b"
          />
          <StatCard
            icon="🧩"
            label="platform tools"
            value={stats?.platform}
            sub="from official directory"
            loading={statsLoading}
            color="#3b82f6"
          />
          <StatCard
            icon="⚡"
            label="custom tools"
            value={stats?.custom}
            sub="created by you"
            loading={statsLoading}
            color="#a855f7"
          />
          <StatCard
            icon="📂"
            label="folders"
            value={stats?.folders}
            sub="smart collections"
            loading={statsLoading}
            color="#10b981"
          />
        </div> */}

        {/* Stat Cards
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            icon={TbBookmark}
            label="Total saved"
            value={stats?.total}
            sub="All tools in library"
            loading={statsLoading}
          />
          <StatCard
            icon={TbLayoutGrid}
            label="Platform tools"
            value={stats?.platform}
            sub="From official directory"
            loading={statsLoading}
          />
          <StatCard
            icon={TbTool}
            label="Custom tools"
            value={stats?.custom}
            sub="Created by you"
            loading={statsLoading}
          />
          <StatCard
            icon={TbFolder}
            label="Folders"
            value={stats?.folders}
            sub="Smart collections"
            loading={statsLoading}
          />
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pt-[15px] ">
          <StatCard
            icon={TbBookmark}
            label="Total saved"
            value={stats?.total}
            sub="All tools in library"
            loading={statsLoading}
          />
          <StatCard
            icon={TbLayoutGrid}
            label="Platform tools"
            value={stats?.platform}
            sub="From official directory"
            loading={statsLoading}
          />
          <StatCard
            icon={TbTool}
            label="Custom tools"
            value={stats?.custom}
            sub="Created by you"
            loading={statsLoading}
          />
          <StatCard
            icon={TbFolder}
            label="Folders"
            value={stats?.folders}
            sub="Smart collections"
            loading={statsLoading}
          />
        </div>

        {/* Analytics Section
        <div className="bg-[#0f1117] border border-[#1e2130] rounded-2xl p-6 md:p-8">
          <div className="flex items-start justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <span>📊</span> Library Analytics
              </h2>
              <p className="text-gray-600 text-xs mt-1">
                breakdown of your saved ecosystem
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] bg-[#0a0c12] border border-[#1e2130] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-gray-400 font-medium">live sync</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <DonutChart stats={stats} loading={statsLoading} />

            <div className="flex-1 w-full space-y-5">
              {segments.map((seg) => {
                const pct =
                  total > 0 ? Math.round((seg.value / total) * 100) : 0;
                return (
                  <div key={seg.label} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-lg transition-transform duration-200 group-hover:scale-110"
                          style={{
                            background: `${seg.color}18`,
                            border: `1px solid ${seg.color}40`,
                          }}
                        >
                          {seg.icon}
                        </div>
                        <span className="text-gray-300 font-medium text-sm">
                          {seg.label}
                        </span>
                      </div>
                      <div className="text-right flex items-baseline gap-1">
                        <span className="text-white font-bold text-xl">
                          {statsLoading ? "—" : seg.value.toLocaleString()}
                        </span>
                        <span className="text-gray-500 text-xs font-mono">
                          {statsLoading ? "" : `(${pct}%)`}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-[#0a0c12] border border-[#1e2130] overflow-hidden">
                      {statsLoading ? (
                        <div className="h-full w-1/3 bg-[#1e2130] animate-pulse rounded-full" />
                      ) : (
                        <div
                          className="h-full rounded-full transition-[width] duration-1000 ease-out"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${seg.color}88, ${seg.color})`,
                            boxShadow: `0 0 10px ${seg.color}60`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              <div className="pt-5 border-t border-[#1e2130] flex justify-between items-center">
                <span className="text-xs text-gray-500 flex items-center gap-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #a855f7)",
                    }}
                  />
                  total tracked inventory
                </span>
                <span className="text-2xl font-bold text-white">
                  {statsLoading ? "—" : total.toLocaleString()}
                  <span className="text-gray-500 text-sm font-normal ml-1.5">
                    items
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {/* ── Analytics Section ── */}
        <div className="relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-gray-100 dark:border-[#1c1f2c] rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#3981FA]/5 hover:border-[#3981FA]/20 dark:hover:border-[#3981FA]/20 select-none mb-[70px]">
          {/* Left theme border accent accentuating the bento dashboard card layout */}
          <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-transparent rounded-l-2xl" />

          {/* Top Section Header */}
          <div className="flex items-start justify-between mb-8 flex-wrap gap-4 relative z-10">
            <div className="space-y-0.5">
              <h2 className="text-lg font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
                {/* <span className="text-xl filter drop-shadow-[0_0_8px_rgba(57,129,250,0.4)]"><TbGraphFilled />
</span>  */}
                <span
                  className="
    text-2xl 
    text-[#3380FF]
    drop-shadow-[0_0_6px_rgba(51,128,255,0.5)]
    hover:drop-shadow-[0_0_14px_rgba(51,128,255,0.9)]
    hover:scale-110
    transition-all
    duration-300
    inline-flex
    items-center
    justify-center
  "
                >
                  <TbGraphFilled />
                </span>
                OverAll - Analytics
              </h2>
              <p className="text-gray-400 dark:text-gray-500 text-xs font-medium">
                Breakdown of your saved ecosystem
              </p>
            </div>

            {/* Sync pill designed like a network node */}
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#121520] border border-gray-100 dark:border-[#1e2235] px-3.5 py-1.5 rounded-full shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#3981FA] animate-pulse shadow-[0_0_8px_#3981FA]" />
              <span className="uppercase font-mono">LIVE SYNC</span>
            </div>
          </div>

          {/* Main Analytics Container Layout */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
            {/* Left Column: Donut Chart container with standalone shadow elevation */}
            <div className="flex-shrink-0 relative transition-transform duration-500 hover:scale-[1.02]">
              <DonutChart stats={stats} loading={statsLoading} />
            </div>

            {/* Right Column: Progressive Segment Metas */}
            <div className="flex-1 w-full space-y-6">
              {segments.map((seg) => {
                const pct =
                  total > 0 ? Math.round((seg.value / total) * 100) : 0;
                return (
                  <div key={seg.label} className="group/segment block">
                    {/* Header Data metrics metadata */}
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="flex items-center gap-3">
                        {/* Floating Icon Frame mirroring your StatCard component frames */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 shadow-sm transition-all duration-300 group-hover/segment:scale-110 text-[#121A29]"
                          style={{
                            background: `${seg.color}15`,
                            border: `1px solid ${seg.color}30`,
                            boxShadow: `0 4px 12px ${seg.color}05`,
                          }}
                        >
                          {seg.icon}
                        </div>
                        <span
                         className="text-gray-700 dark:text-gray-300 font-bold text-sm "
                         >
                          {seg.label}
                        </span>
                      </div>

                      <div className="text-right flex items-baseline gap-1.5">
                        <span className="text-gray-900 dark:text-white font-black text-xl transition-colors">
                          {statsLoading ? "—" : seg.value.toLocaleString()}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500 text-xs font-bold font-mono bg-gray-50 dark:bg-[#121520] border border-gray-100 dark:border-[#1c1f2c] px-1.5 py-0.5 rounded-md">
                          {statsLoading ? "" : `${pct}%`}
                        </span>
                      </div>
                    </div>

                    {/* Premium Progress Rail tracking */}
                    <div className="h-2.5 rounded-full bg-gray-50 dark:bg-[#080a10] border border-gray-100 dark:border-[#171924] overflow-hidden p-[2px]">
                      {statsLoading ? (
                        <div className="h-full w-1/3 bg-gray-200 dark:bg-[#1c1f2c] animate-pulse rounded-full" />
                      ) : (
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, ${seg.color}99, ${seg.color})`,
                            boxShadow: `0 0 12px ${seg.color}80`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Aggregate Bottom Footer Divider */}
              <div className="pt-6 border-t border-gray-100 dark:border-[#1c1f2c] flex justify-between items-center flex-wrap gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2 font-medium">
                  <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-[#3981FA] to-purple-500 shadow-[0_0_6px_#3981FA]" />
                  Total Tracked Inventory Lifecycle
                </span>
                <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-baseline gap-1 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 dark:from-white dark:via-white dark:to-gray-400 bg-clip-text text-transparent">
                  {statsLoading ? "—" : total.toLocaleString()}
                  <span className="text-gray-400 dark:text-gray-500 text-xs font-semibold tracking-wide ml-0.5 uppercase bg-clip-text text-gray-400">
                    items
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen search overlay */}
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

      <style>{`
        @keyframes wave {
          0%,100% { transform: rotate(0deg); }
          25%      { transform: rotate(15deg); }
          75%      { transform: rotate(-10deg); }
        }
        @keyframes tooltip-in {
          from { opacity: 0; transform: translate(-50%, 4px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(-16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
        .animate-wave        { display: inline-block; animation: wave 1.4s ease-in-out infinite; transform-origin: 70% 70%; }
        .animate-tooltip-in  { animation: tooltip-in  0.15s ease-out forwards; }
        .animate-overlay-in  { animation: overlay-in  0.2s  ease-out forwards; }
        .animate-panel-in    { animation: panel-in    0.22s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default Dashboard_page;

// v6
