import React from "react";

const SortProduct = ({ value, changeValue, options }) => {
  return (
    <select
      className="p-2 border capitalize outline-none"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Default</option>
      {options?.map((option) => {
        return (
          <option key={option.id} value={option.type}>
            {option.display}
          </option>
        );
      })}
    </select>
  );
};

export default SortProduct;
