const { body, validationResult } = require('express-validator');

const userRules = [
  body('firstName')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid first name.'),

  body('lastName')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid last name.'),

  body('email')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid email.'),

  body('phone')
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage('Please enter a valid phone number.'),

  body('street')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid street address.'),

  body('city')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid city.'),

  body('state')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Please enter a valid state.'),

  body('zipCode')
    .trim()
    .notEmpty()
    .isNumeric({ min: 5 })
    .withMessage('Please enter a valid zip code.'),

  body('accountType')
    .trim()
    .notEmpty()
    .isIn(['Admin', 'Customer'])
    .withMessage('Please enter a valid account type.')
];

const validateUser = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = { userRules, validateUser };
