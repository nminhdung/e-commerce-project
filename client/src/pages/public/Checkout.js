import React, { useEffect } from "react";
import { BreadCumbs, InputForm } from "../../components/";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney, formatPrice } from "../../utils/helpers";
import { apiCreateOrder } from "../../api";
import { toast } from "react-toastify";
import { removeAllItems } from "../../store/cart/cartSlice";
const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);
  const { current } = useSelector((state) => state.user);

  const handleCheckout = async (data) => {
    const userData = { ...data, cart: cartItems };
    if (current) {
      userData._id = current._id;
    }
    const res = await apiCreateOrder({
      ...userData,
    });
    if (res.success) {
      toast.success(res.mes);
      dispatch(removeAllItems());
    } else {
      toast.error(res.mes);
    }
  };

  useEffect(() => {
    if (current) {
      setValue("fullname", `${current.lastname}  ${current.firstname}`);
      setValue("email", current.email);
      setValue("phone", current.phone);
      setValue("address", current.address);
    }
  }, [current]);
  return (
    <div className="w-full pb-[100px]">
      <div className="bg-gray-100 h-[81px] flex justify-center items-center">
        <div className="xl:w-main">
          <h3 className="font-bold">Check out</h3>
          <BreadCumbs category="checkout" />
        </div>
      </div>
      <div className="xl:w-main mx-auto grid md:grid-cols-2 mt-6 gap-2">
        <div className="w-full p-4 shadow-md ">
          <h2 className="font-semibold text-xl">Your order</h2>
          <div className="mt-4">
            {cartItems.length === 0 && (
              <h4>You don't have any product in your order.</h4>
            )}
            {cartItems.length > 0 &&
              cartItems.map((productCart) => {
                return (
                  <article
                    key={productCart._id}
                    className=" flex items-center relative  p-2 gap-2"
                  >
                    <div className="border">
                      {" "}
                      <img
                        src={productCart.thumb}
                        className="w-[80px] h-[80px] object-cover"
                        alt="thumb"
                      />
                    </div>

                    <span
                      className="flex p-1 items-center justify-center text-white
                     rounded-full w-[20px] h-[20px] text-sm absolute top-[0px] left-[80px] bg-main"
                    >
                      {productCart.quantity}
                    </span>
                    <div className="flex flex-col ">
                      <h4 className="text-sm">{productCart.title}</h4>
                      <span className="text-gray-400 text-xs">
                        {productCart.color}
                      </span>
                    </div>
                    <span className="ml-auto font-semibold">
                      {formatMoney(
                        formatPrice(productCart.quantity * productCart.price)
                      )}{" "}
                      VND
                    </span>
                  </article>
                );
              })}
          </div>
          <div className="py-2 border-t-4 flex items-center justify-between">
            <h2 className="font-semibold tracking-wide">Total</h2>
            <span className="ml-auto font-semibold">
              {formatMoney(formatPrice(total))} VND
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="w-full pr-4  mt-4 md:mt-0"
        >
          <InputForm
            name="fullname"
            label="Full name"
            register={register}
            fullWidth
            errors={errors}
            validate={{ required: "Please fill this field" }}
            placeholder="Enter your full name"
          />
          <InputForm
            name="email"
            label="Contact"
            register={register}
            errors={errors}
            validate={{
              required: "Please fill this field",
              pattern: {
                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/i,
                message: "Invalid email address",
              },
            }}
            placeholder="Email"
          />
          <InputForm
            name="phone"
            label="Phone"
            register={register}
            errors={errors}
            validate={{
              required: "Please fill this field",
              pattern: {
                value: /^[62|0]+\d{9}/gi,
                message: "Invalid phone number",
              },
            }}
            placeholder="Enter your phone number"
          />
          <InputForm
            name="address"
            label="Address"
            register={register}
            errors={errors}
            validate={{ required: "Please fill this field" }}
            placeholder="Address"
          />
          <InputForm
            name="coupon"
            label="Coupon"
            register={register}
            errors={errors}
            placeholder="Coupon"
          />
          <div className="flex  items-center justify-end gap-4 mt-6">
            <button className="px-4 py-2 bg-black text-white rounded-md ">
              Continue Shopping
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-main text-white rounded-md"
            >
              Check out{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
