import { Category } from "../models/category.model.js";
import { Product } from "../models/products.model.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      categories: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category Name is required",
      });
    }

    const nameExists = await Category.findOne({ name });

    if (nameExists) {
      return res.status(400).json({
        success: false,
        message: "CAtegory already exists",
      });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Category created sucessfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Category updated Succesfully",
      category: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const productsCount = await Product.countDocuments({
      category: req.params.id,
    });

    if (productsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete - ${productsCount} products are using this category. Reassign them first..`,
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted sucessfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
