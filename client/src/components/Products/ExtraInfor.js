import React from "react";

const ExtraInfor = ({ item }) => {
  return (
    <div className="flex  items-center gap-4 border p-2 " >
      <span className="inline-block rounded-full p-2 text-white bg-[#505050]">
        {item.icon}
      </span>
      <div className="flex flex-col ">
        <span className="text-[14px] text-[#686868] capitalize">
          {item.title}
        </span>
        <span className="text-[#b5b5b5] text-xs capitalize">
          {item.subTitle}
        </span>
      </div>
    </div>
  );
};

export default ExtraInfor;
