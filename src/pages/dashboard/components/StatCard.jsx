// pages/dashboard/components/StatCard.jsx
import { useState, useEffect, useMemo } from "react";

function StatCard({ icon: Icon, label, value, sub, loading }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const formattedValue = useMemo(() => {
    return (displayValue ?? 0).toLocaleString();
  }, [displayValue]);

  useEffect(() => {
    if (loading || value === undefined) return;

    const targetValue = value ?? 0;
    const duration = 1000;
    const steps = 60;
    const stepValue = targetValue / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(targetValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(stepValue * currentStep));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, loading]);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden bg-white dark:bg-[#0c0e14] border border-[#3981FA]/30 dark:border-[#3981FA]/30 rounded-2xl p-6 flex flex-col justify-between min-h-[145px] transition-all duration-300 shadow-xl shadow-[#3981FA]/5 -translate-y-1 select-none hover:shadow-2xl hover:shadow-[#3981FA]/20 hover:-translate-y-2 cursor-pointer"
    >
      <div className={`absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#3981FA]/5 dark:bg-[#3981FA]/5 transition-all duration-500 blur-2xl pointer-events-none ${
        isHovered ? 'opacity-100 scale-150' : 'opacity-100 scale-100'
      }`} />

      <div className={`absolute -right-4 -bottom-6 text-[#3981FA]/10 dark:text-[#3981FA]/10 pointer-events-none transform origin-bottom-right opacity-40 dark:opacity-40 transition-all duration-500 ${
        isHovered ? 'scale-[2.6] -rotate-[25deg]' : 'scale-[2.4] -rotate-12'
      }`}>
        <Icon strokeWidth={1} />
      </div>

      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex flex-col gap-0.5">
          <p className="text-[11px] font-bold tracking-widest text-[#6A7281] dark:text-gray-500 uppercase">
            {label}
          </p>
          <p className="text-[11px] text-[#6A7281] dark:text-gray-600 font-medium">
            {sub}
          </p>
        </div>

        <div className={`w-10 h-10 rounded-xl bg-[#3981FA] dark:bg-[#3981FA] flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm ${
          isHovered ? 'shadow-lg shadow-[#3981FA]/40 scale-110' : 'shadow-sm shadow-[#3981FA]/10 scale-100'
        }`}>
          <Icon
            size={20}
            className={`text-white transition-all duration-300 ${
              isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
            }`}
          />
        </div>
      </div>

      <div className="mt-5 relative z-10">
        {loading ? (
          <div className="h-9 w-24 rounded-xl bg-gray-100 dark:bg-[#1a1d2a] animate-pulse" />
        ) : (
          <div className="flex items-baseline gap-1">
            <h3 className={`text-3xl md:text-4xl font-black tracking-tight transition-all duration-300 ${
              isHovered 
                ? 'text-[#3981FA] dark:text-[#5DA3FF] scale-110 drop-shadow-lg' 
                : 'text-[#296DE2] dark:text-[#3981FA]'
            } bg-gradient-to-br from-[#3981FA] to-[#3981FA]/70 bg-clip-text text-transparent`}>
              {formattedValue}
            </h3>
            <span className={`w-1.5 h-1.5 rounded-full bg-[#3981FA] opacity-100 transition-all duration-300 ${
              isHovered ? 'scale-150 shadow-lg shadow-[#3981FA]/50' : 'scale-100'
            }`} />
          </div>
        )}
      </div>

      <div className={`absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[#3981FA] to-[#3981FA]/30 rounded-l-2xl transition-all duration-300 ${
        isHovered ? 'w-1 shadow-lg shadow-[#3981FA]/50' : 'w-[3px]'
      }`} />

      <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
        isHovered ? 'bg-gradient-to-br from-[#3981FA]/5 to-transparent opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
}

export default StatCard;