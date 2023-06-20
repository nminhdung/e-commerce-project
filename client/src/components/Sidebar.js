import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../api/apps";
import { createSlug } from "../utils/helpers";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const categories = useSelector((state) => state.app.categories);

  return (
    <div className="flex flex-col border">
      <h1 className="px-5 pt-[15px] pb-[14px] text-base bg-main text-white font-semibold">
        All Collections
      </h1>
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
