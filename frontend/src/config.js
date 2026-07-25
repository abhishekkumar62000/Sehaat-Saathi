export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8001/api/v1";

export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

export const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

