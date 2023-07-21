import React, { useEffect } from "react";
import { useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import usePaginate from "../../hooks/usePaginate";
import icons from "../../utils/icons";
import PaginateItem from "./PaginateItem";

const { FaAngleLeft, FaAngleRight } = icons;
const Paginate = ({ totalProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const { category } = useParams();

  const pagination = usePaginate(totalProduct, +params.get("page") || 1);

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
  const handleClickArrow = (type) => {
    let paramsList = [];
    //giu lai cac truong filter truoc do
    for (let i of params.entries()) {
      paramsList.push(i);
    }
    const queries = {};
    for (let i of paramsList) {
      queries[i[0]] = i[1];
      // [["color","black"],["page","1"]]
      // => queries = {color:"black",page:"1"}
    }
    if (type === "prev") {
      if (!queries.page) {
        queries.page = 1;
      }
      if (queries.page <= 1) {
        queries.page = 1;
      } else {
        queries.page--;
      }
    }

    if (type === "next") {
      if (!queries.page) {
        queries.page = 2;
      } else {
        if (queries.page >= pagination[pagination.length - 1]) {
          queries.page = pagination[pagination.length - 1];
        } else {
          queries.page++;
        }
      }
    }

    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
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
        <button
          onClick={() => handleClickArrow("prev")}
          className="p-1  hover:text-white rounded-full hover:bg-main transition duration-300"
        >
          <FaAngleLeft />
        </button>
        {pagination?.map((item, index) => {
          return <PaginateItem key={index}>{item}</PaginateItem>;
        })}
        <button
          onClick={() => handleClickArrow("next")}
          className="p-1 hover:text-white rounded-full hover:bg-main transition duration-300"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default Paginate;
