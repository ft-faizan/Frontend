import API from "../../services/api";

// ➕ create
export const createCategoryAPI = (data) =>
  API.post("/categories", data);

// 📥 get
export const getCategoriesAPI = (params) =>
  API.get("/categories", { params });

// ❌ delete
export const deleteCategoryAPI = (id) =>
  API.delete(`/categories/${id}`);

// ✏️ update
export const updateCategoryAPI = (id, data) =>
  API.put(`/categories/${id}`, data);

export const getCategoryStatsAPI = () =>
  API.get("/categories/stats");

export const getUsersAPI = () => API.get("/users");

export const getUserStatsAPI = () => API.get("/users/stats");