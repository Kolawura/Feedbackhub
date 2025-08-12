import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { limiter } from "./middleware/rateLimiter.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import siteRoutes from "./routes/siteRoutes.js";

dotenv.config();

const app: Application = express();

connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(cors());
}

// add this before routes
app.use(cookieParser());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/site", siteRoutes);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("FeedbackHub API is running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
