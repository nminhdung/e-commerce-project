import React, { useEffect, useState } from "react";
import { apiGetOrderByUser } from "../../api";
import { formatMoney, formatPrice } from "../../utils/helpers";

const MyOrder = () => {
  const [ordersUser, setOrdersUser] = useState([]);
  const getOrderByUser = async () => {
    const res = await apiGetOrderByUser();
    if (res.success) {
      setOrdersUser(res.orders);
    }
  };
  useEffect(() => {
    getOrderByUser();
  }, []);
  console.log(ordersUser);
  if (ordersUser.length === 0) {
    return (
      <div className="flex items-center justify-center">
        You don't have any orders
      </div>
    );
  } else
    return (
      <div className="border p-4 bg-slate-300">
        {ordersUser.map((order, index) => {
          return (
            <article
              key={order._id}
              className="flex  bg-white shadow-md mb-4 p-2 gap-4"
            >
              <span className="font-semibold">{index + 1}</span>

              <div className="">
                <span className="font-semibold">Products</span>
                {order.products.map((item) => {
                  return (
                    <div key={item._id}>
                      <h2 className="font-semibold">
                        {item.product.title}
                        <span className="lowercase text-black">
                          ({item.color})
                        </span>
                      </h2>
                      <h3 className="flex items-center gap-2">
                        Quantity: {item.quantity}
                        <p>
                          Price:
                          <span className="font-semibold ml-2">
                            {formatMoney(formatPrice(item.price))} VND
                          </span>
                        </p>
                      </h3>
                    </div>
                  );
                })}
              </div>
              <span className="font-semibold flex  gap-2 ml-auto">
                Status:{" "}
                <span
                  className={`${
                    order.status === "Processing"
                      ? "text-main"
                      : "text-green-500"
                  }`}
                >
                  {order.status}
                </span>
              </span>
              <div className="text-black">
                Total :{" "}
                <span className="text-main">
                  {formatMoney(formatPrice(order.total))} VND
                </span>
              </div>
            </article>
          );
        })}
      </div>
    );
};

export default MyOrder;
