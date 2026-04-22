import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getCategories,
  createCategory,
  updateCategory,
} from "../features/categories/categorySlice.js";

import CategoryModal from "../components/categorys_compo/CategoryModal.jsx";
import CategoryFilterBar from "../components/categorys_compo/CategoryFilterBar.jsx";
import { getCategoryStats } from "../features/categories/categorySlice.js";
import AdminToolList from "../components/tools_compo/AdminToolList.jsx";

import { useToast } from "../context/ToastContext.jsx";

import { useNavigate } from "react-router-dom";

function Admin_page() {
  const dispatch = useDispatch();

  const { categories, page, pages, loading } = useSelector(
    (state) => state.categories,
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { stats } = useSelector((state) => state.categories);

  const totalCategories = stats.totalCategories;
  const myCategories = stats.myCategories;

  useEffect(() => {
    dispatch(
      getCategories({
        mode,
        page: currentPage,
        limit: 10,
        search,
      }),
    );
  }, [dispatch, currentPage, search, mode]);
  useEffect(() => {
    dispatch(getCategoryStats());
  }, [dispatch]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setOpenModal(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setOpenModal(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
        if (selectedCategory.name === data.name) {
          showToast("You can't edit with same name", "error");
          return;
        }

        const res = await dispatch(
          updateCategory({
            id: selectedCategory._id,
            data,
          }),
        );

        if (res.error) {
          showToast(res.payload || "Update failed", "error");
        } else {
          showToast("Category updated successfully", "success");
        }
      } else {
        const res = await dispatch(createCategory(data));

        if (res.error) {
          showToast(res.payload || "Category already exists", "error");
        } else {
          showToast("Category created successfully", "success");
        }

        setCurrentPage(1);
      }

      dispatch(
        getCategories({
          mode,
          page: currentPage,
          limit: 10,
          search,
        }),
      );

      setOpenModal(false);
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  };

  const formatName = (name) => name.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-t ${
            activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 rounded-t ${
            activeTab === "categories"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Categories
        </button>

        <button
          onClick={() => setActiveTab("tools")}
          className={`px-4 py-2 rounded-t ${
            activeTab === "tools" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Tools
        </button>
      </div>
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* TOTAL */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500 text-sm">Total Categories</h2>
            <p className="text-3xl font-bold mt-2">{totalCategories}</p>
          </div>

          {/* MY */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500 text-sm">My Categories</h2>
            <p className="text-3xl font-bold mt-2">{myCategories}</p>
          </div>
        </div>
      )}

      {/* tabination two */}

      {activeTab === "categories" && (
        <>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Admin Categories</h1>

              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Create Category
              </button>
            </div>

            <CategoryFilterBar
              search={search}
              setSearch={setSearch}
              mode={mode}
              setMode={(value) => {
                setMode(value);

                if (value === "admin") {
                  showToast("Created by me filter applied", "success");
                } else {
                  showToast("All filter cleared", "success");
                }
              }}
              setCurrentPage={setCurrentPage}
            />

            <div className="bg-white shadow rounded-lg">
              {loading ? (
                <p className="p-4">Loading...</p>
              ) : categories.length === 0 ? (
                <p className="p-4">No categories found</p>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex justify-between items-center border-b p-4"
                  >
                    <span
                      onClick={() => navigate(`/categories/${cat._id}/folders`)}
                      className="font-medium cursor-pointer hover:text-blue-600"
                    >
                      {formatName(cat.name)}
                    </span>

                    {cat.createdBy?._id?.toString() ===
                    (user?._id || user?.id)?.toString() ? (
                      <button
                        onClick={() => handleEdit(cat)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">Not allowed</span>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 mt-4">
              {Array.from({ length: pages || 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <CategoryModal
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              onSubmit={handleSubmit}
              initialData={selectedCategory}
              loading={loading}
            />
          </div>
        </>
      )}

      {/* tabnitaion three */}

      {activeTab === "tools" && <AdminToolList categories={categories} />}
    </>
  );
}

export default Admin_page;
