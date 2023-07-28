import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logoAdmin from "../../../assets/logoadmin.png";
import { adminSidebarList } from "../../../utils/constants";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const activeStyle =
  "px-4 py-2 flex items-center gap-2 text-main text-base bg-white";
const normalStyle =
  "px-4 py-2 flex items-center gap-2 text-base hover:bg-white hover:text-main ";
const Sidebar = () => {
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
    <div className=" w-full h-full bg-zinc-800">
      <Link to={"/"} className="flex flex-col p-4 items-center gap-2 ">
        <img src={logoAdmin} alt="logo" className="object-cover w-[200px]" />
        <span>Admin site</span>
      </Link>
      <div>
        {adminSidebarList?.map((item) => {
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

export default Sidebar;
