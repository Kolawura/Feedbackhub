import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import visitorRoutes from "./routes/visitorRoutes";
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/visitors", visitorRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("FeedbackHub API is running");
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
