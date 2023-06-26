import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type = "text",
  invalidField,
  setInvalid,
}) => {
 
  return (
    <div className="w-full relative ">
      {value.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className="capitalize text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm"
        >
          {nameKey}
        </label>
      )}

      <input
        type={type}
        className="px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm 
         placeholder:italic outline-none placeholder:capitalize "
        placeholder={nameKey}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputField;
