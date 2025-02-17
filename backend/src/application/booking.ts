import { NextFunction, Request, Response } from "express";
import Booking from "../infrastructure/schemas/Booking";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/not-found-error";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBooking = req.body;

    // add validation here
    if (
      !newBooking.userId ||
      !newBooking.hotelId ||
      !newBooking.checkIn ||
      !newBooking.checkOut ||
      !newBooking.roomNumber
    ) {
      throw new ValidationError("Invalid booking data");
    }

    await Booking.create({
      userId: newBooking.userId,
      hotelId: newBooking.hotelId,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      roomNumber: newBooking.roomNumber,
    });

    res.status(201).send(newBooking);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    res.status(200).json(booking);
    return;
  } catch (error) {
    next(error);
  }
};

export const getAllBookingsForHotelId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelId = req.params.hotelId;
    const bookings = await Booking.find({ hotelId }).populate("userId");
    res.status(200).json(bookings);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};
