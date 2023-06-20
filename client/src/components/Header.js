import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import paths from "../utils/paths";

const { RiPhoneFill, MdEmail, BsFillBagFill, BiUser } = icons;
const Header = () => {
  return (
    <header className=" w-main flex justify-between h-[110px] py-[35px]">
     <Link to={`/${paths.HOME}`}> <img src={logo} alt="logo" className="object-contain w-[234px]  " /></Link>
      <div className="flex text-[13px] ">
        <div className="flex flex-col items-center px-6 ">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" size={15} />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r border-l ">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" size={15} />
            <span className="font-semibold uppercase">
              support@tadathemes.com
            </span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer">
          <BsFillBagFill color="red" size={15} />
          <span>O item(s)</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 cursor-pointer">
          <BiUser size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
