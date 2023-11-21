import axios from "axios";
import { apiRefreshToken } from "./api";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL:"https://digital-mern-stacks-api.onrender.com/api"
});
//luu cookie ben server gui qua client
instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  function (config) {
    let token =
      window.localStorage.getItem("persist:shop/user") &&
      JSON.parse(
        window.localStorage.getItem("persist:shop/user")
      )?.token?.slice(1, -1);
    config.headers = { ...config.headers, authorization: `Bearer ${token}` };
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

//truoc khi tra du lieu ve cho nguoi dung
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await apiRefreshToken();
      if (res.success) {
        window.localStorage.setItem(
          "persist:shop/user",
          JSON.stringify({
            ...window.localStorage.getItem("persist:shop/user"),
            token: `"${res.newAccessToken}"`,
          })
        );
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${window.localStorage.getItem("persist:shop/user").token}`;
        return instance(originalRequest);
      }
    }
    // if (error.response.status === 401) {
    //   const res = await apiRefreshToken();
    //   if (res.success) {
    //     window.localStorage.setItem(
    //       "persist:shop/user",
    //       JSON.stringify({
    //         ...window.localStorage.getItem("persist:shop/user"),
    //         token: res.newAccessToken,
    //         isLoggedIn: true,
    //       })
    //     );
    //     error.config.headers = {
    //       ...error.config.headers,
    //       authorization: `Bearer ${res.newAccessToken}`,
    //     };
    //   } else {
    //     return Promise.reject(error);
    //   }
    //   return instance(error.config);
    // }
    // // return error.response.data;
    return Promise.reject(error);
  }
);

export default instance;
