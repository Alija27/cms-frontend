import axios from 'axios';
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
            console.log('Request timed out');
          }
          return Promise.reject(error);
        
    }


);

export default axiosInstance;