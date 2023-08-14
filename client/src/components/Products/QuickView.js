import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../utils/helpers";
import Button from "../Buttons/Button";

const QuickView = ({ product }) => {
  const [previewImg, setPreviewImg] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    setPreviewImg(product?.thumb);
  }, [product]);
  return (
    <div className="xl:w-main mx-auto mt-4 flex flex-col lg:flex-row md:gap-1 gap-2 bg-white p-2">
      <div className=" lg:flex-4 flex flex-col gap-4 w-full ">
        <img
          src={previewImg}
          alt="previewImg"
          className="lg:h-[458px] lg:w-[458px] object-cover border"
        />
        <div className=" w-full gap-2 lg:w-[458px] flex items-center justify-between ">
          {product?.images
            .map((img, index) => {
              return (
                <div key={index}>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImg(img);
                    }}
                    src={img}
                    alt="img"
                    className="h-[143px] w-[143px] border object-contain cursor-pointer "
                  />
                </div>
              );
            })
            .slice(0, 3)}
        </div>
      </div>
      <div className="lg:flex-4 flex flex-col md:gap-1 xl:gap-4">
        <h3 className="font-semibold text-[30px] ">
          {`${formatMoney(formatPrice(product?.price))}`} VND
        </h3>
        <div className="flex items-center mt-4">
          {renderStarFromNumber(product?.totalRatings).map((star, index) => {
            return <span key={index}>{star}</span>;
          })}
          <span className="ml-1">1 reviews</span>
        </div>
        <ul className="text-sm text-gray-500 list-square pl-4">
          {product?.description?.length > 1 &&
            product?.description.map((des, index) => {
              return (
                <li key={index} className="leading-6">
                  {des}
                </li>
              );
            })}
          {product?.description?.length === 1 && (
            <div
              className="line-clamp-6"
              dangerouslySetInnerHTML={{ __html: product.description[0] }}
            ></div>
          )}
        </ul>
        <div className="flex ">
          {/* <SelectQuantity
          handleChangeQuantity={handleChangeQuantity}
          quantity={quantity}
          handleQuantity={handleQuantity}
        /> */}
        <Button fullWidth handleClick={()=>navigate(`/${product?.category?.toLowerCase()}/${product?._id}/${
          product?.title
        }`)}>View Detail</Button>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
