import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getTools,
  deleteTool,
  updateTool,
} from "../features/tools/toolSlice.js";

import ToolModal from "../components/tools_compo/ToolModal.jsx";

function Category_folders_page() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { tools, loading } = useSelector((state) => state.tools);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  // const role = user.role;

  // 🔥 FETCH TOOLS BY CATEGORY
  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(
        // getTools({
        //   category: id,
        //   search,
        //   page: currentPage,
        //   limit: 10,
        //   // mode: "admin", // 🔥 important for edit/delete
        // }),
        getTools({
          category: id,
          search,
          page: currentPage,
          limit: 10,
        mode: window.location.pathname.includes("admin") ? "admin" : undefined // 🔥 KEY FIX
        }),
      );

      setPages(res.payload?.pages || 1);
    };

    fetch();
  }, [dispatch, id, search, currentPage, user]);

  return (
    <div className="p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-4">Category Tools</h1>

      {/* SEARCH */}
      <input
        placeholder="Search tools..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-2 border mb-4"
      />

      {/* LIST */}
      <div className="bg-white shadow rounded">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : tools.length === 0 ? (
          <p className="p-4">No tools found</p>
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
                  onClick={() => dispatch(deleteTool(tool._id))}
                  className="text-red-500 ml-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}
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

      {/* MODAL */}
      <ToolModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        initialData={selectedTool}
        categories={categories}
        onSubmit={async (formData) => {
          await dispatch(
            updateTool({
              id: selectedTool._id,
              data: formData,
            }),
          );

          const res = await dispatch(
            getTools({
              category: id,
              search,
              page: currentPage,
              limit: 10,
             mode: window.location.pathname.includes("admin") ? "admin" : undefined
            }),
          );

          setPages(res.payload?.pages || 1);

          setOpenModal(false);
        }}
      />
    </div>
  );
}

export default Category_folders_page;
