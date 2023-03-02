const Category = require("../models/productCategory");
const createError = require("http-errors");
require("express-async-errors");

// check if category is exist by id
// this middleware is used in the following routes:
// GET a single category by ID
// PUT an existing category by ID
// DELETE an existing category by ID 
exports.checkIfCategoryExist = async (req, res, next) => {
  const categoryInDb = await Category.findById(req.params.id);
  if (!categoryInDb) {
    return next(createError.NotFound("Category not found"));
  }
  req.categoryInDb = categoryInDb;
  next();
};



// GET all categories
exports.getAllCategories = async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json(categories);
};

// GET a single category by ID
exports.getCategoryById = async (req, res, next) => {
  res.status(200).json(req.categoryInDb);
};

// POST a new category
exports.createCategory = async (req, res, next) => {
  const category = new Category(req.body);
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

// PUT an existing category by ID
exports.updateCategoryById = async (req, res, next) => {
  const category = req.categoryInDb;
  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;
  try {
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    return next(createError(400, err.message));
  } 
};


// DELETE an existing category by ID
exports.deleteCategoryById = async (req, res, next) => {
  const categoryId = req.categoryInDb._id;
  await Category.findByIdAndDelete(categoryId);
  res.status(204).send();
};
