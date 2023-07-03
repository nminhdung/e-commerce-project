import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import icons from "../../utils/icons";
import * as api from "../../api";
import { BreadCumbs, Button, SelectQuantity } from "../../components/";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../utils/helpers";

const { BsShieldShaded, FaTruck, GiReturnArrow, RiGiftFill,FaBlenderPhone } = icons;
const extraInfo = [
  {
    id: 1,
    title: "guarantee",
    subTitle: "Quality checked",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    subTitle: "Free on all products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special gift cards",
    subTitle: "Special gift cards",
    icon: <RiGiftFill />,
  },
  {
    id: 4,
    title: "Free return",
    subTitle: "Within 7 days",
    icon: <FaBlenderPhone />,
  },
  {
    id: 5,
    title: "Consultancy",
    subTitle: "Lifetime 24/7/356",
    icon: <GiReturnArrow />,
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const ProductDetail = () => {
  const { title, pid, category } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState("");
  const fetchProduct = async () => {
    const response = await api.apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
    }
  };
  useEffect(() => {
    if (pid) {
      fetchProduct();
      setPreviewImg(product?.images[0]);
    }
  }, [pid]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );
  const handleChangeQuantity = useCallback(
    (type) => {
      if (type === "incr") {
        setQuantity((prev) => +prev + 1);
      } else {
        if (quantity === 1) return;
        setQuantity((prev) => +prev - 1);
      }
    },
    [quantity]
  );
  return (
    <div className="w-full">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="w-main">
          <h3 className="font-bold">{title}</h3>
          <BreadCumbs title={title} category={category} />
        </div>
      </div>
      <div className="w-main mx-auto mt-4 flex">
        <div className="flex-4 flex flex-col gap-4 w-full">
          <img
            src={product?.images[0]}
            alt=""
            className="h-[458px] w-[458px] object-cover border"
          />
          <div className="w-[458px] flex items-center justify-between ">
            {product?.images
              .map((img, index) => {
                return (
                  <div key={index}>
                    <img
                      src={img}
                      alt="img"
                      className="h-[143px] w-[143px] border object-cover cursor-pointer "
                    />
                  </div>
                );
              })
              .slice(0, 3)}
          </div>
        </div>
        <div className="flex-4 flex flex-col gap-4">
          <h3 className="font-semibold text-[30px] ">
            {`${formatMoney(formatPrice(product?.price))}`} VND
          </h3>
          <div className="flex items-center mt-4">
            {renderStarFromNumber(product?.totalRatings).map((star, index) => {
              return <span key={index}>{star}</span>;
            })}
            <span className="ml-1">1 reviews</span>
          </div>
          <ul className=" text-sm text-gray-500 list-square pl-4">
            {product?.description.map((des, index) => {
              return (
                <li key={index} className="leading-6">
                  {des}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-8">
            <SelectQuantity
              handleChangeQuantity={handleChangeQuantity}
              quantity={quantity}
              handleQuantity={handleQuantity}
            />
            <Button fullWidth>Add to cart</Button>
          </div>
        </div>
        <div className="flex-2 flex flex-col gap-2">
          {extraInfo.map((item) => {
            return (
              <div
                className="flex items-center gap-4 border p-2 "
                key={item.id}
              >
                <span className="inline-block rounded-full p-2 text-white bg-[#505050]">
                  {item.icon}
                </span>
                <div className="flex flex-col ">
                  <span className="text-[14px] text-[#686868] capitalize">{item.title}</span>
                  <span className="text-[#b5b5b5] text-xs capitalize">{item.subTitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default ProductDetail;
