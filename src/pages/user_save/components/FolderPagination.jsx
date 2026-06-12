// pages/user_save/components/FolderPagination.jsx
function FolderPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8 pb-10">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`h-8 min-w-[32px] px-2 rounded-xl text-xs font-bold transition-all ${
              currentPage === p
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
                : "text-slate-400 hover:bg-white hover:text-blue-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3075E8] bg-white hover:text-white hover:bg-[#3075E8] transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default FolderPagination;