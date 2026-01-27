import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// Intercepteur de requête pour ajouter des logs
api.interceptors.request.use(
  (config) => {
    // Récupérer le token CSRF depuis les cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    if (token) {
      // Axios va automatiquement mettre ce token dans le header X-XSRF-TOKEN
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
    }

    console.log("Request Config:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Intercepteur de réponse pour ajouter des logs
api.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.error("Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return Promise.reject(error);
  },
);

export default api;
