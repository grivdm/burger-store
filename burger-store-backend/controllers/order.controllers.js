const Order = require("../models/order");
const createError = require("http-errors");
require("express-async-errors");

// check if order is exist by id
// this middleware is used in the following routes:
// GET a single order by ID
// PUT an existing order by ID
// DELETE an existing order by ID
exports.checkIfOrderExist = async (req, res, next) => {
  const orderInDb = await Order.findById(req.params.id);
  if (!orderInDb) {
    return next(createError.NotFound("Order not found"));
  }
  req.orderInDb = orderInDb;
  next();
};

// GET all orders
exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};


// GET a single order by ID
exports.getOrderById = async (req, res, next) => {
  res.status(200).json(req.orderInDb);
};

// POST a new order
exports.createOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

// PUT an existing order by ID
exports.updateOrderById = async (req, res, next) => {
  const order = req.orderInDb;
  order.name = req.body.name || order.name;
  order.description = req.body.description || order.description;
  order.price = req.body.price || order.price;
  order.image = req.body.image || order.image;
  
  try {
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

exports.deleteOrderById = async (req, res, next) => {

  const orderId = req.orderInDb._id;
  await Order.findByIdAndDelete(orderId);
  res.status(204).send();
};
