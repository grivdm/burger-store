const mongoose = require('mongoose')

const ProductCategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    }
  });
  
  const ProductCategory = mongoose.model('ProductCategory', ProductCategorySchema);
  
  module.exports = ProductCategory;