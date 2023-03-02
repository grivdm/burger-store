const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controllers");
const checkIdIsValid = require("../middlewares/checkIdHandler");

// GET all orders
router.get("/", orderController.getAllOrders);

// GET a order by ID
router.get(
  "/:id",
  checkIdIsValid,
  orderController.checkIfOrderExist,
  orderController.getOrderById
);

// POST a new order
router.post("/", orderController.createOrder);

// PUT an order by ID
router.put(
  "/:id",
  checkIdIsValid,
  orderController.checkIfOrderExist,
  orderController.updateOrderById
);

// DELETE an order by ID
router.delete(
  "/:id",
  checkIdIsValid,
  orderController.checkIfOrderExist,
  orderController.deleteOrderById
);

module.exports = router;
