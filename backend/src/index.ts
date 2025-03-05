import "dotenv/config";
import express from "express";
import hotelsRouter from "./api/hotel";
import connectDB from "./infrastructure/db";
import userRouter from "./api/user";
import bookingRouter from "./api/booking";
import cors from "cors";
import globalErrorHandlingMiddleware from "./api/middlewares/global-error-handling-middleware";

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/hotels", hotelsRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

app.use(globalErrorHandlingMiddleware);

// Define the port to run the server
app.listen(3000, () => console.log("server listening on port 3000"));
