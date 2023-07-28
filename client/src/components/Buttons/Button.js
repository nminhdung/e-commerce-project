import React from "react";

const Button = ({
  children,
  handleClick,
  style,
  iconBefore,
  iconAfter,
  fullWidth,
  type = "button",
}) => {
  return (
    <button
      type={type.toString()}
      className={
        style
          ? style
          : `px-4 py-2 rounded-md text-white bg-main font-semibold ${
              fullWidth ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      {iconBefore ? iconBefore : ""}
      <span>{children}</span>
      {iconAfter ? iconAfter : ""}
    </button>
  );
};

export default Button;
