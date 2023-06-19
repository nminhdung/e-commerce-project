const router = require("express").Router();
const insertControllers = require("../controllers/insertDataController");

router.post("/",  insertControllers.insertProduct);
router.post("/category",  insertControllers.insertCategory);

module.exports = router;
