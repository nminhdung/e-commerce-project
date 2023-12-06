import React from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../utils/helpers";
import { useSelector } from "react-redux";
import Loading from "../Common/Loading";
const Sidebar = () => {
  const categories = useSelector((state) => state.app.categories);

  return (
    <div className="flex flex-col border h-full">
      <h1 className="px-5 pt-[15px] pb-[14px] text-base bg-main text-white font-semibold">
        All Collections
      </h1>
      {categories.length === 0 && <div className="flex justify-center items-center w-full h-full"><Loading /></div>}
      {categories &&
        categories.map((category) => {
          return (
            <NavLink
              to={createSlug(category.title)}
              key={createSlug(category.title)}
              className={({ isActive }) =>
                isActive
                  ? "px-5 pt-[15px] pb-[14px] text-sm hover:text-main text-white bg-main"
                  : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              }
            >
              {category.title}
            </NavLink>
          );
        })}
    </div>
  );
};

export default Sidebar;
