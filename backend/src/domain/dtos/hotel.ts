import { z } from "zod";

export const createHotelDTO = z.object({
	// ownerId: z.string().optional(),
	name: z.string().min(1, "Hotel name is required"),
	location: z.string().min(1, "Location is required"),
	image: z.string().url("Invalid image URL"),
	description: z.string().optional(),
	rooms: z.number().positive("Price must be greater than 0"),
	roomTypes: z.array(
		z.object({
			type: z.string().min(1, "Room type is required"),
			price: z.number().positive("Price must be greater than 0"),
		})
	),
	mealPlans: z.array(
		z.object({
			type: z.string().min(1, "Meal plan type is required"),
			price: z.number().positive("Price must be greater than 0"),
		})
	),
	amenities: z.array(z.string()),
	contactInfo: z.object({
		phone: z.string().min(1, "Phone number is required"),
		email: z.string().email("Invalid email format"),
		website: z.union([z.string().url("Invalid website URL"), z.literal("")]),
	}),
});
