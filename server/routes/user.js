const router = require("express").Router();
const UserControllers = require("../controllers/userController");

router.post("/register", UserControllers.register);

module.exports = router;
