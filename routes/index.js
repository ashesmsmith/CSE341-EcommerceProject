require('dotenv').config();
const router = require('express').Router();
const orderRoute = require('./orderRoute');
const userRoute = require('./userRoute');
const productRoute = require('./productRoute');
const reviewRoute = require('./reviewRoute');
const { checkAuth } = require('../utils/Oauth');

router.get('/', (req, res) => {
  const docLink = `${process.env.BASE_URL}/api-docs`;
  if (req.oidc.isAuthenticated()) {
    return res.json({
      message: 'You are logged in',
      URL: docLink
    });
  } else {
    return res.json({
      message: 'You are logged out',
      URL: docLink
    });
  }
});

router.get('/profile', checkAuth, (req, res) => {
  // #swagger.tags = ["profile"]
  return res.json(req.oidc.user);
});
router.use('/orders', orderRoute);

router.use('/users', userRoute);

router.use('/products', productRoute);

router.use('/reviews', reviewRoute);

module.exports = router;
