

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
