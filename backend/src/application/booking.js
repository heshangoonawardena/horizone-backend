import Booking from "../infrastructure/schemas/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = req.body;

  // add validation here
  if (
    !newBooking.userId ||
    !newBooking.hotelId ||
    !newBooking.checkIn ||
    !newBooking.checkOut ||
    !newBooking.roomNumber
  ) {
    return res.status(404).send();
  }

  await Booking.create({
    userId: newBooking.userId,
    hotelId: newBooking.hotelId,
    checkIn: newBooking.checkIn,
    checkOut: newBooking.checkOut,
    roomNumber: newBooking.roomNumber,
  });

  return res.status(201).send(newBooking);
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({});
  return res.status(200).json(bookings);
}

export const getBookingById = async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).send();
  }
  
  return res.status(200).json(booking);
}

export const getAllBookingsForHotelId = async (req, res) => {
  const hotelId = req.params.hotelId;
  const bookings = await Booking.find({ hotelId }).populate('userId');
  return res.status(200).json(bookings);
}

export const deleteBooking = async (req, res) => {
  const bookingId = req.params.id;
  const booking = await Booking.findByIdAndDelete(bookingId);

  if (!booking) {
    return res.status(404).send();
  }

  return res.status(200).send();
}