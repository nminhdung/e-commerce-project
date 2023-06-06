const router = require("express").Router();
const UserControllers = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/current", verifyAccessToken, UserControllers.getUser);
router.post("/refreshtoken", UserControllers.expiredToken);
router.get("/logout",  UserControllers.logout);
router.get("/forgotpassword",  UserControllers.forgotPassword);

module.exports = router;
