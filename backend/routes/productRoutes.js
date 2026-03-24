import express from "express";
import { getProducts, getProduct, updateProduct, addProduct, deleteProduct } from "../controllers/productController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProducts);
router.get("/:id", protect, getProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.post("/", protect, adminOnly, addProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
