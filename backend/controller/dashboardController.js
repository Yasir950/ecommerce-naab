import User from "../models/userModel.js";
import Cat from "../models/catModels.js";
import Product from "../models/productModels.js";
import Order from "../models/orderModels.js";
import handleError from "../utils/errorhandler.js";

export const getCounts = async (req, res) =>{
    try {
        const userCount = await User.countDocuments();
        const productCount = await Product.countDocuments();
        const categoryCount = await Cat.countDocuments();
        const ordeCount = await Order.countDocuments();
        const totalAmount = await Order.aggregate([{
    $group: {
        _id: null,
      total: { $sum: "$price" },
    }}])
    const totalProductSales = await Product.aggregate([{
    $group: {
        _id: null,
      total: { $sum: "$quantity" },
}}])
     const storeOverview = {
        userCount,
        productCount,
        categoryCount,
        ordeCount,
        totalSales: totalAmount[0]?.total || 0,
        totalProductSales: totalProductSales[0]?.total || 0,
     }
     res.status(200).json({counts:storeOverview})
    } catch (error) {
        handleError(error, res)
    }
}

export const getGraphData = async (req, res) =>{
    try {
        const {start, end} =req.query;
        const graphData = await Order.aggregate([
  {
    $match: {
      createdAt: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    }
  },
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      },
      totalOrders: { $sum: 1 },
      totalSales: { $sum: "$price" }
    }
  },
  { $sort: { _id: 1 } } // sort by date ascending
]);
  res.status(200).json({graphData})

    } catch (error) {
        handleError(error, res)
    }
}
