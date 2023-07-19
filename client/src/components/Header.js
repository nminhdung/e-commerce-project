import React from "react";
import logo from "../assets/logo.png";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import paths from "../utils/paths";
import path from "../utils/paths";
import { useSelector } from "react-redux";
const {
  RiPhoneFill,
  MdEmail,
  BsFillBagFill,
  BiUser,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} = icons;
const Header = ({ handleNav }) => {
  const { current } = useSelector((state) => state.user);
  return (
    <>
      <header
        className=" xl:w-main w-full  mx-auto
  flex items-center justify-between  lg:h-[110px] h-[80px] py-[35px] "
      >
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => handleNav(true)}
        >
          <AiOutlineMenu size={20} color="black" />
        </div>
        <Link to={`/${paths.HOME}`}>
          <img
            src={logo}
            alt="logo"
            className="object-contain h-[30%] lg:w-[234px]  "
          />
        </Link>

        <div className="hidden lg:flex text-[13px] ">
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
          {current && (
            <>
              <div className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer">
                <BsFillBagFill color="red" size={15} />
                <span>O item(s)</span>
              </div>
              <Link
                to={+current?.role === 12 ? `/${path.ADMIN}` : `${path.MEMBER}`}
                className="flex items-center justify-center gap-2 px-6 cursor-pointer"
              >
                <BiUser color="red" size={16} />
                <span>Profile</span>
              </Link>
            </>
          )}
        </div>

        <div className="lg:hidden">
          <AiOutlineShoppingCart size={30} color="black" />
        </div>
      </header>
    </>
  );
};

export default Header;
