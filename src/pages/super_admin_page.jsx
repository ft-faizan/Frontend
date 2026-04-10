import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../features/categories/categorySlice.js";
import { getCategoryStats,getUsers,updateCategory, 
  deleteCategory } from "../features/categories/categorySlice.js";
  import { getUserStats } from "../features/categories/categorySlice.js";

import { useToast } from "../context/ToastContext.jsx";

import CategoryModal from "../components/categorys_compo/CategoryModal.jsx";
import CategoryFilterBar from "../components/categorys_compo/CategoryFilterBar.jsx";
import Signin_signup_form from "../components/auth_compo/sigin_siginup_form.jsx";
import UserDropdown from "../components/categorys_compo/UserDropdown.jsx";

import SuperAdminToolList from "../components/tools_compo/SuperAdminToolList.jsx";

import { useNavigate } from "react-router-dom";

function Super_admin_page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { categories, loading, pages } = useSelector(
    (state) => state.categories,
  );

  const { stats } = useSelector((state) => state.categories);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { users } = useSelector((state) => state.categories);
  const { total } = useSelector((state) => state.categories);
  const { userStats } = useSelector((state) => state.categories);

  // 🔥 FETCH DATA
  useEffect(() => {
    dispatch(
      getCategories({
        page: currentPage,
        limit: 10,
        search,
        email: selectedEmail !== "all" ? selectedEmail : undefined,
      }),
    );
  }, [dispatch, currentPage, search, selectedEmail]);

  useEffect(() => {
    dispatch(getCategoryStats());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
  dispatch(getUserStats());
}, [dispatch]);

  // 🔥 FORMAT
  const formatName = (name) => name.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="p-6">
      {/* 🔥 TABS */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        {["dashboard", "categories", "tools", "create"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= DASHBOARD ================= */}
      {/* {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2>Total Categories</h2>
            <p className="text-3xl font-bold">{stats.totalCategories}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2>My Categories</h2>
            <p className="text-3xl font-bold">{stats.myCategories}</p>
          </div>
        </div>
      )} */}


{activeTab === "dashboard" && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

    {/* TOTAL CATEGORY */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 text-sm">Total Categories</h2>
      <p className="text-3xl font-bold">{stats.totalCategories}</p>
    </div>

    {/* USERS */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 text-sm">Total Users</h2>
      <p className="text-3xl font-bold">{userStats.totalUsers}</p>
    </div>

    {/* ADMINS */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 text-sm">Total Admins</h2>
      <p className="text-3xl font-bold">{userStats.totalAdmins}</p>
    </div>

    {/* SUPER ADMINS */}
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500 text-sm">Super Admins</h2>
      <p className="text-3xl font-bold">{userStats.totalSuperAdmins}</p>
    </div>

  </div>
)}

      {/* ================= CATEGORY TAB ================= */}
      {activeTab === "categories" && (
        <>
          <h1 className="text-2xl font-bold mb-4">All Categories</h1>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded mb-3"
            value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // 🔥 VERY IMPORTANT
            }}
          />

          {/* 🔥 EMAIL FILTER (SIMPLE VERSION FIRST) */}
          {/* <select
            value={selectedEmail}
            onChange={(e) => {
              setSelectedEmail(e.target.value);
              setCurrentPage(1);
              showToast("Filter applied", "success");
            }}
            className="p-2 border rounded mb-4"
          >
            <option value="all">All Users</option>

            {[...new Set(categories.map((c) => c.createdBy?.email))].map(
              (email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ),
            )}
          </select> */}
          {/* <select
            value={selectedEmail}
            onChange={(e) => {
              setSelectedEmail(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded mb-4"
          >
            <option value="all">All Users</option>

            {users.map((user) => (
              <option key={user._id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select> */}
          <UserDropdown
  users={users}
  selectedEmail={selectedEmail}
  setSelectedEmail={setSelectedEmail}
  setCurrentPage={setCurrentPage}
/>

          <button
  onClick={() => {
    setSelectedEmail("all");
    setSearch("");
    setCurrentPage(1);
  }}
  className="ml-3 text-sm text-red-500"
>
  Clear Filter
</button>

          {selectedEmail !== "all" && (
  <p className="mb-3 text-sm text-gray-600">
    📊 {selectedEmail} created <b>{total}</b> categories
  </p>
)}

          {/* 📦 LIST */}
          <div className="bg-white shadow rounded-lg">
            {loading ? (
              <p className="p-4">Loading...</p>
            ) : categories.length === 0 ? (
              <p className="p-4">No categories</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  className="p-4 border-b flex justify-between"
                >
                  <div>
                    <p
                      onClick={() => navigate(`/categories/${cat._id}/folders`)}
                      className="font-bold cursor-pointer"
                    >
                      {formatName(cat.name)}
                    </p>

                    <p className="text-sm text-gray-500">
                      Created by: {cat.createdBy?.name} ({cat.createdBy?.email})
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpenModal(true);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this category?")) return;

                      const res = await dispatch(deleteCategory(cat._id));

                      if (res.error) {
                        showToast("Delete failed", "error");
                      } else {
                        showToast("Category deleted", "success");
                      }

                      dispatch(
                        getCategories({
                          page: currentPage,
                          limit: 10,
                          search,
                          email:
                            selectedEmail !== "all" ? selectedEmail : undefined,
                        }),
                      );
                    }}
                    className="text-red-500 ml-3"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* 📄 PAGINATION */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: pages || 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                {i + 1}
              </button>
            ))}
          </div>

          <CategoryModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            initialData={selectedCategory}
            onSubmit={async (data) => {
              const res = await dispatch(
                updateCategory({
                  id: selectedCategory._id,
                  data,
                }),
              );

              if (res.error) {
                showToast(res.payload || "Update failed", "error");
              } else {
                showToast("Category updated", "success");
              }

              dispatch(
                getCategories({
                  page: currentPage,
                  limit: 10,
                  search,
                  email: selectedEmail !== "all" ? selectedEmail : undefined,
                }),
              );

              setOpenModal(false);
            }}
          />
        </>
      )}

      {/* ================= TOOLS ================= */}
      {activeTab === "tools" && (
         <SuperAdminToolList categories={categories} />
      )}

      {/* ================= CREATE ACCOUNT ================= */}
      {activeTab === "create" && (
        <div className="mt-4">
          <Signin_signup_form showRole={true} />
        </div>
      )}
    </div>
  );
}

export default Super_admin_page;
