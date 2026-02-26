import axios from "axios";

const api = axios.create({
  baseURL: `http://${window.location.hostname}:4000/app/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default api;