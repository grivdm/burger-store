const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'in progress', 'complete'],
    default: 'pending'
  },
  total: {
    type: Number,
    required: true
  }
},{timestamp: true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;