import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    originalPrice: {
      type: Number,
      default: null,
    },

    image: {
      type: String,
      required: [true, "Product Image is required"],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 6;
        },
        message: " A product can have maximum 6 images",
      },
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = new mongoose.model("Product", productSchema);
