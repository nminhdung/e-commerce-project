import React, { memo, useState } from "react";
import { productInfo } from "../utils/constants";

const ProductInformation = ({ productDescription }) => {
  const [activedTab, setActivetab] = useState(1);
  return (
    <div className="">
      <div className="flex items-center gap-2 relative bottom-[-1px]">
        {productInfo.map((item) => {
          return (
            <p
              className={`py-2 px-5 uppercase  cursor-pointer hover:bg-white transition duration-400 ${
                activedTab === item.id
                  ? "bg-white border border-b-0"
                  : "bg-[#f1f1f1]"
              }`}
              onClick={() => setActivetab(item.id)}
              key={item.id}
            >
              {item.title}
            </p>
          );
        })}
      </div>
      <div className="w-full min-h-[300px] border p-4 transition duration-400">
        {productInfo.find((item) => item.id === activedTab)?.content ? (
          productInfo.find((item) => item.id === activedTab)?.content
        ) : (
          <ul className="pl-4 list-square">
            {productDescription?.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInformation);
