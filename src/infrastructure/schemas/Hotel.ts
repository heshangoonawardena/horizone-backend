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
		default: 5,
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
	rooms: {
		type: Number,
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
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	deletedAt: {
		type: Date,
		default: null,
	},
});

hotelSchema.pre("findOneAndUpdate", function (next) {
	this.set({ updatedAt: new Date() });
	next();
});

hotelSchema.pre("updateOne", function (next) {
	this.set({ updatedAt: new Date() });
	next();
});

hotelSchema.pre("save", function (next) {
	this.set({ updatedAt: new Date() });
	next();
});

export default mongoose.model("Hotel", hotelSchema);
