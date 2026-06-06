import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller.js";
import { adminOnly, protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protectAuth, adminOnly, createCategory);
router.put("/:id", protectAuth, adminOnly, updateCategory);
router.delete("/:id", protectAuth, adminOnly, deleteCategory);

export default router;
