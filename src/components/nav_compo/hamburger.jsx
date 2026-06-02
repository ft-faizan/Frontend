




import React from 'react';

const MenuButton = ({ isOpen, onClick, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Animated gradient border container */}
      <div className={`
        relative w-[60px] h-[60px] sm:w-[65px] sm:h-[65px] rounded-2xl 
        flex items-center justify-center 
        bg-white/40 dark:bg-white/[0.04] 
        backdrop-blur-xl 
        transition-all duration-500 ease-out
        hover:scale-105 active:scale-95
        group
        before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-transparent before:via-[#3981FA]/30 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        ${isOpen ? 'shadow-lg shadow-red-500/20' : 'shadow-sm shadow-black/[0.03]'}
      `}>
        
        {/* Inner border ring */}
        <div className={`
          absolute inset-[1px] rounded-2xl
          transition-all duration-500
          ${isOpen 
            ? 'bg-gradient-to-br from-red-50/50 to-red-100/30 dark:from-red-950/30 dark:to-red-900/20' 
            : 'bg-transparent group-hover:bg-gradient-to-br group-hover:from-[#3981FA]/10 group-hover:to-transparent'
          }
        `} />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={onClick}
          className="relative z-10 w-8 h-8 p-1 flex flex-col justify-between items-center focus:outline-none cursor-pointer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {/* Top Bar - rotating with bounce */}
          <span 
            className={`
              w-full h-[2.5px] rounded-full 
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              shadow-[0_0.5px_2px_rgba(0,0,0,0.1)]
              origin-center
              ${isOpen 
                ? 'bg-red-500 dark:bg-red-400 translate-y-[9px] -rotate-45 scale-110' 
                : 'bg-[#3981FA] group-hover:bg-[#226ce6] group-hover:scale-110'
              }
            `} 
            aria-hidden="true"
          />

          {/* Middle Bar - collapsing with scale */}
          <span 
            className={`
              h-[2.5px] rounded-full 
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              shadow-[0_0.5px_2px_rgba(0,0,0,0.1)]
              origin-center
              ${isOpen 
                ? 'w-0 opacity-0 scale-x-0' 
                : 'w-[70%] bg-[#3981FA] group-hover:w-full group-hover:bg-[#226ce6] group-hover:scale-x-110'
              }
            `} 
            aria-hidden="true"
          />

          {/* Bottom Bar - rotating with bounce */}
          <span 
            className={`
              w-full h-[2.5px] rounded-full 
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              shadow-[0_0.5px_2px_rgba(0,0,0,0.1)]
              origin-center
              ${isOpen 
                ? 'bg-red-500 dark:bg-red-400 -translate-y-[9.5px] rotate-45 scale-110' 
                : 'bg-[#3981FA] group-hover:bg-[#226ce6] group-hover:scale-110'
              }
            `} 
            aria-hidden="true"
          />
        </button>

        {/* Animated pulse ring on hover */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className={`
            absolute inset-0 rounded-2xl
            transition-all duration-700
            group-hover:animate-pulse group-hover:ring-2 group-hover:ring-[#3981FA]/40
            ${isOpen && 'ring-2 ring-red-500/50'}
          `} />
        </div>
      </div>
    </div>
  );
};

export default MenuButton;