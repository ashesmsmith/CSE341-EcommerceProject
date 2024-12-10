const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Review = model('Review', reviewSchema);

module.exports = Review;
