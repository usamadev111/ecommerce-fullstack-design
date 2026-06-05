import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "access token expired" });
      }

      if (error.name === "jsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Invalid access token" });
      }

      return res.status(401).json({
        success: false,
        message: "Unauthorized request, token verifiacation failed",
      });
    }

    const user = await User.findById(decoded.id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "access denied, admin privilages only",
    });
  }
};
