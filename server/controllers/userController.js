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
    success: false,
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
  const { email } = req.query;
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

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu.Link này chỉ tồn tại trong 15 phút.
    <a href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}">CLick here</a> `;

    const data = {
      email,
      html,
    };
    const rs = await sendMail(data);
    return res.status(200).json({
      success: true,
      rs,
    });
  }
});

module.exports = {
  register,
  login,
  expiredToken,
  getUser,
  logout,
  forgotPassword,
};
