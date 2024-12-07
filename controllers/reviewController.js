const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Review = require('../models/reviewModel');

const addReview = async (req, res, next) => {
  /* #swagger.description = "Add a review to a product."
       #swagger.tags = ["reviews"] */
  try {
    const { productId, userId, rating, comment } = req.body;

    if (!productId || !userId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, User ID, rating, and comment are required.',
      });
    }

    if (!ObjectId.isValid(productId) || !ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID or User ID format.',
      });
    }

    const newReview = new Review({
      productId,
      userId,
      rating,
      comment,
    });

    const result = await newReview.save();

    return res.status(201).json({
      success: true,
      message: 'Review added successfully.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  /* #swagger.description = "Retrieve all reviews for a product."
       #swagger.tags = ["reviews"] */
  try {
    const { productId } = req.params.productId;
    
    
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID format.',  
      });
    }

    
    const reviews = await Review.find({ productId: objectId }).populate('userId', 'firstName lastName');
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found for this product.',
      });
    }

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  /* #swagger.description = "Delete a review by its ID (Admin only)."
       #swagger.tags = ["reviews"] */
  try {
    const { reviewId } = req.params;

    if (!ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Review ID format.',
      });
    }

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or already deleted.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Review with ID ${reviewId} has been deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
    /* #swagger.description = "Update a review by its ID."
         #swagger.tags = ["reviews"] */
    try {
      const { reviewId } = req.params;
      const { userId, rating, comment } = req.body;
  
      if (!rating && !comment) {
        return res.status(400).json({
          success: false,
          message: 'Rating or comment must be provided for an update.',
        });
      }
  
      if (!ObjectId.isValid(reviewId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid Review ID format.',
        });
      }
  
      const review = await Review.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({
          success: false,
          message: 'Review not found.',
        });
      }
  
      if (review.userId.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to update this review.',
        });
      }
  
      // Update fields if they are provided
      if (rating) review.rating = rating;
      if (comment) review.comment = comment;
  
      const updatedReview = await review.save();
  
      return res.status(200).json({
        success: true,
        message: 'Review updated successfully.',
        data: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = { addReview, getReviews, deleteReview, updateReview };
