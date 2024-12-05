const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Order = require('../models/orderModel');

const findAllByAdmin = async (req, res, next) => {
  /* #swagger.description = "Retrieve all orders(Admin only)."
       #swagger.tags = ["orders"] */
  try {
    const result = await Order.find();

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order(s) not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const findAllByUser = async (req, res, next) => {
  /* #swagger.description = "Retrieve all the user's orders."
       #swagger.tags = ["orders"] */
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is missing'
      });
    }
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }
    const result = await Order.find({ userId });

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        data: result
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No order found'
      });
    }
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  /* #swagger.description = "Retrieve a particular order by ID"
       #swagger.tags = ["orders"] */
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is missing.'
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const result = await Order.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
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
      notes
    } = req.body;

    const missingFields = []

    if (!userId) missingFields.push('userId');
    if (!products) missingFields.push('products');
    if (!totalAmount) missingFields.push('totalAmount');
    if (!shipping) missingFields.push('shipping');
    if (!payment) missingFields.push('payment');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing or invalid parameters: ${missingFields.join(', ')}`
      })
    }

    const newOrder = new Order({
      userId,
      products,
      totalAmount,
      shipping,
      payment,
      deliveryDate,
      notes
    });

    const result = await newOrder.save();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Unable to create order'
      });
    }

    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderById = async (req, res, next) => {
  /* #swagger.description = "update an order by its ID"
       #swagger.tags = ["orders"] */
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID parameter is missing.'
      });
    }
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const {
      userId,
      products,
      totalAmount,
      shipping,
      payment,
      createdAt,
      orderDate
    } = req.body;

    const missingFields = []

    if (!userId) missingFields.push('userId');
    if (!products) missingFields.push('products');
    if (!totalAmount) missingFields.push('totalAmount');
    if (!shipping) missingFields.push('shipping');
    if (!payment) missingFields.push('payment');
    if (!createdAt) missingFields.push('createdAt');
    if (!orderDate) missingFields.push('orderDate');
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          `Required parameter(s): ${missingFields.join(', ')}`
      });
    }

    const updatedOrder = req.body;

    const result = await Order.findOneAndReplace({ _id: id }, updatedOrder, {
      returnDocument: 'after'
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or could not be updated'
      });
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrderById = async (req, res, next) => {
  /* #swagger.description = "Delete an order by its ID"
    #swagger.tags = ["orders"] */
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'ID is missing.'
      });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    const result = await Order.findByIdAndDelete({ _id: id });
    console.log('Delete result: ', result);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or could not be deleted'
      });
    }

    return res.status(200).json({
      success: true,
      message: `The order of ${id} has been deleted successfully.`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllByAdmin,
  findAllByUser,
  findById,
  createOrder,
  updateOrderById,
  deleteOrderById
};
