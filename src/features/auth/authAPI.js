import API from "../../services/api.js";

export const registerUserAPI = (data) =>
  API.post("/auth/register", data);

export const loginUserAPI = (data) =>
  API.post("/auth/login", data);

export const getMeAPI = () =>
  API.get("/auth/me");

export const logoutUserAPI = () =>
  API.post("/auth/logout");