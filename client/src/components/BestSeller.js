import React, { useEffect, useState } from "react";
import * as api from "../api"
import { Product, CustomSlider } from "./";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts } from "../store/products/asyncThunks";

const tabs = [
  {
    id: 1,
    title: "Best Seller",
  },
  {
    id: 2,
    title: "New Arrivals",
  },
];

const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const newProducts = useSelector((state) => state.products.products);


  const fetchProduct = async () => {
    const response = await api.apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSellerProducts(response.listProduct);
      setProducts(response.listProduct);
    }
  };
  useEffect(() => {
    fetchProduct();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellerProducts);
    } else {
      setProducts(newProducts);
    }
  }, [activeTab]);
  return (
    <div>
      <div className="flex items-center text-xl  ml-[-32px]   ">
        {tabs.map((tab) => {
          return (
            <span
              key={tab.id}
              className={`font-semibold capitalize px-8 border-r cursor-pointer text-black-300 ${
                activeTab === tab.id ? "text-main" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </span>
          );
        })}
      </div>
      <div className="mt-4 mx-[-10px] border-main border-t-2 pt-[15px]">
        <CustomSlider products={products} activeTab={activeTab} />
      </div>
      <div className="flex w-full gap-4 mt-8">
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner1"
          className="object-contain flex-1"
        />
        <img
          src="https://cdn.shopify.com/s/files/1/1903/4853/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner1"
          className="object-contain flex-1"
        />
      </div>
    </div>
  );
};

export default BestSeller;
