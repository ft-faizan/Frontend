const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-[#1c1f26] text-white rounded-lg disabled:opacity-30"
      >
        Prev
      </button>
      
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`w-10 h-10 rounded-lg font-bold transition-all ${
            currentPage === i + 1 ? "bg-[#286FF0] text-white shadow-lg" : "bg-[#1c1f26] text-gray-500"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-[#1c1f26] text-white rounded-lg disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;