import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Hotel from "../infrastructure/schemas/Hotel";

export const retrieve = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			query,
			sortBy = "price",
			order = "asc",
			minPrice = 0,
			maxPrice = Infinity,
		} = req.query;

		const sortHotels = (hotels: any[]) => {
			return hotels.sort((a, b) => {
				let valueA, valueB;
				if (sortBy === "price") {
					valueA = Math.min(
						...(a.roomTypes ?? []).map((type: any) => type.price)
					);
					valueB = Math.min(
						...(b.roomTypes ?? []).map((type: any) => type.price)
					);
				} else if (sortBy === "rating") {
					valueA = a.rating ?? 0;
					valueB = b.rating ?? 0;
				}
				return order === "asc" ? valueA - valueB : valueB - valueA;
			});
		};

		const filterByPriceRange = (hotels: any[]) => {
			return hotels.filter((hotel) => {
				const minRoomPrice = Math.min(
					...(hotel.roomTypes ?? []).map((type: any) => type.price)
				);
				return (
					minRoomPrice >= Number(minPrice) && minRoomPrice <= Number(maxPrice)
				);
			});
		};

		if (!query || query === "") {
			const hotels = filterByPriceRange(
				sortHotels(
					(await Hotel.find()).map((hotel) => ({
						...hotel.toObject(),
					}))
				)
			);
			res.status(200).json(hotels);
			return;
		}

		const embeddingsModel = new OpenAIEmbeddings({
			model: "text-embedding-3-small",
			apiKey: process.env.OPENAI_API_KEY,
		});

		const vectorIndex = new MongoDBAtlasVectorSearch(embeddingsModel, {
			collection: mongoose.connection.collection("hotelVectors"),
			indexName: "vector_index",
		});

		const results = await vectorIndex.similaritySearchWithScore(
			query as string,
			8
		);

		const matchedHotels = await Promise.all(
			results
				.filter((result) => result[1] > 0.7)
				.map(async (result) => {
					const hotel = await Hotel.findById(result[0].metadata._id.toString());
					return {
						...hotel?.toObject(),
						confidence: result[1],
					};
				})
		);

		const sortedAndFilteredHotels = filterByPriceRange(
			sortHotels(matchedHotels)
		);

		res.status(200).json(sortedAndFilteredHotels);
		return;
	} catch (error) {}
};
