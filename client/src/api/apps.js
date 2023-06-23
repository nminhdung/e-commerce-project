import axios from "../axios";
export const apiGetCategories = () => {
  return axios({ url: "/productcategory/", method: "get" });
};
export const apiGetProducts = (params) => {
  return axios({ url: "/product/", method: "get", params });
};
