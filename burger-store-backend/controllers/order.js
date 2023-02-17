const Order = require('../models/order');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  const { user, items, totalPrice } = req.body;
  const order = new Order({ user, items, totalPrice });
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderById = async (req, res, next) => {
  const { id } = req.params;
  const { user, items, totalPrice } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { user, items, totalPrice },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};