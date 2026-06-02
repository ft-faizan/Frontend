import API from "../../services/api";

export const getFoldersAPI = (params) => API.get("/folders", { params });
export const createFolderAPI = (name) => API.post("/folders", { name });

export const deleteFolderAPI = (id) => API.delete(`/folders/${id}`);
export const updateFolderAPI = (id, name) => API.put(`/folders/${id}`, { name });