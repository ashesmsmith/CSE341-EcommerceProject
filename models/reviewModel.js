const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      ref: 'products',
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'users',
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
  { timestamps: true }
);

const Review = model('Review', reviewSchema);

module.exports = Review;
