import express from "express";
import {
  createProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewArrivals,
  getProductById,
  getProducts,
  getRelatedProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminOnly, protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/featured", getFeaturedProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/", getProducts);
router.get("/:id/related", getRelatedProducts);
router.get("/:id", getProductById);

router.post("/", protectAuth, adminOnly, createProduct);
router.put("/:id", protectAuth, adminOnly, updateProduct);
router.delete("/:id", protectAuth, adminOnly, deleteProduct);

export default router;
