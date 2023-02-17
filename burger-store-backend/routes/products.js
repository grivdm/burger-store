const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// GET all products
router.get('/', productController.getAllProducts);

// GET a single product by ID
router.get('/:id', productController.getProductById);

// POST a new product
router.post('/', productController.createProduct);

// PUT an existing product by ID
router.put('/:id', productController.updateProductById);

// DELETE an existing product by ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;