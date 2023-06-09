const router = require("express").Router();
const ProductControllers = require("../controllers/productController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/",[verifyAccessToken,isAdmin], ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
router.put("/ratings",[verifyAccessToken], ProductControllers.ratings);

router.put("/:pid",[verifyAccessToken,isAdmin] ,ProductControllers.updateProduct);
router.delete("/:pid",[verifyAccessToken,isAdmin] ,ProductControllers.deleteProduct);
router.get("/:pid", ProductControllers.getProduct);

module.exports = router;
