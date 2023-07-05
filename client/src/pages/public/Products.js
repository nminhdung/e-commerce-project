import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BreadCumbs, Product } from "../../components";
import { FilterProduct, SortProduct } from "../../components";
import * as api from "../../api";
const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState("");
  const fetchProductsByCategory = async (queries) => {
    const response = await api.apiGetProducts({ queries });
    if (response.success) {
      setProducts(response.listProduct);
    }
  };
  useEffect(() => {
    fetchProductsByCategory();
  }, []);
  const changeFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick("");
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );
  return (
    <div className="w-full">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-bold uppercase">{category}</h3>
          <BreadCumbs category={category} />
        </div>
      </div>
      <div className="w-main mx-auto border p-4 flex justify-between mt-8">
        <div className="lg:flex-8 flex flex-col gap-2">
          <span className="font-semibold text-sm">Filter by:</span>
          <div className="flex gap-2">
            <FilterProduct
              name="price"
              activeClick={activeClick}
              changeFilter={changeFilter}
            />
            <FilterProduct
              name="color"
              activeClick={activeClick}
              changeFilter={changeFilter}
            />
          </div>
        </div>
        <div className="lg:flex-2">Sort by</div>
      </div>
      <div className="w-main mx-auto mt-8">
        <div className="grid lg:grid-cols-4 gap-y-4 mx-[-10px]">
          {products?.map((item) => {
            return <Product key={item._id} productData={item} normal={true} />;
          })}
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
