import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "./";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activeTab }) => {
  return (
    <div className="w-full">
      {products && (
        <Slider {...settings} className="custom-slider">
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
      )}
    </div>
  );
};

export default memo(CustomSlider);
