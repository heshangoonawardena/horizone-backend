import express from "express";
import {
	getAllHotels,
	getHotelById,
	createHotel,
	deleteHotel,
	updateHotel,
	getHotelsByOwnerId,
} from "../application/hotel";
import { isAuthenticated } from "./middlewares/authentication-middleware";
import { isAdmin } from "./middlewares/authorization-middleware";

const hotelsRouter = express.Router();

hotelsRouter.route("/").get(getAllHotels).post(createHotel);
hotelsRouter.route("/owner").get(getHotelsByOwnerId);
hotelsRouter
	.route("/:id")
	.get(getHotelById)
	.delete(deleteHotel)
	.put(updateHotel);


export default hotelsRouter;
