import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/default.png";
import { formatMoney, formatPrice } from "../../utils/helpers";
import {
  apiRemoveCart,
  apiCreateOrder,
  apiRemoveAllProductCart,
} from "../../api";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../store/user/asyncThunk";
import Button from "../../components/Buttons/Button";
import {
  handleQuantity,
  removeAllItems,
  removeItem,
} from "../../store/cart/cartSlice";

const Cart = () => {
  const { current } = useSelector((state) => state.user);
  const { subTotal } = useSelector((state) => state.app);
  const { total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const handleRemoveCart = async (pid, color) => {
  //   const res = await apiRemoveCart(pid, color);
  //   if (res.success) {
  //     toast.success(res.mes);
  //     dispatch(getCurrentUser());
  //   } else {
  //     toast.error(res.mes);
  //   }
  // };
  const handleCheckout = async () => {
    const res = await apiCreateOrder();
    if (res.success) {
      toast.success(res.mes);
    } else {
      toast.error(res.mes);
    }
  };
  // const handleRemoveAllCart = async () => {
  //   const res = await apiRemoveAllProductCart();
  //   if (res.success) {
  //     dispatch(getCurrentUser());
  //   } else {
  //     return;
  //   }
  // };
  const handleRemoveAll = () => {
    dispatch(removeAllItems());
  };
  return (
    <div className="w-full">
      <h1 className="p-4 font-semibold text-4xl">Your cart</h1>
      <div className="p-4 scrollbar flex flex-col gap-2 max-h-screen overflow-y-auto ">
        {/* {current?.cart.length === 0 && <h1>Your cart is currently empty.</h1>}
        {current?.cart.map((productCart) => {
          return (
            <article
              className="bg-white shadow-md p-4 grid md:grid-cols-5"
              key={productCart.product._id}
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
                    onClick={() =>
                      handleRemoveCart(
                        productCart.product._id,
                        productCart.color
                      )
                    }
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
        })} */}
        {cartItems.length === 0 && <h1>Your cart is currently empty.</h1>}
        {cartItems.map((productCart) => {
          return (
            <article
              className="bg-white shadow-md p-4 grid md:grid-cols-5"
              key={productCart._id}
            >
              <div className="flex items-center gap-2 md:col-span-3  ">
                <img
                  src={productCart.thumb || defaultImg}
                  alt="thumb"
                  className="w-[100px] h-[100px] object-cover"
                />
                <div className="gap-y-1">
                  <h4 className="font-semibold">{productCart.title}</h4>
                  <span>{productCart.color}</span>
                  <p
                    className="text-main cursor-pointer"
                    onClick={() =>
                      dispatch(
                        removeItem({
                          _id: productCart._id,
                          color: productCart.color,
                        })
                      )
                    }
                  >
                    Remove
                  </p>
                </div>
              </div>
              <div className="md:cols-span-1 flex items-center flex-col justify-center gap-1">
                {" "}
                <h4 className="font-semibold">Quantity </h4>
                <div className="flex items-center">
                  <span
                    className="px-2 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        handleQuantity({ type: "des", _id: productCart._id })
                      )
                    }
                  >
                    -
                  </span>
                  <span className="flex min-w-[40px] border-l-2 border-r-2 border-gray-950 justify-center items-center">
                    {productCart.quantity}
                  </span>
                  <span
                    className="px-2 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        handleQuantity({ type: "inc", _id: productCart._id })
                      )
                    }
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="md:cols-span-1 flex items-center flex-col justify-center gap-1">
                {" "}
                <h4 className="font-semibold">Total </h4>
                <span className="text-main">
                  {formatMoney(
                    formatPrice(productCart.quantity * productCart.price)
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
            {/* {formatMoney(formatPrice(subTotal))} VND */}
            {formatMoney(formatPrice(total))} VND
          </span>
        </h2>
        <div className="flex items-center gap-2">
          {/* <Button handleClick={handleRemoveAllCart}>Clear all</Button> */}
          <Button handleClick={handleRemoveAll}>Clear all</Button>
          <button
            className="flex items-center px-4 py-2 gap-1 bg-green-500 font-medium text-white rounded-md"
            onClick={() => handleCheckout()}
          >
            Go Checkout
            <BsArrowRightShort size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
