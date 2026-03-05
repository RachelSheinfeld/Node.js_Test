const Product = require('../models/Product')
const Category = require('../models/Category')
const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        next(error)
    }
}
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedProduct)
    } catch (error) {
        next(error)
    }
}
const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndUpdate(req.params.id,{isActive:false})
        res.status(200).json({ message: 'Product deleted' })
    } catch (error) {
        next(error)
    }
}
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({isActive:true})
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}
const deleteProductByCategory = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'category deleted' })
    } catch (error) {
        next(error)
    }
}
module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, deleteProductByCategory }