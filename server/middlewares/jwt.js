const jwt = require("jsonwebtoken");

const generateAccessToken = (uid, role) => {
  return jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, {
    expiresIn: "5s",
  });
};
const generateRefreshToken = (uid) => {
  return jwt.sign({ _id: uid }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = { generateAccessToken, generateRefreshToken };
