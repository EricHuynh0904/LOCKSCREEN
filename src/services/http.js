import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});


instance.interceptors.request.use(function (config) {
   
        const token = localStorage.getItem("token");
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
} else {
  delete config.headers.Authorization; 
}


  return config;
  }, function (error) {
   
    return Promise.reject(error);
  });


instance.interceptors.response.use(function (response) {
   
    return response.data;
  }, function (error) {
    
    return Promise.reject(error);
  });

  export default instance;