import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import express from "express";
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
import bookingRouter from "./api/booking";
import cors from "cors";
import globalErrorHandlingMiddleware from "./api/middlewares/global-error-handling-middleware";
import favoritesRouter from "./api/favorites";

const app = express();
app.use(clerkMiddleware());

app.use(express.json());
app.use(cors());

connectDB();
const PORT = process.env.PORT || 3000;

app.use("/api/hotels", hotelsRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/favorites", favoritesRouter);

app.use(globalErrorHandlingMiddleware);

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
