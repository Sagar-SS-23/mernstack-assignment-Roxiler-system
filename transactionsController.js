const axios = require("axios");
const Transaction = require("../models/Transaction");

// Seed database
exports.seedDatabase = async (req, res) => {
  try {
    const url = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
    const { data } = await axios.get(url);
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transactions with search and pagination
exports.getTransactions = async (req, res) => {
  const { month, search = "", page = 1, perPage = 10 } = req.query;
  const startDate = new Date(`${month} 1`);
  const endDate = new Date(`${month} 1`);
  endDate.setMonth(endDate.getMonth() + 1);

  const query = {
    dateOfSale: { $gte: startDate, $lt: endDate },
    $or: [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { price: parseInt(search) || 0 },
    ],
  };

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month} 1`);
  const endDate = new Date(`${month} 1`);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
    const totalSale = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalAmount: { $sum: "$price" } } },
    ]);

    const soldCount = await Transaction.countDocuments({
      sold: true,
      dateOfSale: { $gte: startDate, $lt: endDate },
    });
    const unsoldCount = await Transaction.countDocuments({
      sold: false,
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    res.json({
      totalSale: totalSale[0]?.totalAmount || 0,
      soldCount,
      unsoldCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bar chart data
exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month} 1`);
  const endDate = new Date(`${month} 1`);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
    const ranges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const data = await Promise.all(
      ranges.map(async (range) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: range.min, $lt: range.max },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Pie chart data
exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const startDate = new Date(`${month} 1`);
  const endDate = new Date(`${month} 1`);
  endDate.setMonth(endDate.getMonth() + 1);

  try {
    const data = await Transaction.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Combined data
exports.getCombinedData = async (req, res) => {
  try {
    const stats = await this.getStatistics(req, res);
    const barChart = await this.getBarChart(req, res);
    const pieChart = await this.getPieChart(req, res);
    res.json({ stats, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


