const Review = require('../models/reviewModel');

/* #swagger.tags = ['Reviews'] */

const getAllReviews = async (req, res, next) => {
  /* #swagger.description = 'Retrieve all reviews (Admin only).' */
  try {
    const reviews = await Review.find().populate('productId userId', 'name email');
    if (!reviews.length) {
      return res.status(404).json({ success: false, message: 'No reviews found.' });
    }
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

const getReviewsByUser = async (req, res, next) => {
  /* #swagger.description = 'Retrieve all reviews created by a specific user.' 
     #swagger.parameters['userId'] = { description: 'The ID of the user whose reviews are being fetched.' }
  */
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId }).populate('productId', 'name');
    if (!reviews.length) {
      return res.status(404).json({ success: false, message: 'No reviews found for this user.' });
    }
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

const getReviewById = async (req, res, next) => {
  /* #swagger.description = 'Retrieve a specific review by ID.'
     #swagger.parameters['reviewId'] = { description: 'The ID of the review to be retrieved.' }
  */
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId).populate('productId userId', 'name email');
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  /* #swagger.description = 'Create a new review for a product.' 
     #swagger.parameters['body'] = { 
       in: 'body',
       description: 'Review creation payload.',
       schema: { 
         productId: '63e2f8c9a4f0b5c6e2345678', 
         rating: 5, 
         comment: 'Great product!' 
       }
     }
  */
  try {
    const { productId, userId, rating, comment } = req.body;
    //const userId = req.oidc.user.sub;

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product.' });
    }

    const newReview = new Review({ productId, userId, rating, comment });
    const savedReview = await newReview.save();
    res.status(201).json({ success: true, data: savedReview });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  /* #swagger.description = 'Update a review by its ID.' 
     #swagger.parameters['reviewId'] = { description: 'The ID of the review to be updated.' }
     #swagger.parameters['body'] = { 
       in: 'body',
       description: 'Review update payload.',
       schema: { 
         rating: 4, 
         comment: 'Updated comment.' 
       }
     }
  */
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    const updatedReview = await review.save();
    res.status(200).json({ success: true, data: updatedReview });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  /* #swagger.description = 'Delete a review by its ID.' 
     #swagger.parameters['reviewId'] = { description: 'The ID of the review to be deleted.' }
  */
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    await review.remove();
    res.status(200).json({ success: true, message: 'Review deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewsByUser,
  getReviewById,
  addReview,
  updateReview,
  deleteReview
};
