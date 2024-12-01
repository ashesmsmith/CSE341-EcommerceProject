const mongoose = require("mongoose")
const ObjectId = mongoose.ObjectId
const Order = require("../models/orderModel")

const findAll = async (req, res, next) => {
    // #swagger.description = "Retrieve all orders"
    // #swagger.tags = ["orders"]
    try {
        const result = await Order.find()

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                data: result
            })
        } else {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No order found"
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports = { findAll }