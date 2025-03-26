import { ExpressRequestWithAuth } from "@clerk/express";
import { NextFunction, Response } from "express";
import Hotel from "../infrastructure/schemas/Hotel";
import User from "../infrastructure/schemas/User";

export const getFavorites = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.auth.userId;
		const user = await User.findOne({ userId });

		if (!user || !user.favorites.length) {
			res.status(204).send();
			return;
		}

		const hotels = await Hotel.find({ _id: { $in: user.favorites } });
		res.status(200).json(hotels);
		return;
	} catch (error) {
		next(error);
	}
};

export const addFavorite = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.auth.userId;
		const { hotelId } = req.body;

		let user = await User.findOne({ userId });

		if (!user) {
			user = new User({ userId, favorites: [] });
		}

		user.favorites = Array.from(new Set([...user.favorites, hotelId]));
		await user.save();

		res.status(201).send();
		return;
	} catch (error) {
		next(error);
	}
};

export const removeFavorite = async (
	req: ExpressRequestWithAuth,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.auth.userId;
		const { hotelId } = req.body;

		const user = await User.findOneAndUpdate(
			{ userId },
			{ $pull: { favorites: hotelId } },
			{ new: true }
		);

		res.status(204).send();
		return;
	} catch (error) {
		next(error);
	}
};
