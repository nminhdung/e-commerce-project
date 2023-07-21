import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "..";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        
        dots: false,
        infinite: false,
        speed: 500,
      },
    },
  ],
};
const CustomSlider = ({ products, activeTab, normal }) => {
  return (
    <div className="w-full">
      {products && (
        <Slider {...settings} className=" custom-slider">
          {products.map((product) => {
            return (
              <Product
                key={product._id}
                productData={product}
                isNew={activeTab === 1 ? false : true}
                normal={normal}
              />
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default memo(CustomSlider);
