const reviewRoute = require('express').Router();
const reviewController = require('../controllers/reviewController');
const { checkAuth, checkAdmin } = require('../utils/Oauth');

reviewRoute.post('/', checkAuth, reviewController.addReview);
reviewRoute.get('/', checkAuth, checkAdmin, reviewController.getAllReviews);
reviewRoute.get('/product/:productId', reviewController.getReviewsByProduct);
reviewRoute.get('/:reviewId', reviewController.getReviewById);
reviewRoute.put('/:reviewId', checkAuth, reviewController.updateReview);
reviewRoute.delete('/:reviewId', checkAuth, checkAdmin, reviewController.deleteReview);

module.exports = reviewRoute;
