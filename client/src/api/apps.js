import axios from "../axios";
export const apiGetCategories = () => {
  return axios({ url: "/productcategory/", method: "get" });
};
