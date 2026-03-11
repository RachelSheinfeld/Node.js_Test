const Product = require('../models/Product')
const Category = require('../models/Category')
const fs = require('fs');
const path = require('path');
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
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
        const product=req.params.id;
        await Product.findByIdAndUpdate(product,{isActive:false})
        const ToTheLog = `${new Date().toISOString()} - Product ID: ${product} was deleted (Soft Delete)\n`;
          const logPath = path.join(logDir, 'deletions.log'); 
        fs.appendFileSync(path.join(logPath, ToTheLog));
        res.status(200).json({ message: 'Product deleted and write to log' })
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
        const catrgoryId=req.params.id;
        const products = await Product.findOne({category:catrgoryId,isActive:true})
        if(products){
            return res.status(400).json({message:"Category has products cant dalete"})
        }
        const daletecategory=await Category.findByIdAndDelete(catrgoryId)
        if(!daletecategory){
            return res.status(404).json({massage:"Category not found"})
        }
        res.status(200).json({ message: 'category deleted' })
    } catch (error) {
        next(error)
    }
}
module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById, deleteProductByCategory }