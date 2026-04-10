
function CategoryFilterBar({
  search,
  setSearch,
  mode,
  setMode,
  setCurrentPage,
}) {

    
  const handleClear = () => {
    setSearch("");
    setMode("all");
    setCurrentPage(1);
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="flex-1 p-2 border rounded-lg"
      />

      {/* 🔘 TOGGLE */}
      <select
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          setCurrentPage(1);
        }}
        className="p-2 border rounded-lg"
      >
        <option value="all">All Categories</option>
        <option value="admin">Created By Me</option>
      </select>

      {/* ❌ CLEAR */}
      <button
        onClick={handleClear}
        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        Clear
      </button>
    </div>
  );
}

export default CategoryFilterBar;