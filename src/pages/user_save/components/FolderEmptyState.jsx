// pages/user_save/components/FolderEmptyState.jsx
import { FolderOpen } from "lucide-react";

function FolderEmptyState({ searchQuery, onClearSearch }) {
  return (
    <div className="bg-white border border-dashed border-[#296DE2] rounded-2xl p-20 text-center flex flex-col items-center">
      <FolderOpen className="w-10 h-10 text-[#296DE2] mb-3" />
      <p className="text-[#296DE2]">
        {searchQuery
          ? `No folders found for "${searchQuery}".`
          : "No folders created yet."}
      </p>
      {searchQuery && (
        <button
          onClick={onClearSearch}
          className="mt-3 text-sm text-[#296DE2] hover:underline"
        >
          Clear Search
        </button>
      )}
    </div>
  );
}

export default FolderEmptyState;