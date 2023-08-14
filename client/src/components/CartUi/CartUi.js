import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import defaultImage from "../../assets/default.png";

const Cart = () => {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-black p-4 text-white z-50 ">
      <div className="flex items-center justify-between border-b mb-4">
        <h1 className="semibold border-b border-black">Your Cart</h1>
        <span>
          <AiOutlineCloseCircle />
        </span>
      </div>

      <div className="flex flex-col gap-1 border-b">
        <div className="flex gap-4 items-center py-2">
          <img
            src={defaultImage}
            alt=""
            className="object-cover w-[80px] h-[80px]"
          />
          <div className="flex flex-col gap-1 ">
            <h4 className="text-sm">Iphone 14 pro max</h4>
            <span className="text-sm">Color:Black</span>
            <span>23.400.000 VND</span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
