const { body, validationResult } = require('express-validator');

const validateReview = [
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),
  body('comment')
    .optional()
    .isString()
    .withMessage('Comment must be a string.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateReview };
