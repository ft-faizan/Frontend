import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getTools,
  deleteTool,
  updateTool,
} from "../../features/tools/toolSlice.js";

import ToolModal from "./ToolModal.jsx";
import UserDropdown from "../categorys_compo/UserDropdown.jsx";
import CategoryDropdown from "./CategoryDropdown.jsx";

function SuperAdminToolList({ categories }) {
  const dispatch = useDispatch();

  const { tools, loading } = useSelector((state) => state.tools);
  const { users } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  // 🔥 FETCH
  useEffect(() => {
    const fetch = async () => {
      const res = await dispatch(
        getTools({
          mode: "admin", // 🔥 superadmin sees all
          search,
          category: selectedCategory?._id,
          email: selectedEmail !== "all" ? selectedEmail : undefined,
          page: currentPage,
          limit: 10,
        })
      );

      setPages(res.payload?.pages || 1);
    };

    fetch();
  }, [dispatch, search, selectedEmail, selectedCategory, currentPage]);

  return (
    <div>

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
      <UserDropdown
        users={users}
        selectedEmail={selectedEmail}
        setSelectedEmail={setSelectedEmail}
        setCurrentPage={setCurrentPage}
      />

      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setCurrentPage={setCurrentPage}
      />

      {/* CLEAR */}
      <button
        onClick={() => {
          setSelectedEmail("all");
          setSelectedCategory(null);
          setSearch("");
          setCurrentPage(1);
        }}
        className="text-red-500 mb-3"
      >
        Clear Filters
      </button>

      {/* LIST */}
      <div className="bg-white shadow">
        {tools.map((tool) => (
          <div key={tool._id} className="p-4 border-b flex justify-between">

            <div>
              <p className="font-bold">{tool.name}</p>
              <p className="text-sm text-gray-500">
                {tool.category?.name}
              </p>
              <p className="text-xs text-gray-400">
                {tool.addedBy?.email}
              </p>
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
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: pages }, (_, i) => (
          <button key={i} onClick={() => setCurrentPage(i + 1)}>
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
            })
          );
          setOpenModal(false);
        }}
      />
    </div>
  );
}

export default SuperAdminToolList;