const getBaseUrl = () => {
  if (import.meta.env.VITE_BACKEND_URL) {
    // If user explicitly provided a backend URL, ensure it doesn't have a trailing slash
    return import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
  }
  
  // If running locally (even in production preview mode), use local backend
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:8001/api/v1";
  }

  // In production (Vercel), if no explicit URL is given, use the relative path
  // to hit the Vercel serverless functions defined in vercel.json
  if (import.meta.env.MODE === 'production') {
    return "/api/v1";
  }
  // Local development fallback
  return "http://localhost:8001/api/v1";
};

export const BASE_URL = getBaseUrl();
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null);

export const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

