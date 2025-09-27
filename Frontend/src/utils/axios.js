import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "http://localhost:5000/api/v1",
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" : "/api/v1",
    withCredentials: true,
});