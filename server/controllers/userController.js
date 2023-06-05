const User = require("../models/user");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !lastname || !firstname) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Error("User has existed");
  } else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mess: newUser
        ? "Register is successfully. You can login now"
        : "Something went wrong",
    });
  }

  return res.status(200).json({
    success: response ? true : false,
    response,
  });
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
    const { password, role, ...data } = response.toObject();
    //Tao accessToken
    const accessToken = generateAccessToken(response._id, role);
    //Tao refreshToken
    const refreshToken = generateRefreshToken(response._id);
    //Luu refreshToken vao database
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
    //Luu refresh vao cookie thoi gian het han la 7 ngay
    res.cookie("refreshToken", refreshToken, {
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
const getUser = asyncHandler(async (req, res) => {
  console.log(req.user)
  const { _id } = req.user;
  // khong hien thi 3 truong trong select
  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: false,
    result: user ? user : "User not found",
  });
});
module.exports = {
  register,
  login,
  getUser,
};
