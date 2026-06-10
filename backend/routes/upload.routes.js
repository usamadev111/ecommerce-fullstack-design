import express from "express";
import { adminOnly, protectAuth } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import { deleteImage, uploadImage } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/", protectAuth, adminOnly, upload.single("image"), uploadImage);
router.delete("/:publicId", protectAuth, adminOnly, deleteImage);

export default router;
