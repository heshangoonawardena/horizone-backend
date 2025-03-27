import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL
    if (!MONGODB_URL) {
      console.error("No MongoDB URL is not set");
      process.exit(1);
    }
    
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;