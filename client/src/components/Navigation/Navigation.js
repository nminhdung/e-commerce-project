import React from "react";
import { navigation } from "../../utils/constants";
import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";
import path from "../../utils/paths";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "../../store/user/userSlice";
const { AiOutlineCloseCircle } = icons;

const Navigation = ({ isNav, handleNav }) => {
  const { current, isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="hidden w-full mx-auto lg:w-main h-[48px] py-2 text-sm border-y mb-6 lg:flex items-center">
        {navigation.map((navElement) => {
          return (
            <NavLink
              to={navElement.path}
              key={navElement.id}
              className={(navActive) =>
                navActive.isActive
                  ? "pr-12 hover:text-main text-main"
                  : "pr-12 hover:text-main"
              }
            >
              {navElement.value}
            </NavLink>
          );
        })}
      </div>
      {/* mobile menu */}
      <div
        className={
          isNav
            ? "bg-black fixed p-4 top-0 left-0 w-full h-full z-50  lg:py-2 text-sm border-y lg:text-black  text-white flex flex-col gap-y-4 lg:items-center  duration-300"
            : "bg-black fixed p-4 top-0 left-[-100%] w-full h-full z-50  lg:py-2 text-sm border-y lg:text-black  text-white flex flex-col gap-y-4 lg:items-center  duration-300"
        }
      >
        {navigation.map((navElement) => {
          return (
            <NavLink
              onClick={() => handleNav(false)}
              to={navElement.path}
              key={navElement.id}
              className={(navActive) =>
                navActive.isActive
                  ? "lg:pr-12 hover:text-main text-main py-4 lg:py-0 "
                  : "lg:pr-12 hover:text-main py-4 lg:py-0 "
              }
            >
              {navElement.value}
            </NavLink>
          );
        })}
        {isNav &&
          (isLoggedIn && current ? (
            <div className="flex items-center gap-2 text-sm">
              <span>{` ${current?.firstname} ${current?.lastname}`}</span>
              <span
                onClick={() => {
                  dispatch(logout());
                }}
                className="hover:rounded-full hover:bg-gray-200 hover:text-main p-2 cursor-pointer"
              >
                <AiOutlineLogout size={18} />
              </span>
            </div>
          ) : (
            <NavLink
              to={`/${path.LOGIN}`}
              className={(navActive) =>
                navActive.isActive
                  ? "lg:pr-12 hover:text-main text-main py-4 lg:py-0 "
                  : "lg:pr-12 hover:text-main py-4 lg:py-0 "
              }
            >
              Login
            </NavLink>
          ))}
        <AiOutlineCloseCircle
          onClick={() => handleNav(false)}
          className="lg:hidden absolute top-[20px] right-10 cursor-pointer"
          size={30}
        />
      </div>
    </>
  );
};

export default Navigation;
