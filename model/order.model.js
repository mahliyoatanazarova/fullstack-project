const mongoose = require('mongoose');

const orderModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        title: {
          type: String,
          required: true,
          trim: true,
          minLength: 3,
        },
        price: {
          type: Number,
          required: true,
          min: 1,
        },
        image: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('order', orderModel);
