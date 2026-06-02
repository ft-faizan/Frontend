

import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  // baseURL: "http://localhost:5000/api", // development 
    baseURL: "https://mern-1-2ntx.onrender.com/api", // production

  withCredentials: true,
});

export default API;