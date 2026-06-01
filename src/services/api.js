// import axios from "axios";
// axios.defaults.withCredentials = true; // 🔥 ADD THIS
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true, // 🔥 VERY IMPORTANT
// });

// export default API;






// import axios from "axios";

// axios.defaults.withCredentials = true;

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
//   withCredentials: true,
// });

// // 🔥 ADD THIS BLOCK (MOST IMPORTANT)
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;




import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
  // baseURL: "http://localhost:5000/api", // development 
    baseURL: "https://mern-1-2ntx.onrender.com/api", // production

  withCredentials: true,
});

export default API;