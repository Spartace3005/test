import axios from "axios";

const axiosCreate = axios.create({
    baseURL:process.env.REACT_APP_API_ENDPOINT,
    withCredentials:true,//cho phép cookie (localsto)
})


axiosCreate.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default axiosCreate;