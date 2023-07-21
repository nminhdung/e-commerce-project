import React, { memo } from "react";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Quantity</span>
      <div className="flex items-center bg-gray-300 text-black">
        <span
          className="text-[12px] p-2 border-r border-black  hover:bg-black
         hover:text-white cursor-pointer transition duration-300"
          onClick={() => {
            handleChangeQuantity("desc");
          }}
        >
          -
        </span>
        <input
          value={quantity}
          type="text"
          onChange={(e) => handleQuantity(e.target.value)}
          className="appearance-none w-[40px] outline-none bg-gray-300 text-black text-center"
        />
        <span
          className="text-[12px] p-2 border-l border-black hover:bg-black
         hover:text-white cursor-pointer transition duration-300"
          onClick={() => {
            handleChangeQuantity("incr");
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default memo(SelectQuantity);
