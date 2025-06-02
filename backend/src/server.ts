import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./middleware/rateLimiter";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import visitorRoutes from "./routes/visitorRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();

connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(cors({ origin: "https://your-production-domain.com" }));
} else {
  app.use(morgan("dev"));
  app.use(cors());
}

app.use(express.json());
app.use(limiter);

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
