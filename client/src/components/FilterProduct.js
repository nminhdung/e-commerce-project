import React, { memo } from "react";
import icons from "../utils/icons";

const { AiOutlineDown } = icons;
const FilterProduct = ({ name, activeClick, changeFilter }) => {
  return (
    <div
      className="p-3 border text-gray-500 relative border-gray-800 flex items-center gap-2 cursor-pointer"
      onClick={() => changeFilter(name)}
    >
      <span className="text-xs capitalize">{name}</span>
      <AiOutlineDown size={10} />
      {activeClick === name && (
        <div className="absolute w-full left-0 top-full p-4 bg-main"></div>
      )}
    </div>
  );
};

export default memo(FilterProduct);
