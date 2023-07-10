import React, { memo, useState } from "react";
import icons from "../utils/icons";
import { colors } from "../utils/constants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as api from "../api";
import useDebounce from "../hooks/useDebounce";

const { AiOutlineDown } = icons;

const FilterProduct = ({
  name,
  activeClick,
  changeFilter,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([]);
  const { category } = useParams();
  const [highestPrice, setHighestPrice] = useState();
  const [price, setPrice] = useState({ from: "", to: "" });
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const alreadyElement = selected?.find((item) => item === e.target.value);
    if (alreadyElement) {
      setSelected((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSelected((prev) => [...prev, e.target.value]);
    }
  };
  const fetchHighestProduct = async () => {
    const res = await api.apiGetProducts({ sort: "-price", limit: 1 });
    if (res.success) setHighestPrice(res.listProduct[0]?.price);
  };
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [selected]);

  useEffect(() => {
    if (type === "input") {
      fetchHighestProduct();
    }
  }, [type]);
  const debouncePriceFrom = useDebounce(price.from,1000)
  const debouncePriceTo = useDebounce(price.to,1000)

  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) {
      data.from = price.from;
    }
    if (Number(price.to) > 0) {
      data.to = price.to;
    }

   
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(data).toString(),
      });
    
  }, [debouncePriceFrom,debouncePriceTo]);
  return (
    <div
      className="p-3 border text-gray-500 relative border-gray-800 flex items-center gap-2 cursor-pointer"
      onClick={() => changeFilter(name)}
    >
      <span className="text-xs capitalize">{name}</span>
      <AiOutlineDown size={10} />
      {activeClick === name && (
        <div
          className="absolute w-fit left-0 top-[calc(100%+1px)] bg-white  border z-10 min-w-[150px]"
          onClick={(e) => e.stopPropagation()}
        >
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`${selected?.length} selected`}</span>
                <span
                  className="underline cursor-pointer font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="p-4" onClick={(e) => e.stopPropagation()}>
                {colors.map((color, index) => {
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        value={color}
                        name={color}
                        id={color}
                        onChange={handleSelect}
                        checked={selected.some((item) => item === color)}
                      />
                      <label className="capitalize text-gray-700">
                        {color}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 items-center flex justify-between gap-8 border-b">
                <span className="whitespace-nowrap">{`The highest price is ${Number(
                  highestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className="underline cursor-pointer font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({from:"",to:""});
                    changeFilter(null)
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-between  p-4">
                  <label htmlFor="from">From:</label>
                  <input
                    type="number"
                    className="outline-none bg-[#f6f6f6] py-2 px-4"
                    id="from"
                    name="from"
                    value={price[0]}
                    onChange={(e) =>
                      setPrice((prev) => {
                        return { ...prev, [e.target.name]: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between  p-4">
                  <label htmlFor="to">To:</label>
                  <input
                    type="number"
                    name="to"
                    className="outline-none bg-[#f6f6f6] py-2 px-4"
                    id="to"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => {
                        return { ...prev, [e.target.name]: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(FilterProduct);
