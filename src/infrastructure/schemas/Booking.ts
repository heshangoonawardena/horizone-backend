import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	hotelId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hotel",
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	checkIn: {
		type: Date,
		required: true,
	},
	checkOut: {
		type: Date,
		required: true,
	},
	roomType: {
		type: String,
		required: true,
	},
	mealPlan: {
		type: String,
		required: true,
	},
	adults: {
		type: Number,
		required: true,
	},
	kids: {
		type: Number,
		defaultValue: 0,
	},
	roomNumber: {
		type: Number,
	},
	requests: {
		type: String,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "pending",
	},
	ownerReply: {
		message: {
			type: String,
		},
		timestamp: {
			type: Date,
			default: Date.now,
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

bookingSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

export default mongoose.model("Booking", bookingSchema);
