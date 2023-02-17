const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET a single order by ID
router.get('/:id', orderController.getOrderById);

// POST a new order
router.post('/', orderController.createOrder);

// PUT an existing order by ID
router.put('/:id', orderController.updateOrderById);

// DELETE an existing order by ID
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;