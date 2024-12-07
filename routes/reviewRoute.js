const reviewRoute = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { checkAuth, checkAdmin } = require('../utils/Oauth');

// Add a review
reviewRoute.post('/', checkAuth, reviewController.addReview);

// Get reviews for a product
reviewRoute.get('/:productId', reviewController.getReviews);

// Update a review
reviewRoute.put('/:reviewId', checkAuth, reviewController.updateReview);

// Delete a review (Admin only)
reviewRoute.delete('/:reviewId', checkAuth, checkAdmin, reviewController.deleteReview);


module.exports = reviewRoute;
