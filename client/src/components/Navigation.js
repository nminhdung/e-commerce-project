import React from "react";
import { navigation } from "../utils/constants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 text-sm border-y  flex items-center">
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
  );
};

export default Navigation;
