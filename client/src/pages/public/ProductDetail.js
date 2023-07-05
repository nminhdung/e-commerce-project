import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as api from "../../api";
import {
  BreadCumbs,
  Button,
  ExtraInfor,
  ProductInformation,
  SelectQuantity,
  CustomSlider,
} from "../../components/";
import { extraInfo } from "../../utils/constants";

import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../utils/helpers";

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
  const [relatedProducts, setRelatedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [previewImg, setPreviewImg] = useState("");
  const fetchProduct = async () => {
    const response = await api.apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
    }
  };
  const fetchOtherProducts = async () => {
    const response = await api.apiGetProducts({ category });
    if (response.success) {
      setRelatedProduct(response.listProduct);
    }
  };
  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchOtherProducts();
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
            return <ExtraInfor item={item} key={item.id} />;
          })}
        </div>
      </div>
      <div className="w-main mx-auto mt-4">
        <ProductInformation productDescription={product?.description}/>
      </div>
      <div className="w-main mx-auto mt-4">
        <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black">
          Other Customers also buy:
        </h3>
        <CustomSlider products={relatedProducts} normal={true} />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default ProductDetail;
