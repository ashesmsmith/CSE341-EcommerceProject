const productRoute = require('express').Router();
const productController = require('../controllers/productController');

productRoute.get('/', productController.getProducts);
productRoute.get('/:id', productController.getProductById);
productRoute.post('/', productController.createProduct);
productRoute.put('/:id', productController.updateProduct);
productRoute.delete('/:id', productController.deleteProduct);

module.exports = productRoute;
