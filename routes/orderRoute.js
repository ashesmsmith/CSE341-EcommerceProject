const orderRoute = require("express").Router()
const orderController = require("../controllers/orderController")
const checkAuth = require("../utils/checkAuth")
const { createOrderRules, updateOrderRules, validateOrder } = require("../utils/orderValidation")

orderRoute.get("/all", checkAuth, orderController.findAllByAdmin)
orderRoute.get("/user/:userId", checkAuth, orderController.findAllByUser)
orderRoute.get("/:id", checkAuth, orderController.findById)
orderRoute.post("/", checkAuth, createOrderRules, validateOrder, createOrderRules, validateOrder, orderController.createOrder)
orderRoute.put("/:id", checkAuth, updateOrderRules, validateOrder, orderController.updateOrderById)
orderRoute.delete("/:id", checkAuth, orderController.deleteOrderById)

module.exports = orderRoute