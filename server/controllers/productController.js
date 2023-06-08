const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//CRUD Product
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "Can not create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Can not get product",
  });
});
const getAllProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  console.log(queries);
  //Tach cac truong dac biet ra khoi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((element) => delete queries[element]);

  //Format lai cac operators cho dung cu phap mongoose
  let queryString = JSON.stringify(queries).replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedElement) => `$${matchedElement}`
  );
  console.log(queryString);
  const formatedQueries = JSON.parse(queryString);
  console.log(formatedQueries);

  //filter ( chi can go mot tu giong thi se tu dong match ) ex: doi vs nhung san pham ten dai`
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  queryCommand.then(async (response, err) => {
    if (err) throw new Error(err.message);
    const counts = await Product.find(formatedQueries).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      listProduct: response ? response : "Cant not get all products",
      counts,
    });
  });

  //Execute query
  //   queryCommand.exec(async (err, response) => {
  //     if (err) throw new Error(err.message);
  //     const counts = await Product.find(formatedQueries).countDocuments();
  //     return res.status(200).json({
  //       success: response ? true : false,
  //       listProduct: response ? response : "Can not get all products",
  //       counts,
  //     });
  //   });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedData: updatedProduct ? updatedProduct : "Can not update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedData: deletedProduct ? deletedProduct : "Can not delete product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
