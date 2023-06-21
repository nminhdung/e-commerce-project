import axios from "../axios";
export const apiGetProducts = (params) => {
  return axios({
    url: "/product/",
    method: "get",
    params
  });
};
