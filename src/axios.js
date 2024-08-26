import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL
    baseURL: "https://doc-back-m4c9.vercel.app"
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config
})

export default instance;