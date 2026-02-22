const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.post("/:id", addProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
