// pages/dashboard/components/SearchTriggerButton.jsx
import { FaSearch } from "react-icons/fa";

function SearchTriggerButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative group w-[150px] h-[44px] cursor-pointer flex items-center rounded-xl border border-[#3380FF]/50 bg-[#3380FF] overflow-hidden shadow-lg shadow-[#3380FF]/10 active:scale-[0.98] transition-all duration-300"
    >
      <span className="absolute left-0 transform translate-x-[26px] text-white font-semibold text-sm tracking-wide transition-all duration-300 group-hover:text-transparent group-hover:translate-x-0">
        Search
      </span>
      <span className="absolute right-0 top-0 bottom-0 w-[42px] bg-[#226ce6] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:bg-[#226ce6]">
        <FaSearch className="text-white" />
      </span>
    </button>
  );
}

export default SearchTriggerButton;