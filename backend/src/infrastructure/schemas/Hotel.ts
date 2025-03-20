import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
	ownerId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	reviews: {
		type: Number,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	roomTypes: [
		{
			type: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	mealPlans: [
		{
			type: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
	amenities: [
		{
			type: String,
		},
	],
	contactInfo: {
		phone: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		website: {
			type: String,
			required: false,
		},
	},
});

export default mongoose.model("Hotel", hotelSchema);
