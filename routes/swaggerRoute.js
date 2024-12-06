const swaggerRoute = require("express").Router()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


swaggerRoute.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = swaggerRoute