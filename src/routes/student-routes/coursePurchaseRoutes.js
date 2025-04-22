// 🔸 IMPORT COURSE PURCHASE FUNCTIONS
const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  confirmPayment,
} = require("../../controllers/student-controller/coursePurchaseController");

// 🔸 REGULAR JSON ROUTES
router.use(express.json());

/**
 * ======================================
 *   COURSE PURCHASE MANAGEMENT ROUTES
 * ======================================
 */

// 🔸 CREATE PAYMENT INTENT (POST /student/course-payment/create-payment-intent)
router.post("/create-payment-intent", createPaymentIntent);

// 🔸 CONFIRM PAYMENT GATEWAY (POST /student/course-payment/confirm-payment)
router.post("/confirm-payment", confirmPayment);

module.exports = router;