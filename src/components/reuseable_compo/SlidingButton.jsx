import React from 'react';

const SlidingButton = ({
  icon,
  text,
  onClick,
  width = 'w-[200px]',
  height = 'h-[44px]',
  bgColor = 'bg-[#3380FF]',
  iconBgColor = 'bg-[#226ce6]',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative group ${width} ${height} cursor-pointer flex items-center rounded-xl border border-[#3380FF]/50 ${bgColor} overflow-hidden shadow-lg shadow-[#3380FF]/10 active:scale-[0.98] transition-all duration-300 ${className}`}
    >
      {/* Sliding icon container */}
      <span className={`absolute left-0 top-0 bottom-0 w-[42px] ${iconBgColor} flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:${iconBgColor}`}>
        {icon}
      </span>

      {/* Text – fades/slides out on hover */}
      <span className="absolute right-0 transform translate-x-[-26px] text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:translate-x-0">
        {text}
      </span>
    </button>
  );
};

export default SlidingButton;