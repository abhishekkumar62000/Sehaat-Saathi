export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8001/api/v1";

export const token = localStorage.getItem("token");
