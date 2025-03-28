import express from "express";
import { createEmbeddings } from "../application/embedding";
import {
	createHotel,
	deleteHotel,
	getAllHotels,
	getHotelById,
	getHotelsByOwnerId,
	updateHotel,
} from "../application/hotel";
import { retrieve } from "../application/retrieve";
import { isAuthenticated } from "./middlewares/authentication-middleware";
import { isAdmin } from "./middlewares/authorization-middleware";

const hotelsRouter = express.Router();

hotelsRouter.route("/").get(getAllHotels).post(createHotel);
hotelsRouter.route("/owner").get(isAdmin, isAuthenticated, getHotelsByOwnerId);
hotelsRouter
	.route("/:id")
	.get(getHotelById)
	.delete(isAdmin, isAuthenticated, deleteHotel)
	.put(isAdmin, isAuthenticated, updateHotel);

hotelsRouter
	.route("/embeddings/create")
	.post(isAuthenticated, createEmbeddings);
hotelsRouter.route("/search/retrieve").get(retrieve);

export default hotelsRouter;
