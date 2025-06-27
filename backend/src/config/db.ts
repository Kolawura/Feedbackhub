import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    console.log("🌐 Connecting to MongoDB...");
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables");
    }
    const conn = await mongoose.connect(MONGO_URI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`MongoDB Connection Error: ${error.message}`);
    } else {
      console.error("An unknown error occurred while connecting to MongoDB.");
    }
    process.exit(1);
  }
};

export default connectDB;
