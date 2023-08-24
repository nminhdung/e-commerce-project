import React, { useEffect, useState } from "react";
import path from "../../utils/paths";
import defaultImage from "../../assets/default.png";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../../store/app/appSlice";
import { formatMoney, formatPrice } from "../../utils/helpers";
import { BsArrowRightShort } from "react-icons/bs";
import { apiRemoveCart, apiRemoveAllProductCart } from "../../api";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../store/user/asyncThunk";
import Button from "../Buttons/Button";
import {
  handleQuantity,
  removeAllItems,
  removeItem,
  showCartUi,
} from "../../store/cart/cartSlice";
const CartUi = () => {
  const { subTotal } = useSelector((state) => state.app);
  const { current } = useSelector((state) => state.user);
  const { cartItems,total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveCart = async (pid, color) => {
    const res = await apiRemoveCart(pid, color);
    if (res.success) {
      dispatch(getCurrentUser());
    } else {
      return;
    }
  };
  const handleRemoveAllCart = async () => {
    const res = await apiRemoveAllProductCart();
    if (res.success) {
      dispatch(getCurrentUser());
    } else {
      return;
    }
  };
  const handleRemoveAll = () => {
    dispatch(removeAllItems());
  };
  return (
    <div
      className="absolute top-0 right-0  bottom-0 w-[400px]  bg-black flex flex-col text-white z-50  duration-500 px-6 py-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between border-b border-gray-600 mb-4 py-4">
        <h1 className="font-semibold text-2xl">Your Cart</h1>
        <span
          className="text-main text-xl cursor-pointer"
          onClick={() => {
            // dispatch(showCart("close"));
            dispatch(showCartUi("close"));
          }}
        >
          <AiOutlineCloseCircle />
        </span>
      </div>
      {/* Them san pham gio hang bang api */}
      {/* <div className="flex flex-col scrollbar gap-1 flex-auto max-h-full overflow-y-auto ">
        {current?.cart?.length === 0 && <h1>Your cart is currently empty.</h1>}
        {current?.cart?.length > 0 &&
          current?.cart?.map((productCart) => {
            return (
              <div
                key={productCart.product._id}
                className="flex gap-4 items-center py-2  "
              >
                <img
                  src={productCart.product.thumb || defaultImage}
                  alt="thumb"
                  className="object-cover w-[80px] h-[80px]"
                />
                <div className="flex flex-col gap-1 ">
                  <h4 className="text-sm">{productCart.product.title}</h4>
                  <span className="text-sm">{productCart.color}</span>

                  <span>
                    {formatMoney(formatPrice(productCart.product.price))} VND
                  </span>
                </div>

                <div className="flex flex-col gap-4 ml-auto items-center">
                  <AiFillCloseCircle
                    size={18}
                    className=" hover:text-main cursor-pointer transition duration-300"
                    onClick={(e) =>
                      handleRemoveCart(
                        productCart.product._id,
                        productCart.color
                      )
                    }
                  />
                  <div className="border flex items-center justify-between">
                    <span className="flex px-1 cursor-pointer hover:bg-gray-800 transition duration-300">
                      -
                    </span>
                    <span className="flex px-4 border-r border-l ">
                      {productCart.quantity}
                    </span>
                    <span className="flex px-1 cursor-pointer hover:bg-gray-800 transition duration-300">
                      +
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div> */}
      {/* ############## */}

      {/* Them san pham gio hang bang bien local redux */}

      <div className="flex flex-col scrollbar gap-1 flex-auto max-h-full overflow-y-auto ">
        {cartItems.length === 0 && <h1>Your cart is currently empty.</h1>}
        {cartItems.length > 0 &&
          cartItems.map((productCart) => {
            return (
              <div
                key={productCart._id}
                className="flex gap-4 items-center py-2  "
              >
                <img
                  src={productCart.thumb || defaultImage}
                  alt="thumb"
                  className="object-cover w-[80px] h-[80px]"
                />
                <div className="flex flex-col gap-1 ">
                  <h4 className="text-sm">{productCart.title}</h4>
                  <span className="text-sm">{productCart.color}</span>

                  <span>{formatMoney(formatPrice(productCart.price))} VND</span>
                </div>

                <div className="flex flex-col gap-4 ml-auto items-center">
                  <AiFillCloseCircle
                    size={18}
                    className=" hover:text-main cursor-pointer transition duration-300"
                    onClick={(e) =>
                      dispatch(
                        removeItem({
                          _id: productCart._id,
                          color: productCart.color,
                        })
                      )
                    }
                  />
                  <div className="border flex items-center justify-between">
                    <span
                      className="flex px-1 cursor-pointer hover:bg-gray-800 transition duration-300"
                      onClick={() =>
                        dispatch(
                          handleQuantity({
                            type: "des",
                            _id: productCart._id,
                          })
                        )
                      }
                    >
                      -
                    </span>

                    <span className="flex min-w-[40px] border-r border-l justify-center items-center">
                      {productCart.quantity}
                    </span>
                    <span
                      className="flex px-1 cursor-pointer hover:bg-gray-800 transition duration-300"
                      onClick={() =>
                        dispatch(
                          handleQuantity({
                            type: "inc",
                            _id: productCart._id,
                          })
                        )
                      }
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* ############## */}

      <div className="border-t border-gray-500 py-4 ">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>{formatMoney(formatPrice(total))} VND</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {/* {current?.cart?.length > 0 && (
            <Button handleClick={handleRemoveAllCart} fullWidth>
              Clear all
            </Button>
          )} */}
          {cartItems.length > 0 && (
            <Button handleClick={handleRemoveAll} fullWidth>
              Clear all
            </Button>
          )}
          <h4 className="text-center italic text-gray-500 text-sm">
            Shipping, taxes, and discounts calculated at checkout.
          </h4>
          <Link
            to={`/${path.MEMBER}/${path.CART}`}
            className="w-full flex items-center justify-center p-2 text-sm bg-main text-white tracking-widest "
          >
            SHOPPING CART
            <span>
              <BsArrowRightShort />
            </span>
          </Link>
          <Link
            to={`/${path.CHECKOUT}`}
            className="w-full flex items-center justify-center p-2 text-sm bg-main text-white  tracking-widest "
          >
            CHECK OUT
            <span>
              <BsArrowRightShort />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartUi;
