import React, { useEffect, useState } from "react";
import { apiGetOrderByUser } from "../../api";

const MyOrder = () => {
  const [ordersUser, setOrdersUser] = useState([]);
  const getOrderByUser = async () => {
    const res = await apiGetOrderByUser();
    if(res.success){
        setOrdersUser(res.orders)
    }
  };
  useEffect(() => {
    getOrderByUser();
  }, []);
 console.log(ordersUser)
  return (
    <div className="border rounded-[24px] p-2 bg-slate-700">
      <div></div>
    </div>
  );
};

export default MyOrder;
