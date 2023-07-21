import React from "react";

const SelectOptions = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-full border shadow-md flex items-center justify-center bg-main border-main
    text-white
     hover:bg-black hover:text-white hover:border-black transition duration-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default SelectOptions;
