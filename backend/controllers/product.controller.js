import { Product } from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const {
      category,
      brand,
      condition,
      minPrice,
      maxPrice,
      rating,
      search,
      sort,
      page,
      limit,
    } = req.query;

    const filterQuery = {};

    if (category && category !== "all") {
      filterQuery.category = category;
    }

    if (brand) {
      filterQuery.brand = {
        $regex: brand,
        $options: "i",
      };
    }

    if (condition && condition !== "any") {
      filterQuery.condition = condition;
    }

    if (minPrice || maxPrice) {
      filterQuery.price = {};
      if (minPrice) filterQuery.minPrice.$gte = Number(minPrice);
      if (maxPrice) filterQuery.maxPrice.$lte = Number(maxPrice);
    }

    if (rating) {
      filterQuery.rating = {
        $gte: Number(rating),
      };
    }

    if (search) {
      filterQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    let sortOtions = {};

    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOtions = { price: -1 };
    else if (sort === "rating") sortOtions = { rating: -1 };
    else if (sort === "newest") sortOtions = { createdAt: -1 };
    else if (sort === "oldest") sortOtions = { createdAt: 1 };
    else sortOtions = { createdAt: -1 };

    const pageNumber = Number(page) || 1;

    const pageSize = Number(limit) || 8;

    const skip = (pageNumber - 1) * pageSize;

    const [products, totalProducts] = await Promise.all([
      Product.find(filterQuery)
        .populate("category", "name slug")
        .sort(sortOtions)
        .skip(skip)
        .limit(pageSize),

      Product.countDocuments(filterQuery),
    ]);

    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      success: true,
      products,
      currentPage: pageNumber,
      totalPages,
      totalProducts,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
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
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(8);

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

export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .limit(8);

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
    const product = await Product.find(req.params.id).populate(
      "category",
      "name slug",
    );

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

export const getRelatedProducts = async (req, res) => {
  try {
    const produc = await Product.findById(req.params.id);

    if (!produc) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: req.params.id },
    })
      .populate("category", "name slug")
      .limit(4);

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      products: relatedProducts,
    });
  } catch (error) {
    if (error === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      price,
      originalPrice,
      category,
      condition,
      stock,
      image,
      images,
      isFeatured,
    } = req.body;

    if (!name || !description || !brand || !price || !category || !image) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all the values !name || !description || !brand || !price || !category || !image",
      });
    }

    const produc = await Product.create({
      name,
      description,
      brand,
      price,
      originalPrice: originalPrice || null,
      category,
      condition: condition || "new",
      stock: stock || 0,
      image,
      images: images || [image],
      isFeatured: isFeatured || false,
    });

    await produc.populate("category", "name slug");

    res.status(201).json({
      success: true,
      message: "Product created sucessfully",
      produc,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const produc = await Product.findById(req.params.id);

    if (!produc) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    ).populate("category", "name slug");

    res.status(200).json({
      success: true,
      message: "Product updated sucessfully",
      produc: updatedProduct,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted sucessfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid product ID format",
      });
    }
    res.status(500).json({ message: error.message });
  }
};
