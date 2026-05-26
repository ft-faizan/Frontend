// import { useRecentTools } from "../../hooks/useRecentTools";
// import Dock from "./Dock";

// export default function RecentToolsDock() {
//   const { recentTools, clearRecentTools } = useRecentTools();

//   if (recentTools.length === 0) return null;

//   const items = recentTools.map((tool) => ({
//     label: tool.name,
//     icon: (
//       <img
//         src={tool.image}
//         alt={tool.name}
//         className="w-full h-full object-cover rounded-full"
//         onError={(e) => {
//           e.currentTarget.style.display = "none";
//           e.currentTarget.parentElement.innerHTML =
//             `<span style="color:#fff;font-size:18px;font-weight:700;text-transform:uppercase">${tool.name?.[0] ?? "?"}</span>`;
//         }}
//       />
//     ),
//     onClick: () => window.open(tool.link, "_blank", "noreferrer"),
//   }));

//   items.push({
//     label: "Clear history",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//       </svg>
//     ),
//     onClick: clearRecentTools,
//     className: "opacity-50 hover:opacity-100",
//   });

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
//       <div className="pointer-events-auto">
//         <Dock
//           items={items}
//           panelHeight={64}
//           baseItemSize={46}
//           magnification={68}
//           distance={160}
//         />
//       </div>
//     </div>
//   );
// }

// src/components/reuseable_compo/RecentToolsDock.jsx

// import { useRecentTools } from "../../hooks/useRecentTools";
// import Dock from "./Dock";

// export default function RecentToolsDock() {
//   const { recentTools } = useRecentTools();

//   if (recentTools.length === 0) return null;

//   const items = recentTools.map((tool) => ({
//     label: tool.name,
//     icon: (
//       <div className="w-full h-full relative overflow-hidden rounded-xl group/icon">
//         {/* background gradient fallback */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#1e2130] to-[#13151a]" />

//         {/* tool image */}
//         <img
//           src={tool.image}
//           alt={tool.name}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover/icon:scale-110"
//           onError={(e) => {
//             e.currentTarget.style.display = "none";
//           }}
//         />

//         {/* fallback letter shown when no image */}
//         <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl uppercase select-none">
//           {tool.name?.[0] ?? "?"}
//         </span>

//         {/* subtle inner border */}
//         <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />

//         {/* hover shine */}
//         <div className="absolute inset-0 bg-white/0 group-hover/icon:bg-white/5 transition-colors duration-200 rounded-xl" />
//       </div>
//     ),
//     onClick: () => window.open(tool.link, "_blank", "noreferrer"),
//   }));

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-2 px-4 pointer-events-none">
//       {/* label above dock */}
//       <div className="flex flex-col items-center gap-0 pointer-events-auto w-full max-w-lg">
//         <div className="flex items-center gap-1.5 mb-1.5">
//           <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
//           <span className="text-[10px] text-gray-600 font-medium tracking-widest uppercase">
//             Recently Visited
//           </span>
//           <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
//         </div>

//         <Dock
//           items={items}
//           panelHeight={68}
//           baseItemSize={52}
//           magnification={72}
//           distance={150}
//         />
//       </div>
//     </div>
//   );
// }

// src/components/reuseable_compo/RecentToolsDock.jsx

import { useRecentTools } from "../../hooks/useRecentTools";
import Dock from "./Dock";

export default function RecentToolsDock() {
  const { recentTools } = useRecentTools();

  if (recentTools.length === 0) return null;

  const items = recentTools.map((tool) => ({
    label: tool.name, // this is shown as tooltip on hover (DockLabel handles it)
    icon: (
      <div className="w-full h-full relative overflow-hidden rounded-xl">
        {/* dark background always visible behind image */}
        <div className="absolute inset-0 bg-[#1e2130]" />

        {/* tool image - covers full box */}
        <img
          src={tool.image}
          alt={tool.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* subtle inner border ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
      </div>
    ),
    onClick: () => window.open(tool.link, "_blank", "noreferrer"),
  }));

  return (
    <div
  className="
    fixed
    bottom-0

    left-0
    min-[1330px]:left-[15%]

    right-0

    z-40
    flex
    justify-center

    pb-2
    px-4

    pointer-events-none
  "
>
      <div className="flex flex-col items-center pointer-events-auto w-full max-w-lg">
        {/* label above dock */}
        {/* <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
          {/* <span className="text-[10px] text-gray-600 font-medium tracking-widest uppercase">
            Recently Visited
          </span> 
          <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
        </div> */}

        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={72}
          distance={150}
        />
      </div>
    </div>
  );
}
