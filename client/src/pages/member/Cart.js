import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/default.png";
import { formatMoney, formatPrice } from "../../utils/helpers";
import { apiRemoveCart } from "../../api";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../store/user/asyncThunk";

const Cart = () => {
  const { current } = useSelector((state) => state.user);
  const { subTotal } = useSelector((state) => state.app);
  console.log(subTotal)
  const dispatch = useDispatch()
  const handleRemoveCart = async (pid,color) => {
    console.log(color)
    const res = await apiRemoveCart(pid,color);
    if (res.success) {
      toast.success(res.mes);
      dispatch(getCurrentUser())
    }
    else{
      toast.error(res.mes)
    }
  };
  return (
    <div className="w-full">
      <h1 className="p-4 font-semibold text-4xl">Your cart</h1>
      <div className="p-4 scrollbar flex flex-col gap-2 max-h-screen overflow-y-auto ">
        {current?.cart.length === 0 && <h1>Your cart is currently empty.</h1>}
        {current?.cart.map((productCart) => {
          return (
            <article
              className="bg-white shadow-md p-4 grid md:grid-cols-5"
              key={productCart.product._id }
            >
              <div className="flex items-center gap-2 md:col-span-3  ">
                <img
                  src={productCart.product.thumb || defaultImg}
                  alt="thumb"
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="gap-y-1">
                  <h4 className="font-semibold">{productCart.product.title}</h4>
                  <span>{productCart.color}</span>
                  <p
                    className="text-main cursor-pointer"
                    onClick={() => handleRemoveCart(productCart.product._id,productCart.color)}
                  >
                    Remove
                  </p>
                </div>
              </div>
              <div className="md:cols-span-1 flex items-center flex-col justify-center gap-1">
                {" "}
                <h4 className="font-semibold">Quantity </h4>
                <span>{productCart.quantity}</span>
              </div>
              <div className="md:cols-span-1 flex items-center flex-col justify-center gap-1">
                {" "}
                <h4 className="font-semibold">Total </h4>
                <span className="text-main">
                  {formatMoney(
                    formatPrice(
                      productCart.quantity * productCart.product.price
                    )
                  )}{" "}
                  VND
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-semibold text-xl">
          SubTotal:{" "}
          <span className="text-main">
            {formatMoney(formatPrice(subTotal))} VND
          </span>
        </h2>
        <Link
          to="/"
          className="flex items-center px-4 py-2 gap-1 bg-green-500 font-medium text-white rounded-md"
        >
          Go Checkout
          <BsArrowRightShort size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Cart;
