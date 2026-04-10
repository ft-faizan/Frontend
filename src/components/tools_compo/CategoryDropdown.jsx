import { useState } from "react";

function CategoryDropdown({
  categories,
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full mb-4">

      {/* BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="p-2 border rounded bg-white cursor-pointer"
      >
        {selectedCategory ? selectedCategory.name : "All Categories"}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-10 bg-white border w-full mt-1 shadow max-h-60 overflow-y-auto">

          <input
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b"
          />

          <div
            onClick={() => {
              setSelectedCategory(null);
              setCurrentPage(1);
              setOpen(false);
            }}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            All Categories
          </div>

          {filtered.map((cat) => (
            <div
              key={cat._id}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
                setOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;