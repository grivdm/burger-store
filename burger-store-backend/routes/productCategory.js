const express = require("express");
const router = express.Router();
const productCategoryController = require("../controllers/productCategory");
const checkIdIsValid = require("../middlewares/checkIdHandler");

// GET all product categories
router.get("/", productCategoryController.getAllCategories);

// GET a product category by ID
router.get(
  "/:id",
  checkIdIsValid,
  productCategoryController.checkIfCategoryExist,
  productCategoryController.getCategoryById
);

// POST a new product category
router.post("/", productCategoryController.createCategory);

// PUT a product category by ID
router.put(
  "/:id",
  checkIdIsValid,
  productCategoryController.checkIfCategoryExist,
  productCategoryController.updateCategoryById
);

// DELETE a product category by ID
router.delete(
  "/:id",
  checkIdIsValid,
  productCategoryController.checkIfCategoryExist,
  productCategoryController.deleteCategoryById
);

module.exports = router;
