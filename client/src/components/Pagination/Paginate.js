import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import usePaginate from "../../hooks/usePaginate";
import icons from "../../utils/icons";
import PaginateItem from "./PaginateItem";

const { FaAngleLeft, FaAngleRight } = icons;
const Paginate = ({ totalProduct }) => {
  const [params] = useSearchParams();
  const pagination = usePaginate(totalProduct, 2);

  const rangeProduct = () => {
    const currentPage = +params.get("page");
    const itemPerPage = +process.env.REACT_APP_ITEM_PERPAGE || 10;
    const start = (currentPage - 1) * itemPerPage + 1;
    const end =
      currentPage * itemPerPage > totalProduct
        ? totalProduct
        : currentPage * itemPerPage;

    return `${start} - ${end}`;
  };

  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-sm italic flex">{`Show products 1 - ${
          +process.env.REACT_APP_ITEM_PERPAGE || 10
        } of ${totalProduct}`}</span>
      ) : (
        <span className="text-sm italic flex">{`Show products ${rangeProduct()} of ${totalProduct}`}</span>
      )}

      <div className="flex items-center gap-2 flex-end">
        <button className="p-1  hover:text-white rounded-full hover:bg-main transition duration-300">
          <FaAngleLeft />
        </button>
        {pagination?.map((item, index) => {
          return <PaginateItem key={index}>{item}</PaginateItem>;
        })}
        <button className="p-1 hover:text-white rounded-full hover:bg-main transition duration-300">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Paginate;
