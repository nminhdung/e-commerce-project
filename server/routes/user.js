const router = require("express").Router();
const UserControllers = require("../controllers/userController");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.get("/current",verifyAccessToken, UserControllers.getUser);

module.exports = router;
