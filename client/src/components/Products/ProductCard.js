import React from "react";
import { useNavigate } from "react-router-dom";
import { formatMoney, renderStarFromNumber,slugify } from "../../utils/helpers";

const ProductCard = ({ data }) => {
  const { title, thumb, price, totalRatings, category, _id } = data;
  const navigate = useNavigate();
  return (
    <div
      className="border flex p-4"
      onClick={() => navigate(`/${category?.toLowerCase()}/${_id}/${title}`)}
    >
      <img src={thumb} alt={title} className="object-contain w-[120px] p-4" />
      <div className="flex flex-col gap-1 mt-[14px] items-start w-full">
        {/* <span className="flex gap-1 h-[16px]">{renderStarFromNumber(productData.totalRatings) }</span>
         */}
        <span className="line-clamp-1 text-sm hover:text-main cursor-pointer">
          {title}
        </span>
        <div className="flex gap-1">
          {renderStarFromNumber(totalRatings).map((star, index) => {
            return (
              <span className=" h-[16px]" key={index}>
                {star}
              </span>
            );
          })}
        </div>

        <span className="text-sm">{formatMoney(price)} VND</span>
      </div>
    </div>
  );
};

export default ProductCard;
