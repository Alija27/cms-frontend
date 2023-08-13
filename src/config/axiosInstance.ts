import axios from 'axios';
import { error_toast } from '../toast';
const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
        return config;
    },
    function (error) {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            error_toast('Request timed out');
            console.log('Request timed out');
          }
          error_toast(error);
          return Promise.reject(error);
        
    }


);

export default axiosInstance;