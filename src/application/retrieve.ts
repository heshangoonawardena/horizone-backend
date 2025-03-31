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
		const { query } = req.query;

		if (!query || query === "") {
			const hotels = (await Hotel.find())
				.map((hotel) => ({
					...hotel.toObject(),
				}))
				.sort((a, b) => {
					const priceA = Math.min(
						...a.roomTypes.map((type: any) => type.price)
					);
					const priceB = Math.min(
						...b.roomTypes.map((type: any) => type.price)
					);
					return priceA - priceB;
				});
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

		const sortedHotels = matchedHotels.sort((a, b) => {
			const priceA = Math.min(
				...(a.roomTypes ?? []).map((type: any) => type.price)
			);
			const priceB = Math.min(
				...(b.roomTypes ?? []).map((type: any) => type.price)
			);
			return priceA - priceB;
		});

		res.status(200).json(sortedHotels);
		return;
	} catch (error) {}
};
