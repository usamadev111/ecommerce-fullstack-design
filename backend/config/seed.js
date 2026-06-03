import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "../models/products.model.js";
import connectDB from "./db.js";

dotenv.config();

const products = [
  {
    name: "Classic White Sneakers",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Comfortable everyday sneakers with a clean minimal look.",
    category: "men",
    stock: 50,
    rating: 4.5,
    numReviews: 120,
    isFeatured: true,
  },
  {
    name: "Floral Summer Dress",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    description: "Light and breezy floral dress perfect for summer outings.",
    category: "women",
    stock: 30,
    rating: 4.7,
    numReviews: 85,
    isFeatured: true,
  },
  {
    name: "Kids Denim Jacket",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
    description: "Stylish denim jacket for kids, durable and comfortable.",
    category: "kids",
    stock: 25,
    rating: 4.3,
    numReviews: 40,
    isFeatured: false,
  },
  {
    name: "Leather Crossbody Bag",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    description: "Premium leather crossbody bag with multiple compartments.",
    category: "accessories",
    stock: 15,
    rating: 4.8,
    numReviews: 200,
    isFeatured: true,
  },
  {
    name: "Men's Slim Fit Chinos",
    price: 44.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    description: "Slim fit chinos for a smart casual look.",
    category: "men",
    stock: 60,
    rating: 4.4,
    numReviews: 95,
    isFeatured: false,
  },
  {
    name: "Women's Running Shoes",
    price: 74.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Lightweight running shoes with superior cushioning.",
    category: "women",
    stock: 40,
    rating: 4.6,
    numReviews: 150,
    isFeatured: true,
  },
];

const seedDB = async () => {
  try {
    connectDB();

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
