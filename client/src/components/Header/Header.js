import React, { useState } from "react";
import logo from "../../assets/logo.png";
import icons from "../../utils/icons";
import path from "../../utils/paths";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/user/userSlice";
import { showCartUi } from "../../store/cart/cartSlice";
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
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showOption, setShowOption] = useState(false);
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
        <Link to={`/${path.HOME}`}>
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
          <div
            className="flex items-center justify-center gap-2 border-r px-6 cursor-pointer"
            onClick={() => {
              // dispatch(showCart("open"));
              dispatch(showCartUi("open"));
            }}
          >
            <BsFillBagFill color="red" size={15} />
            {/* <span>{`${current.cart?.length || 0} item(s)`}</span> */}
            <span>{cartItems.length || 0} item(s)</span>
          </div>
          {current && (
            <>
              <div
                className="relative flex gap-2 px-6 items-center"
                onMouseEnter={() => setShowOption(true)}
              >
                <BiUser color="red" size={16} />{" "}
                <span className="cursor-pointer">Profile</span>
                {showOption && (
                  <div
                    onMouseEnter={() => setShowOption(true)}
                    onMouseLeave={() => setShowOption(false)}
                    className="absolute top-full left-[10px] w-full bg-white shadow-md min-w-[200px]"
                  >
                    <Link
                      to={`/${path.MEMBER}/${path.PERSONAL}`}
                      className="p-2 flex text-sm hover:bg-sky-100 transition duration-300"
                    >
                      Personal
                    </Link>
                    {+current.role === 12 && (
                      <Link
                        to={`/${path.ADMIN}`}
                        className="p-2 flex text-sm hover:bg-sky-100 transition duration-300"
                      >
                        Admin
                      </Link>
                    )}
                    <span
                      onClick={() => dispatch(logout())}
                      className="p-2 w-full cursor-pointer hover:bg-sky-100 flex transition duration-300"
                    >
                      Log out
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="lg:hidden cursor-pointer" onClick={ ()=>dispatch(showCartUi("open"))}>
          <AiOutlineShoppingCart size={30} color="black" />
        </div>
      </header>
    </>
  );
};

export default Header;
