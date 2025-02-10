import "dotenv/config"
import express from "express";
import hotelsRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";
import userRouter from "./api/user.js";
import bookingRouter from "./api/booking.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors());

connectDB()

app.use("/api/hotels", hotelsRouter)
app.use("/api/users", userRouter)
app.use("/api/bookings", bookingRouter)


// Define the port to run the server
app.listen(3000, console.log("server listening on port 3000"));