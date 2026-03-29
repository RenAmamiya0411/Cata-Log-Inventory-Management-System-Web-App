import Categories from "../models/Categories.js";
import Product from "../models/Product.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Categories.countDocuments();
    const lowStockItems = await Product.countDocuments({
      $expr: { $lte: ["$stock", "$lowStockThreshold"] }
    });

    res.json({
      totalProducts,
      totalCategories,
      lowStockItems
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
