const Category = require("../models/category");
const createError = require("http-errors");
require("express-async-errors");

exports.getAllCategorys = async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

exports.getCategoryById = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.status(200).json(category);
  } else {
    return next(createError.NotFound("Category not found"));
  }
};

exports.createCategory = async (req, res, next) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

exports.updateCategoryById = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;

    try {
      const updatedCategory = await category.save();
      res.status(200).json(updatedCategory);
    } catch (err) {
      return next(createError(400, err.message));
    }
  } else {
    return next(createError.NotFound("Category not found"));
  }
};

exports.deleteCategoryById = async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(createError(404, "Category not found"));
  }
  await category.remove();
  res.status(204).json({ message: "Category deleted" });
};
