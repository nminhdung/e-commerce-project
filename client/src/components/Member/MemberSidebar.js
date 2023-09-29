import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoAdmin from "../../assets/logoadmin.png";
import { AiFillHome } from "react-icons/ai";
import { MemberSidebarList } from "../../utils/constants";
import { useSelector } from "react-redux";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import avatar from "../../assets/avatar-default.png";

const activeStyle =
  "px-4 py-2 flex items-center gap-2 text-main text-base bg-white";
const normalStyle =
  "px-4 py-2 flex items-center gap-2 text-base hover:bg-white hover:text-main ";
const MemberSidebar = () => {
  const { current, isLoggedIn } = useSelector((state) => state.user);

  const [actived, setActive] = useState([]);
  const handleActive = (tabID) => {
    if (actived.some((id) => id === tabID)) {
      const deletedTabID = actived.filter((id) => id !== tabID);
      setActive(deletedTabID);
    } else {
      setActive((prev) => [...prev, tabID]);
    }
  };

  return (
    <div className="w-full h-full bg-gray-100 shadow-md text-black ">
      <div className="w-full  flex flex-col justify-center items-center  py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-cover rounded-full bg-transparent"
        />
        <small>{`${current.firstname} ${current.lastname}`}</small>
      </div>
      {/* <Link to={"/"} className="flex  p-4 items-center gap-2 text-white">
        <AiFillHome />
        <span>Home</span>
      </Link> */}
      <div className="h-full w-full">
        {MemberSidebarList?.map((item) => {
          return (
            <div key={item.id} className="">
              {item.type === "single" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeStyle : normalStyle
                  }
                  to={item.path}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </NavLink>
              )}
              {item.type === "parent" && (
                <div className="flex flex-col text-base">
                  <div
                    onClick={() => handleActive(item.id)}
                    className="px-4 py-2 flex items-center justify-between hover:bg-white hover:text-main cursor-pointer "
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>

                    {actived.some((id) => id === item.id) ? (
                      <AiOutlineDown />
                    ) : (
                      <AiOutlineRight />
                    )}
                  </div>
                  {actived.some((id) => id === item.id) && (
                    <div className=" flex flex-col">
                      {item.submenu?.map((subItem, index) => {
                        return (
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? activeStyle : normalStyle + "pl-10"
                            }
                            to={subItem.path}
                            key={index}
                          >
                            {subItem.text}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemberSidebar;
