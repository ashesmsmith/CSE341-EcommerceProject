const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Product = require('../models/productModel');

const getProducts = async (req, res, next) => {
  /* #swagger.description = "Retrieve all products."
       #swagger.tags = ["products"] */
  try {
    const result = await Product.find();
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Products not found'
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

const getProductById = async (req, res, next) => {
  /* #swagger.description = "Retrieve a specific product by ID"
       #swagger.tags = ["products"] */
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
    const result = await Product.findById(id);
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
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

const createProduct = async (req, res, next) => {
  /* #swagger.description = "Create a new product (Admin only)"
    #swagger.tags = ["products"] */
  try {
    const { productId, name, category, price, stock, description, imageUrl } =
      req.body;
    const newProduct = new Product({
      productId,
      name,
      category,
      price,
      stock,
      description,
      imageUrl
    });
    const result = await newProduct.save();
    return res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: error.errors
      });
    }
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  /* #swagger.description = "Update a product by ID (Admin only)"
       #swagger.tags = ["products"] */
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    const updatedProduct = req.body;
    const result = await Product.findOneAndReplace(
      { _id: id },
      updatedProduct,
      { returnDocument: 'after', runValidators: true }
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or could not be updated'
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

const deleteProduct = async (req, res, next) => {
  /* #swagger.description = "Delete a product by ID (Admin only)"
       #swagger.tags = ["products"] */
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or could not be deleted'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: result // Optional: include the deleted product's data if needed
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
