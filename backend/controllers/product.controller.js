import { Product } from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    let sortOtions = {};

    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOtions = { price: -1 };
    else if (sort === "rating") sortOtions = { rating: -1 };
    else if (sort === "newest") sortOtions = { createdAt: -1 };
    else sortOtions = { createdAt: -1 };

    const products = await Product.find(query).sort(sortOtions);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.find(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
