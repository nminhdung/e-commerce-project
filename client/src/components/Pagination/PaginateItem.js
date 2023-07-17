import React from "react";

const PaginateItem = ({ children }) => {
  return (
    <div
      className="px-4 py-2 cursor-pointer rounded-md hover:bg-main hover:text-white 
      transition duration-300"
    >
      {children}
    </div>
  );
};

export default PaginateItem;
