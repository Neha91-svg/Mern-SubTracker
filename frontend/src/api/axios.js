import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api",

    withCredentials: true, // cookies for auth
});

export default api;
