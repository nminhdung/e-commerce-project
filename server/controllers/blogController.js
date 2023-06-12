const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    throw new Error("Missing inputs");
  }
  const response = await Blog.create(req.body);

  return res.json({
    success: response ? true : false,
    createdBlog: response ? response : "Can not create new blog",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : "Can not update blog",
  });
});
const getAllBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : "Can not get all blogs",
  });
});

/*like blog
1.Kiểm tra người dùng đó có dislike bài blog đó không => bỏ dislike 
2.Kiểm tra người dùng đó trước đó đã like chưa => bỏ like/thêm like
*/
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) {
    throw new Error("Missing inputs");
  }
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.dislikes?.find(
    (element) => element.toString() === _id
  );
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      {
        $pull: { dislikes: _id },
      },
      { new: true }
    );
    return res.json({ status: response ? true : false, result: response });
  }
  const isLiked = blog?.likes?.find((element) => element.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.json({ status: response ? true : false, result: response });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.json({ status: response ? true : false, result: response });
  }
});
const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) {
      throw new Error("Missing inputs");
    }
    const blog = await Blog.findById(bid);
    const alreadyLiked = blog?.likes?.find(
      (element) => element.toString() === _id
    );
    if (alreadyLiked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { likes: _id },
        },
        { new: true }
      );
      return res.json({ status: response ? true : false, result: response });
    }
    const disLiked = blog?.dislikes?.find((element) => element.toString() === _id);
   //khong dislike nua 
    if (disLiked) {
      const response = await Blog.findByIdAndUpdate(
        bid,
        { $pull: { dislikes: _id } },
        { new: true }
      );
      return res.json({ status: response ? true : false, result: response });
    } else {
      const response = await Blog.findByIdAndUpdate(
        bid,
        { $push: { dislikes: _id } },
        { new: true }
      );
      return res.json({ status: response ? true : false, result: response });
    }
  });
module.exports = { createBlog, updateBlog, getAllBlogs, likeBlog,dislikeBlog };
