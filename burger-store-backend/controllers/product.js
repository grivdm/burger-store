const Product = require("../models/product");
const createError = require("http-errors");
require("express-async-errors");

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json(products);
};

exports.getProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    return next(createError.NotFound("Product not found"));
  }
};

exports.createProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

exports.updateProductById = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
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
  } else {
    return next(createError.NotFound("Product not found"));
  }
};

exports.deleteProductById = async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(createError(404, "Product not found"));
  }
  await product.remove();
  res.status(204).json({ message: "Product deleted" });

};
