import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/paths";

const TopHeader = () => {
  return (
    <div className="h-[38px] w-full bg-main flex justify-center items-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="pr-2 border-r">ORDER ONLINE OR CALL US (+1800) 000 8808 </span>
          <span>VND</span>
        </div>
        <div className="flex items-center ">
          <Link to={`/${path.LOGIN}`} className="hover:text-gray-800 transition duration-300">Sign In or Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
