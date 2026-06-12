// pages/user_save/components/SaveTabs.jsx
import { tabs } from "../constants/tabs";

function SaveTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 bg-white rounded-xl p-1 w-fit mb-7">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            activeTab === tab.id
              ? "bg-[#3E81F4] text-white font-bold"
              : "text-gray-500 hover:text-[#2F70EB]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default SaveTabs;