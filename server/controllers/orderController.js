const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon } = req.body;
  const userCart = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "title price");
  const products = userCart?.cart?.map((element) => {
    return {
      product: element.product._id,
      color: element.color,
      quantity: element.quantity,
    };
  });

  let total = userCart?.cart?.reduce(
    (sum, element) => element.product.price * element.quantity + sum,
    0
  );
  const createOrderData = { products, total, orderBy: _id };
  if (coupon) {
    const selectedDiscount = await Coupon.findById(coupon);
    total =
      Math.round((total * (1 - +selectedDiscount?.discount / 100)) / 1000) *
      1000;
    createOrderData.total = total;
    createOrderData.coupon = coupon;
  }
  const rs = await Order.create(createOrderData);
  return res.status(200).json({
    success: rs ? true : false,
    rs: rs ? rs : "Can not create order",
  });
});
const updateStatusOrder = asyncHandler(async (req, res) => {
  const { orid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    orid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Can not create order",
  });
});
const getOrderByUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Can not create order",
  });
});
const getOrdersByAdmin = asyncHandler(async (req, res) => {
 
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Can not create order",
  });
});

module.exports = { createOrder, updateStatusOrder, getOrderByUser,getOrdersByAdmin };
