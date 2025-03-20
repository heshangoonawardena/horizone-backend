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

/*
Sample Data:
{
	ownerId: "12345",
	name: "Hotel Sunshine",
	location: "123 Beach Ave, Miami, FL",
	rating: 4.5,
	reviews: 120,
	image: "http://example.com/image.jpg",
	description: "A beautiful beachside hotel.",
	roomTypes: [
		{ type: "Single", price: 100 },
		{ type: "Double", price: 150 },
		{ type: "Suite", price: 300 }
	],
	mealPlans: [
		{ type: "Breakfast", price: 20 },
		{ type: "Half Board", price: 50 },
		{ type: "Full Board", price: 80 }
	],
	amenities: ["WiFi", "Pool", "Gym", "Spa"],
	contactInfo: {
		phone: "123-456-7890",
		email: "info@hotelsunshine.com",
		website: "http://hotelsunshine.com"
	}
}
*/

// To insert this sample data into the database, you can use the following code:
// const Hotel = require('./path/to/Hotel');
// const sampleHotel = new Hotel({
    // ownerId: "12345",
    // name: "Hotel Sunshine",
    // location: "123 Beach Ave, Miami, FL",
    // rating: 4.5,
    // reviews: 120,
    // image: "http://example.com/image.jpg",
    // description: "A beautiful beachside hotel.",
    // roomTypes: [
    //     { type: "Single", price: 100 },
    //     { type: "Double", price: 150 },
    //     { type: "Suite", price: 300 }
    // ],
    // mealPlans: [
    //     { type: "Breakfast", price: 20 },
    //     { type: "Half Board", price: 50 },
    //     { type: "Full Board", price: 80 }
    // ],
    // amenities: ["WiFi", "Pool", "Gym", "Spa"],
    // contactInfo: {
    //     phone: "123-456-7890",
    //     email: "info@hotelsunshine.com",
    //     website: "http://hotelsunshine.com"
    // }
// });
// sampleHotel.save().then(() => console.log('Sample hotel data inserted')).catch(err => console.error(err));

export default mongoose.model("Hotel", hotelSchema);
