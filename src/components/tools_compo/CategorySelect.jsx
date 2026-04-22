import { useState } from "react";

function CategorySelect({ categories, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative mb-3">

      {/* SELECT BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full p-2 border cursor-pointer bg-white"
      >
        {value
          ? categories.find((c) => c._id === value)?.name
          : "Select Category"}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-10 w-full bg-white border shadow max-h-60 overflow-y-auto">

          {/* SEARCH */}
          <input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border-b"
          />

          {/* OPTIONS */}
          {filtered.map((cat) => (
            <div
              key={cat._id}
              onClick={() => {
                onChange(cat._id);
                setOpen(false);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {cat.name}
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="p-2 text-gray-500 text-sm">
              No categories found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CategorySelect;