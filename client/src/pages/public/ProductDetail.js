import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import * as api from "../../api";
import { apiUpdateCart } from "../../api";
import {
  BreadCumbs,
  Button,
  ExtraInfor,
  ProductInformation,
  SelectQuantity,
  CustomSlider,
} from "../../components/";
import { addItem } from "../../store/cart/cartSlice";
import { getCurrentUser } from "../../store/user/asyncThunk";
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
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [update, setUpdate] = useState(false);

  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    const response = await api.apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setColors(response.productData?.color?.split(" "));
      setPreviewImg(response.productData?.thumb);
    }
  };
  const fetchOtherProducts = async () => {
    const response = await api.apiGetProducts({ category });
    if (response.success) {
      setRelatedProduct(response.listProduct);
    }
  };
  const AddCart = (product) => {
    dispatch(addItem({...product,quantity,color: selectedColor || colors?.length>0 ? colors[0]:"Black",}));
  };
  // const AddToCart = async () => {
  //   console.log(product);
  //   console.log({
  //     pid: product._id,
  //     quantity: quantity,
  //     color: selectedColor || "BLACK",
  //   });
  //   if (!current) {
  //     toast.info("Please login to add product");
  //   } else {
  //     const res = await apiUpdateCart({
  //       pid: product._id,
  //       quantity: quantity,
  //       color: selectedColor || colors.length>0 ? colors[0]:"Black",
  //     });
  //     if (res.success) {
  //       toast.success(res.mes);
  //       dispatch(getCurrentUser());
  //     } else {
  //       toast.error(res.mes);
  //     }
  //   }
  // };
  useEffect(() => {
    if (pid) {
      fetchProduct();
      fetchOtherProducts();
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
        <div className="xl:w-main">
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
          <div className="flex items-center">
            <span className="font-semibold">Color: </span>
            {colors?.map((color, index) => {
              return (
                <span
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center p-2 border-main border mx-2 cursor-pointer ${
                    selectedColor?.toLowerCase() === color?.toLowerCase()
                      ? "text-main"
                      : ""
                  }`}
                  key={index}
                >
                  {color}
                </span>
              );
            })}
          </div>
          <div className="flex flex-col gap-8">
            <SelectQuantity
              handleChangeQuantity={handleChangeQuantity}
              quantity={quantity}
              handleQuantity={handleQuantity}
            />
            {/* <Button fullWidth handleClick={AddToCart}>
              Add to cart
            </Button> */}
            {/* <Button fullWidth handleClick={()=>AddCart()}></Button> */}
            <button
              className="px-4 py-2 w-full bg-main text-white rounded-md"
              onClick={() => AddCart(product)}
            >
              Add to cart
            </button>
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
