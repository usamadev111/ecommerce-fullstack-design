import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUserProfile,
} from "../controllers/auth.controller.js";
import { protectAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/user", protectAuth, getUserProfile);

export default router;
