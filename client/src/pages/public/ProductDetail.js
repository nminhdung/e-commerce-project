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
  const [update, setUpdate] = useState(false);
  const fetchProduct = async () => {
    const response = await api.apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setPreviewImg(response.productData?.thumb);
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
    }
    window.scrollTo(0, 0);
  }, [pid]);
  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
  }, [update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
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
    <div className="w-full relative">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="md:w-main">
          <h3 className="font-bold">{title}</h3>
          <BreadCumbs title={title} category={category} />
        </div>
      </div>
      <div className="xl:w-main mx-auto mt-4 flex flex-col lg:flex-row md:gap-1 gap-2">
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
                      onClick={() => setPreviewImg(img)}
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
        <div className="lg:flex-2 flex flex-col gap-2">
          {extraInfo.map((item) => {
            return <ExtraInfor item={item} key={item.id} />;
          })}
        </div>
      </div>
      <div className="xl:w-main mx-auto mt-4">
        <ProductInformation
          productDescription={product?.description}
          totalRatings={product?.totalRatings}
          ratingsList={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="xl:w-main mx-auto mt-4">
        <h3 className="font-semibold capitalize text-[20px] border-b-2 border-main cursor-pointer text-black mb-2">
          Other Customers also buy:
        </h3>
        <CustomSlider products={relatedProducts} normal={true} />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default ProductDetail;
