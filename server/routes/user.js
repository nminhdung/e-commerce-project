const router = require("express").Router();
const UserControllers = require("../controllers/userController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", UserControllers.register);
router.get("/confirmregister/:token", UserControllers.confirmRegister);
router.get("/current", verifyAccessToken, UserControllers.getUser);
router.post("/login", UserControllers.login);
router.post("/refreshtoken", UserControllers.expiredToken);
router.get("/logout", UserControllers.logout);
router.post("/forgotpassword", UserControllers.forgotPassword);
router.put("/resetpassword", UserControllers.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], UserControllers.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], UserControllers.deleteUser);
router.put("/currentuser", [verifyAccessToken], UserControllers.updateUser);
router.put("/address", [verifyAccessToken], UserControllers.updateAddressUser);
router.put("/cart", [verifyAccessToken], UserControllers.addToCart);
router.put("/:uid", [verifyAccessToken,isAdmin], UserControllers.updateUserByAdmin);

module.exports = router;
