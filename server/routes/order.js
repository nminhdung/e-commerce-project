const router = require("express").Router();
const OrderControllers = require("../controllers/orderController");

const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], OrderControllers.createOrder);
router.put("/status/:orid", [verifyAccessToken,isAdmin], OrderControllers.updateStatusOrder);
router.get("/", [verifyAccessToken], OrderControllers.getOrderByUser);
router.get("/admin", [verifyAccessToken,isAdmin], OrderControllers.getOrdersByAdmin);

module.exports = router;
