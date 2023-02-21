const Order = require("../models/order");

exports.getAllOrders = async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};

exports.getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.status(200).json(order);
  } else {
    return next(createError.NotFound("Order not found"));
  }
};

exports.createOrder = async (req, res, next) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    return next(createError(400, err.message));
  }
};

exports.updateOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
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
  } else {
    return next(createError.NotFound("Order not found"));
  }
};

exports.deleteOrderById = async (req, res, next) => {

    await Order.findByIdAndDelete(req.params.id);
    res.status(204).send();

};
