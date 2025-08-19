import axios from "axios";

// get token safely on the client-side
const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

// create Axios instance
export const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        Accept: "*/*",
    },
});

// request Interceptor
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                alert("Unauthorized");
            }
            if (error.response.status === 500) {
                console.error("Server Error");
            }
        }
        return Promise.reject(error);
    }
);
