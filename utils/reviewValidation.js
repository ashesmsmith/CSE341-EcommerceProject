const { body, param, validationResult } = require('express-validator');

const validateReviewCreation = [
  body('productId')
    .exists()
    .withMessage('Product ID is required.')
    .isString()
    .withMessage('Product ID must be a string.'),
  body('rating')
    .exists()
    .withMessage('Rating is required.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
  body('comment')
    .exists()
    .withMessage('Comment is required.')
    .isString()
    .withMessage('Comment must be a valid string.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

const validateReviewUpdate = [
  param('reviewId')
    .exists()
    .withMessage('Review ID is required.')
    .isString()
    .withMessage('Review ID must be a string.')
    .isLength({ min: 24, max: 24 })
    .withMessage('Review ID must be a valid 24-character MongoDB Object ID.'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
  body('comment')
    .optional()
    .isString()
    .withMessage('Comment must be a valid string.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

const validateReviewIdParam = [
  param('reviewId')
    .exists()
    .withMessage('Review ID is required.')
    .isString()
    .withMessage('Review ID must be a string.')
    .isLength({ min: 24, max: 24 })
    .withMessage('Review ID must be a valid 24-character MongoDB Object ID.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateReviewCreation,
  validateReviewUpdate,
  validateReviewIdParam
};
