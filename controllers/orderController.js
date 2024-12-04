const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId
const Order = require("../models/orderModel")

const findAll = async (req, res, next) => {
    /* #swagger.description = "Retrieve all the user's orders.  Admin users can retrieve all orders."
       #swagger.tags = ["orders"] */
    try {
        let result
        const { isAdmin, userId } = req.user

        if (isAdmin) {
            // Admin: fetch all orders
            result = await Order.find()
        } else {
            // Non-admin: fetch only orders belonging to the user
            result = await Order.find({ userId })
        }

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
                message: "ID parameter is missing."
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

const createOrder = async(req, res, next) => {
    /* #swagger.description = "Create a new order"
    #swagger.tags = ["orders"] */
    try {
        const {
            userId,
            products,
            totalAmount,
            shipping,
            payment,
            deliveryDate,
            notes,
         } = req.body

         if (!userId || !products || !totalAmount || !shipping || !payment) {
            return res.status(400).json({
                success: false,
                message: "Invalid parameters: userId, products, orderDate, status, totalAmount, shipping, and payment are required."
            })
         }

         const newOrder = new Order({
            userId,
            products,
            totalAmount,
            shipping,
            payment,
            deliveryDate,
            notes,
         })

         const result = await newOrder.save()
         
         if (!result) {
            return res.status(404).json({
                success: false,
                message: "Unable to create order"
            })
         }

         return res.status(201).json({
            success: true,
            data: result
         })

    } catch (error) {
        next(error)
    }
}

const updateOrderById = async(req, res, next) => {
    /* #swagger.description = "update an order by its ID"
       #swagger.tags = ["orders"] */
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is missing."
            })
        }
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }

        const {
            userId,
            products,
            totalAmount,
            shipping,
            payment,
            createdAt,
            orderDate,
         } = req.body

         if (!userId || !products || !totalAmount || !shipping || !payment || !createdAt || !orderDate) {
            return res.status(400).json({
                success: false,
                message: "Invalid parameters: userId, products, orderDate, status, totalAmount, shipping, and payment are required."
            })
         }

        const updatedOrder = req.body

        const result = await Order.findOneAndReplace({_id: id}, updatedOrder, { returnDocument: "after"})

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order not found or could not be updated"
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

const deleteOrderById = async(req, res, next) => {
    /* #swagger.description = "Delete an order by its ID"
    #swagger.tags = ["orders"] */
    try {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID is missing."
            })
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            })
        }

        const result = await Order.findByIdAndDelete({_id: id})        
        console.log("Delete result: ", result)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order not found or could not be deleted"
            })
        }

        return res.status(200).json({
            success: true,
            message: `The order of ${id} has been deleted successfully.`
        })

    } catch (error) {
        next(error)
    }
}

module.exports = { findAll, findById, createOrder, updateOrderById, deleteOrderById }