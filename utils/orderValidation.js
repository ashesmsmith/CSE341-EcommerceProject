const { body, validationResult } = require('express-validator');

const createOrderRules = [
  body('userId').trim().notEmpty().withMessage('user ID is required.'),
  body('products')
    .isArray({ min: 1 })
    .withMessage(
      'Product field must be an array and contain at least one product'
    ),
  body('products.*.productId')
    .trim()
    .notEmpty()
    .withMessage('product ID is required for each product.'),
  body('product.*.quantity')
    .notEmpty()
    .withMessage('Product quantity is required for each product.')
    .isInt({ min: 1 })
    .withMessage('Product quantity must be numbers and at least 1.'),
  body('product.*.priceAtPurchase')
    .notEmpty()
    .withMessage('Product price at purchase is required for each product.')
    .isNumeric({ min: 0 })
    .withMessage(
      'Product price at purchase must be a number greater than or equal to 0.'
    ),
  body('orderDate')
    .optional()
    .isDate()
    .withMessage('Invalid order date format.  Follow YYYY-MM-DD'),
  body('status')
    .optional()
    .trim()
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  body('totalAmount')
    .notEmpty()
    .withMessage('Total amount field is required.')
    .isNumeric({ min: 0 })
    .withMessage('Total amount must be numbers.'),
  body('shipping.address')
    .trim()
    .notEmpty()
    .withMessage('Shipping address is required.')
    .isString()
    .withMessage('Shipping address must be string.'),
  body('shipping.method')
    .trim()
    .notEmpty()
    .withMessage('Shipping method is required.')
    .isIn(['standard', 'express'])
    .withMessage('Shipping method must be either standard or express.'),
  body('shipping.cost')
    .notEmpty()
    .withMessage('Shipping cost field is required.')
    .isNumeric({ min: 0 })
    .withMessage('The least shopping cost is 0.'),
  body('shipping.trackingNumber')
    .optional()
    .trim()
    .isString()
    .withMessage('Shipping tracking number must be string.'),
  body('payment.method')
    .trim()
    .notEmpty()
    .withMessage('Payment method field is required.')
    .isIn(['credit card', 'Paypal'])
    .withMessage('Payment method must be credit card or paypal.'),
  body('payment.status')
    .trim()
    .notEmpty()
    .withMessage('Payment status field is required.')
    .isIn(['paid', 'pending', 'failed', 'refunded'])
    .withMessage('Payment status must be paid, pending, failed, or refunded.'),
  body('deliveryDate')
    .optional()
    .isDate()
    .withMessage('Invalid delivery date format.  YYYY-MM-DD'),
  body('notes')
    .optional()
    .trim()
    .isString()
    .withMessage('Notes must be string.'),
  body('reviewed')
    .optional()
    .isBoolean()
    .withMessage('Reviewed field must be boolean.')
];

const updateOrderRules = [
  body('userId').trim().notEmpty().withMessage('user ID is required.'),
  body('products')
    .isArray({ min: 1 })
    .withMessage(
      'Product field must be an array and contain at least one product'
    ),
  body('products.*.productId')
    .trim()
    .notEmpty()
    .withMessage('product ID is required for each product.'),
  body('product.*.quantity')
    .notEmpty()
    .withMessage('Product quantity is required for each product.')
    .isInt({ min: 1 })
    .withMessage('Product quantity must be numbers and at least 1.'),
  body('product.*.priceAtPurchase')
    .notEmpty()
    .withMessage('Product price at purchase is required for each product.')
    .isNumeric({ min: 0 })
    .withMessage(
      'Product price at purchase must be a number greater than or equal to 0.'
    ),
  body('orderDate')
    .optional()
    .isDate()
    .withMessage('Invalid order date format.  Follow YYYY-MM-DD'),
  body('status')
    .optional()
    .trim()
    .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  body('totalAmount')
    .notEmpty()
    .withMessage('Total amount field is required.')
    .isNumeric({ min: 0 })
    .withMessage('Total amount must be numbers.'),
  body('shipping.address')
    .trim()
    .notEmpty()
    .withMessage('Shipping address is required.')
    .isString()
    .withMessage('Shipping address must be string.'),
  body('shipping.method')
    .trim()
    .notEmpty()
    .withMessage('Shipping method is required.')
    .isIn(['standard', 'express'])
    .withMessage('Shipping method must be either standard or express.'),
  body('shipping.cost')
    .notEmpty()
    .withMessage('Shipping cost field is required.')
    .isNumeric({ min: 0 })
    .withMessage('The least shopping cost is 0.'),
  body('shipping.trackingNumber')
    .optional()
    .trim()
    .isString()
    .withMessage('Shipping tracking number must be string.'),
  body('payment.method')
    .trim()
    .notEmpty()
    .withMessage('Payment method field is required.')
    .isIn(['credit card', 'Paypal'])
    .withMessage('Payment method must be credit card or paypal.'),
  body('payment.status')
    .trim()
    .notEmpty()
    .withMessage('Payment status field is required.')
    .isIn(['paid', 'pending', 'failed', 'refunded'])
    .withMessage('Payment status must be paid, pending, failed, or refunded.'),
  body('deliveryDate')
    .optional()
    .isDate()
    .withMessage('Invalid delivery date format.  YYYY-MM-DD'),
  body('notes')
    .optional()
    .trim()
    .isString()
    .withMessage('Notes must be string.'),
  body('reviewed')
    .optional()
    .isBoolean()
    .withMessage('Reviewed field must be boolean.'),
  body('createdAt')
    .notEmpty()
    .withMessage('CreatedAt field is required.')
    .isDate()
    .withMessage('Invalid createdAt date format.  YYYY-MM-DD'),
  body('orderDate')
    .notEmpty()
    .withMessage('Order date is required.')
    .isDate()
    .withMessage('Invalid orderDate format.  YYYY-MM-DD')
];

const validateOrder = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

module.exports = { createOrderRules, updateOrderRules, validateOrder };
