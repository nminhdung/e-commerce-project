import axios from "../axios";
export const apiGetProducts = (params) => {
  return axios({
    url: "/product/",
    method: "get",
    params,
  });
};
export const apiGetProduct = (pid) => {
  return axios({
    url: "/product/" + pid,
    method: "get",
  });
};

export const apiRating = (data) => {
  return axios({
    url: "/product/rating",
    method: "put",
    data
  });
};