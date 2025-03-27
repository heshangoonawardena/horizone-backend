import { ExpressRequestWithAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { createHotelDTO } from "../domain/dtos/hotel";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import Hotel from "../infrastructure/schemas/Hotel";

export const getAllHotels = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotels = await Hotel.find();
		res.status(200).json(hotels);
		return;
	} catch (error) {
		next(error);
	}
};

export const getHotelById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;
		const hotel = await Hotel.findById(hotelId);
		if (!hotel) {
			throw new NotFoundError("Hotel not found");
		}
		res.status(200).json(hotel);
	} catch (error) {
		next(error);
	}
};

export const createHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const newHotel = createHotelDTO.safeParse(req.body);

		if (!newHotel?.success) {
			throw new ValidationError(newHotel?.error?.issues[0].message);
		}
		const user = req?.auth;

		await Hotel.create({
			ownerId: user.userId,
			name: newHotel.data.name,
			location: newHotel.data.location,
			image: newHotel.data.image,
			description: newHotel.data?.description,
			rooms: newHotel.data.rooms,
			roomTypes: newHotel.data.roomTypes,
			mealPlans: newHotel.data.mealPlans,
			amenities: newHotel.data?.amenities,
			contactInfo: newHotel.data.contactInfo,
		});
		res.status(201).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const deleteHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;
		const hotel = await Hotel.findById(hotelId);

		if (!hotel) {
			throw new NotFoundError("Hotel not found");
		}

		await Hotel.findByIdAndUpdate(hotelId, { updatedAt: new Date() });

		res.status(204).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const updateHotel = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const hotelId = req.params.id;

		const updatedHotel = createHotelDTO.safeParse(req.body);

		if (!updatedHotel?.success) {
			throw new ValidationError(updatedHotel?.error?.issues[0].message);
		}
		const user = req?.auth;

		await Hotel.findByIdAndUpdate(hotelId, {
			ownerId: user.userId,
			...updatedHotel.data,
			updatedAt: new Date(),
		});

		res.status(200).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const getHotelsByOwnerId = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const ownerId = req.auth.userId;
		const hotels = await Hotel.find({ ownerId });
		res.status(200).json(hotels);
		return;
	} catch (error) {
		next(error);
	}
};
