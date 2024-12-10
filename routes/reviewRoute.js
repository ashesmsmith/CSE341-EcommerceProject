const reviewRoute = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { checkAuth } = require('../utils/Oauth');
const { validateReviewCreation, validateReviewUpdate, validateReviewIdParam } = require('../utils/reviewValidation');

// Admin-only access
reviewRoute.get('/all', checkAuth, reviewController.getAllReviews);

// Current User's Reviews
reviewRoute.get('/users/:userId/reviews', checkAuth, reviewController.getReviewsByUser);

// Get a Specific Review by ID
reviewRoute.get('/:reviewId', checkAuth, validateReviewIdParam, reviewController.getReviewById);

// Create a Review
reviewRoute.post('/', checkAuth, validateReviewCreation, reviewController.addReview);

// Update a Review
reviewRoute.put('/:reviewId', checkAuth, validateReviewUpdate, reviewController.updateReview);

// Delete a Review
reviewRoute.delete('/:reviewId', checkAuth, validateReviewIdParam, reviewController.deleteReview);

module.exports = reviewRoute;
