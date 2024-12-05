const productRoute = require('express').Router();
const productController = require('../controllers/productController');
const { checkAuth, checkAdmin } = require('../utils/Oauth');

productRoute.get('/', checkAuth, productController.getProducts);
productRoute.get('/:id', checkAuth, productController.getProductById);
productRoute.post('/', checkAuth, checkAdmin, productController.createProduct);
productRoute.put('/:id', checkAuth, checkAdmin, productController.updateProduct);
productRoute.delete('/:id', checkAuth, checkAdmin, productController.deleteProduct);

module.exports = productRoute;
