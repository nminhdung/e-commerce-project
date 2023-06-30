import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
const ProductDetail = () => {
  const { title, pid } = useParams();
  const [first, setfirst] = useState();
  const fetchProduct = async () => {
    const response = await api.apiGetProduct(pid);
    console.log(response);
  };
  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [pid]);
  return (
    <div className="w-full">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="w-main">{title}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
