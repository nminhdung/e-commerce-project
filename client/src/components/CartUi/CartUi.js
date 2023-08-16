import React, { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import defaultImage from "../../assets/default.png";
import { useDispatch, useSelector } from "react-redux";
import { getSubTotal, showCart } from "../../store/app/appSlice";
import { formatMoney, formatPrice } from "../../utils/helpers";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import path from "../../utils/paths";
const Cart = () => {
  const { subTotal } = useSelector((state) => state.app);
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(subTotal)
 
  return (
    <div className="absolute top-0 right-0  bottom-0 w-[400px]  bg-black flex flex-col text-white z-50  duration-500 px-6 py-4">
      <div className="flex items-center justify-between border-b border-gray-600 mb-4 py-4">
        <h1 className="font-semibold text-2xl">Your Cart</h1>
        <span
          className="text-main text-xl cursor-pointer"
          onClick={() => dispatch(showCart("close"))}
        >
          <AiOutlineCloseCircle />
        </span>
      </div>

      <div className="flex flex-col scrollbar gap-1 flex-auto max-h-full overflow-y-auto ">
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
                <div className="flex flex-col gap-1 ml-auto">
                  <span>Quantity</span>
                  <div className="border flex items-center justify-between">
                    <span className=" flex p-1 bg-main cursor-pointer ">-</span>
                    <span>{productCart.quantity}</span>
                    <span className="flex p-1 bg-main cursor-pointer">+</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border-t border-gray-500 py-4 ">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>{formatMoney(formatPrice(subTotal))}VND</span>
        </div>
        <div className="flex flex-col gap-2 mt-4">
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
            to={`/${path.MEMBER}`}
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

export default Cart;
