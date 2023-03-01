
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true

  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

