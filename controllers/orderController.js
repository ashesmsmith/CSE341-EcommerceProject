const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
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

const findById = async(req, res, next) => {
    /* #swagger.description = "Retrieve a particular order by ID"
    #swagger.tags = ["orders"] */
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is missing"
            })
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }

        const result = await Order.findById(id)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: result
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { findAll, findById }