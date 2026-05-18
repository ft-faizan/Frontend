// import API from "../../services/api";

// export const saveToolAPI = (formData) => 
//   API.post("/saved-tools", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

// export const getSavedToolsAPI = (params) => API.get("/saved-tools", { params });

// export const deleteSavedToolAPI = (id) => API.delete(`/saved-tools/${id}`);

// // export const moveSavedToolAPI = (id, folderId) => 
// //   API.put(`/saved-tools/${id}/move`, { folderId });

// export const moveSavedToolAPI = (id, data) => 
//   API.put(`/saved-tools/${id}/move`, data);



import API from "../../services/api";

export const saveToolAPI = (formData) => 
  API.post("/saved-tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ 1. Save PLATFORM tool (JSON)
export const savePlatformToolAPI = (data) =>
  API.post("/saved-tools/platform", data);

// ✅ 2. Save CUSTOM tool (with image)
export const saveCustomToolAPI = (formData) =>
  API.post("/saved-tools/custom", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ 3. Get all saved tools
export const getSavedToolsAPI = (params) =>
  API.get("/saved-tools", { params });

// ✅ 4. Delete tool
export const deleteSavedToolAPI = (id) =>
  API.delete(`/saved-tools/${id}`);

// ✅ 5. Move tool (folder logic)
export const moveSavedToolAPI = (id, data) =>
  API.put(`/saved-tools/${id}/move`, data);

// ✅ 6. Update custom tool (IMPORTANT)
export const updateCustomToolAPI = (id, formData) =>
  API.put(`/saved-tools/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });