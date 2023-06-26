import React from "react";

const Button = ({
  name,
  handleClick,
  style,
  iconBefore,
  iconAfter,
  fullWidth,
}) => {
  return (
    <button
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
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
    </button>
  );
};

export default Button;
