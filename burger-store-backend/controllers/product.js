const Product = require("../models/product");
const createError = require("http-errors");
require("express-async-errors");

// check if product is exist by id
// this middleware is used in the following routes:
// GET a single product by ID
// PUT an existing product by ID
// DELETE an existing product by ID
exports.checkIfProductExist = async (req, res, next) => {
  const productInDb = await Product.findById(req.params.id);
  if (!productInDb) {
    return next(createError.NotFound("Product not found"));
  }
  req.productInDb = productInDb;
  next();
};

// GET all products
exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
};

// GET a single product by name
exports.getProductByName = async (req, res, next) => {
  const name = req.query.name;

  const products = await Product.find({
    
    name: { $regex: `^${name}$`, $options: `i`},// case insensitive search
  });
  res.status(200).json(products); // return an array of products
};

// GET a single product by ID
exports.getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
  // res.status(200).json(req.productInDb);
};

// POST a new product
exports.createProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

// PUT a product by ID
exports.updateProductById = async (req, res, next) => {
  const product = req.productInDb;
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.image = req.body.image || product.image;
  try {
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

// DELETE a product by ID
exports.deleteProductById = async (req, res, next) => {
  const productId = req.productInDb._id;
  await Product.findByIdAndDelete(productId);
  res.status(204).send();
};
