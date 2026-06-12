





// v3
import React from "react";

const SlidingButton = ({
  icon,
  text,
  onClick,
  width = "w-[160px]",
  height = "h-[44px]",
  bgColor = "bg-[#3380FF]",
  iconBgColor = "bg-[#2770E6]",
  borderColor = "border-[#3380FF]/50",
  shadowColor = "shadow-[#3380FF]/10",
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative isolate overflow-hidden ${width} ${height} cursor-pointer rounded-xl border ${borderColor} ${bgColor} shadow-lg ${shadowColor} active:scale-[0.98] transition-all duration-300 group/button ${className}`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-[44px] ${iconBgColor} flex items-center justify-center z-50 transition-all duration-300 group-hover/button:w-full pointer-events-none`}
      >
        {icon}
      </span>

      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover/button:text-white group-hover/button:translate-x-0 whitespace-nowrap z-20 pointer-events-none">
        {text}
      </span>
    </button>
  );
};

export default SlidingButton;