import "dotenv/config"
import express from "express";
import hotelsRouter from "./api/hotel.js";
import connectDB from "./infrastructure/db.js";
import userRouter from "./api/user.js";
import bookingRouter from "./api/booking.js";

const app = express();

app.use(express.json());

connectDB()

app.use("/api/hotels", hotelsRouter)
app.use("/api/users", userRouter)
app.use("/api/bookings", bookingRouter)


// Define the port to run the server
app.listen(3000, console.log("server listening on port 3000"));


// mongodb + srv://heshangoonawardena:<db_password>@cluster0.gnmpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// 0P1wiX5s83pXNein