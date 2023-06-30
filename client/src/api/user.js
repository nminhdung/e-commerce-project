import axios from "../axios";
export const apiRegister = (data) => {
  return axios({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });
};
export const apiConfirmRegister = (token) => {
  return axios({
    url: "/user/confirmregister/" + token,
    method: "put",
  });
};
export const apiLogin = (data) => {
  return axios({
    url: "/user/login",
    method: "post",
    data,
  });
};
export const getCurrentUser = () => {
  return axios({ url: "/user/current", method: "get" });
};
export const apiForgotPassword = (data) => {
  return axios({
    url: "/user/forgotpassword",
    method: "post",
    data,
  });
};
export const apiResetPassword = (data) => {
  return axios({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
};
