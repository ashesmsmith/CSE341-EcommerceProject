const orderRoute = require("express").Router()
const orderController = require("../controllers/orderController")

orderRoute.get("/", orderController.findAll)

module.exports = orderRoute