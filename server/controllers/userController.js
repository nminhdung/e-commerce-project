const User = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
  findOneAndDelete,
  findByIdAndUpdate,
  findOne,
  findOneAndUpdate,
} = require("../models/user");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");
const makeToken = require("uniqid");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;
//   if (!email || !password || !lastname || !firstname) {
//     return res.status(400).json({
//       success: false,
//       mes: "Missing inputs",
//     });
//   }
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("User has existed");
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser
//         ? "Register is successfully. You can login now"
//         : "Something went wrong",
//     });
//   }
// });

const register = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, password, phone } = req.body;
  if (!email || !password || !lastname || !firstname || !phone) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const token = makeToken();
    res.cookie(
      "dataregister",
      { ...req.body, token },
      {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      }
    );
    const html = `Xin vui lòng click vào link dưới đây để hoàn tất quá trình đăng ký.Link này chỉ tồn tại trong 15 phút.
    <a href="${process.env.URL_SERVER}/api/user/confirmregister/${token}">CLick here</a> `;
    const data = {
      email,
      html,
      subject: "Complete Signup",
    };
    await sendMail(data);
    return res.json({
      success: true,
      mes: "Please check your email to active account",
    });
  }
});
const confirmRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;

  if (!cookie || cookie?.dataregister?.token !== token) {
    res.clearCookie("dataregister");
    return res.redirect(`${process.env.CLIENT_URL}/confirmregister/failed`);
  }

  const newUser = await User.create({
    email: cookie?.dataregister?.email,
    firstname: cookie?.dataregister?.firstname,
    lastname: cookie?.dataregister?.lastname,
    password: cookie?.dataregister?.password,
    phone: cookie?.dataregister?.phone,
  });
  res.clearCookie("dataregister");

  if (newUser)
    return res.redirect(`${process.env.CLIENT_URL}/confirmregister/success`);
  else {
    return res.redirect(`${process.env.CLIENT_URL}/confirmregister/failed`);
  }
});
//refresh token => cap moi token
//access token => xac thuc nguoi dung , phan quyen`
const login = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const response = await User.findOne({ email });

  const correcPassword = await response.isCorrectPassword(password);
  if (response && correcPassword) {
    //Tach password va role khoi response
    const { password, role, refreshToken, ...data } = response.toObject();
    //Tao accessToken
    const accessToken = generateAccessToken(response._id, role);
    //Tao refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    //Luu refreshToken vao database
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    //Luu refresh vao cookie thoi gian het han la 7 ngay
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      accessToken,
      userData: data,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});
const expiredToken = asyncHandler(async (req, res) => {
  //lay cookie
  const cookie = req.cookies;
  //Check co token ko
  if (!cookie && !cookie.refreshToken) {
    throw new Error("No refresh token in cookies");
  } else {
    //Check token co con` han su dung ko
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
    //Check token co giong trong db ko
    const response = await User.findOne({
      _id: rs._id,
      refreshToken: cookie.refreshToken,
    });
    return res.status(200).json({
      success: response ? true : false,
      newAccessToken: response
        ? generateAccessToken(response._id, response.role)
        : "Refresh token invalid",
    });
  }
});
const getUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { _id } = req.user;
  // khong hien thi 3 truong trong select
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : "User not found",
  });
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken) {
    throw new Error("No refresh token");
  } else {
    //xoa token o db
    await User.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    //xoa token o cookie
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(200).json({ success: true, mes: "Logout is done" });
  }
});

// Client gui Email
// Server check email co hop le khong => server gui email + link (password change token)
// Client check mail => click link
// Client gui API kem token
// Server Check token co giong voi token ma server gui mail hay ko
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new Error("Missing Email");
  } else {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    //khi sử dụng hàm đc định nghĩa trong schema phải save() để lưu lại những thay đổi
    //trong trường hợp hàm createPasswordChangedToken sẽ update 2 field là passwordResetToken và passwordResetExpire
    const resetToken = user.createPasswordChangedToken();
    await user.save();

    const html = `Please click this Link to change password.The link is only valid for 15 minutes.
    <a href="${process.env.URL_CLIENT}/reset-password/${resetToken}">CLick here</a> `;

    const data = {
      email,
      html,
      subject: "Forgot password",
    };
    const rs = await sendMail(data);
    return res.status(200).json({
      success: rs.response.includes("OK") ? true : false,
      rs,
      mes: rs.response.includes("OK")
        ? "Please check your email to create new password"
        : "Invalid Email ",
    });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing input");

  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExprire: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Invalid reset token");
  } else {
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();
    user.passwordResetExprire = undefined;
    await user.save();
    return res.status(200).json({
      success: user ? true : false,
      mes: user ? "Updated password" : "Something went wrong",
    });
  }
});
const getUsers = asyncHandler(async (req, res) => {
  //ham find() khong truyen dieu kien se lay tat ca
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing input");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing input");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const updateAddressUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrong",
  });
});
const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing Inputs");
  const user = await User.findById(_id).select("cart");
  const alreadyProduct = user?.cart?.find(
    (element) => element.product.toString() === pid && element.color === color
  );
  if (alreadyProduct) {
    // if (alreadyProduct.color === color) {
    //   const response = await User.updateOne(
    //     { cart: { $elemMatch: alreadyProduct } },
    //     { $set: { "cart.$.quantity": quantity } },
    //     { new: true }
    //   );

    //   return res.json({
    //     status: response ? true : false,
    //     userCart: response ? response : "Some thing went wrong",
    //   });
    // } else {
    //   console.log(alreadyProduct);
    //   const response = await User.findByIdAndUpdate(
    //     _id,
    //     { $push: { cart: { product: pid, quantity, color } } },
    //     { new: true }
    //   );
    //   return res.json({
    //     success: response ? true : false,
    //     userCart: response ? response : "Some thing went wrong",
    //   });
    // }
    const response = await User.updateOne(
      { cart: { $elemMatch: alreadyProduct } },
      { $set: { "cart.$.quantity": quantity } },
      { new: true }
    );

    return res.json({
      status: response ? true : false,
      userCart: response ? response : "Some thing went wrong",
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      userCart: response ? response : "Some thing went wrong",
    });
  }
});
module.exports = {
  register,
  confirmRegister,
  login,
  expiredToken,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddressUser,
  addToCart,
};
