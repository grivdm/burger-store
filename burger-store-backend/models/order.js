const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User value is required']
  },
  items: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Order must have at least one item'
    }
  }
  ,
  status: {
    type: String,
    enum: ['pending', 'in progress', 'complete'],
    default: 'pending'
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    default: null
  },
  total: {
    type: Number,
      validate: {
        validator: function(v) {
          return v >= 0;
        },
        message: (props) => `${props.value} is negative!`
      },
    required: [true, 'Total value is required']
  }
},{timestamp: true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;