const express = require("express");
const router = express.Router();
const { getProducts, createProduct, reviewProduct, cancelPayment, confirmPayment } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getProducts);

// Create a new product
router.post("/", protect, createProduct);

// Simulate reviewing a product; creates a lead of type "review"
router.post("/:productId/review", protect, reviewProduct);

// Simulate payment cancellation; creates a lead of type "cancelled"
router.post("/:productId/cancelPayment", protect, cancelPayment);

// Simulate payment confirmation; creates a lead of type "payment_confirmed"
router.post("/:productId/confirmPayment", protect, confirmPayment);

module.exports = router;
