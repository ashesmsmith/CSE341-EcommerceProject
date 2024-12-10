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
    }
  },
  { timestamps: true }
);

// Prevent duplicate reviews for the same product by the same user
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

const Review = model('Review', reviewSchema);

module.exports = Review;
