import { clerkClient, ExpressRequestWithAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { createBookingDTO } from "../domain/dtos/booking";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Booking from "../infrastructure/schemas/Booking";
import Hotel from "../infrastructure/schemas/Hotel";

export const createBooking = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const newBooking = createBookingDTO.safeParse(req.body);

		if (!newBooking?.success) {
			throw new ValidationError(newBooking?.error?.issues[0].message);
		}

		const user = req?.auth;

		await Booking.create({
			userId: user.userId,
			hotelId: newBooking.data.hotelId,
			phoneNumber: newBooking.data.phoneNumber,
			roomType: newBooking.data.roomType,
			mealPlan: newBooking.data.mealPlan,
			adults: newBooking.data.adults,
			kids: newBooking?.data.kids,
			checkIn: newBooking.data.checkIn,
			checkOut: newBooking.data.checkOut,
			requests: newBooking?.data.requests,
			totalAmount: newBooking.data.totalAmount,
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
		const bookings = await Booking.find({ hotelId });
		const bookingWithUser = await Promise.all(
			bookings.map(async (booking) => {
				const user = await clerkClient?.users.getUser(booking.userId);
				return {
					id: booking._id,
					userId: booking.userId,
					hotelId: booking.hotelId,
					checkIn: booking.checkIn,
					checkOut: booking.checkOut,
					phoneNumber: booking.phoneNumber,
					roomType: booking.roomType,
					mealPlan: booking.mealPlan,
					adults: booking.adults,
					kids: booking.kids,
					totalAmount: booking?.totalAmount,
					status: booking.status,
					user: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
					},
				};
			})
		);
		res.status(200).json(bookingWithUser);
		return;
	} catch (error) {
		next(error);
	}
};

export const getAllBookingsForUserId = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		// const userId = "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX";
		const userId = req.auth.userId;
		const bookings = await Booking.find({ userId });
		const bookingsWithHotelDetails = await Promise.all(
			bookings.map(async (booking) => {
				const hotel = await Hotel.findById(booking.hotelId);
				return {
					...booking.toObject(),
					hotel: {
						id: hotel?._id,
						name: hotel?.name,
						location: hotel?.location,
						image: hotel?.image,
						description: hotel?.description,
					},
				};
			})
		);
		res.status(200).json(bookingsWithHotelDetails);
		return;
	} catch (error) {
		next(error);
	}
};

export const getAllBookingsForOwnerId = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const ownerId = req.auth.userId;
		// const ownerId = "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX";
		const hotels = await Hotel.find({ ownerId });
		const hotelIds = hotels.map((hotel) => hotel._id);
		const bookings = await Booking.find({ hotelId: { $in: hotelIds } });
		const bookingsWithDetails = await Promise.all(
			bookings.map(async (booking) => {
				const hotel = await Hotel.findById(booking.hotelId);
				const user = await clerkClient?.users.getUser(booking.userId);
				return {
					...booking.toObject(),
					hotel: {
						id: hotel?._id,
						name: hotel?.name,
						location: hotel?.location,
						image: hotel?.image,
						description: hotel?.description,
					},
					user: {
						fullName: user.fullName,
						email: user.emailAddresses[0].emailAddress,
					},
				};
			})
		);
		res.status(200).json(bookingsWithDetails);
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
		const booking = await Booking.findById(bookingId);

		if (!booking) {
			throw new NotFoundError("Booking not found");
		}

		await Booking.findByIdAndDelete(bookingId);

		res.status(200).send();
		return;
	} catch (error) {
		next(error);
	}
};
