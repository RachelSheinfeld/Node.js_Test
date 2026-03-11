
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const productController = require("../controllers/productController")
const {authenticate,isAdmin} = require("../middlewares/authenticate")
const requireRoleByMethod = require("../middlewares/requireRoleByMethod")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.use(authenticate);
router.post("/products", isAdmin, productController.createProduct) 
router.get("/products", productController.getAllProducts) 
router.get("/products/:id", productController.getProductById) 
router.put("/products/:id", isAdmin, productController.updateProduct) 
router.delete("/products/:id",isAdmin, productController.deleteProduct) 
router.delete('/category/:id',isAdmin, productController.deleteProductByCategory);

module.exports = router;