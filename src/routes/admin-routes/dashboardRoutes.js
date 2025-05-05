// 🔸 IMPORT DASHBOARD CONTROLLER FUNCTIONS
const dashboardController = require("../../controllers/admin-controller/dashboardController");

// 🔸 INITIALIZE EXPRESS ROUTER
const router = require("express").Router();

/**
 * ===========================
 *      DASHBOARD ROUTES
 * ===========================
 */

// 🔸 GET ALL DASHBOARD DATA (GET /dashboard)
router.get("/", dashboardController.getDashboardData);

// 🔸 GET ONLY DASHBOARD STATS DATA (GET /dashboard/stats)
router.get("/stats", dashboardController.getDashboardStats);

// 🔸 GET ONLY DASHBOARD CHARTS DATA (GET /dashboard/charts)
router.get("/charts", dashboardController.getChartsData);

// 🔸 GET ONLY DASHBOARD TABLES DATA (GET /dashboard/tables)
router.get("/tables", dashboardController.getTablesData);

module.exports = router;