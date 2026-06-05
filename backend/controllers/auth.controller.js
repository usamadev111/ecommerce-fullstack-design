import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  generateRefreshToken,
  generateAccessToken,
} from "../utils/generateTokens.js";
import { isProd } from "../config/constants.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Missing requied field: name is missing",
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Missing requied field: email is missing",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Missing requied field: password is missing",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({
        message: "A user with this email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const refreshToken = generateRefreshToken(user._id);

    const accessToken = generateAccessToken(user._id, user.role);

    const generateSalt = await bcrypt.genSalt(10);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, generateSalt);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("User Registration Failed");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Invalid credentials email or password",
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Invalid credentials email or password",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password !",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const refreshToken = generateRefreshToken(user._id);

      const accessToken = generateAccessToken(user._id, user.role);

      const salt = await bcrypt.genSalt(10);

      const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);

      user.refreshToken = hashedRefreshToken;

      await user.save();

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "strict",
        path: "/api/auth/refresh",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "User LoggedIn Sucessfully !",
        accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log("Invalid Credentials email or password");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(403).jso({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isTokenValid) {
      return res.status(403).json({
        success: false,
        message: "refresh token mismatch",
      });
    }

    const newRefreshToken = generateRefreshToken(user._id);

    const newAccessToken = generateAccessToken(user._id, user.role);

    const salt = await bcrypt.genSalt(10);

    const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, salt);

    user.refreshToken = newHashedRefreshToken;
    user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    await User.findByIdAndUpdate(decoded.id, { refreshToken: null });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/api/auth/refresh",
    });

    res
      .status(200)
      .json({ success: true, message: "User Logged Out Sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
