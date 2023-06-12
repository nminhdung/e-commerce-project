const router = require("express").Router();
const BlogControllers = require("../controllers/blogController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", BlogControllers.getAllBlogs);
router.put("/like/:bid", [verifyAccessToken], BlogControllers.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], BlogControllers.dislikeBlog);
router.post("/", [verifyAccessToken, isAdmin], BlogControllers.createBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], BlogControllers.updateBlog);

module.exports = router;
