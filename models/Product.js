
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      min: 0,
      required: true
    },
    stock: {
      type: Number,
      min: 0,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }

  }
);
module.exports = mongoose.model('Product', productSchema);