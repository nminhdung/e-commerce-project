import axios from "../axios";
export const apiGetCategories = () => {
  return axios({ url: "/productcategory/", method: "get" });
};

export const apiGetBrands = () => {
  return axios({ url: "/brand/", method: "get" });
};
export const apiRefreshToken = () => {
  return axios({ url: "/user/refreshtoken/", method: "get" });
};
