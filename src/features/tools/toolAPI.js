import API from "../../services/api";

// 🟢 USER → all tools
export const getAllToolsAPI = (params) =>
  API.get("/tools", { params });

// 🔴 ADMIN / SUPERADMIN
export const getAdminToolsAPI = (params) =>
  API.get("/tools/admin", { params });

// ✏️ UPDATE TOOL
export const updateToolAPI = (id, formData) =>
  API.put(`/tools/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
// DELETE
export const deleteToolAPI = (id) =>
  API.delete(`/tools/${id}`);

// ➕ CREATE TOOL
export const createToolAPI = (formData) =>
  API.post("/tools", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });