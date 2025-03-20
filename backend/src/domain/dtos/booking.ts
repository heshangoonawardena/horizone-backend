import { z } from "zod";

export const createBookingDTO = z.object({
	hotelId: z.string(),
	phoneNumber: z
		.string({ message: "Phone number is required" })
		.min(10, { message: "Phone number is required" }),
	roomType: z.string().min(1),
	mealPlan: z.string().min(1),
	// adults: z
	// 	.string()
	// 	.transform((value) => (value === "" ? "" : Number(value)))
	// 	.refine((value) => !isNaN(Number(value)), {
	// 		message: "Expected number, received string",
  // 	}),
  adults: z.number(),
	// kids: z
	// 	.string()
	// 	.transform((value) => (value === "" ? "" : Number(value)))
	// 	.refine((value) => !isNaN(Number(value)), {
	// 		message: "Expected number, received string",
  // 	}),
  kids: z.number(),
  totalAmount: z.number().positive("Total amount must be greater than 0"),
	requests: z.string().optional(),
	checkIn: z
		.string()
		.refine((date) => new Date(date).toString(), {
			message: "checkIn date is invalid",
		})
		.transform((date) => new Date(date)),
	checkOut: z
		.string()
		.refine((date) => new Date(date).toString(), {
			message: "checkOut date is invalid",
		})
		.transform((date) => new Date(date)),
});
