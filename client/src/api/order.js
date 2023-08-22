import axios from "../axios";
export const apiCreateOrder = () => {
  return axios({ url: "/order", method: "post" });
};
