import axios from "../axios";

export const apiCreateOrder = (data) => {
  return axios({ url: "/order/createorder", method: "post", data });
};
export const apiGetOrderByUser = () => {
  return axios({ url: "/order/", method: "get" });
};
