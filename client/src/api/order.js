import axios from "../axios";

export const apiCreateOrder = (data) => {
  return axios({ url: "/order/createorder", method: "post", data });
};
