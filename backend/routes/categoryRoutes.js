import express from "express";
import { getCategories, addCategory, deleteCategory } from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCategories);
router.post("/", protect, adminOnly, addCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;
