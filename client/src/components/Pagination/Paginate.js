import React from "react";
import usePaginate from "../../hooks/usePaginate";
import PaginateItem from "./PaginateItem";

const Paginate = ({ totalPage = 10 }) => {
  const pagination = usePaginate(100, 4);
  return (
    <div className="flex items-center">
      {pagination?.map((item,index) => {
        return <PaginateItem key={index}>
          {item}
        </PaginateItem>;
      })}
    </div>
  );
};

export default Paginate;
