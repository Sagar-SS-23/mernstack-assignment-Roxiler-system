const express = require("express");
const {
  seedDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} = require("../controllers/transactionsController");

const router = express.Router();

router.get("/seed", seedDatabase);
router.get("/list", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChart);
router.get("/piechart", getPieChart);
router.get("/combined", getCombinedData);

module.exports = router;
