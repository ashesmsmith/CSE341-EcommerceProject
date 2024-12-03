const orderRoute = require("express").Router()
const orderController = require("../controllers/orderController")

orderRoute.get("/", orderController.findAll)
orderRoute.get("/:id", orderController.findById)
orderRoute.post("/", orderController.createOrder)
orderRoute.put("/:id", orderController.updateOrderById)
orderRoute.delete("/:id", orderController.deleteOrderById)

module.exports = orderRoute