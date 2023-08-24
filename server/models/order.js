const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: { type: Number },
      color: { type: String },
      price: { type: Number },
    },
  ],

  status: {
    type: String,
    default: "Processing",
    enum: ["Cancelled", "Processing", "Succeed"],
  },

  total: { type: Number },
  coupon: { type: mongoose.Types.ObjectId, ref: "Coupon" },
  orderByUser: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  orderBy: {
    user:{type: mongoose.Types.ObjectId,ref:"User"},
    fullname: { type: String },
    email: { type: String, unique: true },
    address: { type: String },
    phone: { type: Number, unique: true },
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
