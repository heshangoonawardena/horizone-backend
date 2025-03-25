import express from "express";
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	getAllBookingsForHotelId,
	getBookingById,
	getAllBookingsForUserId,
	getAllBookingsForOwnerId,
	cancelBooking,
} from "../application/booking";
import { isAuthenticated } from "./middlewares/authentication-middleware";

const bookingRouter = express.Router();

bookingRouter
	.route("/")
	.post(isAuthenticated, createBooking)
	.get(getAllBookings);
bookingRouter.route("/user").get(getAllBookingsForUserId);
bookingRouter.route("/owner").get(getAllBookingsForOwnerId);
bookingRouter
	.route("/:id")
	.get(getBookingById)
	.delete(deleteBooking)
	.patch(isAuthenticated, cancelBooking);
bookingRouter.route("/hotels/:hotelId").get(getAllBookingsForHotelId);

export default bookingRouter;
