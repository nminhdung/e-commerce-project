import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../api/product";
import { Product } from "./";
import Slider from "react-slick";

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

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const BestSeller = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellerProducts(response[0].listProduct);
      setProducts(response[0].listProduct);
    }
    if (response[1]?.success) {
      setNewProducts(response[1].listProduct);
    }
  };
  useEffect(() => {
    fetchProduct();
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
        <Slider {...settings}>
          {products.map((product) => {
            return (
              <Product
                key={product._id}
                productData={product}
                isNew={activeTab === 1 ? false : true}
              />
            );
          })}
        </Slider>
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
