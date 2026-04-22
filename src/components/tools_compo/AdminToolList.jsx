import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTools,
  deleteTool,
  createTool,
  updateTool,
} from "../../features/tools/toolSlice.js";

import ToolModal from "./ToolModal.jsx";

function AdminToolList({ categories }) {
  const dispatch = useDispatch();

  const { tools, loading } = useSelector((state) => state.tools);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("all"); // all | admin
  const [categoryFilter, setCategoryFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1); // temporary

  const [openModal, setOpenModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  // 🔥 FETCH TOOLS
  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(
        // getTools({
        //   mode: mode === "admin" ? "admin" : undefined,
        //   search,
        //   category: categoryFilter,
        //   page: currentPage,
        //   limit: 10,
        // })
        getTools({
          mode: "admin", // 🔥 ALWAYS own tools
          search,
          category: categoryFilter,
          page: currentPage,
          limit: 10,
        }),
      );

      setPages(res.payload?.pages || 1);
    };

    fetch();
  }, [dispatch, search, mode, categoryFilter, currentPage]);

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Tools</h2>

        <button
          onClick={() => {
            setSelectedTool(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Tool
        </button>
      </div>

      {/* 🔍 SEARCH */}
      <input
        placeholder="Search tools..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-2 border mb-3"
      />

      {/* 🔥 FILTERS */}
      <div className="flex gap-3 mb-4">
        {/* MODE */}
        {/* <select
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Tools</option>
          <option value="admin">Created By Me</option>
        </select> */}

        {/* CATEGORY */}
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* CLEAR */}
        <button
          onClick={() => {
            setSearch("");
            setMode("all");
            setCategoryFilter("");
            setCurrentPage(1);
          }}
          className="text-red-500"
        >
          Clear
        </button>
      </div>

      {/* 📦 LIST */}
      <div className="bg-white shadow rounded">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : tools.length === 0 ? (
          <p className="p-4">No tools</p>
        ) : (
          tools.map((tool) => (
            <div key={tool._id} className="p-4 border-b flex justify-between">
              <div>
                <p className="font-bold">{tool.name}</p>
                <p className="text-sm text-gray-500">{tool.category?.name}</p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSelectedTool(tool);
                    setOpenModal(true);
                  }}
                  className="text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    dispatch(deleteTool(tool._id));
                  }}
                  className="text-red-500 ml-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 📄 PAGINATION */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className="px-3 py-1 bg-gray-200"
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔥 MODAL */}
      <ToolModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selectedTool}
        categories={categories}
        onSubmit={async (formData) => {
          if (selectedTool) {
            await dispatch(
              updateTool({
                id: selectedTool._id,
                data: formData,
              }),
            );
          } else {
            await dispatch(createTool(formData));
          }

          setOpenModal(false);
        }}
      />
    </div>
  );
}

export default AdminToolList;
