import axios from "axios";
import API from "./API";

const apiInstance = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const { data } = await axios.post(`${API.BASE_URL+API.Authentication.REFRESH}`, {
      refreshToken,
    });
    if(data.status === 200) {
      localStorage.setItem("accessToken", data.objects.accessToken);
      return data.objects.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Refresh token failed:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; 
    throw error;
  }
};

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        if(!newAccessToken) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const publicApiInstance = axios.create({
  baseURL: API.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { apiInstance, publicApiInstance };
