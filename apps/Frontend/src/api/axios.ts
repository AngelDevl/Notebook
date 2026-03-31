import axios from "axios";

const api_port = import.meta.env.VITE_EXPRESS_API_PORT
const api = axios.create({
  baseURL: `http://${window.location.hostname}:${api_port}/app/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default api;