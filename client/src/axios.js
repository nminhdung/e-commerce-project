import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
instance.interceptors.request.use(
  function (config) {
    let token =
      window.localStorage.getItem("persist:shop/user") &&
      JSON.parse(
        window.localStorage.getItem("persist:shop/user")
      )?.token?.slice(1, -1);
    config.headers = {
      authorization: `Bearer ${token}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);

export default instance;
