import express from 'express';
import { createBooking, deleteBooking, getAllBookings, getAllBookingsForHotelId, getBookingById } from '../application/booking';
import { isAuthenticated } from './middlewares/authentication-middleware';

const bookingRouter = express.Router();

bookingRouter.route('/').post(isAuthenticated, createBooking).get(getAllBookings)

bookingRouter.route('/:id').get(getBookingById).delete(deleteBooking)

bookingRouter.route('/hotels/:hotelId').get(getAllBookingsForHotelId)

export default bookingRouter
