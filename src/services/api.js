import axios from "axios";
axios.defaults.withCredentials = true; // 🔥 ADD THIS
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // 🔥 VERY IMPORTANT
});

export default API;