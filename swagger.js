const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'E-commerce API enables users to manage endpoints for users, products, orders and reviews.'
  },
  // host: 'localhost:3000',
  host: 'cse341-ecommerceproject.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);