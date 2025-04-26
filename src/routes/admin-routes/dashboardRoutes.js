

const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/admin-controller/dashboardController");

// Get all dashboard data
router.get("/", dashboardController.getDashboardData);

// Get dashboard stats
router.get("/stats", dashboardController.getDashboardStats);

// Get charts data
router.get("/charts", dashboardController.getChartsData);

// Get tables data
router.get("/tables", dashboardController.getTablesData);

module.exports = router;