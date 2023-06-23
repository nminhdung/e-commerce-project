import React from "react";
import CustomSlider from "./CustomSlider";

const NewArrivals = ({products}) => {
  return (
    <div className="w-full ">
      <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
        New arrivals
      </h3>
      <div className=" mt-4 mx-[-10px]">
        <CustomSlider products={products}/>
      </div>
    </div>
  );
};

export default NewArrivals;
