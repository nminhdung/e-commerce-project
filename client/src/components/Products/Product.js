/* eslint-disable jsx-a11y/img-redundant-alt */
// eslint-disable-next-line jsx-a11y/img-redundant-alt
import React, { useState } from "react";
import defaultImage from "../../assets/default.png";
import icons from "../../utils/icons";
import path from "../../utils/paths";
import label from "../../assets/label.png";
import { formatMoney } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { renderStarFromNumber } from "../../utils/helpers";
import { SelectOptions } from "../../components";
import { showModal } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import {QuickView} from "../../components";


const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productData, isNew, normal }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleClickOption = (e, option) => {
    e.stopPropagation();
    if (option.toLowerCase() === "menu") {
      navigate(
        `/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`
      );
    }
    if (option.toLowerCase() === "wishlist") {
      console.log("wishlist");
    } else {
      dispatch(showModal({modalChildren: <QuickView product={productData}/>}))
    }
  };
  const [isShowOptions, setShowOptions] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <div
        onClick={() =>
          navigate(
            `/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`
          )
        }
        className="flex flex-col border h-full w-full p-[15px] items-center cursor-pointer "
        onMouseEnter={(e) => {
          e.stopPropagation();
          setShowOptions(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setShowOptions(false);
        }}
      >
        <div className="w-full relative">
          {isShowOptions && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <span title="Wish List" onClick={(e) => handleClickOption(e, "wishlist")}>
                <SelectOptions icon={<BsFillSuitHeartFill />} />
              </span>
              <span title="Quick View" onClick={(e) => handleClickOption(e, "quick_view")}>
                <SelectOptions icon={<AiFillEye />} />
              </span>
              <span title="More Options" onClick={(e) => handleClickOption(e, "menu")}>
                <SelectOptions icon={<AiOutlineMenu />} />
              </span>
            </div>
          )}

          <img
            src={productData.thumb || defaultImage}
            className="lg:w-[274px] lg:h-[274px] object-cover flex-shrink-0"
            alt="image"
          />
          {!normal && (
            <img
              className="absolute w-[80px] h-[25px] object-cover top-[-16px] left-[-34px]"
              src={label}
              alt="label"
            />
          )}

          {!normal && (
            <span className="absolute top-[-16px] left-[-14px] font-semibold text-sm text-white">
              {isNew ? "New" : "Trend"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-[14px] items-start w-full">
          {/* <span className="flex gap-1 h-[16px]">{renderStarFromNumber(productData.totalRatings) }</span>
           */}
          <div className="flex gap-1 min-h-[16px]">
            {renderStarFromNumber(productData.totalRatings).map(
              (star, index) => {
                return (
                  <span className=" h-[16px]" key={index}>
                    {star}
                  </span>
                );
              }
            )}
          </div>

          <span className="line-clamp-1">{productData.title}</span>
          <span className="">{formatMoney(productData.price)} VND</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
