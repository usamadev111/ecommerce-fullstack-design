import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log("Error while connecting database");
  }
};

export default connectDB;
