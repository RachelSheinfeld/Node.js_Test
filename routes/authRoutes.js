
const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const productController = require("../controllers/productController")

// --- Authentication ---
router.post("/register", authController.register)
router.post("/login", authController.login)

// --- Products CRUD ---
// יצירה
router.post("/products", productController.createProduct) 

// שליפה של כל המוצרים (הפעילים בלבד - isActive: true)
router.get("/products", productController.getAllProducts) 

// חיפוש מוצר לפי ID
router.get("/products/:id", productController.getProductById) 

// עדכון מוצר
router.put("/products/:id", productController.updateProduct) 

// מחיקה לוגית של מוצר
router.delete("/products/:id", productController.deleteProduct) 

// מחיקת קטגוריה (לפי דרישת המבחן)
router.delete('/category/:id', productController.deleteProductByCategory);

module.exports = router;