const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Review = require('../models/reviewModel');

/* Add a new review */
const addReview = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Add a new review for a product.' */
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, User ID, rating, and comment are required.'
      });
    }

    if (!ObjectId.isValid(productId) || !ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID or User ID format.'
      });
    }

    const newReview = new Review({ productId, userId, rating, comment });
    const result = await newReview.save();

    return res.status(201).json({
      success: true,
      message: 'Review added successfully.',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/* Retrieve all reviews (Admin only) */
const getAllReviews = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Retrieve all reviews (Admin only).' */
  try {
    const result = await Review.find();
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found.'
      });
    }
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/* Retrieve reviews by product ID */
const getReviewsByProduct = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Retrieve reviews for a specific product.' */
  try {
    const { productId } = req.params;

    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID format.'
      });
    }

    const reviews = await Review.find({ productId });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found for this product.'
      });
    }

    return res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

/* Retrieve a review by ID */
const getReviewById = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Retrieve a specific review by its ID.' */
  try {
    const { reviewId } = req.params;

    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format.'
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

/* Update a review */
const updateReview = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Update a review by its ID.' */
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    if (!rating && !comment) {
      return res.status(400).json({
        success: false,
        message: 'At least one of rating or comment must be provided for an update.'
      });
    }

    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format.'
      });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found.'
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    const updatedReview = await review.save();

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully.',
      data: updatedReview
    });
  } catch (error) {
    next(error);
  }
};

/* Delete a review by ID */
const deleteReview = async (req, res, next) => {
  /* #swagger.tags = ['reviews']
     #swagger.description = 'Delete a review by its ID (Admin only).' */
  try {
    const { reviewId } = req.params;

    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format.'
      });
    }

    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or already deleted.'
      });
    }

    return res.status(200).json({
      success: true,
      message: `Review with ID ${reviewId} has been deleted successfully.`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewsByProduct,
  getReviewById,
  updateReview,
  deleteReview
};
