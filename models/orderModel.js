const { Schema, model, Types } = require('mongoose');

const orderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        priceAtPurchase: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    orderDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      required: true,
      default: 'pending'
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    shipping: {
      address: {
        type: String,
        required: true
      },
      method: {
        type: String,
        enum: ['standard', 'express'],
        required: true
      },
      cost: {
        type: Number,
        required: true,
        min: 0
      },
      trackingNumber: {
        type: String,
        default: null
      }
    },
    payment: {
      method: {
        type: String,
        enum: ['credit card', 'PayPal'],
        required: true
      },
      status: {
        type: String,
        enum: ['paid', 'pending', 'failed', 'refunded'],
        required: true,
        default: 'pending'
      }
    },
    deliveryDate: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      default: null
    },
    reviewed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
