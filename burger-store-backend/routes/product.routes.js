const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const checkIdIsValid = require("../middlewares/checkIdHandler");

// GET all products
router.get("/", productController.getAllProducts);


// GET a single product by name
router.get("/search", productController.getProductByName);

// GET a single product by ID
router.get(
  "/:id",
  checkIdIsValid,
  productController.checkIfProductExist,
  productController.getProductById
);


// POST a new product
router.post("/", productController.createProduct);

// PUT an existing product by ID
router.put(
  "/:id",
  checkIdIsValid,
  productController.checkIfProductExist,
  productController.updateProductById
);

// DELETE an existing product by ID
router.delete(
  "/:id",
  checkIdIsValid,
  productController.checkIfProductExist,
  productController.deleteProductById
);



module.exports = router;
