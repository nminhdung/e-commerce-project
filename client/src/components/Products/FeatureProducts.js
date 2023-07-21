import React, { useState, useEffect } from "react";
import * as api from "../../api";
import ProductCard from "./ProductCard";
const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await api.apiGetProducts({
      limit: 9,
      totalRatings: 5,
    });
    if (res.success) {
      setProducts(res.listProduct);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="uppercase text-[20px] font-semibold py-4  border-b-2 border-main">
        Feature Products
      </h3>
      <div className="grid lg:grid-cols-3  gap-6 mt-4">
        {products?.map((product) => {
          return <ProductCard key={product._id} data={product} />;
        })}
      </div>
      <div className="flex gap-4 justify-between mt-6">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt="banner"
          className="w-[49%] object-cover"
        />
        <div className="flex flex-col justify-between gap-4 w-[24%]">
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt="banner"
          />
          <img
            src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt="banner"
          />
        </div>
        <img
          className=" w-[24%] object-cover"
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
