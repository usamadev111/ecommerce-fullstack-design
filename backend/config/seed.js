import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/products.model.js";
import connectDB from "./db.js";
import { Category } from "../models/category.model.js";

dotenv.config();

const seedDB = async () => {
  try {
    connectDB();

    const mobiles = await Category.create({ name: "Mobiles" });

    const products = [
      {
        name: "Samsung Galaxy S24",
        description:
          "Latest Samsung flagship with amazing camera system, long battery life and powerful Snapdragon processor.",
        brand: "Samsung",
        condition: "New",
        price: 899.99,
        originalPrice: 999.99,
        category: mobiles._id,
        stock: 20,
        rating: 4.7,
        numReviews: 310,
        isFeatured: true,
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        images: [
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
          "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500",
        ],
      },
    ];

    // await mongoose.connect(process.env.MONGODB_URI);

    // console.log("Database connected for seeding");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Sample Products Inserted Successfully !!!!");

    process.exit();
  } catch (error) {
    console.log("Failed To inert the sample products !!!", error);

    process.exit(1);
  }
};

seedDB();
