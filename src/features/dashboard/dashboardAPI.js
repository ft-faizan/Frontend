import API from "../../services/api";

export const getStatsAPI    = ()          => API.get("/dashboard/stats");
export const getActivityAPI = (days = 7) => API.get(`/dashboard/activity?days=${days}`);