import React from "react";
import { CustomSlider } from "..";
import Loading from "../Common/Loading"
const NewArrivals = ({ products }) => {
  return (
    <div className="w-full ">
      <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
        New arrivals
      </h3>
      {products?.length === 0 ? <div className="flex items-center justify-center h-full mt-8"><Loading /></div> :
        <div className=" mt-4 mx-[-10px]">
          <CustomSlider products={products} />
        </div>
      }

    </div>
  );
};

export default NewArrivals;
