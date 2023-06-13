const router = require("express").Router();
const BlogControllers = require("../controllers/blogController");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", BlogControllers.getAllBlogs);
router.post("/", [verifyAccessToken, isAdmin], BlogControllers.createBlog);
router.get("/singleblog/:bid", BlogControllers.getBlog);
router.put("/like/:bid", [verifyAccessToken], BlogControllers.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], BlogControllers.dislikeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], BlogControllers.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], BlogControllers.deleteBlog);

module.exports = router;
