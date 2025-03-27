import express from "express";
import {
	createBooking,
	deleteBooking,
	getAllBookings,
	getAllBookingsForHotelId,
	getBookingById,
	getAllBookingsForUserId,
	getAllBookingsForOwnerId,
	patchBookingStatus,
} from "../application/booking";
import { isAuthenticated } from "./middlewares/authentication-middleware";
import { isAdmin } from "./middlewares/authorization-middleware";

const bookingRouter = express.Router();

bookingRouter
	.route("/")
	.post(isAuthenticated, createBooking)
	.get(getAllBookings);
bookingRouter.route("/user").get(isAuthenticated, getAllBookingsForUserId);
bookingRouter.route("/owner").get(isAuthenticated, isAdmin, getAllBookingsForOwnerId);
bookingRouter
	.route("/:id")
	.get(isAuthenticated, getBookingById)
	.delete(isAuthenticated, deleteBooking)
	.patch(isAuthenticated, patchBookingStatus);
bookingRouter.route("/hotels/:hotelId").get(isAdmin, getAllBookingsForHotelId);

export default bookingRouter;
