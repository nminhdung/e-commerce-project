const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");


const createOrder = asyncHandler(async (req, res) => {
  // const { _id } = req.user;
  const { fullname, address, email, phone, coupon, cart, _id } = req.body;
  if ((!fullname || !address || !phone || !email) && !_id)
    throw new Error("Missing inputs");

  const products = cart?.map((element) => {
    return {
      product: element._id,
      title: element.title,
      color: element.color,
      quantity: element.quantity,
      price: element.price,
    };
  });

  let total = cart?.reduce(
    (sum, element) => element.price * element.quantity + sum,
    0
  );
  const createOrderData = {
    products,
    total,
    orderBy: {user:_id  ,fullname, address, email, phone },
  };

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
    mes: rs ? "Ordered" : "Can not order",
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

module.exports = {
  createOrder,
  updateStatusOrder,
  getOrderByUser,
  getOrdersByAdmin,

};
