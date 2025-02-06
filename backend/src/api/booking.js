import express from 'express';
import { createBooking, deleteBooking, getAllBookings, getAllBookingsForHotelId, getBookingById } from '../application/booking.js';

const bookingRouter = express.Router();

bookingRouter.route('/').post(createBooking).get(getAllBookings)

bookingRouter.route('/:id').get(getBookingById).delete(deleteBooking)

bookingRouter.route('/hotels/:hotelId').get(getAllBookingsForHotelId)

export default bookingRouter
